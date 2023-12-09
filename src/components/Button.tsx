import styled from "@emotion/styled";
import { ButtonHTMLAttributes } from "react";
import { COLORS } from "../settings";
import { getColorCycleKeyframes } from "../utils/colorCycle";

const backgroundColorCycle = getColorCycleKeyframes("background-color");

type Props = { fullWidth?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = styled.button<Props>`
  border-radius: 3px;
  width: ${({ fullWidth }) => fullWidth && "100%"};
  line-height: 2;
  border: 0 none;
  font-weight: 700;
  font-size: 1rem;
  color: white;
  background: lightgrey;
  letter-spacing: 0.25ch;
  animation: ${backgroundColorCycle} ${COLORS.length * 5}s infinite;
  animation: ${({ disabled }) => disabled && "none"};
  transition: opacity 0.35s ease-out;

  &:hover,
  &:focus {
    opacity: 0.85;
    outline: none;
  }
`;
