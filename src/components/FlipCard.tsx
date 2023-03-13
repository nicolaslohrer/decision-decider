/** @jsx jsx */
import { css } from "@emotion/react";
import { useMemo } from "react";

// The flip animation is heavily inspired by https://davidwalsh.name/css-flip.
export const useFlipCard = ({
  isFlipped,
  transitionDurationMs = 500
}: {
  isFlipped?: boolean;
  transitionDurationMs?: number;
} = {}) =>
  useMemo(() => {
    const outerStyles = [
      css`
        display: block;
        transition: ${transitionDurationMs}ms ease-out;
        transform-style: preserve-3d;
        position: relative;
        will-change: transform;
      `
    ];

    if (isFlipped) {
      outerStyles.push(css`
        transform: rotateY(180deg);
      `);
    }

    const innerStyles = css`
      display: block;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;

      &:first-of-type {
        z-index: 2;
        transform: rotateY(0deg);
      }

      &:last-of-type {
        transform: rotateY(180deg);
      }
    `;

    return { outerStyles, innerStyles };
  }, [isFlipped, transitionDurationMs]);
