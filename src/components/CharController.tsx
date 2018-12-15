/** @jsx jsx */
import { jsx } from "@emotion/core";
import { produce } from "immer";
import { useState } from "react";
import { COLORS } from "../utils/Colors";
import { ErrorCode } from "../utils/ErrorCodes";

jsx;

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

type Return = {
  registerTerm: (term: string) => void;
  chars: CharDefMap;
  terms: TermDefMap;
  pickWinner: () => void;
  winner?: string;
};

export const getRandomChar = () =>
  CHARS.charAt(Math.floor(Math.random() * CHARS.length));

export const useCharController = (numberOfLetters: number): Return => {
  const [charDefs, setCharDefs] = useState<CharDefMap>(
    Array(...Array(numberOfLetters)).reduce<CharDefMap>(
      (charDefs, _x, i) => ({
        ...charDefs,
        [i]: {
          position: i,
          randomChar: getRandomChar()
        }
      }),
      {} as CharDefMap
    )
  );
  const [terms, setTerms] = useState<TermDefMap>({});
  const [winner, setWinner] = useState<string | undefined>(undefined);

  const getAvailableCharDefs = (charDefs: CharDefMap): CharDefMap =>
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

  const getUnusedColor = () => {
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

  const registerTerm = (term: string) => {
    try {
      let availableCharDefs: CharDefMap = {
        ...getAvailableCharDefs(charDefs)
      };

      if (
        term &&
        !Object.keys(terms).some(termId => terms[termId].term === term)
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
              Math.floor(Math.random() * Object.keys(availableCharDefs).length)
            ]
          );

          if (randomCharPosition in availableCharDefs) {
            delete availableCharDefs[randomCharPosition];
            newCharPositions.push(randomCharPosition);
          }
        }

        newCharPositions.sort((a, b) => a - b);

        newCharPositions.forEach((position, i) => {
          setCharDefs(
            produce(draft => {
              draft[position].fixedChar = termChars[i];
              draft[position].term = term;
            })
          );
        });

        setTerms(
          produce(draft => {
            draft[term] = { term, color: getUnusedColor() };
          })
        );
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
          // TODO: Produces an error.
          break;

        default:
          throw e;
      }
    }
  };

  const pickWinner = () => {
    if (!Object.keys(terms).length || winner) {
      return;
    }

    setWinner(
      terms[
        Object.keys(terms)[
          Math.floor(Math.random() * Object.keys(terms).length)
        ]
      ].term
    );
  };

  return {
    registerTerm,
    chars: charDefs,
    terms,
    pickWinner,
    winner
  };
};
