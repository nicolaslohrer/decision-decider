import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { css, cx } from "emotion";
import React, { Component } from "react";

type Props = {
  registerTerms: (terms: string[]) => void;
  pickWinner: () => void;
  reset: () => void;
  isOpen: boolean;
};
type State = { term: string };

export class TermEntryDialog extends Component<Props, State> {
  public state: State = { term: "" };

  public render() {
    const {
      state: { term },
      props: { registerTerms, pickWinner, reset, isOpen }
    } = this;
    return (
      <DialogOverlay
        className={cx(
          css`
            background-color: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
          `,
          !isOpen &&
            css`
              transition: opacity 0.3s ease-in;
              opacity: 0;
            `
        )}
      >
        <DialogContent
          className={css`
            width: calc(100vw - 2rem);
            max-width: 500px;
            margin: 0;
            padding: 0;
          `}
        >
          <form
            onSubmit={e => {
              e.preventDefault();
              registerTerms([term]);
              this.setState({ term: "" });
            }}
          >
            <input
              value={term}
              onChange={({ target: { value } }) =>
                this.setState({ term: value })
              }
            />
            <button type="submit">add term</button>
            <button type="button" onClick={pickWinner}>
              Decide decision!
            </button>
            <button type="button" onClick={reset}>
              Start over
            </button>
          </form>
        </DialogContent>
      </DialogOverlay>
    );
  }
}
