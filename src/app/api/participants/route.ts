import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const participants = await prisma.participant.findMany({
      include: {
        Policy: true,
        MedicalReport: true,
        ParticipantAttachments: true,
      },
    });
    return NextResponse.json(participants, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { photo, Policy, MedicalReport, ParticipantAttachments, ...rest } =
      body;

    const participantData: any = {
      ...rest,
      photo: photo ? Buffer.from(photo.split(",")[1], "base64") : null,
    };

    const newParticipant = await prisma.$transaction(async (prisma) => {
      const createdParticipant = await prisma.participant.create({
        data: participantData,
      });

      if (ParticipantAttachments) {
        await prisma.participantAttachment.create({
          data: {
            attachmentUrl: ParticipantAttachments.attachmentUrl,
            name: ParticipantAttachments.name,
            participantId: createdParticipant.id,
          },
        });
      }

      if (Policy) {
        await prisma.policy.create({
          data: {
            expirationDate: Policy.expirationDate,
            participantId: createdParticipant.id,
          },
        });
      }

      if (MedicalReport) {
        await prisma.medicalReport.create({
          data: {
            expirationDate: MedicalReport.expirationDate,
            participantId: createdParticipant.id,
          },
        });
      }

      return createdParticipant;
    });

    const updatedParticipant = await prisma.participant.findUnique({
      where: {
        id: newParticipant.id,
      },
      include: {
        Policy: true,
        MedicalReport: true,
        ParticipantAttachments: true,
      },
    });

    return NextResponse.json(updatedParticipant, { status: 201 });
  } catch (error) {
    console.error("Error al registrar participante:", error);
    return NextResponse.json(
      { error: "Error al registrar participante" },
      { status: 500 }
    );
  }
}
