import axios from "axios";

export const createLogPrompt = (logStr: string) => {
  const prompt = `
  Log: ${logStr}
  Check if it's REALLY a security concern.
  Give a JSON response with:
  - is_suspicious: true/false
  - severity_score: 1-10
  - summary: Short plain-English technical summary
  Respond only with JSON, no explanation and other texts.
  `;
  return prompt;
};

export const runGemma2 = async (prompt: string) => {
  const url = "http://localhost:11434/api/generate";
  const data = {
    model: "gemma2:2b",
    prompt,
    stream: false,
    raw: true,
  };
  try {
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const hashLog = () => {

}
