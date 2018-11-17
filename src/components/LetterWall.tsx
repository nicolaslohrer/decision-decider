import { css } from 'emotion';
import { produce } from 'immer';
import React, { Component } from 'react';
import { RuntimeError } from './ErrorBoundary';

// XXX: Consider allowing more special characters (e.g. ÄÖÜß).
const ALLOWED_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const NUM_LETTERS = 500;

type CharDef = { position: number; char: string; locked: boolean };
type CharDefMap = { [position: string]: CharDef };

type Props = {
  children: (
    renderProps: { registerTerms: (terms: string[]) => void }
  ) => JSX.Element;
};
type State = { charDefs: CharDefMap };

export class LetterWall extends Component<Props, State> {
  public state: State = {
    charDefs: Array(...Array(NUM_LETTERS)).reduce<CharDefMap>(
      (charDefs, _x, i) => ({
        ...charDefs,
        [i]: {
          position: i,
          char: ALLOWED_CHARS.charAt(
            Math.floor(Math.random() * ALLOWED_CHARS.length)
          ),
          locked: false
        }
      }),
      {} as CharDefMap
    )
  };

  private getAvailableCharDefs = (charDefs: CharDefMap): CharDefMap =>
    Object.keys(charDefs).reduce(
      (availableCharDefs, position) =>
        charDefs[position].locked
          ? availableCharDefs
          : {
              ...availableCharDefs,
              [position]: charDefs[position]
            },

      {}
    );

  private registerTerms = (terms: string[]) => {
    this.setState(
      produce<State>(draft => {
        let availableCharDefs: CharDefMap = {
          ...this.getAvailableCharDefs(this.state.charDefs)
        };

        terms.forEach(term => {
          const trimmedTerm = term.replace(/\s/g, '');
          const termChars: string[] = trimmedTerm.split('');

          const newTermCharPositions: number[] = [];

          if (termChars.length > Object.keys(availableCharDefs).length) {
            throw RuntimeError.NOT_ENOUGH_CHARS_LEFT;
          }

          while (newTermCharPositions.length < termChars.length) {
            const randomCharPosition = Number(
              Object.keys(availableCharDefs)[
                Math.floor(
                  Math.random() * Object.keys(availableCharDefs).length
                )
              ]
            );

            if (randomCharPosition in availableCharDefs) {
              delete availableCharDefs[randomCharPosition];
              newTermCharPositions.push(randomCharPosition);
            }
          }

          newTermCharPositions.sort();

          newTermCharPositions.forEach((position, i) => {
            draft.charDefs[position] = {
              char: termChars[i],
              locked: true,
              position
            };
          });
        });
      })
    );
  };

  public render(): JSX.Element {
    return (
      <>
        <div
          className={css`
            z-index: 500;
          `}
        >
          {this.props.children({ registerTerms: this.registerTerms })}
        </div>
        <ul
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-wrap: wrap;
            list-style-type: none;
            margin: 0;
            padding: 0;
          `}
        >
          {Object.keys(this.state.charDefs)
            .sort()
            .map(position => (
              <li
                className={css`
                  text-transform: uppercase;
                  color: ${this.state.charDefs[position].locked
                    ? 'red'
                    : 'black'};
                  font-size: 50px;
                `}
              >
                {this.state.charDefs[position].char}
              </li>
            ))}
        </ul>
      </>
    );
  }
}
