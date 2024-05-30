import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParametersId } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParametersId) {
  try {
    const fetchedId = parseInt(params.id);
    const name = params.name;
    const participant = await prisma.participantAttachment.findMany({
      where: {
        participantId: fetchedId,
        name: name,
      },
    });

    if (!participant) {
      return NextResponse.json(
        { error: "Attachment not found" },
        { status: 404 }
      );
    }
    console.log(participant, "participante");
    const buffer = participant[0].attachmentUrl;
    const base64file = buffer.toString("base64");

    const response = new NextResponse(Buffer.from(base64file, "base64"), {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename=${name}`,
        "Content-Type": "application/octet-stream",
      },
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
