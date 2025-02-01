import {NextResponse, NextRequest} from "next/server";
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

export async function POST(req: NextRequest) {
    try {
        const { title, content, imageName } = await req.json();

        // Basic validation
        if (!title || !content || !imageName) {
            return NextResponse.json(
                { error: "Title, content, and imageName are required" },
                { status: 400 }
            );
        }

        // Create the announcement
        const announcement = await prisma.announcement.create({
            data: { title, content, imageName },
        });

        return NextResponse.json(announcement, { status: 201 });
    } catch (error) {
        console.error("Error creating announcement:", error);
        return NextResponse.json(
            { error: "Failed to create announcement" },
            { status: 500 }
        );
    }
}

