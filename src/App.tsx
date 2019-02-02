/** @jsx jsx */ jsx; // TODO: This is no long-term solution. Remove in all files once the underlying problem is resolved. See https://bit.ly/2S4Xj06.
import { css, jsx } from "@emotion/core";
import "@reach/dialog/styles.css";
import { FunctionComponent, useState } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { GlobalStyles } from "./components/GlobalStyles";
import { Header } from "./components/Header";
import { Decider } from "./decider/Decider";

export const App: FunctionComponent = () => {
  const [version, setVersion] = useState(0);
  return (
    <ErrorBoundary>
      <GlobalStyles />

      {/* XXX: Add hover/focus style. */}

      <Header
        onMenuClick={() => {
          // XXX: Open sidebar.
        }}
        css={css`
          /* XXX: Use grid for gaps */
          margin-bottom: 1vh;
        `}
      />

      <Decider
        key={version}
        reset={() => setVersion(prev => prev + 1)}
        css={css`
          padding-left: 2vh;
          padding-right: 2vh;
        `}
      />
      {/* XXX: Move content of Footer to new Sidebar. */}
      {/* <Footer /> */}
    </ErrorBoundary>
  );
};
