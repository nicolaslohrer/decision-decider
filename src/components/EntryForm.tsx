/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@reach/dialog/styles.css";
import Rect from "@reach/rect";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { TermDefMap } from "./CharController";
import { Mode } from "./LetterWall";

jsx;

type Props = {
  registerTerm: (term: string) => void;
  pickWinner: () => void;
  reset: () => void;
  className?: string;
  terms: TermDefMap;
  mode: Mode;
};

const animationDurations = {
  formFadeOut: 250,
  restartFadeIn: 250
};

export const EntryForm: FunctionComponent<Props> = ({
  registerTerm,
  pickWinner,
  reset,
  className,
  terms,
  mode
}) => {
  const [term, setTerm] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () => {
      if (hasSubmitted) {
        setTerm("");
        setTimeout(pickWinner, animationDurations.formFadeOut + 450);
        inputRef.current!.focus();
      }
    },
    [hasSubmitted]
  );

  return (
    <div className={className}>
      <form
        onSubmit={e => {
          e.preventDefault();
          registerTerm(term);
          setTerm("");
          // XXX: We were previously waiting for setTerm before setting focus. Does this still work?
          inputRef.current!.focus();
        }}
      >
        <Rect>
          {({ ref, rect }: any) => (
            <div
              ref={ref}
              css={[
                css`
                  height: ${rect ? `${rect.height}px` : "auto"};
                  transition: all ${animationDurations.formFadeOut}ms ease-out;
                `,
                hasSubmitted &&
                  mode !== "DONE" &&
                  css`
                    margin-top: -200px;
                    opacity: 0;
                    transform: scale(0.9);
                  `
              ]}
            >
              <div
                css={
                  mode !== "COLLECTING_USER_INPUT"
                    ? css`
                        position: absolute;
                        left: -10000px;
                      `
                    : undefined
                }
              >
                <div
                  css={css`
                    display: flex;
                    margin-bottom: 2vh;
                  `}
                >
                  {/* TODO: It'd be nicer to show mobile keyboards on mount right away. But that doesn't seem to be easily possible. Setting the focus on input element or setting autoFocus={true} isn't sufficient, unfortunately. */}
                  <input
                    css={css`
                      border: 0 none;
                      border-bottom: 1px solid grey;
                      outline: 0 none;
                      line-height: 2;
                      padding: 0 3rem 0 0.5rem;
                      font-size: 1.25rem;
                      flex-grow: 1;
                      border-radius: 0;
                    `}
                    placeholder="Enter Option"
                    ref={inputRef}
                    value={term}
                    onChange={({ target: { value } }) =>
                      mode === "COLLECTING_USER_INPUT" && setTerm(value)
                    }
                    autoFocus={true}
                  />
                  <button
                    type="submit"
                    css={css`
                      border: 0 none;
                      line-height: 2;
                      padding: 0 1rem;
                      cursor: pointer;
                      right: 0;
                      font-size: 1.25rem;
                      background-color: transparent;
                      position: absolute;
                    `}
                    title="Add option"
                  >
                    <FontAwesomeIcon icon={faPlus} size="xs" />
                  </button>
                </div>
                <Button
                  type="button"
                  onClick={() => setHasSubmitted(true)}
                  disabled={Object.keys(terms).length < 2}
                >
                  Decide Decision
                </Button>
              </div>
              {mode === "DONE" && (
                <Button type="button" onClick={reset}>
                  Start over
                </Button>
              )}
            </div>
          )}
        </Rect>
      </form>
    </div>
  );
};
