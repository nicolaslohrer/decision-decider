/** @jsxImportSource @emotion/react */
import { produce } from "immer";
import { useCallback, useState } from "react";
import {
  COLORS,
  ErrorCode,
  FORM_FADE_OUT_DURATION,
  LETTER_FILTERING_DURATION,
  LETTER_ROTATION_DURATION,
} from "../settings";
import { getRandomChar } from "../utils/randomChar";
import { sleep } from "../utils/sleep";

export type LifecyclePhase =
  | "COLLECTING_USER_INPUT"
  | "HIDING_ENTRY_FORM"
  | "SPINNING_CHARS"
  | "FILTERING_CHARS"
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
  const [chars, setChars] = useState<Chars>(() =>
    Array(...Array(numberOfLetters)).reduce<Chars>(
      (chars, _x, i) => ({
        ...chars,
        [i]: {
          position: i,
          randomChar: getRandomChar(),
        },
      }),
      {}
    )
  );
  const [terms, setTerms] = useState<Terms>({});
  const [winner, setWinner] = useState<string | undefined>(undefined);

  const getAvailableChars = useCallback(
    (): Chars =>
      Object.keys(chars).reduce(
        (availableChars, position) =>
          chars[position].fixedChar
            ? availableChars
            : {
                ...availableChars,
                [position]: chars[position],
              },

        {}
      ),
    [chars]
  );

  const getUnusedColor = useCallback(() => {
    while (true) {
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      if (
        !Object.keys(terms).some(
          (termId) => terms[termId].color === randomColor
        )
      ) {
        return randomColor;
      }
    }
  }, [terms]);

  const registerTerm = useCallback(
    (rawTerm: string) => {
      try {
        let availableChars: Chars = { ...getAvailableChars() };

        const term = rawTerm.trim();

        const isDuplicate = Object.keys(terms).some(
          (termId) => terms[termId].term === term
        );

        if (term && !isDuplicate) {
          const termChars: string[] = term.split("");

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

          setChars(
            produce((draft) => {
              newCharPositions.forEach((position, i) => {
                draft[position].fixedChar = termChars[i];
                draft[position].term = term;
              });
            })
          );

          setTerms(
            produce((draft) => {
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
    },
    [getAvailableChars, terms, getUnusedColor]
  );

  const pickWinner = useCallback(() => {
    setWinner(
      terms[
        Object.keys(terms)[
          Math.floor(Math.random() * Object.keys(terms).length)
        ]
      ].term
    );
  }, [terms]);

  const [lifecyclePhase, setLifecyclePhase] = useState<LifecyclePhase>(
    "COLLECTING_USER_INPUT"
  );

  const submit = useCallback(async () => {
    if (Object.keys(terms).length && !winner) {
      pickWinner();
      setLifecyclePhase("HIDING_ENTRY_FORM");
      await sleep(FORM_FADE_OUT_DURATION + 450);
      setLifecyclePhase("SPINNING_CHARS");
      await sleep(LETTER_ROTATION_DURATION);
      setLifecyclePhase("FILTERING_CHARS");
      await sleep(LETTER_FILTERING_DURATION);
      setLifecyclePhase("DONE");
    }
  }, [terms, winner, pickWinner]);

  return {
    lifecyclePhase,
    registerTerm,
    chars,
    terms,
    submit,
    winner,
  };
};
