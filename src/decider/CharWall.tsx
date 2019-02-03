/** @jsx jsx */ jsx;
import { css, jsx } from "@emotion/core";
import Rect from "@reach/rect";
import { FunctionComponent, memo, useContext } from "react";
import {
  LETTER_FILTERING_DURATION,
  LETTER_ROTATION_DURATION
} from "../settings";
import { getRandomChar } from "../utils/randomChar";
import { DeciderContext } from "./Decider";
import { Chars } from "./useDecider";

export const CharWall: FunctionComponent = memo(() => {
  const { chars, terms, winner, lifecyclePhase } = useContext(DeciderContext);
  const numberOfLetters = Object.keys(chars).length;

  // XXX: Use CSS grid?
  return (
    <Rect>
      {({ ref, rect }: any) => {
        let squareSize: number = 0;
        let remainder: number = 0;

        // Fit squares into rect. https://stackoverflow.com/a/38567903/7480786
        if (rect && rect.height) {
          const rectRatio = rect.width / rect.height;
          let columns = Math.sqrt(numberOfLetters * rectRatio);
          let rows = columns / rectRatio;
          columns = Math.ceil(columns);
          rows = Math.ceil(rows);
          squareSize = rect.width / columns;
          remainder = rows * columns - numberOfLetters;
        }

        // If necessary, add dummy chars to fill last row.
        const charsWithDummies: Chars = { ...chars };
        for (let i = numberOfLetters; i < numberOfLetters + remainder; i++) {
          charsWithDummies[i] = {
            position: i,
            randomChar: getRandomChar()
          };
        }

        return (
          <ul
            ref={ref}
            css={css`
              flex-grow: 1;
              /* XXX: Try https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/ */
              display: flex;
              flex-wrap: wrap;
              justify-content: ${["FILTERING_LETTERS", "DONE"].includes(
                lifecyclePhase
              )
                ? "center"
                : "space-between"};
              align-items: center;
              align-content: center;
              list-style-type: none;
              margin: 0;
              padding: 0;
              perspective: 1000px;
            `}
          >
            {Object.keys(charsWithDummies)
              .map(k => Number(k))
              .sort((a, b) => a - b)
              .map(position => (
                <li
                  // TODO: Fix card animations in Safari on iOS.
                  key={charsWithDummies[position].position}
                  // For flip animation, see https://davidwalsh.name/css-flip.
                  css={[
                    css`
                      text-align: center;
                      text-transform: uppercase;
                      font-size: calc(${squareSize}px * 0.55);
                      font-weight: 400;
                      transition: 0.5s ease-out;
                      transform-style: preserve-3d;
                      position: relative;
                      width: ${squareSize}px;
                      height: ${squareSize}px;
                      display: block;
                      border-radius: 2px;
                      background-color: #f5f5f5;
                      border: ${squareSize * 0.03}px solid white;

                      > span {
                        display: block;
                        width: 100%;
                        height: 100%;
                        border-radius: 2px;
                        line-height: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        backface-visibility: hidden;
                        position: absolute;
                        top: 0;
                        left: 0;
                      }
                    `,
                    charsWithDummies[position].fixedChar &&
                      css`
                        transform: rotateY(180deg);
                      `,
                    ["ROTATING_LETTERS", "FILTERING_LETTERS", "DONE"].includes(
                      lifecyclePhase
                    ) &&
                      css`
                        transition-duration: ${LETTER_ROTATION_DURATION}ms;
                        transform: rotateY(
                          ${charsWithDummies[position].term !== winner
                            ? `${[4, 5, 6, 7, 8, 9][
                                Math.floor(Math.random() * 5)
                              ] * 360}deg`
                            : `${[4, 5, 6, 7, 8, 9][
                                Math.floor(Math.random() * 5)
                              ] *
                                360 +
                                180}deg`}
                        );
                      `,
                    ["FILTERING_LETTERS", "DONE"].includes(lifecyclePhase) &&
                      (charsWithDummies[position].term === winner
                        ? css`
                            transition: all ${LETTER_FILTERING_DURATION}ms
                              ease-out;
                            width: calc(1.5 * ${squareSize}px);
                            height: calc(1.5 * ${squareSize}px);
                            font-size: calc(1 * ${squareSize}px);
                          `
                        : css`
                            transition: all ${LETTER_FILTERING_DURATION}ms
                              ease-out;
                            transform: scale(0.5);
                            width: 0;
                            margin: 0;
                            border: 0;
                            padding: 0;
                            opacity: 0;
                            overflow: hidden;
                          `)
                  ]}
                >
                  <span
                    css={[
                      css`
                        z-index: 2;
                        transform: rotateY(0deg);
                      `
                    ]}
                  />
                  <span
                    css={[
                      css`
                        transform: rotateY(180deg);
                        color: black;
                      `,
                      charsWithDummies[position].fixedChar &&
                        css`
                          color: white;
                          background-color: ${charsWithDummies[position]
                            .fixedChar !== " " &&
                            terms[charsWithDummies[position].term!].color};
                        `
                    ]}
                  >
                    {charsWithDummies[position].fixedChar ||
                      charsWithDummies[position].randomChar}
                  </span>
                </li>
              ))}
          </ul>
        );
      }}
    </Rect>
  );
});
