/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { createContext, FunctionComponent } from "react";
import { NUMBER_OF_LETTERS } from "../settings";
import { CharWall } from "./CharWall";
import { EntryForm } from "./EntryForm";
import { useDecider } from "./useDecider";

jsx;

type Props = { reset: () => void };

export const DeciderContext = createContext<ReturnType<typeof useDecider>>({
  chars: {},
  lifecyclePhase: "COLLECTING_USER_INPUT",
  submit: () => {},
  registerTerm: () => {},
  terms: {},
  winner: undefined
});

export const Decider: FunctionComponent<Props> = ({ reset }) => {
  const deciderState = useDecider(NUMBER_OF_LETTERS);

  return (
    <DeciderContext.Provider value={deciderState}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          padding: 2vh 2vh 0;
          margin-bottom: 2vh;
        `}
      >
        <EntryForm
          reset={reset}
          css={css`
            margin-bottom: 2vh;
            position: relative;
            z-index: 100;
          `}
        />
        <CharWall />
      </div>
    </DeciderContext.Provider>
  );
};
