/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { FC } from "react";
import { COLORS } from "../settings";

type Props = { onDismiss: () => void; "aria-label": string };

export const Dialog: FC<Props> = ({
  onDismiss,
  children,
  "aria-label": ariaLabel,
}) => {
  return (
    <DialogOverlay
      onDismiss={onDismiss}
      css={css`
        z-index: 150;
      `}
    >
      <DialogContent
        aria-label={ariaLabel}
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
