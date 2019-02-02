/** @jsx jsx */ jsx;
import { css, jsx } from "@emotion/core";
import "@reach/dialog/styles.css";
import Rect from "@reach/rect";
import VisuallyHidden from "@reach/visually-hidden";
import { FunctionComponent, useContext, useRef, useState } from "react";
import { Button } from "../components/Button";
import { FORM_FADE_OUT_DURATION } from "../settings";
import { DeciderContext } from "./Decider";

type Props = { className?: string };

export const EntryForm: FunctionComponent<Props> = ({ className }) => {
  const { registerTerm, lifecyclePhase } = useContext(DeciderContext);

  if (
    !["COLLECTING_USER_INPUT", "HIDING_ENTRY_FORM"].includes(lifecyclePhase)
  ) {
    return null;
  }

  const [term, setTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      css={css`
        position: relative;
        z-index: 100;
      `}
      className={className}
    >
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
              <div>
                <div
                  css={css`
                    display: flex;
                    margin-bottom: 2vh;
                    align-items: center;
                  `}
                >
                  <VisuallyHidden>
                    <label htmlFor="input">Enter Option</label>
                  </VisuallyHidden>
                  <input
                    css={css`
                      border: 0 none;
                      border-bottom: 1px solid grey;
                      outline: 0 none;
                      line-height: 2;
                      padding: 0 3rem 0 0.25rem;
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
                    autoComplete="off"
                  />
                  {term && (
                    <Button
                      type="submit"
                      css={css`
                        position: absolute;
                        right: 0;
                        text-transform: uppercase;
                        line-height: 1.5;
                      `}
                      title="Add option"
                    >
                      Add
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Rect>
      </form>
    </div>
  );
};
