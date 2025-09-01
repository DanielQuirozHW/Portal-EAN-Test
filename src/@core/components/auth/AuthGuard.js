// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from '../../../hooks/useAuth'

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router && !router.isReady) {
      return
    }

    if (
      !auth.user && 
      !auth.loading && 
      !['/ingresantes', '/login', '/login-portal', '/login-admin', '/olvidaste-contrasena',
        '/registro', '/404', '/401'].includes(router.route)
    ) {

      router.replace('/login');
    } else {
      // debugger
    }
  }, [router.isReady, router.route, auth.user,auth.loading])

  if (!router.isReady || auth.loading) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard