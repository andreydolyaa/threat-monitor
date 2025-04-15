export const RGBalphaText = (rgba: string, newAlpha: number) => {
  const parts = rgba.split(",");
  parts[3] = `${newAlpha})`;
  return parts.join(",");
};
