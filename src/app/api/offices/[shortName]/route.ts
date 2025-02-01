import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/lib/prisma_db";

export async function GET(req: NextRequest, context: { params: { shortName: string } }) {
    try {
        const shortName = context.params.shortName;

        const office = await prisma.office.findFirst({
            where: { shortName }
        });

        if (!office) {
            return NextResponse.json({ error: "Office not found" }, { status: 404 });
        }

        return NextResponse.json(office);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch office" }, { status: 500 });
    }
}