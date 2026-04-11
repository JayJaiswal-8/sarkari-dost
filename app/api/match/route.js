import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getGeminiModel } from '@/lib/gemini';

export async function POST(req) {
  try {
    const { userProfile } = await req.json();
    const { data: schemes } = await supabase.from('schemes').select('*').eq('state', userProfile.state);
    const model = getGeminiModel();
    const prompt = `User: ${JSON.stringify(userProfile)}. Schemes: ${JSON.stringify(schemes)}. Filter eligible schemes. Return a JSON array of objects with: name_en, benefit_en, action_en, link.`;
    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, "");
    return NextResponse.json({ matchedSchemes: JSON.parse(text) });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
