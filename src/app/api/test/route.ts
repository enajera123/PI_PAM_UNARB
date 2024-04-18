import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const tests = await prisma.test.findMany({});
        return NextResponse.json(tests, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const test = await req.json()
        const testSaved = await prisma.test.create({
            data: {
                ...test,
            }
        })
        return NextResponse.json(testSaved, { status: 201 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}