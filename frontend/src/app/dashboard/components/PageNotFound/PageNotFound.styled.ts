import { styled } from '@styles/theme'

export const StyledPageNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;

  ${props => props.theme.mixins.breakpoint.xs`
    align-content: flex-start;
    padding: 50px 20px;
  `};

  img {
    margin-right: 50px;
    width: 250px;

    ${props => props.theme.mixins.breakpoint.sm`
      margin-right: 0;
      width: 250px;
    `};

    ${props => props.theme.mixins.breakpoint.xs`
      margin-bottom: 20px;
      width: 150px;
    `};
  }

  .notFound {
    font-family: Arial;

    ${props => props.theme.mixins.breakpoint.xs`
      text-align: center;
    `};

    h1 {
      font-size: 208px;
      margin: 0;

      ${props => props.theme.mixins.breakpoint.sm`
        font-size: 160px;
      `};

      ${props => props.theme.mixins.breakpoint.xs`
        font-size: 112px;
      `};
    }

    span {
      font-size: 29px;

      ${props => props.theme.mixins.breakpoint.sm`
        font-size: 24px;
      `};
    }

    p {
      font-size: 24px;
      margin: 30px 0 80px 0;
      max-width: 500px;

      ${props => props.theme.mixins.breakpoint.sm`
        font-size: 16px;
      `};

      ${props => props.theme.mixins.breakpoint.xs`
        margin: 20px 0 80px 0;
      `};
    }

    a {
      color: ${props => props.theme.colors.blue.dodgerBlue};
      text-decoration: none;

      &:hover {
        color: ${props => props.theme.colors.blue.bondiBlue};

        ${props => props.theme.mixins.breakpoint.sm`
          font-size: 16px;
        `};
      }

      i {
        margin-left: 15px;
      }
    }
  }
`
