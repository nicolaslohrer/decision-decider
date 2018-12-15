/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import "@reach/dialog/styles.css";
import { Component } from "react";
import { EntryForm } from "./components/EntryForm";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Footer } from "./components/Footer";
import { GlobalStyles } from "./components/GlobalStyles";
import LetterWall from "./components/LetterWall";

jsx; // FIXME: This is no long-term solution. https://bit.ly/2S4Xj06

// XXX: Figure out how emotion v10's JSX pragma thingy works. Styles are currently broken.

type State = { version: number };
export class App extends Component<{}, State> {
  public state: State = { version: 0 };

  public render() {
    return (
      <ErrorBoundary>
        <GlobalStyles />
        <LetterWall
          numberOfLetters={175}
          key={this.state.version}
          css={css`
            flex-grow: 1;
            padding: 2vh 2vh 0;
            margin-bottom: 2vh;
          `}
        >
          {({ registerTerm, pickWinner, terms, mode }) => (
            <EntryForm
              terms={terms}
              registerTerm={registerTerm}
              pickWinner={pickWinner}
              reset={(cb?: () => void) =>
                this.setState(({ version }) => ({ version: version + 1 }), cb)
              }
              mode={mode}
              css={css`
                position: relative;
                z-index: 100;
              `}
            />
          )}
        </LetterWall>
        <Footer />
      </ErrorBoundary>
      // XXX: Improve lighthouse score.
    );
  }
}
