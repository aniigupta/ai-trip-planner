import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultQuery: { "route": "openai" },
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "AI Trip Planner",
    "Content-Type": "application/json",
  }
});

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by **asking one relevant trip-related question at a time**.

 Only ask questions about the following details in order, and wait for the user’s answer before asking the next: 

1. Starting location (source) 
2. Destination city or country 
3. Group size (Solo, Couple, Family, Friends) 
4. Budget (Low, Medium, High) 
5. Trip duration (number of days) 
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation) 
7. Special requirements or preferences (if any)
Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.
Along wth response also send which ui component to display for generative UI for example 'budget/groupSize/tripDuration/Final) , where Final means AI generating complete final outpur
Once all required information is collected, generate and return a **strict JSON response only** (no explanations or extra text) with following JSON schema:

{
  resp:'Text Resp',
  ui:'budget/groupSize/tripDuration/final'
}`

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OpenRouter API key is missing");
      return NextResponse.json(
        { error: "API configuration error" },
        { status: 500 }
      );
    }

    // Validate and get messages from request
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    console.log("Making request to OpenRouter API...");
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: PROMPT },
        ...messages,
      ]
    });

    const message = completion.choices[0].message;
    console.log("AI Response:", message);

    if (!message.content) {
      throw new Error("No content in OpenRouter response");
    }

    return NextResponse.json(JSON.parse(message.content));
  } catch (e: any) {
    console.error("API Error:", {
      message: e.message,
      status: e.status,
      code: e.code,
      type: e.type,
      details: e.response?.data
    });
    
    return NextResponse.json(
      { 
        error: e.message || "Something went wrong",
        type: e.type,
        code: e.code 
      },
      { status: e.status || 500 }
    );
  }
}
