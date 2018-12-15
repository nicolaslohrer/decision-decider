/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@reach/dialog/styles.css";
import Rect from "@reach/rect";
import VisuallyHidden from "@reach/visually-hidden";
import { FunctionComponent, useContext, useRef, useState } from "react";
import { Button } from "../components/Button";
import { FORM_FADE_OUT_DURATION } from "../settings";
import { DeciderContext } from "./Decider";

jsx;

type Props = {
  reset: () => void;
  className?: string;
};

export const EntryForm: FunctionComponent<Props> = ({ reset, className }) => {
  const { registerTerm, submit, terms, lifecyclePhase } = useContext(
    DeciderContext
  );
  const [term, setTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={className}>
      <form
        onSubmit={e => {
          e.preventDefault();
          registerTerm(term);
          setTerm("");
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
                  transition: all ${FORM_FADE_OUT_DURATION}ms ease-out;
                `,

                [
                  "HIDING_ENTRY_FORM",
                  "ROTATING_LETTERS",
                  "FILTERING_LETTERS"
                ].includes(lifecyclePhase) &&
                  css`
                    margin-top: -200px;
                    opacity: 0;
                    transform: scale(0.9);
                  `
              ]}
            >
              <div
                css={
                  !["COLLECTING_USER_INPUT", "HIDING_ENTRY_FORM"].includes(
                    lifecyclePhase
                  ) &&
                  css`
                    position: absolute;
                    left: -10000px;
                  `
                }
              >
                <div
                  css={css`
                    display: flex;
                    margin-bottom: 2vh;
                  `}
                >
                  {/* TODO: It'd be nicer to show mobile keyboards on mount right away. But that doesn't seem to be easily possible. Setting the focus on input element or setting autoFocus={true} isn't sufficient, unfortunately. */}
                  <VisuallyHidden>
                    <label htmlFor="input">Enter Option</label>
                  </VisuallyHidden>
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
                    id="input"
                    placeholder="Enter Option"
                    ref={inputRef}
                    value={term}
                    onChange={({ target: { value } }) =>
                      lifecyclePhase === "COLLECTING_USER_INPUT" &&
                      setTerm(value)
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
                  onClick={() => {
                    setTerm("");
                    submit();
                    inputRef.current!.focus();
                  }}
                  disabled={Object.keys(terms).length < 2}
                >
                  Decide Decision
                </Button>
              </div>
              {lifecyclePhase === "DONE" && (
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
