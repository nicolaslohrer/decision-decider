/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import { COLORS } from "../settings";
import { shuffleArray } from "./shuffleArray";

export const getColorCycleKeyframes = (cssPropertyName: string) => keyframes`
  ${(() => {
    let keyframes: string = "";
    shuffleArray(COLORS).forEach((color, i) => {
      keyframes += `${
        (100 / (COLORS.length - 1)) * i
      }% { ${cssPropertyName}: ${color}; }`;
    });
    return keyframes;
  })()}
`;
