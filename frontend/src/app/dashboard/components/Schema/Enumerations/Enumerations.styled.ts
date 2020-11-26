import { styled, theme } from '@styles/theme'

export const StyledEnumerations = styled.div`
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .enumeration {
      border: 1px solid ${theme.colors.gray.gallery};
      margin-bottom: 20px;
      border-radius: 5px;
      margin-right: 10px;
      max-height: 300px;
      width: 400px;

      .information {
        display: flex;
        justify-content: space-between;
        background-color: ${theme.colors.gray.alabaster};
        padding: 20px 10px;
        border-bottom: 1px solid ${theme.colors.gray.gallery};

        .name {
          color: ${theme.colors.gray.tuna};
          display: inline;
          font-size: ${theme.font.size.large};
          font-weight: ${theme.font.weight.semibold};
        }

        .identifier {
          color: ${theme.colors.gray.frenchGray};
          margin-right: 10px;
        }
      }

      .values {
        display: flex;
        padding: 20px 10px;
        flex-wrap: wrap;

        .value {
          font-size: 14px;
          color: ${theme.colors.gray.doveGray};
          border-radius: 5px;
          background-color: ${theme.colors.gray.gallery};
          padding: 10px;
          margin: 10px;
        }
      }
    }
  }
`
