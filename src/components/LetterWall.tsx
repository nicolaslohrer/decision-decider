import Rect from '@reach/rect';
import WindowSize from '@reach/window-size';
import { css, cx } from 'emotion';
import React, { SFC } from 'react';
import { CharController } from './CharController';

type Props = {
  numberOfLetters: number;
  children: (
    renderProps: { registerTerms: (terms: string[]) => void }
  ) => JSX.Element;
};

export const LetterWall: SFC<Props> = ({ numberOfLetters, children }) => (
  <CharController numberOfLetters={numberOfLetters}>
    {({ registerTerms, charDefs }) => (
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

                    return Object.keys(charDefs)
                      .sort()
                      .map(position => {
                        return (
                          <li
                            key={charDefs[position].position}
                            className={cx(
                              css`
                                text-align: center;
                                text-transform: uppercase;
                                color: ${charDefs[position].fixedChar
                                  ? 'red'
                                  : 'black'};
                                font-size: calc(${squareLength} * 0.75);

                                transition: 0.6s;
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
                                }
                              `,
                              charDefs[position].fixedChar &&
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
                              {charDefs[position].randomChar}
                            </span>
                            <span
                              className={css`
                                transform: rotateY(180deg);
                                background-color: red;
                                color: white;
                              `}
                            >
                              {charDefs[position].fixedChar}
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
