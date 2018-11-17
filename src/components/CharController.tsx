import { produce } from 'immer';
import { Component } from 'react';
import { ErrorCode } from '../utils/ErrorCodes';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// XXX: Store colors in theme.
const COLORS = [
  '#00a0d7',
  '#8c6ca7',
  '#dc504a',
  '#e58338',
  '#00adb0',
  '#ecb03d',
  '#db4b88',
  '#7cb741',
  // XXX: Get rid of grey?
  '#868789'
];

type CharDef = {
  position: number;
  randomChar: string;
  fixedChar?: string;
  term?: string;
};
type CharDefMap = { [position: string]: CharDef };
type TermDef = { term: string; color: string };
type TermDefMap = { [term: string]: TermDef };

type Props = {
  numberOfLetters: number;
  children: (
    renderProps: {
      registerTerms: (terms: string[]) => void;
      chars: CharDefMap;
      terms: TermDefMap;
    }
  ) => JSX.Element;
};
type State = { charDefs: CharDefMap; terms: TermDefMap };

export class CharController extends Component<Props, State> {
  private getRandomChar = () =>
    CHARS.charAt(Math.floor(Math.random() * CHARS.length));

  public state: State = {
    charDefs: Array(...Array(this.props.numberOfLetters)).reduce<CharDefMap>(
      (charDefs, _x, i) => ({
        ...charDefs,
        [i]: {
          position: i,
          randomChar: this.getRandomChar()
        }
      }),
      {} as CharDefMap
    ),
    terms: {}
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

  private getUnusedColor = () => {
    const { terms } = this.state;
    if (Object.keys(terms).length >= COLORS.length) {
      // XXX: Throwing currently results in a total reset. Not so nice. Instead, forbid to enter more terms than there are colors available.
      throw ErrorCode.TERM_LIMIT_EXCEEDED;
    }

    while (true) {
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      if (
        !Object.keys(terms).some(termId => terms[termId].color === randomColor)
      ) {
        return randomColor;
      }
    }
  };

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
            draft.charDefs[position].term = term;
          });

          draft.terms[term] = { term, color: this.getUnusedColor() };
        });
      })
    );
  };

  public render(): JSX.Element | null {
    return this.props.children({
      registerTerms: this.registerTerms,
      chars: this.state.charDefs,
      terms: this.state.terms
    });
  }
}
