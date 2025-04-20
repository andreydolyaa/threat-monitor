import logger from "../../core/logger.ts";
import { Rule } from "../../models/rule-model.ts";
import type { LogAnalysisResult } from "../../types/index.ts";
import { rules } from "./rules.ts";

const defaultResult: LogAnalysisResult = {
  severity: "0",
  suspicious: false,
  summary: "No matching rule",
};

type RuleType = {
  pattern: RegExp;
  severity: string;
  summary: string;
  suspicious: boolean;
};

export const createBasicRules = async () => {
  try {
    const isBasicRulesExists = await Rule.countDocuments();
    if (!isBasicRulesExists) {
      for (const rule of rules) {
        await Rule.create(rule);
      }
    }
  } catch (error) {
    logger.error(`DB | failed to add basic rules: ${JSON.stringify(error)}`);
  }
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
