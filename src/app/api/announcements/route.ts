import {NextResponse} from "next/server";
import {prisma} from "@/app/lib/prisma_db";

export async function GET() {
    try {
        const allAnnouncements = await prisma.announcement.findMany();
        return NextResponse.json(allAnnouncements);

    }
    catch(error) {
        console.error(error);
        NextResponse.json({ error: "Failed to fetch announcement" }, { status: 500 });
    }
}