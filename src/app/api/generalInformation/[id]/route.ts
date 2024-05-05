import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterId } from "@/types/api";

export async function PUT(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const information = await req.json();
        const response = await prisma.generalInformation.update({
            where: {
                id: fetchedId,
            },
            data: {
                ...information,
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

export async function DELETE(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const response = await prisma.generalInformation.delete({
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
}

export async function GET(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const information = await prisma.generalInformation.findUnique({
            where: {
                id: fetchedId,
            },
        });

        return NextResponse.json(information, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
