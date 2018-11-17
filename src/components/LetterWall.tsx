import { css } from 'emotion';
import { produce } from 'immer';
import React, { Component } from 'react';

// XXX: Consider allowing more special characters (e.g. ÄÖÜß).
const ALLOWED_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const NUM_LETTERS = 100;

type CharDef = { position: number; char: string; locked: boolean };
type CharDefMap = { [position: string]: CharDef };

type Props = { terms: string[] };
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

  public componentDidMount() {
    this.registerTerms(this.props.terms);
  }

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

  private registerTerms = (terms: string[]): void => {
    this.setState(
      produce<State>(draft => {
        let availableCharDefs: CharDefMap = {
          ...this.getAvailableCharDefs(this.state.charDefs)
        };

        terms.forEach(term => {
          const trimmedTerm = term.replace(/\s/g, '');
          const termChars: string[] = trimmedTerm.split('');

          const newTermCharPositions: number[] = [];

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
      <ul
        className={css`
          text-transform: uppercase;
        `}
      >
        {Object.keys(this.state.charDefs)
          .sort()
          .map(position => (
            <li
              className={css`
                color: ${this.state.charDefs[position].locked
                  ? 'red'
                  : 'black'};
              `}
            >
              {this.state.charDefs[position].char}
            </li>
          ))}
      </ul>
    );
  }
}
