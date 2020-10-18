import { styled, theme } from '@styles/theme'

export const StyledLogout = styled.div`
  width: 100%;
  position: absolute;
  bottom: 50px;

  .logout {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;

    a {
      display: block;
      width: 80px;
      border-radius: 10px;
      height: 80px;
      line-height: 80px;
      color: ${theme.colors.gray.tuna};
      font-size: ${theme.font.size.xxLarge};

      &:hover {
        background-color: ${theme.colors.gray.alabaster};
      }
    }
  }
`
