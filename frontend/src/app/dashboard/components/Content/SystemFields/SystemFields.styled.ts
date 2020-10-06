import { styled } from '@styles/theme'

export const StyledSystemFields = styled.div`
  background-color: ${props => props.theme.colors.gray.whisper};
  border-bottom: 1px solid ${props => props.theme.colors.gray.gallery};
  border-left: 1px solid ${props => props.theme.colors.gray.gallery};
  height: 100vh;
  margin-top: -20px;
  padding-top: 10px;
  padding-right: 20px;
  position: relative;
  width: 420px;

  ${props => props.theme.mixins.breakpoint.md`
    width: 350px;
    margin-left: -100px;
  `};

  ${props => props.theme.mixins.breakpoint.sm`
    width: 300px;
    margin-left: -160px;
  `};

  .wrapper {
    margin: 0 auto;
    width: 90%;

    .block {
      color: ${props => props.theme.colors.gray.doveGray};
      font-size: 12px;
      font-weight: 600;
      border-bottom: 1px solid ${props => props.theme.colors.gray.gallery};
      text-transform: uppercase;
      padding-bottom: 5px;
      margin-bottom: 20px;
    }

    .row {
      margin-bottom: 20px;

      .alert {
        visibility: hidden;
        font-size: 14px;
        font-weight: 500;
        margin: 0;
        margin-top: 5px;
        height: 10px;
        text-transform: uppercase;
        &.show {
          visibility: visible;
        }
        &.saved {
          color: ${props => props.theme.colors.blue.pacificBlue};
        }
        &.published {
          color: ${props => props.theme.colors.green.mountainMeadow};
        }
      }

      .systemField {
        display: flex;
        justify-content: space-between;
        color: ${props => props.theme.colors.gray.doveGray};
        font-size: 13px;
        margin-bottom: 20px;

        .label,
        .id,
        .createdAt,
        .updatedAt {
          display: inline-block;
          background-color: ${props => props.theme.colors.gray.gallery};
          border-radius: 3px;
          color: ${props => props.theme.color.gray};
          font-size: 11px;
          padding: 5px 6px;
          margin-top: -5px;
          width: 66px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }

        .id {
          width: 237px;

          ${props => props.theme.mixins.breakpoint.sm`
            width: 100px;
          `};
        }

        .status {
          color: ${props => props.theme.colors.yellow.mySin};
          text-transform: uppercase;

          &.published {
            color: ${props => props.theme.colors.green.mountainMeadow};
          }
        }

        .createdAt,
        .updatedAt {
          width: 160px;

          ${props => props.theme.mixins.breakpoint.sm`
            width: 100px;
          `};
        }

        .empty {
          display: none;
        }
      }
    }
  }
`
