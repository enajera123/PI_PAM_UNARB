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

export async function PUT(
  req: NextRequest,
  { params }: ParameterParticipantId
) {
  try {
    const fetchedParticipantId = parseInt(params.participantId);
    const participantHealthData = await req.json();

    const { ParticipantDisseases, ParticipantMedicines, ...participantHealth } =
      participantHealthData;

    const updatedParticipantHealth = await prisma.participantHealth.update({
      where: {
        participantId: fetchedParticipantId,
      },
      data: {
        ...participantHealth,
      },
    });

    await prisma.participantDissease.deleteMany({
      where: {
        participantHealthId: updatedParticipantHealth.id,
      },
    });

    await prisma.participantMedicine.deleteMany({
      where: {
        participantHealthId: updatedParticipantHealth.id,
      },
    });

    const updatedDisseases = await Promise.all(
      ParticipantDisseases.map(async (disease) => {
        return await prisma.participantDissease.create({
          data: {
            ...disease,
            participantHealthId: updatedParticipantHealth.id,
          },
        });
      })
    );

    const updatedMedicines = await Promise.all(
      ParticipantMedicines.map(async (medicine) => {
        return await prisma.participantMedicine.create({
          data: {
            ...medicine,
            participantHealthId: updatedParticipantHealth.id,
          },
        });
      })
    );

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
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
