import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterFirstName } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterFirstName) {

    try {
        const fetchedName = params.firstName;
      
        const user = await prisma.user.findMany({
            where: {
                firstName: fetchedName,
            },
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}