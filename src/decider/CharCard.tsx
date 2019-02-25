/** @jsx jsx */ jsx;
import { css, jsx } from "@emotion/core";
import { Color } from "csstype";
import { FunctionComponent } from "react";
import {
  FlipCard,
  FlipCardBack,
  FlipCardFront,
  FlipCardProps,
  FlipCardSideProps
} from "../components/FlipCard";
import { Omit } from "../utils/tsUtils";

type CharCardProps = FlipCardProps & {
  widthPx: number;
  heightPx: number;
};

export const CharCard: FunctionComponent<CharCardProps> = ({
  widthPx,
  heightPx,
  ...restProps
}) => (
  <FlipCard
    css={css`
      text-align: center;
      text-transform: uppercase;
      font-size: ${0.55 * widthPx}px;
      font-weight: 400;
      width: ${widthPx}px;
      height: ${heightPx}px;
      border-radius: 2px;
      border: ${widthPx * 0.03}px solid white;
    `}
    {...restProps}
  />
);

type CharCardSideProps = Omit<FlipCardSideProps, "children"> & {
  char?: string;
  bgColor?: Color | false;
  color?: Color | false;
};

const CharCardSide: FunctionComponent<
  CharCardSideProps & {
    component: FunctionComponent<CharCardSideProps>;
  }
> = ({ char, bgColor, color, component: Component, ...restProps }) => (
  <Component
    css={css`
      border-radius: 2px;
      line-height: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${color};
      background-color: ${bgColor};
    `}
    {...restProps}
  >
    {char}
  </Component>
);

export const CharCardFront: FunctionComponent<CharCardSideProps> = props => (
  <CharCardSide {...props} component={FlipCardFront} />
);

export const CharCardBack: FunctionComponent<CharCardSideProps> = props => (
  <CharCardSide {...props} component={FlipCardBack} />
);
