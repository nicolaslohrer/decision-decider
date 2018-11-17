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

        font-family: "Ubuntu Mono", monospace;

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
          <LetterWall numberOfLetters={225} key={this.state.version}>
            {({ registerTerm, pickWinner, winner, terms }) => (
              <TermEntryDialog
                terms={terms}
                registerTerm={registerTerm}
                pickWinner={pickWinner}
                reset={(cb?: () => void) =>
                  this.setState(({ version }) => ({ version: version + 1 }), cb)
                }
                isDone={!!winner}
              />
            )}
          </LetterWall>
        </ErrorBoundary>
      </ThemeProvider>
    );
  }
}
