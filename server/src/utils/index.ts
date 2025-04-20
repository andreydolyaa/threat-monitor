export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function strObj(obj: unknown) {
  return JSON.stringify(obj);
}

export function responseWrapper(type: string, data: any) {
  return {
    type,
    data,
  };
}

export function severitiesMap(
  severityStr: "low" | "medium" | "high"
): string[] {
  const map = {
    low: ["1", "2", "3", "4", "5"],
    medium: ["6", "7"],
    high: ["8", "9", "10"],
  };
  return map[severityStr] ?? [];
}
