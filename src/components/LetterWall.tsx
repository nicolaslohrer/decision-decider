import Rect from "@reach/rect";
import WindowSize from "@reach/window-size";
import { css, cx } from "emotion";
import React, { memo, SFC } from "react";
import { CharController, TermDefMap } from "./CharController";

type Props = {
  numberOfLetters: number;
  children: (
    renderProps: {
      registerTerm: (term: string) => void;
      pickWinner: () => void;
      winner?: string;
      terms: TermDefMap;
    }
  ) => JSX.Element;
};

const COMPUTATION_DURATION = "3.75s";

const LetterWall: SFC<Props> = ({ numberOfLetters, children }) => (
  <CharController numberOfLetters={numberOfLetters}>
    {({ registerTerm, chars, terms, pickWinner, winner }) => (
      <WindowSize>
        {(size: any) => (
          <div
            className={css`
              display: flex;
              flex-direction: column;
              height: 100%;
              width: 100%;
              width: ${size.width}px;
              height: ${size.height}px;
            `}
          >
            <div
              className={css`
                z-index: 500;
              `}
            >
              {children({ registerTerm, pickWinner, winner, terms })}
            </div>
            <div
              className={css`
                flex-grow: 1;
                padding: 1rem;
                max-width: 100%;
                display: flex;
                flex-direction: column;
                align-items: stretch;
              `}
            >
              <Rect>
                {({ ref, rect }: any) => (
                  <ul
                    ref={ref}
                    className={css`
                      flex-grow: 1;
                      width: 100%;
                      height: 100%;
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
          </div>
        )}
      </WindowSize>
    )}
  </CharController>
);

export default memo(LetterWall);
