import mammoth from 'mammoth';
import * as cheerio from 'cheerio';

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
    try {
        // Lazy load pdf-parse to avoid build issues
        const pdf = require('pdf-parse');
        const data = await pdf(buffer);
        return data.text;
    } catch (error) {
        console.error("Error parsing PDF:", error);
        throw new Error("Failed to parse PDF");
    }
}

export async function extractTextFromDocx(buffer: Buffer): Promise<string> {
    try {
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
    } catch (error) {
        console.error("Error parsing DOCX:", error);
        throw new Error("Failed to parse DOCX");
    }
}

export async function extractTextFromUrl(url: string): Promise<string> {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        // Remove scripts, styles, and other non-content elements
        $('script').remove();
        $('style').remove();
        $('nav').remove();
        $('footer').remove();
        $('header').remove();

        // Extract text from body
        const text = $('body').text();

        // Clean up whitespace
        return text.replace(/\s+/g, ' ').trim();
    } catch (error) {
        console.error("Error scraping URL:", error);
        throw new Error("Failed to scrape URL");
    }
}
