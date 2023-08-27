import { css } from "@emotion/react";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import { VisuallyHidden } from "@reach/visually-hidden";
import { FC } from "react";
import { COLORS } from "../settings";

type Props = {
  onImprintClick: () => void;
  onPrivacyClick: () => void;
  className?: string;
};

export const Header: FC<Props> = ({
  onImprintClick: handleImprintClick,
  onPrivacyClick: handlePrivacyClick,
  className,
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
          font-weight: 700;
          line-height: 2;
        `}
      >
        Decision Decider
      </h1>
      <Menu>
        <MenuButton
          css={css`
            padding: 0.3rem;
            background: none;
            border: 0 none;
            color: inherit;

            &:hover,
            &:focus {
              opacity: 0.8;
              outline: none;
            }
          `}
        >
          <FontAwesomeIcon icon={faEllipsisV} size="sm" />
          <VisuallyHidden>Open menu</VisuallyHidden>
        </MenuButton>
        <MenuList
          css={css`
            z-index: 125;
            padding: 0;

            [data-reach-menu-item][data-selected] {
              background: ${COLORS[2]};
            }
          `}
        >
          <MenuItem onSelect={handleImprintClick}>Imprint</MenuItem>
          <MenuItem onSelect={handlePrivacyClick}>Privacy</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};
