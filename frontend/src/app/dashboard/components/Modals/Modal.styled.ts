import { styled } from '@styles/theme'

export const StyledModal = styled.div`
  p {
    font-size: 14px;
    line-height: 25px;
    letter-spacing: 0.2px;

    &.center {
      text-align: center;
    }

    .saved {
      color: ${props => props.theme.colors.yellow.mySin};
      font-weight: ${props => props.theme.font.weight.bold};
    }

    .published {
      color: ${props => props.theme.colors.green.mountainMeadow};
      font-weight: ${props => props.theme.font.weight.bold};
    }
  }

  .entryBlock {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    border: 1px solid ${props => props.theme.colors.gray.frenchGray};
    padding: 20px 10px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.05);
    width: 95%;

    &:hover {
      border: 1px solid ${props => props.theme.colors.blue.pictonBlue};
    }

    .modelName {
      color: ${props => props.theme.color.gray};
    }

    .entryTitle {
      font-weight: ${props => props.theme.font.weight.bold};
    }

    .Published {
      color: ${props => props.theme.colors.green.mountainMeadow};
    }

    .Draft {
      color: ${props => props.theme.colors.yellow.mySin};
    }
  }

  .values {
    > div {
      height: 200px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;

    &.center {
      justify-content: space-between;
    }
  }
`
