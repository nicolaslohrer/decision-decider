/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Rect from "@reach/rect";
import { Component, memo } from "react";
import {
  CharController,
  CharDefMap,
  getRandomChar,
  TermDefMap
} from "./CharController";

jsx; // FIXME: This is no long-term solution. https://bit.ly/2S4Xj06

type Props = {
  numberOfLetters: number;
  children: (
    renderProps: {
      registerTerm: (term: string) => void;
      pickWinner: () => void;
      terms: TermDefMap;
      mode: Mode;
    }
  ) => JSX.Element;
  className?: string;
};

export type Mode =
  | "COLLECTING_USER_INPUT"
  | "ROTATING_LETTERS"
  | "FILTERING_LETTERS"
  | "DONE";

type State = { mode: Mode };

const animationDurations = {
  letterRotation: 3500,
  letterFiltering: 2000
};

class LetterWall extends Component<Props, State> {
  public state: State = { mode: "COLLECTING_USER_INPUT" };

  public render() {
    const {
      props: { numberOfLetters, children, className },
      state: { mode }
    } = this;

    return (
      <CharController numberOfLetters={numberOfLetters}>
        {({ registerTerm, chars, terms, pickWinner, winner }) => (
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
              const charsWithDummies: CharDefMap = { ...chars };
              for (let i = 0; i < remainder; i++) {
                const position = Math.random() * numberOfLetters;
                charsWithDummies[position] = {
                  position,
                  randomChar: getRandomChar()
                };
              }

              return (
                <div
                  className={className}
                  css={css`
                    display: flex;
                    flex-direction: column;
                  `}
                >
                  <div
                    css={css`
                      margin-bottom: 2vh;
                    `}
                  >
                    {children({
                      registerTerm,
                      pickWinner: () => {
                        setTimeout(() => {
                          pickWinner();
                          this.setState({ mode: "ROTATING_LETTERS" }, () => {
                            setTimeout(
                              () =>
                                this.setState(
                                  { mode: "FILTERING_LETTERS" },
                                  () =>
                                    setTimeout(
                                      () => this.setState({ mode: "DONE" }),
                                      animationDurations.letterFiltering
                                    )
                                ),
                              animationDurations.letterRotation
                            );
                          });
                        });
                      },
                      terms,
                      mode
                    })}
                  </div>
                  <div
                    css={css`
                      flex-grow: 1;
                      display: flex;
                      flex-direction: column;
                      align-items: stretch;
                    `}
                  >
                    <ul
                      ref={ref}
                      css={css`
                        flex-grow: 1;
                        height: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: ${[
                          "FILTERING_LETTERS",
                          "DONE"
                        ].includes(mode)
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
                            // XXX: Fix card animations in Safari on iOS.
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
                              [
                                "ROTATING_LETTERS",
                                "FILTERING_LETTERS",
                                "DONE"
                              ].includes(mode) &&
                                css`
                                  transition-duration: ${animationDurations.letterRotation}ms;
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
                              ["FILTERING_LETTERS", "DONE"].includes(mode) &&
                                (charsWithDummies[position].term === winner
                                  ? css`
                                      transition: all
                                        ${animationDurations.letterFiltering}ms
                                        ease-out;
                                      width: calc(1.5 * ${squareSize}px);
                                      height: calc(1.5 * ${squareSize}px);
                                      font-size: calc(1 * ${squareSize}px);
                                    `
                                  : css`
                                      transition: all
                                        ${animationDurations.letterFiltering}ms
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
                            {/* XXX: Fill up last row. */}
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
                                    background-color: ${charsWithDummies[
                                      position
                                    ].fixedChar !== " " &&
                                      terms[charsWithDummies[position].term!]
                                        .color};
                                  `
                              ]}
                            >
                              {charsWithDummies[position].fixedChar ||
                                charsWithDummies[position].randomChar}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              );
            }}
          </Rect>
        )}
      </CharController>
    );
  }
}

export default memo(LetterWall);
