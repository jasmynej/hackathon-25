import {NextResponse} from "next/server";
import {prisma} from "@/app/lib/prisma_db";

export async function GET() {
    try{
        const offices = await prisma.office.findMany()
        return NextResponse.json(offices);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch offices" }, { status: 500 });
    }
}