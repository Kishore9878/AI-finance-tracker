import { GoogleGenerativeAI } from "@google/generative-ai";
import Transaction from "../models/Transaction.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIInsights = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });

    const summary = transactions.map(
      (t) => `${t.type} - ${t.amount} - ${t.category}`
    );

    const prompt = `
    You are a professional financial advisor.

    Analyze these transactions:
    ${summary.join("\n")}

    Give response in this format:

    1. Spending Patterns
    2. Saving Tips
    3. Budget Advice

    Keep it short, clear, and practical.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    console.log("API KEY:", process.env.GEMINI_API_KEY);

        const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        contents: [
            {
            parts: [{ text: prompt }],
            },
        ],
        }),
    }
    );

    const data = await response.json();

    console.log("FULL AI RESPONSE:", JSON.stringify(data, null, 2));

    let text = "No response";

    if (data.candidates && data.candidates.length > 0) {
    const parts = data.candidates[0]?.content?.parts;

    if (parts && parts.length > 0) {
        text = parts.map(p => p.text).join(" ");
    }
    }

    res.json({ insights: text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "AI error" });
  }
};

export const scanReceipt = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const base64Image = file.buffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
Extract details from this receipt image and return JSON only:

{
  "amount": number,
  "category": "string",
  "description": "string"
}

If unsure, guess intelligently.
`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: file.mimetype,
          data: base64Image,
        },
      },
    ]);

    const text = result.response.text();

    res.json({ data: text });
  } catch (error) {
    console.log("SCAN ERROR:", error);
    res.status(500).json({ message: "Scan failed" });
  }
};