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
                /* height: 95vh; */
                height: 100%;
                max-width: 100%;
              `,
              className
            )}
          >
            <div
              className={css`
                z-index: 500;
              `}
            >
              {children({
                registerTerm,
                pickWinner: () => {
                  setTimeout(
                    () => this.setState({ isResultMode: true }),
                    (COMPUTATION_DURATION + 1.75) * 1000
                  );
                  pickWinner();
                },
                winner,
                terms
              })}
            </div>
            <div
              className={css`
                flex-grow: 1;
                padding: 2vh;
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

                      const squareLength = `${Math.sqrt(
                        (rect.width * rect.height) / numberOfLetters
                      )}px`;

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
                                  font-size: calc(${squareLength} * 0.55);
                                  font-weight: 400;
                                  transition: 0.5s ease-out;
                                  transform-style: preserve-3d;
                                  position: relative;
                                  margin: 0.15rem;
                                  width: calc(${squareLength} - 0.3rem);

                                  height: calc(${squareLength} - 0.3rem);
                                  display: block;
                                  background-color: #f5f5f5;
                                  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.15);
                                  border-radius: 2px;

                                  > span {
                                    display: block;
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 2px;
                                    line-height: 1;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
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
                                    transition: all 1s ease-out;
                                    flex-basis: 0;
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
                                    width: calc(2 * ${squareLength} - 0.3rem);
                                    height: calc(2 * ${squareLength} - 0.3rem);
                                    font-size: calc(2 * ${squareLength} * 0.55);
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
