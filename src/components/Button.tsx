import styled, { keyframes } from "react-emotion";
import { COLORS } from "../utils/Colors";
import { shuffleArray } from "../utils/shuffleArray";

const colorCycle = () => keyframes`
  ${(() => {
    let keyframes: string = "";
    shuffleArray(COLORS).forEach((color, i) => {
      keyframes += `${(100 / (COLORS.length - 1)) *
        i}% { background-color: ${color}; }`;
    });
    return keyframes;
  })()}
`;

export const Button = styled("button")`
  border-radius: 3px;
  width: 100%;
  line-height: 2;
  border: 0 none;
  font-weight: 700;
  font-size: 1rem;
  color: white;
  background: none;
  letter-spacing: 0.25ch;
  animation: ${colorCycle()} ${COLORS.length * 5}s infinite;
  transition: opacity 0.35s ease-out;

  &:hover {
    opacity: 0.85;
  }
`;
