/** @jsx jsx */ jsx;
import { css, jsx } from "@emotion/core";
import { Color } from "csstype";
import { FunctionComponent, HTMLProps } from "react";
import { useFlipCard } from "../components/FlipCard";

type CharCardProps = {
  isFlipped: boolean;
  widthPx: number;
  heightPx: number;
} & HTMLProps<HTMLLIElement>;

export const CharCard: FunctionComponent<CharCardProps> = ({
  widthPx,
  heightPx,
  isFlipped,
  ...restProps
}) => {
  const { outerStyles } = useFlipCard({ isFlipped });
  return (
    <li
      css={[
        outerStyles,
        css`
          text-align: center;
          text-transform: uppercase;
          font-size: ${0.55 * widthPx}px;
          font-weight: 400;
          width: ${widthPx}px;
          height: ${heightPx}px;
          border-radius: 2px;
          border: ${widthPx * 0.03}px solid white;
        `
      ]}
      {...restProps}
    />
  );
};

type CharCardInnerProps = {
  char?: string;
  bgColor?: Color;
  color?: Color;
} & HTMLProps<HTMLDivElement>;

const CharCardInner: FunctionComponent<CharCardInnerProps> = ({
  color,
  bgColor,
  ...restProps
}) => {
  const { innerStyles } = useFlipCard();
  return (
    <div
      css={[
        innerStyles,
        css`
          border-radius: 2px;
          line-height: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${color};
          background-color: ${bgColor};
        `
      ]}
      {...restProps}
    />
  );
};

export const CharCardBack = CharCardInner;
export const CharCardFront = CharCardInner;
