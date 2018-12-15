import { produce } from "immer";
import { PureComponent } from "react";
import { COLORS } from "../utils/Colors";
import { ErrorCode } from "../utils/ErrorCodes";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type CharDef = {
  position: number;
  randomChar: string;
  fixedChar?: string;
  term?: string;
};
export type CharDefMap = { [position: string]: CharDef };
type TermDef = { term: string; color: string };

export type TermDefMap = { [term: string]: TermDef };

type Props = {
  numberOfLetters: number;
  children: (
    renderProps: {
      registerTerm: (term: string) => void;
      chars: CharDefMap;
      terms: TermDefMap;
      pickWinner: () => void;
      winner?: string;
    }
  ) => JSX.Element;
};
type State = { charDefs: CharDefMap; terms: TermDefMap; winner?: string };

export const getRandomChar = () =>
  CHARS.charAt(Math.floor(Math.random() * CHARS.length));

export class CharController extends PureComponent<Props, State> {
  public state: State = {
    charDefs: Array(...Array(this.props.numberOfLetters)).reduce<CharDefMap>(
      (charDefs, _x, i) => ({
        ...charDefs,
        [i]: {
          position: i,
          randomChar: getRandomChar()
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

  private registerTerm = (term: string) => {
    this.setState(
      produce<State>(draft => {
        try {
          let availableCharDefs: CharDefMap = {
            ...this.getAvailableCharDefs(this.state.charDefs)
          };

          if (
            term &&
            !Object.keys(draft.terms).some(
              termId => draft.terms[termId].term === term
            )
          ) {
            const trimmedTerm = term.trim();
            const termChars: string[] = trimmedTerm.split("");

            const newCharPositions: number[] = [];

            if (termChars.length > Object.keys(availableCharDefs).length) {
              throw ErrorCode.CHAR_LIMIT_EXCEEDED;
            }

            while (newCharPositions.length < termChars.length) {
              const randomCharPosition = Number(
                Object.keys(availableCharDefs)[
                  Math.floor(
                    Math.random() * Object.keys(availableCharDefs).length
                  )
                ]
              );

              if (randomCharPosition in availableCharDefs) {
                delete availableCharDefs[randomCharPosition];
                newCharPositions.push(randomCharPosition);
              }
            }

            newCharPositions.sort((a, b) => a - b);

            newCharPositions.forEach((position, i) => {
              draft.charDefs[position].fixedChar = termChars[i];
              draft.charDefs[position].term = term;
            });

            draft.terms[term] = { term, color: this.getUnusedColor() };
          }
        } catch (e) {
          switch (e) {
            case ErrorCode.CHAR_LIMIT_EXCEEDED:
              alert(
                "Sorry, I'm out of letters. No one can possibly handle that many decisions."
              );
              break;

            case ErrorCode.TERM_LIMIT_EXCEEDED:
              alert(
                "Sorry, I'm out of colors. No one can possibly handle that many decisions."
              );
              // XXX: Produces an error.
              break;

            default:
              throw e;
          }
        }
      })
    );
  };

  private pickWinner = () => {
    const { terms, winner } = this.state;

    if (!Object.keys(terms).length || winner) {
      return;
    }

    this.setState(
      produce<State>(draft => {
        draft.winner =
          terms[
            Object.keys(terms)[
              Math.floor(Math.random() * Object.keys(terms).length)
            ]
          ].term;
      })
    );
  };

  public render(): JSX.Element | null {
    return this.props.children({
      registerTerm: this.registerTerm,
      chars: this.state.charDefs,
      terms: this.state.terms,
      pickWinner: this.pickWinner,
      winner: this.state.winner
    });
  }
}
