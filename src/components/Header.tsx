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
        grid-column-gap: 2vh;
        align-items: center;
        padding: 1.25vh 2vh;

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
        `}
      >
        Decision Decider
      </h1>
      <span role="button" onClick={handleMenuClick}>
        <FontAwesomeIcon icon={faEllipsisV} size="sm" />
        <VisuallyHidden>Open menu</VisuallyHidden>
      </span>
    </div>
  );
};
