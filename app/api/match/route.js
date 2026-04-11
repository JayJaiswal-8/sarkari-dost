import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { getGeminiModel } from '../../../lib/gemini';

export const runtime = 'edge';

export async function POST(req) {
  try {
    const { userProfile } = await req.json();
    
    // LAYER 1: Case-Insensitive Search (.ilike)
    // This ensures "bihar", "BIHAR", and "Bihar" all work perfectly.
    // The % symbols allow for partial matches (e.g., "Uttar" matches "Uttar Pradesh").
    const { data: schemes, error } = await supabase
      .from('schemes')
      .select('*')
      .ilike('state', `%${userProfile.state}%`);

    if (error) throw error;

    // LAYER 2: Fallback Logic
    // If the state search returns nothing, we fetch ALL schemes.
    // We do this so the AI can suggest "General India" schemes instead of showing a blank page.
    let finalSchemes = schemes;
    let isFallback = false;

    if (!schemes || schemes.length === 0) {
      const { data: allSchemes } = await supabase.from('schemes').select('*');
      finalSchemes = allSchemes || [];
      isFallback = true;
    }

    // LAYER 3: The AI Intelligence
    const model = getGeminiModel();
    const prompt = `
      You are the "Sarkari Dost" AI Expert. 
      User Profile: ${JSON.stringify(userProfile)}
      Available Schemes: ${JSON.stringify(finalSchemes)}
      
      Context: ${isFallback ? "No state-specific schemes were found. Please find the best GENERAL India-wide schemes the user might qualify for." : "State-specific schemes were found. Filter the best ones for the user."}

      Task: 
      1. Analyze the user's age, income, category, and profession.
      2. Select the top 3-6 most relevant schemes.
      3. For each, provide:
         - name_en: A clear, bold name.
         - benefit_en: A high-impact sentence explaining the money/benefit.
         - action_en: A simple, 1-step instruction on how to apply.
         - link: The official URL.
      
      Return ONLY a JSON array of objects. If absolutely nothing matches, return [].
    `;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, "");
    
    return NextResponse.json({ matchedSchemes: JSON.parse(text) });
  } catch (e) {
    console.error("AI Match Error:", e);
    return NextResponse.json({ error: "Our AI is currently overloaded. Please try again in a moment." }, { status: 500 });
  }
}
