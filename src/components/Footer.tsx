import { css } from "@emotion/core";
import "@reach/dialog/styles.css";
import React, { Component } from "react";
import { Dialog } from "./Dialog";
import { Imprint } from "./Imprint";
import { Privacy } from "./Privacy";

type Props = { className?: string };
type State = { isImprintVisible: boolean; isPrivacyVisible: boolean };

export class Footer extends Component<Props, State> {
  public state: State = { isImprintVisible: false, isPrivacyVisible: false };

  public render() {
    const {
      props: { className },
      state: { isPrivacyVisible, isImprintVisible }
    } = this;

    return (
      <footer
        css={[
          css`
            padding: 1.25vh 2vh;
            border-top: 1px solid black;
            font-size: 0.6rem;
            opacity: 0.6;
            transition: opacity 0.25s ease-out;

            &:hover,
            &:hover {
              opacity: 1;
            }
          `
        ]}
        className={className}
      >
        <ul
          css={css`
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
              <a
                href="#0"
                onClick={() => this.setState({ isImprintVisible: true })}
              >
                Imprint
              </a>
            </span>
          </li>
          <li>
            <span>
              <a
                href="#0"
                onClick={() => this.setState({ isPrivacyVisible: true })}
              >
                Privacy
              </a>
            </span>
          </li>
        </ul>

        <Dialog
          isOpen={isImprintVisible}
          onDismiss={() => this.setState({ isImprintVisible: false })}
        >
          <Imprint />
        </Dialog>
        <Dialog
          isOpen={isPrivacyVisible}
          onDismiss={() => this.setState({ isPrivacyVisible: false })}
        >
          <Privacy />
        </Dialog>
      </footer>
    );
  }
}
