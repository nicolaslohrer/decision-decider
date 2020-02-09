/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import "@reach/dialog/styles.css";
import { FC, useState } from "react";
import { Dialog } from "./components/Dialog";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { GlobalStyles } from "./components/GlobalStyles";
import { Header } from "./components/Header";
import { Imprint } from "./components/Imprint";
import { Privacy } from "./components/Privacy";
import { Decider } from "./decider/Decider";

export const App: FC = () => {
  const [version, setVersion] = useState(0);
  const [isImprintVisible, setIsImprintVisible] = useState(false);
  const [isPrivacyVisible, setIsPrivacyVisible] = useState(false);

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
          onImprintClick={() => setIsImprintVisible(true)}
          onPrivacyClick={() => setIsPrivacyVisible(true)}
        />

        <Decider
          key={version}
          reset={() => setVersion(prev => prev + 1)}
          css={css`
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          `}
        />
        {isImprintVisible && (
          <Dialog onDismiss={() => setIsImprintVisible(false)}>
            <Imprint />
          </Dialog>
        )}
        {isPrivacyVisible && (
          <Dialog onDismiss={() => setIsPrivacyVisible(false)}>
            <Privacy />
          </Dialog>
        )}
      </div>
    </ErrorBoundary>
  );
};

// XXX: Run npm audit.
