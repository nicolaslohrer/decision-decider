import Rect from '@reach/rect';
import WindowSize from '@reach/window-size';
import { css } from 'emotion';
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
                    height: ${size.height}px;
                    display: flex;
                    flex-wrap: wrap;
                    list-style-type: none;
                    margin: 0;
                    padding: 0;
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
                            className={css`
                              width: ${squareLength};
                              line-height: ${squareLength};
                              text-align: center;
                              text-transform: uppercase;
                              color: ${charDefs[position].locked
                                ? 'red'
                                : 'black'};
                              font-size: calc(${squareLength} * 0.75);
                            `}
                          >
                            {charDefs[position].char}
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
