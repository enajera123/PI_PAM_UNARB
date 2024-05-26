import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const participants = await prisma.participant.findMany({
      include: {
        Policy: true,
        MedicalReport: true,
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
    const { photo, ...rest } = body;

    const newParticipant = await prisma.participant.create({
      data: {
        ...rest,
        photo: photo ? Buffer.from(photo.split(",")[1], "base64") : null,
      },
    });

    return NextResponse.json(newParticipant, { status: 201 });
  } catch (error) {
    console.error("Error al registrar participante:", error);
    return NextResponse.json(
      { error: "Error al registrar participante" },
      { status: 500 }
    );
  }
}
