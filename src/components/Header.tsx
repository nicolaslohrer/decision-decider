/** @jsx jsx */ jsx;
import { css, jsx } from "@emotion/core";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VisuallyHidden from "@reach/visually-hidden";
import { FunctionComponent } from "react";
import { COLORS } from "../settings";

type Props = { onMenuClick: () => void; className?: string };

export const Header: FunctionComponent<Props> = ({
  onMenuClick: handleMenuClick,
  className
}) => {
  return (
    <div
      css={css`
        background-color: ${COLORS[2]};
        color: white;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-column-gap: 0.5rem;
        align-items: center;
        padding: 0 0.5rem;

        span,
        h1 {
          font-size: 1.25rem;
        }
      `}
      className={className}
    >
      <h1
        css={css`
          margin: 0;
          font-weight: 500;
          line-height: 2;
        `}
      >
        Decision Decider
      </h1>
      <span
        role="button"
        onClick={handleMenuClick}
        css={css`
          padding: 0.3rem;
        `}
      >
        {/* XXX: Add hover/focus style. */}
        <FontAwesomeIcon icon={faEllipsisV} size="sm" />
        <VisuallyHidden>Open menu</VisuallyHidden>
      </span>
    </div>
  );
};
