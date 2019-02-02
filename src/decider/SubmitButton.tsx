/** @jsx jsx */ jsx;
import { jsx } from "@emotion/core";
import { FunctionComponent, useContext } from "react";
import { Button } from "../components/Button";
import { DeciderContext } from "./Decider";

type Props = { reset: () => void; className?: string };

// XXX: Rename component (bc it includes reset button, too).
export const SubmitButton: FunctionComponent<Props> = ({
  reset,
  className
}) => {
  const { submit, terms, lifecyclePhase } = useContext(DeciderContext);
  if (!["COLLECTING_USER_INPUT", "DONE"].includes(lifecyclePhase)) {
    return null;
  }

  return (
    <div className={className}>
      {/* XXX: Hide after submit. */}
      {lifecyclePhase === "COLLECTING_USER_INPUT" && (
        <Button
          type="button"
          onClick={submit}
          disabled={Object.keys(terms).length < 2}
          fullWidth
        >
          Decide Decision
        </Button>
      )}
      {lifecyclePhase === "DONE" && (
        <Button type="button" onClick={reset} fullWidth>
          Start over
        </Button>
      )}
    </div>
  );
};
