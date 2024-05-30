import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const participantDissease = await prisma.participantDissease.findMany({});
        return NextResponse.json(participantDissease, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}



export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const participantDissease = await req.json();
        const newParticipantDissease = await prisma.participantDissease.create({
            data: {
                ...participantDissease
            }
        });
        return NextResponse.json(newParticipantDissease, { status: 201 });
    } catch (error) {
        // Aquí podrías personalizar el mensaje de error según el tipo de error.
        return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
    }
}