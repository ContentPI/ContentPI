import { styled, theme } from '@styles/theme'

export const StyledContentSidebar = styled.div`
  margin: 0 auto;
  width: 90%;

  .wrapper {
    display: flex;
    justify-content: space-between;

    .models {
      color: ${theme.color.gray};
      font-size: ${theme.font.size.smaller};
      font-weight: ${theme.font.weight.bold};
    }

    .create {
      margin-top: -5px;
    }
  }

  .modelsWrapper {
    margin-top: 20px;

    a {
      color: ${theme.colors.gray.tuna};
      display: block;
      font-size: 13px;
      font-weight: 600;
      padding: 8px;
      border-radius: 5px;

      &:hover {
        background-color: ${theme.colors.gray.gallery};
      }
    }
  }
`
