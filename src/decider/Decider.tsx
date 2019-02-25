/** @jsx jsx */ jsx;
import { css, jsx } from "@emotion/core";
import { rgba } from "polished";
import { createContext, FunctionComponent } from "react";
import { NUMBER_OF_LETTERS } from "../settings";
import { CharWall } from "./CharWall";
import { OptionEditor } from "./OptionEditor";
import { OverlayButtons } from "./OverlayButtons";
import { useDecider } from "./useDecider";

type Props = { reset: () => void; className?: string };

export const DeciderContext = createContext<ReturnType<typeof useDecider>>({
  chars: {},
  lifecyclePhase: "COLLECTING_USER_INPUT",
  submit: async () => {},
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
          display: grid;
          grid-template-rows: auto [charwall] 1fr;
          grid-gap: 0.5rem;
          overflow: hidden;
          min-height: 0;
        `}
        className={className}
      >
        <OptionEditor />
        <CharWall />
        {Object.keys(deciderState.terms).length >= 2 && (
          <OverlayButtons
            reset={reset}
            css={css`
              box-shadow: ${rgba("black", 0.3)} 0 0 1px,
                ${rgba("black", 0.3)} 0 4px 6px -4px;
              background-color: white;
              border-radius: 4px;
              padding: 0.5rem;
              position: absolute;
              bottom: 4px;
              left: 0.5rem;
              width: calc(100% - 1rem);
            `}
          />
        )}
      </div>
    </DeciderContext.Provider>
  );
};
