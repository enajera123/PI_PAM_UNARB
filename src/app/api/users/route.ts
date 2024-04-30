import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const users = await prisma.user.findMany({});
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}