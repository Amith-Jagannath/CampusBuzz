import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDbK-r4O8X1_UQ_ldAAwS1C2DvKrhCEpqE",
});

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  console.log("Gemini response", response.text);
  return Response.json({ result: response.text });
}

// await main();
// app/api/gemini/route.ts

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyDbK-r4O8X1_UQ_ldAAwS1C2DvKrhCEpqE");

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json();

//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     return Response.json({ result: text });
//   } catch (error) {
//     console.error("Gemini error:", error);
//     return new Response("Error generating content", { status: 500 });
//   }
// }
