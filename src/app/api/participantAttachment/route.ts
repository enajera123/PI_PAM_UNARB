import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const participantAttachment = await prisma.participantAttachment.findMany(
      {}
    );
    return NextResponse.json(participantAttachment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const participantAttachmentData = await req.json();
    const { attachmentUrl, participantId, name } = participantAttachmentData;

    if (!participantId || !name || !attachmentUrl) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(attachmentUrl, "base64");

    const newParticipantAttachment = await prisma.participantAttachment.create({
      data: {
        participantId,
        name,
        attachmentUrl: buffer,
      },
    });

    return NextResponse.json(newParticipantAttachment, { status: 201 });
  } catch (error) {
    console.error("Error al registrar participantAttachment:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );  }
}

export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    return POST(req,res);
  } else {
    return NextResponse.json(
      { message: `Método ${req.method} no permitido` },
      { status: 405, headers: { Allow: "POST" } }
    );
  }
}