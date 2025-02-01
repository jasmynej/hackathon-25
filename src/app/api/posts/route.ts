import {NextResponse, NextRequest} from "next/server";
import {prisma} from "@/app/lib/prisma_db";
import {uploadToAzureBlob} from "@/app/lib/imageUpload";

const containerName = "posts"

export async function GET(){
    try {
        const allPosts =await prisma.post.findMany();
        return NextResponse.json(allPosts);
    }
    catch(error) {
        console.error(error);
        NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(req: NextRequest){
    try {
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const userId = formData.get("userId") as string;

        const images = formData.getAll("images") as File[];
        const uploadedImages: string[] = [];
        if (!title || !content || !userId || images.length === 0) {
            return NextResponse.json(
                { error: "Title, content, userId, and images are required" },
                { status: 400 }
            );
        }

        for (const file of images){
            const blobName = `${Date.now()}-${file.name}`;
            await uploadToAzureBlob(containerName, file, blobName)
            uploadedImages.push(blobName)
        }

        const post = await prisma.post.create({
            data: {
                userId,
                title,
                content,
                images: uploadedImages,
            },
        });

        return NextResponse.json(post);


    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}