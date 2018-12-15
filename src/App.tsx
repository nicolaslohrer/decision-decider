/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import "@reach/dialog/styles.css";
import { FunctionComponent, useState } from "react";
import { EntryForm } from "./components/EntryForm";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Footer } from "./components/Footer";
import { GlobalStyles } from "./components/GlobalStyles";
import LetterWall from "./components/LetterWall";

jsx; // TODO: This is no long-term solution. Remove in all files once the underlying problem is resolved. See https://bit.ly/2S4Xj06.

export const App: FunctionComponent = () => {
  const [version, setVersion] = useState(0);

  return (
    <ErrorBoundary>
      <GlobalStyles />
      <LetterWall
        numberOfLetters={175}
        key={version}
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
            reset={() => setVersion(prev => prev + 1)}
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
    // TODO: Improve lighthouse score.
  );
};
