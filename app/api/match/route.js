import { NextResponse } from 'next/server';
// We changed '@/lib/supabase' to '../../../lib/supabase'
import { supabase } from '../../../lib/supabase';
// We changed '@/lib/gemini' to '../../../lib/gemini'
import { getGeminiModel } from '../../../lib/gemini';

export async function POST(req) {
  try {
    const { userProfile } = await req.json();
    
    // 1. Database Filter
    const { data: schemes, error } = await supabase
      .from('schemes')
      .select('*')
      .eq('state', userProfile.state);

    if (error) throw error;

    // 2. AI Brain
    const model = getGeminiModel();
    const prompt = `User: ${JSON.stringify(userProfile)}. Schemes: ${JSON.stringify(schemes)}. Filter eligible schemes. Return a JSON array of objects with: name_en, benefit_en, action_en, link.`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, "");
    
    return NextResponse.json({ matchedSchemes: JSON.parse(text) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
