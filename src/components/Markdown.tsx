import React, { Fragment, ReactNode, useMemo } from "react";
import { Remarkable } from "remarkable";

interface Props {
  children: ReactNode;
}

// Losely based on react-remarkable. See https://github.com/acdlite/react-remarkable/issues/37#issuecomment-662450138.
export function Markdown({ children }: Props) {
  const parser = useMemo(() => new Remarkable(), []);

  const content = useMemo(
    () =>
      React.Children.map(children, (child) =>
        typeof child === "string" ? (
          <div
            dangerouslySetInnerHTML={{
              __html: parser.render(child),
            }}
          />
        ) : (
          child
        ),
      ),
    [parser, children],
  );

  return <Fragment>{content}</Fragment>;
}
