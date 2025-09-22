// ** React Import
import React from 'react'

// ** Next Import
import Document, { Html, Head, Main, NextScript } from 'next/document'

// ** Emotion Imports
import createEmotionServer from '@emotion/server/create-instance'

// ** Node Imports
import crypto from 'node:crypto'

// ** Project Imports
import { createEmotionCache } from '../@core/utils/create-emotion-cache'

class CustomDocument extends Document {
  render() {
    const { nonce } = this.props

    return (
      <Html lang='es' data-locale='es'>
        <Head>
          <meta name='google' content='notranslate' />
          <meta httpEquiv='Content-Language' content='es' />
          <meta name='csp-nonce' content={nonce} />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link rel='icon' href='/images/Logo_EAN-modified.png' />
        </Head>
        <body translate='no'>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    )
  }
}

CustomDocument.getInitialProps = async ctx => {
  const nonce = crypto.randomBytes(16).toString('base64')
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache({ nonce })
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => <App {...props} emotionCache={cache} cspNonce={nonce} />,
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
      nonce={nonce}
    />
  ))

  if (ctx.res) {
    const cspDirectives = [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com https://www.gstatic.com https://www.googleapis.com`,
      `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
      "img-src 'self' data: https://www.google-analytics.com https://api.iconify.design https://api.simplesvg.com https://api.unisvg.com",
      "connect-src 'self' https://firebase.googleapis.com https://firebaseinstallations.googleapis.com https://api-educativa-ean.azurewebsites.net https://www.google-analytics.com https://identitytoolkit.googleapis.com https://firestore.googleapis.com https://firebasestorage.googleapis.com https://api.iconify.design https://api.simplesvg.com https://api.unisvg.com",
      "font-src 'self' https://fonts.gstatic.com",
      "object-src 'none'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
    ]

    ctx.res.setHeader('Content-Security-Policy', cspDirectives.join('; '))
    ctx.res.setHeader('X-Content-Type-Options', 'nosniff')
    ctx.res.setHeader('X-Frame-Options', 'DENY')
    ctx.res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
    ctx.res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    ctx.res.setHeader('Access-Control-Allow-Origin', 'https://danielq.cloud')
    ctx.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
    ctx.res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    ctx.res.setHeader('Server', '')
    ctx.res.setHeader('X-Vercel-Id', '')
    ctx.res.setHeader('X-Vercel-Cache', '')
  }

  return {
    ...initialProps,
    nonce,
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  }
}

export default CustomDocument
