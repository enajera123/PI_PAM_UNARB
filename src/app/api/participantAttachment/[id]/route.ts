import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterId } from "@/types/api";
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fetchedId = parseInt(params.id);
    const participantAttachment = await req.json();
    const { attachmentUrl, ...rest } = participantAttachment;

    const response = await prisma.participantAttachment.update({
      where: {
        id: fetchedId,
      },
      data: {
        ...rest,
        attachmentUrl: Buffer.from(attachmentUrl.split(",")[1], "base64"),
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar participantAttachment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: ParameterId) {
  try {
    const fetchedId = parseInt(params.id);
    const response = await prisma.participantAttachment.delete({
      where: {
        id: fetchedId,
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest, { params }: ParameterId) {
  try {
    const fetchedId = parseInt(params.id);
    const user = await prisma.participantAttachment.findUnique({
      where: {
        id: fetchedId,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
