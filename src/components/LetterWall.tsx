import Rect from "@reach/rect";
import WindowSize from "@reach/window-size";
import { css, cx } from "emotion";
import React, { memo, SFC } from "react";
import { CharController } from "./CharController";

type Props = {
  numberOfLetters: number;
  children: (
    renderProps: {
      registerTerms: (terms: string[]) => void;
      pickWinner: () => void;
      winner?: string;
    }
  ) => JSX.Element;
};

const LetterWall: SFC<Props> = ({ numberOfLetters, children }) => (
  <CharController numberOfLetters={numberOfLetters}>
    {({ registerTerms, chars, terms, pickWinner, winner }) => (
      <>
        <div
          className={css`
            z-index: 500;
          `}
        >
          {children({ registerTerms, pickWinner, winner })}
        </div>
        <WindowSize>
          {(size: any) => (
            <div
              className={css`
                position: absolute;
                left: 0;
                top: 0;
                padding: 1rem;
                width: ${size.width}px;
                max-width: 100%;
                height: ${size.height}px;
              `}
            >
              <Rect>
                {({ ref, rect }: any) => (
                  <ul
                    ref={ref}
                    className={css`
                      width: 100%;
                      height: 100%;
                      /* XXX: Get rid of vertical scrollbar. */
                      display: flex;
                      flex-wrap: wrap;
                      list-style-type: none;
                      margin: 0;
                      padding: 0;

                      perspective: 1000px;
                    `}
                  >
                    {(() => {
                      if (!rect) {
                        return null;
                      }

                      const squareLength = `${Math.sqrt(
                        (rect.width * rect.height) / numberOfLetters
                      )}px`;

                      return Object.keys(chars)
                        .sort()
                        .map(position => {
                          return (
                            <li
                              key={chars[position].position}
                              className={cx(
                                css`
                                  text-align: center;
                                  text-transform: uppercase;
                                  font-size: calc(${squareLength} * 0.75);
                                  transition: 0.5s ease-out;
                                  transform-style: preserve-3d;
                                  position: relative;

                                  &,
                                  > span {
                                    width: ${squareLength};
                                    line-height: ${squareLength};
                                  }

                                  > span {
                                    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
                                    backface-visibility: hidden;
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    border-radius: 4px;
                                  }
                                `,
                                chars[position].fixedChar &&
                                  css`
                                    transform: rotateY(180deg);
                                  `,
                                winner &&
                                  chars[position].term !== winner &&
                                  css`
                                    transform: rotateY(
                                      ${chars[position].fixedChar
                                        ? "0deg"
                                        : "180deg"}
                                    );
                                  `
                              )}
                            >
                              {/* XXX: Fill up last row. */}
                              <span
                                className={css`
                                  z-index: 2;
                                  transform: rotateY(0deg);
                                `}
                              >
                                {winner &&
                                chars[position].term !== winner &&
                                chars[position].fixedChar
                                  ? ""
                                  : chars[position].randomChar}
                              </span>
                              <span
                                className={cx(
                                  css`
                                    transform: rotateY(180deg);
                                    color: white;
                                  `,
                                  chars[position].fixedChar &&
                                    css`
                                      background-color: ${terms[
                                        chars[position].term!
                                      ].color};
                                    `
                                )}
                              >
                                {chars[position].fixedChar}
                              </span>
                            </li>
                          );
                        });
                    })()}
                  </ul>
                )}
              </Rect>
            </div>
          )}
        </WindowSize>
      </>
    )}
  </CharController>
);

export default memo(LetterWall);
