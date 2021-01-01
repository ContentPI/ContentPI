// Dependencies
import React, { ReactElement } from 'react'
import Document, { Head, Main, NextScript, Html } from 'next/document'

export default class MyDocument extends Document {
  render(): ReactElement {
    const {
      __NEXT_DATA__: {
        props: { language }
      }
    } = this.props

    return (
      <Html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Head>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css" />
          <link rel="icon" type="image/png" href="/images/favicon.png" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
