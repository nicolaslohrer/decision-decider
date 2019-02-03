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
      <div
        css={css`
          display: grid;
          grid-template-rows: auto 1fr;
          height: 100%;
          min-height: 0;
          grid-gap: 0.25rem;
        `}
      >
        <Header
          onMenuClick={() => {
            // XXX: Open sidebar.
          }}
        />
        <Decider
          key={version}
          reset={() => setVersion(prev => prev + 1)}
          css={css`
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          `}
        />
        {/* XXX: Move content of Footer to new Sidebar. */}
        {/* <Footer /> */}
      </div>
    </ErrorBoundary>
  );
};
