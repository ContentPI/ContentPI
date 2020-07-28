// Dependencies
import React, { ReactElement } from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render(): ReactElement {
    const viewport = 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no'

    return (
      <html lang="es">
        <Head>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css" />
          <meta name="viewport" content={viewport} />
          <link rel="icon" type="image/png" href="/images/favicon.png" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
