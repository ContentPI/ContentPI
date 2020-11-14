import styled from '@emotion/styled'
import { css, Global } from '@emotion/core'
import { add, getCurrentLanguage } from '@contentpi/utils'

const GlobalStyle = `
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter/font.woff2') format('woff2'),
        url('/fonts/Inter/font.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  html,
  body {
    background-color: white;
    font-family: Inter, Helvetica, sans-serif;
    height: 100%;
    margin: 0;
    overflow-x: hidden;
    padding: 0;
    touch-action: none;
  }
  input {
    appearance: none;
    background-clip: padding-box;
    outline: none;
    border: none;
  }
  a {
    text-decoration: none;
  }
`

const breakpoints: any = {
  mobile: '640px',
  mobileXl: '767px',
  tablet: '768px',
  laptop: '1024px',
  laptopXl: '1440px',
  desktop: '1441px'
}

const device = {
  mobile: `(max-width: ${breakpoints.mobile})`,
  mobileXl: `(max-width: ${breakpoints.mobileXl})`,
  tablet: `(max-width: ${breakpoints.tablet})`,
  laptop: `(max-width: ${breakpoints.laptop})`,
  laptopXl: `(max-width: ${breakpoints.laptopXl})`,
  desktop: `(min-width: ${breakpoints.desktop})`
}

const theme = {
  color: {
    black: '#000',
    facebook: '#3b5998',
    gray: '#888',
    linkedin: '#0077b5',
    red: '#ff0000',
    rss: '#ff6600',
    twitter: '#1da1f2',
    white: '#fff'
  },
  colors: {
    blue: {
      bondiBlue: '#0083b7',
      cerulean: '#00bde5',
      denim: '#1565c0',
      dodgerBlue: '#2ea1f8',
      oxfordBlue: '#3b4058',
      pacificBlue: '#0099CC',
      pictonBlue: '#4bc0f3'
    },
    gray: {
      codGray: '#111',
      mineShaft: '#222',
      tuna: '#333',
      tundora: '#444',
      emperor: '#555',
      doveGray: '#666',
      boulder: '#777',
      gray: '#888',
      regentGray: '#8290a3',
      dustyGray: '#999',
      silverChalice: '#aaa',
      silver: '#bbb',
      frenchGray: '#ccc',
      alto: '#ddd',
      gallery: '#eee',
      mercury: '#e9e9e9',
      alabaster: '#f7f7f7',
      almostWhite: '#fafafa',
      steelGray: '#1e1e2e',
      storGray: '#6c6e86',
      shark: '#21262d',
      darkShark: '#1c1e25',
      manatee: '#878c9c',
      athensGray: '#f1f2f7',
      wildSand: '#f4f4f4',
      whisper: '#fafafc'
    },
    green: {
      malachite: '#1bb935',
      mountainMeadow: '#0eb87f'
    },
    pink: {
      hollywoodCerise: '#ff0098',
      fairPink: '#ffe9e9'
    },
    purple: {
      electricViolet: '#760aff',
      logan: '#9ea7c7'
    },
    yellow: {
      fuelYellow: '#e9aa28',
      mySin: '#ffb914',
      sunglow: '#ffbb33'
    }
  },
  font: {
    size: {
      xxxLarge: '48px',
      xxLarge: '32px',
      xLarge: '24px',
      larger: '19px',
      large: '18px',
      big: '17px',
      regular: '16px',
      medium: '14px',
      small: '13px',
      smaller: '12px',
      xSmall: '10px',
      xxSmall: '9px',
      xxxSmall: '8px'
    },
    weight: {
      light: 100,
      normal: 400,
      semibold: 500,
      bold: 700,
      heavy: 900
    }
  },
  mixins: {
    placeholder: (color: string) => css`
      ::-webkit-input-placeholder {
        color: ${color};
      }
      :-moz-placeholder {
        color: ${color};
        opacity: 1;
      }
      ::-moz-placeholder {
        color: ${color};
        opacity: 1;
      }
      ::-ms-input-placeholder {
        color: ${color};
      }
    `
  }
}

const isRtl = getCurrentLanguage() === 'ar'

export { css, device, Global, GlobalStyle, styled, theme, isRtl, add }
