import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterParticipantId } from "@/types/api";

export async function GET(
  req: NextRequest,
  { params }: ParameterParticipantId
) {
  try {
    const fetchedParticipantId = parseInt(params.participantId);

    const participantHealth = await prisma.participantHealth.findMany({
      where: {
        participantId: fetchedParticipantId,
      },
      include: {
        ParticipantDisseases: true,
        ParticipantMedicines: true,
      },
    });

    return NextResponse.json(participantHealth, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: ParameterParticipantId) {
  try {
    const fetchedParticipantId = parseInt(params.participantId);
    const participantHealthData = await req.json();

    const { ParticipantDisseases, ParticipantMedicines, ...participantHealth } = participantHealthData;

    const updatedParticipantHealth = await prisma.participantHealth.update({
      where: {
        participantId: fetchedParticipantId,
      },
      data: {
        ...participantHealth,
      },
    });

    if (ParticipantDisseases && ParticipantDisseases.length > 0) {
      for (const disease of ParticipantDisseases) {
        await prisma.participantDissease.upsert({
          where: {
            id: disease.id || 0, 
          },
          update: {
            disease: disease.disease,
            description: disease.description,
          },
          create: {
            disease: disease.disease,
            description: disease.description,
            participantHealthId: updatedParticipantHealth.id,
          },
        });
      }
    }

    if (ParticipantMedicines && ParticipantMedicines.length > 0) {
      for (const medicine of ParticipantMedicines) {
        await prisma.participantMedicine.upsert({
          where: {
            id: medicine.id || 0,
          },
          update: {
            medicine: medicine.medicine,
            description: medicine.description,
          },
          create: {
            medicine: medicine.medicine,
            description: medicine.description,
            participantHealthId: updatedParticipantHealth.id,
          },
        });
      }
    }

    const response = await prisma.participantHealth.findUnique({
      where: {
        participantId: fetchedParticipantId,
      },
      include: {
        ParticipantDisseases: true,
        ParticipantMedicines: true,
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error updating participant health data:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}