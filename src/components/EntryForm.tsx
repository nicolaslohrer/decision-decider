import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@reach/dialog/styles.css";
import Rect from "@reach/rect";
import { css, cx } from "emotion";
import React, { Component, createRef } from "react";
import { Button } from "./Button";
import { TermDefMap } from "./CharController";

type Props = {
  registerTerm: (term: string) => void;
  pickWinner: () => void;
  reset: (cb?: () => void) => void;
  isDone: boolean;
  className?: string;
  terms: TermDefMap;
  isResultMode: boolean;
};
type State = { term: string; isInputHidden: boolean };

const inputRef = createRef<HTMLInputElement>();

export class EntryForm extends Component<Props, State> {
  public state: State = { term: "", isInputHidden: false };

  public render() {
    const {
      state: { term, isInputHidden },
      props: {
        registerTerm,
        pickWinner,
        reset,
        isDone,
        className,
        terms,
        isResultMode
      }
    } = this;
    return (
      <div className={className}>
        <form
          onSubmit={e => {
            e.preventDefault();
            registerTerm(term);
            this.setState({ term: "" }, () => {
              inputRef.current!.focus();
            });
          }}
        >
          <Rect>
            {({ ref, rect }: any) => (
              <div
                ref={ref}
                className={cx(
                  css`
                    display: flex;
                    margin-bottom: 0.5rem;
                    opacity: ${isDone && 0.4};
                    caret-color: ${isDone && "transparent"};
                    height: ${rect ? `${rect.height}px` : "auto"};
                  `,
                  isInputHidden &&
                    css`
                      transition: all 0.35s ease-out;
                      opacity: 0;
                      height: 0;
                      overflow: hidden;
                    `
                )}
              >
                <input
                  className={css`
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
                    !isDone && this.setState({ term: value })
                  }
                />
                <button
                  type="submit"
                  className={css`
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
            )}
          </Rect>
          <div
            className={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            {isResultMode && (
              <Button
                type="button"
                onClick={() => {
                  reset(() => inputRef.current!.focus());
                }}
              >
                Start over
              </Button>
            )}
            {!isDone && (
              <Button
                type="button"
                onClick={() => {
                  this.setState({ isInputHidden: true, term: "" });
                  inputRef.current!.focus();
                  setTimeout(pickWinner, 1000);
                }}
                disabled={Object.keys(terms).length < 2}
              >
                Decide Decision
              </Button>
            )}
          </div>
        </form>
      </div>
    );
  }
}
