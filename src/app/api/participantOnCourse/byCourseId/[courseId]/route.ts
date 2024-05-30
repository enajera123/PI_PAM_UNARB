import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterCourseId } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterCourseId) {
    try {
        const fetchedCourseId = parseInt(params.courseId);
        
        const participantOnCourse = await prisma.participantOnCourse.findMany({
            where: {
                courseId: fetchedCourseId,
            },
        });

        const participantIds = participantOnCourse.map(item => item.participantId);

        const participants = await prisma.participant.findMany({
            where: {
                id: {
                    in: participantIds
                }
            },
            include: {
                Policy: true,
                MedicalReport: true,
            },
        });

        return NextResponse.json(participants, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: ParameterCourseId) {
    try {
        const fetchedCourseId = parseInt(params.courseId);
        const response = await prisma.participantOnCourse.deleteMany({
            where: {
                courseId: fetchedCourseId,
            },
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}