import { rules } from "./rules.ts";

export type LogAnalysisResult = {
  severity: number;
  suspicious: boolean;
  summary: string;
};

const defaultResult: LogAnalysisResult = {
  severity: 0,
  suspicious: false,
  summary: "No matching rule",
};

export const analyzeLog = (line: string): LogAnalysisResult => {
  for (const rule of rules) {
    const match = rule.pattern.exec(line);
    if (match) {
      return {
        severity: rule.severity,
        suspicious: rule.suspicious,
        summary:
          typeof rule.summary === "function"
            ? rule.summary(line, match)
            : rule.summary,
      };
    }
  }
  return defaultResult;
};
