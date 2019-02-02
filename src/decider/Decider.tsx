/** @jsx jsx */ jsx;
import { css, jsx } from "@emotion/core";
import { rgba } from "polished";
import { createContext, FunctionComponent } from "react";
import { NUMBER_OF_LETTERS } from "../settings";
import { CharWall } from "./CharWall";
import { EntryForm } from "./EntryForm";
import { SubmitButton } from "./SubmitButton";
import { useDecider } from "./useDecider";

type Props = { reset: () => void; className?: string };

export const DeciderContext = createContext<ReturnType<typeof useDecider>>({
  chars: {},
  lifecyclePhase: "COLLECTING_USER_INPUT",
  submit: () => {},
  registerTerm: () => {},
  terms: {},
  winner: undefined
});

export const Decider: FunctionComponent<Props> = ({ reset, className }) => {
  const deciderState = useDecider(NUMBER_OF_LETTERS);

  return (
    <DeciderContext.Provider value={deciderState}>
      <div
        css={css`
          /* XXX: Use grid for layout and gaps. */
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        `}
        className={className}
      >
        {/* XXX: Rename to OptionEditor? */}
        <EntryForm
          css={css`
            margin-bottom: 2vh;
          `}
        />
        <CharWall />
        {Object.keys(deciderState.terms).length >= 2 && (
          <SubmitButton
            reset={reset}
            css={css`
              box-shadow: ${rgba("#000", 0.3)} 0 0 1px,
                ${rgba("#000", 0.4)} 0 6px 8px -4px;
              background-color: white;
              border-radius: 4px;
              padding: 1.25vh;
              position: absolute;
              bottom: 0;
              left: 2vh;
              width: calc(100% - 4vh);
            `}
          />
        )}
      </div>
    </DeciderContext.Provider>
  );
};
