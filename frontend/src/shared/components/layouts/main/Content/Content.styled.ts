import { styled, theme } from '@styles/theme'

export const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .container {
    background-color: ${theme.color.white};
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    margin: 20px;
    width: 100%;

    .wrapper {
      padding: 10px;
      min-height: 800px;
      width: 100%;
    }
  }
`
