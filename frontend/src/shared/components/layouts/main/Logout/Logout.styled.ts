import { styled, theme, isRtl, add } from '@styles/theme'

export const StyledLogout = styled.div`
  width: 100%;
  bottom: 50px;

  .logout {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    ${add('margin-right: 20px;').if(!isRtl)}
    ${add('margin-left: 20px;').if(isRtl)}

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
