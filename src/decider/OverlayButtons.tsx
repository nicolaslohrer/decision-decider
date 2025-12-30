import { FC, useContext } from "react";
import { Button } from "../components/Button";
import { DeciderContext } from "./Decider";

type Props = { reset: () => void; className?: string };

export const OverlayButtons: FC<Props> = ({ reset, className }) => {
  const { submit, lifecyclePhase } = useContext(DeciderContext);
  if (!["COLLECTING_USER_INPUT", "DONE"].includes(lifecyclePhase)) {
    return null;
  }

  return (
    <div className={className}>
      {lifecyclePhase === "COLLECTING_USER_INPUT" && (
        <Button type="button" onClick={submit} fullWidth>
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
