import { styled, theme } from '@styles/theme'

export const StyledPageNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;

  ${theme.mixins.breakpoint.xs`
    align-content: flex-start;
    padding: 50px 20px;
  `};

  img {
    margin-right: 50px;
    width: 250px;

    ${theme.mixins.breakpoint.sm`
      margin-right: 0;
      width: 250px;
    `};

    ${theme.mixins.breakpoint.xs`
      margin-bottom: 20px;
      width: 150px;
    `};
  }

  .notFound {
    font-family: Arial;

    ${theme.mixins.breakpoint.xs`
      text-align: center;
    `};

    h1 {
      font-size: 208px;
      margin: 0;

      ${theme.mixins.breakpoint.sm`
        font-size: 160px;
      `};

      ${theme.mixins.breakpoint.xs`
        font-size: 112px;
      `};
    }

    span {
      font-size: 29px;

      ${theme.mixins.breakpoint.sm`
        font-size: 24px;
      `};
    }

    p {
      font-size: 24px;
      margin: 30px 0 80px 0;
      max-width: 500px;

      ${theme.mixins.breakpoint.sm`
        font-size: 16px;
      `};

      ${theme.mixins.breakpoint.xs`
        margin: 20px 0 80px 0;
      `};
    }

    a {
      color: ${theme.colors.blue.dodgerBlue};
      text-decoration: none;

      &:hover {
        color: ${theme.colors.blue.bondiBlue};

        ${theme.mixins.breakpoint.sm`
          font-size: 16px;
        `};
      }

      i {
        margin-left: 15px;
      }
    }
  }
`
