import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { css } from "emotion";
import React, { SFC } from "react";
import { COLORS } from "../utils/Colors";

type Props = { isOpen: boolean; onDismiss: () => void };

export const Dialog: SFC<Props> = ({ isOpen, onDismiss, children }) => {
  return (
    <DialogOverlay isOpen={isOpen} onDismiss={onDismiss}>
      <DialogContent
        className={css`
          width: 90%;
          max-width: 700px;

          h1 {
            margin-top: 0;
          }
        `}
      >
        <button
          onClick={onDismiss}
          className={css`
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
