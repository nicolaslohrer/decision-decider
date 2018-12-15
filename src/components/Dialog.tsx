/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { FunctionComponent } from "react";
import { COLORS } from "../settings";

jsx;

type Props = { onDismiss: () => void };

export const Dialog: FunctionComponent<Props> = ({ onDismiss, children }) => {
  return (
    <DialogOverlay
      onDismiss={onDismiss}
      css={css`
        z-index: 150;
      `}
    >
      <DialogContent
        css={css`
          width: 90%;
          max-width: 700px;

          h1 {
            margin-top: 0;
          }
        `}
      >
        <button
          onClick={onDismiss}
          css={css`
            background: transparent;
            padding: 0;
            float: right;
            border: none;
            outline: none;
            cursor: pointer;
            transition: color 0.25s ease-out;
            color: black;
            z-index: 600;

            &:hover {
              color: ${COLORS[2]};
            }
          `}
        >
          <FontAwesomeIcon icon={faTimesCircle} size="lg" />
        </button>
        {children}
      </DialogContent>
    </DialogOverlay>
  );
};
