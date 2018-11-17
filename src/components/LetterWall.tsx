import Rect from "@reach/rect";
import WindowSize from "@reach/window-size";
import { css, cx } from "emotion";
import React, { SFC } from "react";
import { CharController } from "./CharController";

type Props = {
  numberOfLetters: number;
  children: (
    renderProps: { registerTerms: (terms: string[]) => void }
  ) => JSX.Element;
};

export const LetterWall: SFC<Props> = ({ numberOfLetters, children }) => (
  <CharController numberOfLetters={numberOfLetters}>
    {({ registerTerms, chars, terms }) => (
      <>
        <div
          className={css`
            z-index: 500;
          `}
        >
          {children({ registerTerms })}
        </div>
        <WindowSize>
          {(size: any) => (
            <Rect>
              {({ ref, rect }: any) => (
                <ul
                  ref={ref}
                  className={css`
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: ${size.width}px;
                    max-width: 100%;
                    /* XXX: Get rid of vertical scrollbar. */
                    height: ${size.height}px;
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
                                `
                            )}
                          >
                            <span
                              className={css`
                                z-index: 2;
                                transform: rotateY(0deg);
                              `}
                            >
                              {chars[position].randomChar}
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
          )}
        </WindowSize>
      </>
    )}
  </CharController>
);
