import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const participantHealth = await prisma.participantHealth.findMany({
      include: {
        ParticipantDisseases: true,
        ParticipantMedicines: true,
      },
    });
    return NextResponse.json(participantHealth, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const participantHealthData = await req.json();

    if (!participantHealthData.participantId) {
      throw new Error('Missing participantId');
    }
    if (!participantHealthData.bloodType) {
      throw new Error('Missing bloodType');
    }

    const { ParticipantDisseases, ParticipantMedicines, ...participantHealth } = participantHealthData;

    const newParticipantHealth = await prisma.participantHealth.create({
      data: {
        ...participantHealth,
        ParticipantDisseases: {
          create: ParticipantDisseases,
        },
        ParticipantMedicines: {
          create: ParticipantMedicines,
        },
      },
      include: {
        ParticipantDisseases: true,
        ParticipantMedicines: true,
      },
    });

    return NextResponse.json(newParticipantHealth, { status: 200 });
  } catch (error) {
    console.error('Error creating participant health:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: 'Unknown error' }, { status: 500 });
  }
}
