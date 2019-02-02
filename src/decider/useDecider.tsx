/** @jsx jsx */ jsx;
import { jsx } from "@emotion/core";
import { produce } from "immer";
import { useState } from "react";
import {
  COLORS,
  ErrorCode,
  FORM_FADE_OUT_DURATION,
  LETTER_FILTERING_DURATION,
  LETTER_ROTATION_DURATION
} from "../settings";
import { getRandomChar } from "../utils/randomChar";

export type LifecyclePhase =
  | "COLLECTING_USER_INPUT"
  | "HIDING_ENTRY_FORM"
  | "ROTATING_LETTERS"
  | "FILTERING_LETTERS"
  | "DONE";

type Char = {
  position: number;
  randomChar: string;
  fixedChar?: string;
  term?: string;
};
export type Chars = { [position: string]: Char };

type Term = { term: string; color: string };
export type Terms = { [term: string]: Term };

export const useDecider = (numberOfLetters: number) => {
  const [chars, setChars] = useState<Chars>(
    Array(...Array(numberOfLetters)).reduce<Chars>(
      (chars, _x, i) => ({
        ...chars,
        [i]: {
          position: i,
          randomChar: getRandomChar()
        }
      }),
      {}
    )
  );
  const [terms, setTerms] = useState<Terms>({});
  const [winner, setWinner] = useState<string | undefined>(undefined);

  const getAvailableChars = (): Chars =>
    Object.keys(chars).reduce(
      (availableChars, position) =>
        chars[position].fixedChar
          ? availableChars
          : {
              ...availableChars,
              [position]: chars[position]
            },

      {}
    );

  const getUnusedColor = () => {
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
      let availableChars: Chars = {
        ...getAvailableChars()
      };

      if (
        term &&
        !Object.keys(terms).some(termId => terms[termId].term === term)
      ) {
        const trimmedTerm = term.trim();
        const termChars: string[] = trimmedTerm.split("");

        const newCharPositions: number[] = [];

        if (termChars.length > Object.keys(availableChars).length) {
          throw ErrorCode.CHAR_LIMIT_EXCEEDED;
        }
        if (Object.keys(terms).length >= COLORS.length) {
          throw ErrorCode.TERM_LIMIT_EXCEEDED;
        }

        while (newCharPositions.length < termChars.length) {
          const randomCharPosition = Number(
            Object.keys(availableChars)[
              Math.floor(Math.random() * Object.keys(availableChars).length)
            ]
          );

          if (randomCharPosition in availableChars) {
            delete availableChars[randomCharPosition];
            newCharPositions.push(randomCharPosition);
          }
        }

        newCharPositions.sort((a, b) => a - b);

        newCharPositions.forEach((position, i) => {
          setChars(
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
          break;

        default:
          throw e;
      }
    }
  };

  const pickWinner = () => {
    setWinner(
      terms[
        Object.keys(terms)[
          Math.floor(Math.random() * Object.keys(terms).length)
        ]
      ].term
    );
  };

  const [lifecyclePhase, setLifecyclePhase] = useState<LifecyclePhase>(
    "COLLECTING_USER_INPUT"
  );

  // XXX: Can I make this nested mess easier to read with a utility function that takes a map of functions keyed by ms?
  const submit = () => {
    if (Object.keys(terms).length && !winner) {
      setLifecyclePhase("HIDING_ENTRY_FORM");
      setTimeout(
        () =>
          setTimeout(() => {
            setLifecyclePhase("ROTATING_LETTERS");
            pickWinner();
            setTimeout(() => {
              setLifecyclePhase("FILTERING_LETTERS");
              setTimeout(
                () => setLifecyclePhase("DONE"),
                LETTER_FILTERING_DURATION
              );
            }, LETTER_ROTATION_DURATION);
          }),
        FORM_FADE_OUT_DURATION + 450
      );
    }
  };

  return {
    lifecyclePhase,
    registerTerm,
    chars,
    terms,
    submit,
    winner
  };
};
