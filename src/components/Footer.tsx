import "@reach/dialog/styles.css";
import { css, cx } from "emotion";
import React, { SFC } from "react";

export const Footer: SFC<{ className?: string }> = ({ className }) => {
  return (
    <footer
      className={cx(
        css`
          padding: 2vh;
          border-top: 1px solid black;
          font-size: 0.6rem;
          opacity: 0.6;

          &:hover,
          &:hover {
            opacity: 1;
          }
        `,
        className
      )}
    >
      <ul
        className={css`
          display: flex;
          list-style-type: none;
          margin: 0;
          padding: 0;
          justify-content: center;

          li {
            display: flex;

            &::before {
              content: "※";
              margin-right: 1ch;
            }

            + li {
              display: inline-block;
              margin-left: 2.5ch;
            }
          }
        `}
      >
        <li>
          <span>
            A weird side project by{" "}
            <a href="http://nicolasschabram.com">Nicolas Schabram</a>
          </span>
        </li>
        <li>
          <span>
            <a href="#0" onClick={() => {}}>
              Imprint
            </a>
            {/* XXX: Add imprint. */}
          </span>
        </li>
      </ul>
    </footer>
  );
};
