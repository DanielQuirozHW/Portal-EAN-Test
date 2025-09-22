import createCache from '@emotion/cache'

const resolveNonce = providedNonce => {
  if (providedNonce) {
    return providedNonce
  }

  if (typeof document !== 'undefined') {
    const meta = document.querySelector('meta[name="csp-nonce"]')

    if (meta) {
      return meta.getAttribute('content') || undefined
    }
  }

  return undefined
}

export const createEmotionCache = (options = {}) => {
  const { nonce, ...cacheOptions } = options
  const resolvedNonce = resolveNonce(nonce)

  return createCache({ key: 'css', prepend: true, nonce: resolvedNonce, ...cacheOptions })
}
