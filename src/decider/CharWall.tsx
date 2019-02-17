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

  return (
    <Rect>
      {({ ref, rect }: any) => {
        let remainder = 0;
        let charWidth = 0;
        let charHeight = 0;

        // Fit squares into rect. https://stackoverflow.com/a/38567903/7480786
        if (rect && rect.height) {
          const rectRatio = rect.width / rect.height;
          let columns = Math.sqrt(numberOfLetters * rectRatio);
          let rows = columns / rectRatio;
          columns = Math.ceil(columns);
          rows = Math.ceil(rows);
          charWidth = rect.width / columns;
          charHeight = rect.height / rows;

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
              grid-row-start: charwall;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-items: center;
              align-content: center;
              list-style-type: none;
              margin: 0;
              padding: 0;
              perspective: 1000px;
              overflow: hidden;
            `}
          >
            {Object.keys(charsWithDummies)
              .map(k => Number(k))
              .sort((a, b) => a - b)
              .map(position => (
                <li
                  // XXX: Fix card animations in Safari on iOS.
                  key={charsWithDummies[position].position}
                  // For flip animation, see https://davidwalsh.name/css-flip.
                  css={[
                    css`
                      text-align: center;
                      text-transform: uppercase;
                      font-size: ${0.55 * charWidth}px;
                      font-weight: 400;
                      transition: 0.5s ease-out;
                      transform-style: preserve-3d;
                      position: relative;
                      width: ${charWidth}px;
                      height: ${charHeight}px;
                      display: block;
                      border-radius: 2px;
                      border: ${charWidth * 0.03}px solid white;

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
                            /* XXX: These three properties below cause the letters to disappear on iOS. Find a workaround.*/
                            width: ${1.5 * charWidth}px;
                            height: ${1.5 * charHeight}px;
                            font-size: ${charWidth}px;
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
                        background-color: #f5f5f5;
                      `
                    ]}
                  />
                  <span
                    css={[
                      css`
                        transform: rotateY(180deg);
                        color: black;
                        background-color: #f5f5f5;
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
