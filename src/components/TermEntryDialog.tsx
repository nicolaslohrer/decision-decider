import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@reach/dialog/styles.css";
import { css, cx } from "emotion";
import React, { Component, createRef } from "react";
import { TermDefMap } from "./CharController";

type Props = {
  registerTerm: (term: string) => void;
  pickWinner: () => void;
  reset: (cb?: () => void) => void;
  isDone: boolean;
  className?: string;
  terms: TermDefMap;
};
type State = { term: string };

const inputRef = createRef<HTMLInputElement>();

export class TermEntryDialog extends Component<Props, State> {
  public state: State = { term: "" };

  public render() {
    const {
      state: { term },
      props: { registerTerm, pickWinner, reset, isDone, className, terms }
    } = this;
    return (
      <div
        className={cx(
          css`
            padding: 1rem 1rem 0;
          `,
          className
        )}
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            registerTerm(term);
            this.setState({ term: "" }, () => {
              inputRef.current!.focus();
            });
          }}
        >
          <div
            className={css`
              display: flex;
              margin-bottom: 0.5rem;
              opacity: ${isDone && 0.4};
              caret-color: ${isDone && "transparent"};
            `}
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
          <div
            className={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            {isDone ? (
              <button
                type="button"
                className={css`
                  width: 100%;
                  line-height: 2;
                `}
                onClick={() => {
                  reset(() => inputRef.current!.focus());
                }}
              >
                Start over
              </button>
            ) : (
              <button
                type="button"
                className={css`
                  width: 100%;
                  line-height: 2;
                `}
                onClick={() => {
                  if (this.state.term) {
                    this.setState({ term: "" });
                  }
                  pickWinner();
                  inputRef.current!.focus();
                }}
                disabled={Object.keys(terms).length < 2}
              >
                Decide decision!
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}
