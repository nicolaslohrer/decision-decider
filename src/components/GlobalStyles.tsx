import { css, Global } from "@emotion/core";
import { normalize } from "polished";
import React, { SFC } from "react";
import { COLORS } from "../utils/Colors";

export const GlobalStyles: SFC = () => (
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
      }

      body,
      html {
        height: 100%;
      }

      body,
      #root {
        display: flex;
        flex-direction: column;
      }

      #root {
        flex-grow: 1;
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
