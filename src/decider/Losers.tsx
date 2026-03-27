import { css, keyframes } from "@emotion/react";
import { FC, useContext } from "react";
import { DeciderContext } from "./Decider";

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const Losers: FC = () => {
  const { winner, terms, lifecyclePhase } = useContext(DeciderContext);

  if (lifecyclePhase !== "DONE" || !winner) return null;

  const losers = Object.keys(terms).filter((t) => t !== winner);

  if (losers.length === 0) return null;

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        gap: 0.2em;
        padding: 0.25em 0 0.5em;
        font-size: clamp(1rem, 2.5vw, 1.9rem);
        animation: ${fadeIn} 350ms ease-out both;
      `}
    >
      {losers.map((loser) => (
        <div
          key={loser}
          css={css`
            background: ${terms[loser].color};
            color: white;
            font-size: inherit;
            padding: 0.2em 0.5em;
            border-radius: 2px;
            text-transform: uppercase;
            text-decoration: line-through;
            opacity: 0.65;
            white-space: nowrap;
          `}
        >
          {loser}
        </div>
      ))}
    </div>
  );
};
