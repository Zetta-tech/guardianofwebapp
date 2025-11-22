import { Agent, run } from '@openai/agents';
import { z } from 'zod';

const RiskSchema = z.object({
  risks: z.array(z.object({
    severity: z.enum(['high', 'medium', 'low']),
    title: z.string(),
    description: z.string(),
  })),
  summary: z.string(),
});

export type AnalysisResult = z.infer<typeof RiskSchema>;

const agent = new Agent({
  name: 'Legal Risk Analyst',
  instructions: `You are an expert legal AI assistant. Your task is to analyze Terms and Conditions, Privacy Policies, and Contracts to identify potential risks for the user.
  
  Analyze the provided text and identify:
  1. High Severity Risks: Clauses that significantly waive rights, allow invasive tracking, or have severe penalties.
  2. Medium Severity Risks: Unclear terms, unilateral changes, or moderate restrictions.
  3. Low Severity Risks: Standard but noteworthy limitations.
  
  Also provide a concise summary of the document and ensure legal jargon is demystified.
  
  You must return the result in valid JSON format matching the following structure:
  {
    "risks": [
      { "severity": "high" | "medium" | "low", "title": "Short Title", "description": "Detailed explanation" }
    ],
    "summary": "Brief summary of the document"
  }
  
  Do not include markdown formatting (like \`\`\`json) in your response, just the raw JSON string.`,
  model: 'gpt-5.1-2025-11-13', // Using a capable model for analysis
  modelSettings: {
    reasoning: { effort: 'low' },
  },
});

export async function analyzeText(text: string): Promise<AnalysisResult> {
  try {
    const result = await run(agent, text);

    // The output might be in result.finalOutput or similar, depending on the SDK version.
    // Based on user snippet: console.log(result.finalOutput);
    let output = result.finalOutput || "";

    // Clean up potential markdown code blocks
    output = output.replace(/```json/g, '').replace(/```/g, '').trim();

    const parsed = JSON.parse(output);
    return RiskSchema.parse(parsed);
  } catch (error) {
    console.error("Agent analysis failed:", error);
    // Fallback or re-throw
    throw error;
  }
}
