import styled from "../utils/styled";

type Props = { cols: number; verticalGap?: string };

const GridList = styled("div")<Props>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > * {
    /* Avoid IE11 issues with flex and border-box by using content-box. */
    box-sizing: content-box;

    /* Substract tiny pixel amount to prevent IE11 rounding issues. */
    flex-basis: ${({ theme: { spacing }, cols }) =>
      `calc((100% + ${spacing[2]}) / ${cols} - ${spacing[2]} - 0.01px)`};

    margin-top: 0 !important;
    padding: ${({ theme: { spacing } }) => `0 ${spacing[1]}`};

    /* First element in each row. */
    &:nth-child(${({ cols }) => `${cols}n + 1`}) {
      padding-left: 0;
    }

    /* Last element in each row. */
    &:nth-child(${({ cols }) => `${cols}n + ${cols}`}) {
      padding-right: 0;
    }

    /* All elements not in first row. */
    &:nth-child(${({ cols }) => `n + ${cols + 1}`}) {
      margin-top: ${({ theme, verticalGap }) =>
        verticalGap !== undefined ? verticalGap : theme.spacing[1]} !important;
    }

    * {
      box-sizing: border-box;
    }
  }

  /* Make sure the last line fits into the grid. See https://bit.ly/2MBQDI8. */
  &::after {
    content: "";
    flex: auto;
  }
`;

export default GridList;
