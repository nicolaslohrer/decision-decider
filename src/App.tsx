import { injectGlobal } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import { normalize } from 'polished';
import React, { Component } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LetterWall } from './components/LetterWall';
import { theme } from './theme';

type State = { term: string };
export class App extends Component<{}, State> {
  public state: State = { term: '' };

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
    `;
  }

  public render() {
    const { term } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <LetterWall numberOfLetters={500}>
            {({ registerTerms }) => (
              <>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    registerTerms([term]);
                    this.setState({ term: '' });
                  }}
                >
                  <input
                    value={term}
                    onChange={({ target: { value } }) =>
                      this.setState({ term: value })
                    }
                  />
                  <button type="submit">add term</button>
                </form>
              </>
            )}
          </LetterWall>
        </ErrorBoundary>
      </ThemeProvider>
    );
  }
}
