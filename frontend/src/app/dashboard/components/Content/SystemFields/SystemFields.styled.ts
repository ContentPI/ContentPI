import { styled, theme, device } from '@styles/theme'

export const StyledSystemFields = styled.div`
  background-color: ${theme.colors.gray.whisper};
  border-bottom: 1px solid ${theme.colors.gray.gallery};
  border-left: 1px solid ${theme.colors.gray.gallery};
  height: 100vh;
  margin-top: -20px;
  padding-top: 10px;
  padding-right: 20px;
  position: relative;
  width: 420px;

  @media ${device.laptop} {
    width: 350px;
    margin-left: -100px;
  }

  @media ${device.tablet} {
    width: 300px;
    margin-left: -160px;
  }

  .wrapper {
    margin: 0 auto;
    width: 90%;

    .block {
      color: ${theme.colors.gray.doveGray};
      font-size: 12px;
      font-weight: 600;
      border-bottom: 1px solid ${theme.colors.gray.gallery};
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
          color: ${theme.colors.blue.pacificBlue};
        }
        &.published {
          color: ${theme.colors.green.mountainMeadow};
        }
      }

      .systemField {
        display: flex;
        justify-content: space-between;
        color: ${theme.colors.gray.doveGray};
        font-size: 13px;
        margin-bottom: 20px;

        .label,
        .id,
        .createdAt,
        .updatedAt {
          display: inline-block;
          background-color: ${theme.colors.gray.gallery};
          border-radius: 3px;
          color: ${theme.color.gray};
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

          @media ${device.tablet} {
            width: 100px;
          }
        }

        .status {
          color: ${theme.colors.yellow.mySin};
          text-transform: uppercase;

          &.published {
            color: ${theme.colors.green.mountainMeadow};
          }
        }

        .createdAt,
        .updatedAt {
          width: 160px;

          @media ${device.tablet} {
            width: 100px;
          }
        }

        .empty {
          display: none;
        }
      }
    }
  }
`
