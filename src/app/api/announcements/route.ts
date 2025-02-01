import {NextResponse, NextRequest} from "next/server";
import {prisma} from "@/app/lib/prisma_db";
import {uploadToAzureBlob} from "@/app/lib/imageUpload";

const containerName = 'announcement-images';
export async function GET() {
    try {
        const allAnnouncements = await prisma.announcement.findMany();
        return NextResponse.json(allAnnouncements);

    }
    catch(error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch announcement" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const file = formData.get("file") as File;
        const blobName = `${Date.now()}-${file.name}`;
        if (!title || !content || !file) {
            return NextResponse.json(
                { error: "Title, content, and file are required" },
                { status: 400 }
            );
        }


        await uploadToAzureBlob(containerName, file,blobName)

        const newAnnouncement = await prisma.announcement.create({
            data: {
                title,
                content,
                imageName: blobName
            }
        })

        return NextResponse.json(newAnnouncement, { status: 201 });

    } catch (error) {
        console.error("Error creating announcement:", error);
        return NextResponse.json(
            { error: "Failed to create announcement" },
            { status: 500 }
        );
    }
}

