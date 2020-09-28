import { styled } from '@styles/theme'

export const StyledEnumerations = styled.div`
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .enumeration {
      border: 1px solid ${props => props.theme.colors.gray.gallery};
      margin-bottom: 20px;
      border-radius: 5px;
      margin-right: 10px;
      width: 400px;

      .information {
        background-color: ${props => props.theme.colors.gray.alabaster};
        padding: 20px 10px;
        border-bottom: 1px solid ${props => props.theme.colors.gray.gallery};

        .name {
          color: ${props => props.theme.colors.gray.tuna};
          display: inline;
          font-size: ${props => props.theme.font.size.large};
          font-weight: ${props => props.theme.font.weight.semibold};
        }

        .identifier {
          color: ${props => props.theme.colors.gray.frenchGray};
          margin-right: 10px;
        }
      }

      .values {
        display: flex;
        padding: 20px 10px;
        flex-wrap: wrap;

        .value {
          font-size: 14px;
          color: ${props => props.theme.colors.gray.doveGray};
          border-radius: 5px;
          background-color: ${props => props.theme.colors.gray.gallery};
          padding: 10px;
          margin: 10px;
        }
      }
    }
  }
`
