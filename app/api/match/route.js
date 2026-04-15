import { NextResponse } from 'next/server';
// We use '../../../' to go back 3 levels from app/api/match/ to the root, then into lib/
import { supabase } from '../../../lib/supabase';
import { getGeminiModel } from '../../../lib/gemini';

export const runtime = 'edge';

export async function POST(req) {
  try {
    const { userProfile } = await req.json();

    if (!userProfile) {
      return NextResponse.json({ error: "User profile is missing." }, { status: 400 });
    }

    const model = getGeminiModel();

    const prompt = `
      You are the "Sarkari Dost" AI, the most authoritative expert on Indian Government Schemes.
      
      USER PROFILE:
      - State: ${userProfile.state}
      - Age: ${userProfile.age}
      - Annual Income: ₹${userProfile.income}
      - Category: ${userProfile.category}
      - Profession: ${userProfile.profession}

      TASK:
      1. Search your internal knowledge base for real, active government schemes (Central and State) that this specific user is eligible for.
      2. Select the top 3-6 most impactful schemes.
      3. For each scheme, provide the following in English:
         - name_en: The official name of the scheme.
         - benefit_en: A high-impact, 1-sentence explanation of the financial or social benefit.
         - action_en: A clear, 1-step instruction on how to apply.
         - link: The actual official .gov.in or .nic.in URL.

      STRICT RULES:
      - DO NOT invent schemes. Only provide real ones.
      - Return the response ONLY as a valid JSON array of objects.
      - No conversational text.

      REQUIRED JSON FORMAT:
      [
        {
          "name_en": "Scheme Name",
          "benefit_en": "Benefit description",
          "action_en": "How to apply",
          "link": "https://..."
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanJson = responseText.replace(/```json|```/g, "").trim();
    
    try {
      const matchedSchemes = JSON.parse(cleanJson);
      return NextResponse.json({ matchedSchemes });
    } catch (parseError) {
      throw new Error("AI returned invalid format.");
    }

  } catch (error) {
    console.error("Sarkari Dost API Error:", error);
    return NextResponse.json(
      { error: "Our AI is currently analyzing records. Please try again in a few seconds." }, 
      { status: 500 }
    );
  }
}
