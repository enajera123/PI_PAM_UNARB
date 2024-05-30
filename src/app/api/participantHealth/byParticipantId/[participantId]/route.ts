import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterParticipantId } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterParticipantId) {

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
  
      const { ParticipantDisseases, ParticipantMedicines, ...participantHealth } =
        participantHealthData;
  
      // Actualizar la información de salud del participante
      const response = await prisma.participantHealth.update({
        where: {
          participantId: fetchedParticipantId,
        },
        data: {
          ...participantHealth,
          // Actualizar las enfermedades existentes
          ParticipantDisseases: {
            upsert: ParticipantDisseases.map((disease) => ({
              where: { id: disease.id },
              update: disease,
              create: disease,
            })),
          },
          // Actualizar los medicamentos existentes
          ParticipantMedicines: {
            upsert: ParticipantMedicines.map((medicine) => ({
              where: { id: medicine.id },
              update: medicine,
              create: medicine,
            })),
          },
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
  