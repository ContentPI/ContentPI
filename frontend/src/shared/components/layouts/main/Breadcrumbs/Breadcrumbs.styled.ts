import { styled } from '@styles/theme'

export const StyledBreadcrumbs = styled.div`
  margin-right: 25px;

  ul {
    display: flex;
    flex-direction: row;
    padding: 0px;
    margin: 0px;
    list-style: none;
    color: ${props => props.theme.color.gray};

    li {
      margin: 5px;

      &:last-child {
        a {
          color: ${props => props.theme.colors.blue.denim};
          font-weight: 600;
        }
      }

      a {
        color: ${props => props.theme.color.gray};
        font-weight: 400;
        line-height: 1.5;
        font-size: 14px;
        text-decoration: none;

        &:hover {
          color: ${props => props.theme.colors.blue.denim};
        }
      }
    }
  }
`
