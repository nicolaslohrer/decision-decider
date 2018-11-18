import "@reach/dialog/styles.css";
import { css, injectGlobal } from "emotion";
import { normalize } from "polished";
import React, { Component } from "react";
import { EntryForm } from "./components/EntryForm";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Footer } from "./components/Footer";
import LetterWall from "./components/LetterWall";
import { COLORS } from "./utils/Colors";

type State = { version: number };
export class App extends Component<{}, State> {
  public state: State = { version: 0 };

  public componentDidMount() {
    injectGlobal`
      ${normalize()}

      * {
        box-sizing: border-box;
        position: relative;

        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;

        -webkit-tap-highlight-color: transparent;

        font-family: "Ubuntu Mono", monospace;

        &::before,
        &::after {
          box-sizing: inherit;
        }
      }

      html {
        font-size: 16px;
      }

      body,
      html {
        height: 100%;
      }

      body, #root {
        display: flex;
        flex-direction: column;
      }

      #root {
        flex-grow: 1;
      }

      a {
        &:link,
        &:visited {
          color: ${COLORS[2]};
        }

        &:hover,
        &:focus {
          opacity: 0.8;
        }
      }
    `;
  }

  public render() {
    return (
      <ErrorBoundary>
        <LetterWall
          numberOfLetters={175}
          key={this.state.version}
          className={css`
            flex-grow: 1;
            padding: 2vh 2vh 0;
            margin-bottom: 2vh;
          `}
        >
          {({ registerTerm, pickWinner, winner, terms, isResultMode }) => (
            <EntryForm
              terms={terms}
              registerTerm={registerTerm}
              pickWinner={pickWinner}
              reset={(cb?: () => void) =>
                this.setState(({ version }) => ({ version: version + 1 }), cb)
              }
              isDone={!!winner}
              isResultMode={isResultMode}
            />
          )}
        </LetterWall>
        <Footer />
      </ErrorBoundary>
      // XXX: Improve lighthouse score.
    );
  }
}
