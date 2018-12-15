/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";
import { COLORS } from "../settings";
import { shuffleArray } from "./shuffleArray";

jsx;

export const getColorCycleKeyframes = (cssPropertyName: string) => keyframes`
  ${(() => {
    let keyframes: string = "";
    shuffleArray(COLORS).forEach((color, i) => {
      keyframes += `${(100 / (COLORS.length - 1)) *
        i}% { ${cssPropertyName}: ${color}; }`;
    });
    return keyframes;
  })()}
`;
