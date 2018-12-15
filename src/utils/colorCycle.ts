/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";
import { COLORS } from "./Colors";
import { shuffleArray } from "./shuffleArray";

jsx; // FIXME: This is no long-term solution. https://bit.ly/2S4Xj06

export const colorCycle = (cssPropertyName: string) => keyframes`
  ${(() => {
    let keyframes: string = "";
    shuffleArray(COLORS).forEach((color, i) => {
      keyframes += `${(100 / (COLORS.length - 1)) *
        i}% { ${cssPropertyName}: ${color}; }`;
    });
    return keyframes;
  })()}
`;
