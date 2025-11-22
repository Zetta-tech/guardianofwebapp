import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPdf, extractTextFromDocx, extractTextFromUrl } from '@/lib/text-extractor';
import { analyzeText } from '@/lib/agent';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const type = formData.get('type') as string;

        let textToAnalyze = "";

        if (type === 'file') {
            const file = formData.get('file') as File;
            if (!file) {
                return NextResponse.json({ error: "No file provided" }, { status: 400 });
            }

            const buffer = Buffer.from(await file.arrayBuffer());

            if (file.name.endsWith('.pdf')) {
                textToAnalyze = await extractTextFromPdf(buffer);
            } else if (file.name.endsWith('.docx')) {
                textToAnalyze = await extractTextFromDocx(buffer);
            } else if (file.name.endsWith('.txt')) {
                textToAnalyze = await file.text();
            } else {
                return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
            }
        } else if (type === 'text') {
            const content = formData.get('content') as string;
            if (!content) {
                return NextResponse.json({ error: "No text provided" }, { status: 400 });
            }
            textToAnalyze = content;
        } else if (type === 'url') {
            const url = formData.get('content') as string;
            if (!url) {
                return NextResponse.json({ error: "No URL provided" }, { status: 400 });
            }
            textToAnalyze = await extractTextFromUrl(url);
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        if (!textToAnalyze || textToAnalyze.trim().length === 0) {
            return NextResponse.json({ error: "Could not extract text from the source" }, { status: 400 });
        }

        // Truncate if too long (optional, but good practice for token limits)
        // For now, we'll let the agent handle it or truncate to a reasonable limit like 50k chars
        if (textToAnalyze.length > 50000) {
            textToAnalyze = textToAnalyze.substring(0, 50000) + "... [Truncated]";
        }

        const result = await analyzeText(textToAnalyze);
        return NextResponse.json(result);

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
