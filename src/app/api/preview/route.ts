import { NextRequest, NextResponse } from 'next/server';
import { getLinkPreview } from 'link-preview-js';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
        return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    try {
        const data = await getLinkPreview(targetUrl); // ✅ Server-side fetch
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching link preview:', error);
        return NextResponse.json({ error: 'Failed to fetch link preview' }, { status: 500 });
    }
}