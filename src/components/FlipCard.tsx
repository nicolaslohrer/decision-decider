/** @jsx jsx */ jsx;
import { css, jsx } from "@emotion/core";
import { FunctionComponent, HTMLProps, ReactNode } from "react";

// The flip animation is heavily inspired by https://davidwalsh.name/css-flip.

export type FlipCardProps = {
  is?: "div" | "span" | "li";
  children: [ReactNode, ReactNode];
  visibleSide?: "front" | "back";
  className?: string;
  transitionDurationMs?: number;
};

export const FlipCard: FunctionComponent<FlipCardProps> = ({
  is: Is = "div",
  visibleSide = "front",
  transitionDurationMs = "500",
  ...restProps
}) => (
  <Is
    css={[
      css`
        display: block;
        transition: ${transitionDurationMs}ms ease-out;
        transform-style: preserve-3d;
        position: relative;
        will-change: transform;
      `,
      visibleSide === "back" &&
        css`
          transform: rotateY(180deg);
        `
    ]}
    {...restProps}
  />
);

export type FlipCardSideProps = { className?: string } & HTMLProps<
  HTMLDivElement
>;

const FlipCardSide: FunctionComponent<FlipCardSideProps> = props => (
  <div
    css={css`
      display: block;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
    `}
    {...props}
  />
);

export const FlipCardFront: FunctionComponent<FlipCardSideProps> = props => (
  <FlipCardSide
    css={css`
      z-index: 2;
      transform: rotateY(0deg);
    `}
    {...props}
  />
);

export const FlipCardBack: FunctionComponent<FlipCardSideProps> = props => (
  <FlipCardSide
    css={css`
      transform: rotateY(180deg);
    `}
    {...props}
  />
);
