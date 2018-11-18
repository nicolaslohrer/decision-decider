import Rect from "@reach/rect";
import { css, cx } from "emotion";
import React, { Component, memo } from "react";
import { CharController, TermDefMap } from "./CharController";

type Props = {
  numberOfLetters: number;
  children: (
    renderProps: {
      registerTerm: (term: string) => void;
      pickWinner: () => void;
      winner?: string;
      terms: TermDefMap;
      isResultMode: boolean;
    }
  ) => JSX.Element;
  className?: string;
};

type State = { isResultMode: boolean };

const COMPUTATION_DURATION = 3.75;

class LetterWall extends Component<Props> {
  public state: State = { isResultMode: false };

  public render() {
    const {
      props: { numberOfLetters, children, className },
      state: { isResultMode }
    } = this;

    return (
      <CharController numberOfLetters={numberOfLetters}>
        {({ registerTerm, chars, terms, pickWinner, winner }) => (
          <div
            className={cx(
              css`
                display: flex;
                flex-direction: column;
              `,
              className
            )}
          >
            <div
              className={css`
                z-index: 500;
                margin-bottom: 2vh;
              `}
            >
              {children({
                registerTerm,
                pickWinner: () => {
                  setTimeout(
                    () => this.setState({ isResultMode: true }),
                    (COMPUTATION_DURATION + 1.25) * 1000
                  );
                  pickWinner();
                },
                winner,
                terms,
                isResultMode
              })}
            </div>
            <div
              className={css`
                flex-grow: 1;
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
                      height: 100%;
                      display: flex;
                      flex-wrap: wrap;
                      justify-content: ${isResultMode
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
                    {(() => {
                      if (!rect) {
                        return null;
                      }

                      let squareSize: number = 0;

                      // Fit squares into rect. https://stackoverflow.com/a/38567903/7480786
                      if (rect.height) {
                        const rectRatio = rect.width / rect.height;
                        let columns = Math.sqrt(numberOfLetters * rectRatio);
                        let rows = columns / rectRatio;
                        columns = Math.ceil(columns);
                        rows = Math.ceil(rows);
                        squareSize = rect.width / columns;
                      }

                      return Object.keys(chars)
                        .sort()
                        .map(position => {
                          return (
                            <li
                              key={chars[position].position}
                              // For flip animation, see https://davidwalsh.name/css-flip.
                              className={cx(
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
                                chars[position].fixedChar &&
                                  css`
                                    transform: rotateY(180deg);
                                  `,
                                winner &&
                                  !isResultMode &&
                                  css`
                                    transition-duration: ${COMPUTATION_DURATION}s;
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
                                  `,
                                isResultMode &&
                                  chars[position].term !== winner &&
                                  css`
                                    transition: all 3s ease-out;
                                    width: 0;
                                    margin: 0;
                                    border: 0;
                                    padding: 0;
                                    opacity: 0;
                                    overflow: hidden;
                                  `,

                                isResultMode &&
                                  chars[position].term === winner &&
                                  css`
                                    transition: all 1s ease-out;
                                    width: calc(2 * ${squareSize}px - 0.3rem);
                                    height: calc(2 * ${squareSize}px - 0.3rem);
                                    font-size: calc(2 * ${squareSize}px * 0.55);
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
                                      background-color: ${chars[position]
                                        .fixedChar !== " " &&
                                        terms[chars[position].term!].color};
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
      </CharController>
    );
  }
}

export default memo(LetterWall);
