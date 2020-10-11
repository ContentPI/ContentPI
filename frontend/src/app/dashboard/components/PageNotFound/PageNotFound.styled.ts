import { styled, theme, device } from '@styles/theme'

export const StyledPageNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;

  @media ${device.mobile} {
    align-content: flex-start;
    padding: 50px 20px;
  }

  img {
    margin-right: 50px;
    width: 250px;

    @media ${device.tablet} {
      margin-right: 0;
      width: 250px;
    }

    @media ${device.mobile} {
      margin-bottom: 20px;
      width: 150px;
    }
  }

  .notFound {
    font-family: Arial;

    @media ${device.mobile} {
      text-align: center;
    }

    h1 {
      font-size: 208px;
      margin: 0;

      @media ${device.tablet} {
        font-size: 160px;
      }

      @media ${device.mobile} {
        font-size: 112px;
      }
    }

    span {
      font-size: 29px;

      @media ${device.tablet} {
        font-size: 24px;
      }
    }

    p {
      font-size: 24px;
      margin: 30px 0 80px 0;
      max-width: 500px;

      @media ${device.tablet} {
        font-size: 16px;
      }

      @media ${device.mobile} {
        margin: 20px 0 80px 0;
      }
    }

    a {
      color: ${theme.colors.blue.dodgerBlue};
      text-decoration: none;

      &:hover {
        color: ${theme.colors.blue.bondiBlue};

        @media ${device.tablet} {
          font-size: 16px;
        }
      }

      i {
        margin-left: 15px;
      }
    }
  }
`
