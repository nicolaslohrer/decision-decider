import { produce } from 'immer';
import { Component } from 'react';
import { ErrorCode } from '../utils/ErrorCodes';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

type CharDef = { position: number; randomChar: string; fixedChar: string };
type CharDefMap = { [position: string]: CharDef };

type Props = {
  numberOfLetters: number;
  children: (
    renderProps: {
      registerTerms: (terms: string[]) => void;
      charDefs: CharDefMap;
    }
  ) => JSX.Element;
};
type State = { charDefs: CharDefMap };

export class CharController extends Component<Props, State> {
  private getRandomChar = () =>
    CHARS.charAt(Math.floor(Math.random() * CHARS.length));

  public state: State = {
    charDefs: Array(...Array(this.props.numberOfLetters)).reduce<CharDefMap>(
      (charDefs, _x, i) => ({
        ...charDefs,
        [i]: {
          position: i,
          randomChar: this.getRandomChar(),
          fixedChar: false
        }
      }),
      {} as CharDefMap
    )
  };

  private getAvailableCharDefs = (charDefs: CharDefMap): CharDefMap =>
    Object.keys(charDefs).reduce(
      (availableCharDefs, position) =>
        charDefs[position].fixedChar
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
            throw ErrorCode.CHAR_LIMIT_EXCEEDED;
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
            draft.charDefs[position].fixedChar = termChars[i];
          });
        });
      })
    );
  };

  public render(): JSX.Element | null {
    return this.props.children({
      registerTerms: this.registerTerms,
      charDefs: this.state.charDefs
    });
  }
}
