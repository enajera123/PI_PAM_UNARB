import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterParticipantId } from "@/types/api";

export async function GET(
  req: NextRequest,
  { params }: ParameterParticipantId
) {
  try {
    const fetchedParticipantId = parseInt(params.participantId);

    const contact = await prisma.referenceContact.findMany({
      where: {
        participantId: fetchedParticipantId,
      },
    });

    return NextResponse.json(contact, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: ParameterParticipantId
) {
  try {
    const fetchedParticipantId = parseInt(params.participantId);
    const contactData = await req.json();

    const updatedContact = await prisma.referenceContact.updateMany({
      where: {
        participantId: fetchedParticipantId,
      },
      data: contactData,
    });

    return NextResponse.json(updatedContact, { status: 200 });
  } catch (error) {
    console.error("Error updating reference contact:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
