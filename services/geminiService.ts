import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize comfortably, but handle missing key gracefully in UI
const ai = new GoogleGenAI({ apiKey });

export const polishText = async (text: string, type: 'summary' | 'experience'): Promise<string> => {
  if (!apiKey) {
    console.warn("No API Key found. Returning original text.");
    return text + " (AI Key Missing)";
  }

  if (!text || text.trim().length < 5) return text;

  const model = 'gemini-2.5-flash';
  
  let prompt = "";
  if (type === 'summary') {
    prompt = `You are a professional resume writer. Rewrite the following professional summary to be more impactful, concise, and action-oriented. Keep it under 4 sentences. Text: "${text}"`;
  } else {
    prompt = `You are a professional resume writer. Rewrite the following job description bullet points to use strong action verbs, quantify achievements where possible, and improve professional tone. Text: "${text}"`;
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to polish text. Please try again.");
  }
};

export const generateJobDescription = async (role: string, company: string): Promise<string> => {
    if (!apiKey) return "Please configure API Key to generate content.";
    
    const model = 'gemini-2.5-flash';
    const prompt = `Generate 3 professional, bullet-point style resume achievements for a ${role} at ${company}. Focus on generic but impressive responsibilities suitable for this role. Return only the bullet points.`;

    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });
      return response.text || "";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Managed key projects and improved team efficiency.";
    }
};