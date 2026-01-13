import { GoogleGenAI, Type } from "@google/genai";

export const fetchRealData = async () => {
  const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) || '';
  
  if (!apiKey) {
    console.error("No API key available for Björklöven Fan-Hub");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{
        parts: [{
          text: `Hämta den absolut senaste informationen om ishockeylaget IF Björklöven för säsongen 24/25.
          Svara EXAKT med JSON-format enligt schemat.
          Jag behöver:
          1. Nästa match (motståndare, datum, tid, arena).
          2. Topp 5 i Hockeyallsvenskan tabell just nu.
          3. Björklövens top 5 poängplockare i år.
          4. 3 färska nyheter från lokala källor.`
        }]
      }],
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nextMatch: {
              type: Type.OBJECT,
              properties: {
                opponent: { type: Type.STRING },
                date: { type: Type.STRING },
                time: { type: Type.STRING },
                venue: { type: Type.STRING },
                isHome: { type: Type.BOOLEAN },
              },
              required: ['opponent', 'date', 'time', 'venue', 'isHome']
            },
            leagueTable: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  rank: { type: Type.INTEGER },
                  team: { type: Type.STRING },
                  points: { type: Type.INTEGER },
                  diff: { type: Type.INTEGER },
                },
                required: ['rank', 'team', 'points', 'diff']
              }
            },
            topScorers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  goals: { type: Type.INTEGER },
                  assists: { type: Type.INTEGER },
                  points: { type: Type.INTEGER },
                  gamesPlayed: { type: Type.INTEGER },
                },
                required: ['name', 'goals', 'assists', 'points']
              }
            },
            news: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  date: { type: Type.STRING },
                  category: { type: Type.STRING },
                },
                required: ['title', 'summary', 'date', 'category']
              }
            }
          },
          required: ['nextMatch', 'leagueTable', 'topScorers', 'news']
        }
      }
    });

    const textResponse = response.text;
    if (!textResponse) return null;

    // Clean potential markdown artifacts if they exist
    const cleanedJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedJson);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};