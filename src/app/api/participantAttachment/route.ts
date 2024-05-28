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
    const { attachmentUrl, ...rest } = participantAttachmentData;

    const newParticipantAttachment = await prisma.participantAttachment.create({
      data: {
        ...rest,
        attachmentUrl: Buffer.from(attachmentUrl.split(",")[1], "base64"),
      },
    });

    return NextResponse.json(newParticipantAttachment, { status: 201 });
  } catch (error) {
    console.error("Error al registrar participantAttachment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
