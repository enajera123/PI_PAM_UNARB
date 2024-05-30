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
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const buffer = Buffer.from(attachmentUrl, "base64");

    const newParticipantAttachment = await prisma.participantAttachment.create({
      data: {
        participantId,
        name,
        attachmentUrl: buffer,
      },
    });

    return res.status(201).json(newParticipantAttachment);
  } catch (error) {
    console.error("Error al registrar participantAttachment:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default function handler(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    return POST(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }
}
