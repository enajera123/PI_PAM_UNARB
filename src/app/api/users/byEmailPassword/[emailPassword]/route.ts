import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { UserLogin } from "@/types/api";

export async function GET(req: NextRequest, {params}:UserLogin) {
    try {

        const user = await prisma.user.findFirst({
            where: {
                email: params.email
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (!user.password.startsWith('$2b$')) {
            console.error("The password is not encrypted with bcrypt");
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }

        const passwordMatch = await bcrypt.compare(params.password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: "Incorrect credentials" }, { status: 401 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error while logging in:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
