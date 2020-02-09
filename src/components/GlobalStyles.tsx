/** @jsx jsx */
import { css, Global, jsx } from "@emotion/core";
import { normalize } from "polished";
import { FC } from "react";
import "typeface-ubuntu-mono";
import { COLORS } from "../settings";

export const GlobalStyles: FC = () => (
  <Global
    styles={css`
      ${normalize()}

      * {
        box-sizing: border-box;
        position: relative;

        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;

        -webkit-tap-highlight-color: transparent;

        font-family: "Ubuntu Mono", monospace;

        &::before,
        &::after {
          box-sizing: inherit;
        }
      }

      html {
        font-size: 16px;
        position: absolute;
        height: calc(100% - 0.5rem);
        width: 100%;
        overflow: hidden;
      }

      body {
        margin: 0;
      }

      body,
      #root {
        position: absolute;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      a {
        transition: opacity 0.25s ease-out;

        &:link,
        &:visited {
          color: ${COLORS[2]};
        }

        &:hover,
        &:focus {
          opacity: 0.8;
        }
      }

      hr {
        height: 1px;
        background-color: lightgrey;
        border: none;
      }
    `}
  />
);
