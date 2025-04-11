import axios from "axios";
import crypto from "crypto";
import type { Gemma2ProcessedData } from "../../types";

export const createLogPrompt = (logStr: string) => {
  const prompt = `
  Log: ${logStr}
  - iSuspicious: true/false
  - severityScore: 1-10
  - summary: Short plain-English technical summary about if it's a security concern or not.
  Respond ONLY with JSON. example: {isSuspicious: true/false, severityScore: 1-10, summary: ""}
  `;
  return prompt;
};

export const runGemma2 = async (
  prompt: string
): Promise<Gemma2ProcessedData> => {
  const url = "http://localhost:11434/api/generate";
  const data = {
    model: "gemma2:2b",
    prompt,
    stream: false,
    raw: true,
  };
  try {
    const response = await axios.post(url, data);
    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const hashLog = (log: string) => {
  return crypto.createHash("sha256").update(log).digest("hex");
};
