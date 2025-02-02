import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/lib/prisma_db";
import {ResourceType} from "@prisma/client";
import {uploadToAzureBlob} from "@/app/lib/fileUpload";

export async function GET(){
    try {
        const allResources = await prisma.resource.findMany()
        return NextResponse.json(allResources);
    }
    catch (e) {
        console.error(e)
        return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
    }
}

export async function POST(req: NextRequest){
    try {
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const desc = formData.get("description") as string;
        const file = formData.get("file") as File;
        const link = formData.get("link") as string;
        const type = formData.get("type") as ResourceType;
        let isPublic: boolean;
        // @ts-ignore
        isPublic = formData.get("isPublic") as boolean;
        const tags = formData.get("tags[]") as unknown as string[];

        console.log(tags)
        let contentUrl;
        if (type == ResourceType.LINK){
            contentUrl = link;
        }
        else {
            const blobName = `${Date.now()}-${file.name}`;
            contentUrl = await uploadToAzureBlob("resources", file, blobName)
        }

        console.log(formData)
        const newResource = await prisma.resource.create({
            data:{
                userId:"12345",
                title:title,
                contentUrl:contentUrl,
                desc:desc,
                isPublic:true,
                type:type,
                tags:[],
            }
        })
        return NextResponse.json(newResource)
    }
    catch (e) {
        console.error(e)
       return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
    }
}