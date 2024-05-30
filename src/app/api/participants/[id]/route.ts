import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterId } from "@/types/api";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fetchedId = parseInt(params.id);
    const body = await req.json();
    const { photo, Policy, MedicalReport, ParticipantAttachments, ...rest } =
      body;

    const updatedParticipant = await prisma.$transaction(async (prisma) => {
      const participantUpdate = await prisma.participant.update({
        where: {
          id: fetchedId,
        },
        data: {
          ...rest,
          photo: photo ? Buffer.from(photo.split(",")[1], "base64") : null,
        },
      });

      if (ParticipantAttachments) {
        await prisma.participantAttachment.upsert({
          where: { id: fetchedId },
          update: {
            attachmentUrl: Buffer.from(
              ParticipantAttachments.attachmentUrl.split(",")[1],
              "base64"
            ),
            name: ParticipantAttachments.name,
          },
          create: {
            attachmentUrl: Buffer.from(
              ParticipantAttachments.attachmentUrl.split(",")[1],
              "base64"
            ),
            name: ParticipantAttachments.name,
            participantId: fetchedId,
          },
        });
      }

      if (Policy) {
        await prisma.policy.upsert({
          where: { id: fetchedId }, 
          update: { expirationDate: Policy.expirationDate },
          create: {
            expirationDate: Policy.expirationDate,
            participantId: fetchedId,
          },
        });
      }

      if (MedicalReport) {
        await prisma.medicalReport.upsert({
          where: { id: fetchedId }, // Use 'id' instead of 'participantId'
          update: { expirationDate: MedicalReport.expirationDate },
          create: {
            expirationDate: MedicalReport.expirationDate,
            participantId: fetchedId,
          },
        });
      }

      return participantUpdate;
    });

    const updatedParticipantWithRelations = await prisma.participant.findUnique(
      {
        where: {
          id: updatedParticipant.id,
        },
        include: {
          Policy: true,
          MedicalReport: true,
          ParticipantAttachments: true,
        },
      }
    );

    return NextResponse.json(updatedParticipantWithRelations, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar participante:", error);
    return NextResponse.json(
      { error: "Error al actualizar participante" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest, { params }: ParameterId) {
  try {
    const fetchedId = parseInt(params.id);
    const response = await prisma.participant.delete({
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
}export async function GET(req: NextRequest, { params }: ParameterId) {
  try {
    const fetchedId = parseInt(params.id);
    const participant = await prisma.participant.findUnique({
      where: {
        id: fetchedId,
      },
      include: {
        Policy: true,
        MedicalReport: true,
        ParticipantAttachments: true,
      },
    });

    if (participant?.ParticipantAttachments) {
      participant.ParticipantAttachments = participant.ParticipantAttachments.map(
        (attachment) => ({
          ...attachment,
          attachmentUrl: Buffer.isBuffer(attachment.attachmentUrl)
            ? attachment.attachmentUrl
            : Buffer.from(attachment.attachmentUrl, "base64"),
        })
      );
    }

    return NextResponse.json(participant, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
