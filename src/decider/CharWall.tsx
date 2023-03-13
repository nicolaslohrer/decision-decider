/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRect } from "@reach/rect";
import { FC, memo, useContext, useMemo, useRef } from "react";
import {
  LETTER_FILTERING_DURATION,
  LETTER_ROTATION_DURATION,
} from "../settings";
import { getRandomChar } from "../utils/randomChar";
import { CharCard, CharCardBack, CharCardFront } from "./CharCard";
import { DeciderContext } from "./Decider";
import { Chars } from "./useDecider";

export const CharWall: FC = memo(() => {
  const { chars, terms, winner, lifecyclePhase } = useContext(DeciderContext);
  const numberOfLetters = Object.keys(chars).length;

  // Fit squares into rectangle. https://stackoverflow.com/a/38567903/7480786
  const ref = useRef(null);
  const rect = useRect(ref);
  const { charWidth, charHeight, remainder } = useMemo(() => {
    let remainder = 0;
    let charWidth = 0;
    let charHeight = 0;

    if (rect?.height) {
      const rectRatio = rect.width / rect.height;
      let columns = Math.sqrt(numberOfLetters * rectRatio);
      let rows = columns / rectRatio;
      columns = Math.ceil(columns);
      rows = Math.ceil(rows);
      charWidth = rect.width / columns;
      charHeight = rect.height / rows;

      remainder = rows * columns - numberOfLetters;
    }
    return { charWidth, charHeight, remainder };
  }, [rect, numberOfLetters]);

  // If necessary, add dummy chars to fill last row.
  const charsWithDummies = useMemo(() => {
    const charsWithDummies: Chars = { ...chars };
    for (let i = numberOfLetters; i < numberOfLetters + remainder; i++) {
      charsWithDummies[i] = {
        position: i,
        randomChar: getRandomChar(),
      };
    }
    return charsWithDummies;
  }, [chars, numberOfLetters, remainder]);

  // Convert char collection to an array that we can easily iterate over.
  const charList = useMemo(
    () =>
      Object.keys(charsWithDummies)
        .map((k) => Number(k))
        .sort((a, b) => a - b)
        .map((position) => charsWithDummies[position]),
    [charsWithDummies]
  );

  return (
    <ul
      ref={ref}
      css={css`
        grid-row-start: charwall;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: center;
        list-style-type: none;
        margin: 0;
        padding: 0;
        perspective: 1000px;
        overflow: hidden;
      `}
    >
      {charList.map(({ term, position, fixedChar, randomChar }) => (
        <CharCard
          key={position}
          isFlipped={fixedChar !== undefined}
          widthPx={charWidth}
          heightPx={charHeight}
          css={[
            ["SPINNING_CHARS", "FILTERING_CHARS", "DONE"].includes(
              lifecyclePhase
            ) &&
              css`
                transition-duration: ${LETTER_ROTATION_DURATION}ms;
                transform: rotateY(
                  ${getRandom([4, 5, 6, 7, 8, 9]) * 360 +
                    (term === winner ? 180 : 0)}deg
                );
              `,
            ["FILTERING_CHARS", "DONE"].includes(lifecyclePhase) &&
              (term === winner
                ? css`
                    transition: all ${LETTER_FILTERING_DURATION}ms ease-out;
                    /* TODO: These three properties below cause weird, unpredictable behavior on iOS (flickering, disappearing letters). Find a workaround.*/
                    width: ${1.5 * charWidth}px;
                    height: ${1.5 * charHeight}px;
                    font-size: ${charWidth}px;
                  `
                : css`
                    transition: all ${LETTER_FILTERING_DURATION}ms ease-out;
                    transform: scale(0.5);
                    width: 0;
                    border: 0;
                    opacity: 0;
                    overflow: hidden;
                  `),
          ]}
        >
          <CharCardFront bgColor="#f5f5f5" />
          <CharCardBack
            bgColor={fixedChar?.trim() ? terms[term!].color : "#f5f5f5"}
            color={fixedChar ? "white" : "black"}
          >
            {fixedChar || randomChar}
          </CharCardBack>
        </CharCard>
      ))}
    </ul>
  );
});

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * (arr.length - 1))];
}
