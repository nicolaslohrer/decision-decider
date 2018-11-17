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

const COMPUTATION_DURATION = "3.75s";

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
                                  font-size: calc(${squareLength} * 0.55);
                                  font-family: "Ubuntu Mono", monospace;
                                  font-weight: 400;
                                  transition: 0.5s ease-out;
                                  transform-style: preserve-3d;
                                  position: relative;
                                  margin: 0.15rem;
                                  width: calc(${squareLength} - 0.3rem);
                                  line-height: calc(${squareLength} - 0.3rem);
                                  background-color: #f5f5f5;
                                  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.15);
                                  border-radius: 2px;

                                  > span {
                                    display: block;
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 2px;
                                  }

                                  > span {
                                    backface-visibility: hidden;
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                  }
                                `,
                                chars[position].fixedChar &&
                                  css`
                                    transform: rotateY(180deg);
                                  `,
                                winner &&
                                  css`
                                    transition-duration: ${COMPUTATION_DURATION};
                                    transform: rotateY(
                                      ${chars[position].fixedChar &&
                                      chars[position].term !== winner
                                        ? `${[4, 5, 6, 7, 8, 9][
                                            Math.floor(Math.random() * 5)
                                          ] * 360}deg`
                                        : `${[4, 5, 6, 7, 8, 9][
                                            Math.floor(Math.random() * 5)
                                          ] *
                                            360 +
                                            180}deg`}
                                    );
                                  `
                              )}
                            >
                              {/* XXX: Fill up last row. */}
                              <span
                                className={cx(
                                  css`
                                    z-index: 2;
                                    transform: rotateY(0deg);
                                  `
                                )}
                              >
                                {chars[position].fixedChar ||
                                  chars[position].randomChar}
                              </span>
                              <span
                                className={cx(
                                  css`
                                    transform: rotateY(180deg);
                                    color: black;
                                  `,
                                  chars[position].fixedChar &&
                                    css`
                                      color: white;
                                      background-color: ${terms[
                                        chars[position].term!
                                      ].color};
                                    `
                                )}
                              >
                                {chars[position].fixedChar ||
                                  chars[position].randomChar}
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
