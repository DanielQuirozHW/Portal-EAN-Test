// ** React Import
import React from 'react'

// ** Next Import
import Document, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
  render() {
    return (
      <Html lang='es' data-locale="es">
        <Head>
          <meta name="google" content="notranslate" />
          <meta http-equiv="Content-Language" content="es" />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link rel="icon" href="/images/Logo_EAN-modified.png" />
        </Head>
        <body translate="no">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
