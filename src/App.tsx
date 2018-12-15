/** @jsx jsx */
import { jsx } from "@emotion/core";
import "@reach/dialog/styles.css";
import { FunctionComponent, useState } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Footer } from "./components/Footer";
import { GlobalStyles } from "./components/GlobalStyles";
import { Decider } from "./decider/Decider";

jsx; // TODO: This is no long-term solution. Remove in all files once the underlying problem is resolved. See https://bit.ly/2S4Xj06.

// TODO: Improve lighthouse score.

export const App: FunctionComponent = () => {
  const [version, setVersion] = useState(0);
  return (
    <ErrorBoundary>
      <GlobalStyles />
      <Decider key={version} reset={() => setVersion(prev => prev + 1)} />
      <Footer />
    </ErrorBoundary>
  );
};
