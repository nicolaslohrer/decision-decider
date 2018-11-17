import "@reach/dialog/styles.css";
import { injectGlobal } from "emotion";
import { ThemeProvider } from "emotion-theming";
import { normalize } from "polished";
import React, { Component } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import LetterWall from "./components/LetterWall";
import { TermEntryDialog } from "./components/TermEntryDialog";
import { theme } from "./theme";

type State = { version: number };
export class App extends Component<{}, State> {
  public state: State = { version: 0 };

  public componentDidMount() {
    injectGlobal`
      ${normalize()}

      * {
        box-sizing: border-box;
        position: relative;

        user-select: none;

        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;

        -webkit-tap-highlight-color: transparent;

        &::before,
        &::after {
          box-sizing: inherit;
        }
      }

      html {
        font-size: 16px;
      }
    `;
  }

  public render() {
    return (
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <LetterWall numberOfLetters={500} key={this.state.version}>
            {({ registerTerms, pickWinner, winner }) => (
              <TermEntryDialog
                registerTerms={registerTerms}
                pickWinner={pickWinner}
                reset={() =>
                  this.setState(({ version }) => ({ version: version + 1 }))
                }
                isOpen={!winner}
              />
            )}
          </LetterWall>
        </ErrorBoundary>
      </ThemeProvider>
    );
  }
}
