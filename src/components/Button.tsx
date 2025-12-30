import { css } from "@emotion/react";
import { ButtonHTMLAttributes } from "react";
import { COLORS } from "../settings";
import { getColorCycleKeyframes } from "../utils/colorCycle";

const backgroundColorCycle = getColorCycleKeyframes("background-color");

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export function Button({ fullWidth, ...props }: Props) {
  return (
    <button
      css={[
        css`
          border-radius: 3px;
          line-height: 2;
          border: 0 none;
          font-weight: 700;
          font-size: 1rem;
          color: white;
          background: lightgrey;
          letter-spacing: 0.25ch;
          animation: ${backgroundColorCycle} ${COLORS.length * 5}s infinite;
          transition: opacity 0.35s ease-out;

          &:hover,
          &:focus {
            opacity: 0.85;
            outline: none;
          }
        `,
        fullWidth &&
          css`
            width: 100%;
          `,
      ]}
      {...props}
    />
  );
}
