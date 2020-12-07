import { styled, theme, device } from '@styles/theme'

export const StyledFooter = styled.footer`
  width: 97%;
  text-align: center;
  height: max-content;
  background-color: transparent;

  @media ${device.mobileXl} {
    margin-top: 80px;
  }

  .content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.gray.emperor};
    font-size: 14px;
    justify-content: space-between;

    @media ${device.tablet} {
      flex-direction: column-reverse;
    }

    .copyright {
      color: ${theme.color.black};
      margin-bottom: 10px;
    }

    .rightOptions {
      ul {
        display: flex;
        flex-direction: row;
        list-style: none;
        margin: 0px;
        margin-top: -10px;
        padding: 0px;

        li {
          flex: auto;
          padding: 10px;

          a {
            color: ${theme.color.gray};
            text-decoration: none;
            letter-spacing: 0.5px;
            font-size: 14px;

            &:hover {
              color: ${theme.color.black};
            }
          }
        }
      }
    }
  }
`
