// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Context Imports
import { AbilityContext } from '@/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from '@/configs/acl'

// ** Component Import
// import NotAuthorized from 'src/pages/401'
import Spinner from '../../../@core/components/spinner'
import BlankLayout from '../../../@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from '../../../hooks/useAuth'

// ** Util Import
import getHomeRoute from '@/layouts/components/acl/getHomeRoute'

const AclGuard = props => {
  // ** Props
  const { aclAbilities = { action: '', subject: '' }, children, guestGuard = false, authGuard = true } = props

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  // ** Vars
  let ability
  useEffect(() => {
  
    const excludedRoutes = ['/login', '/login-portal', '/login-admin', '/olvidaste-contrasena', '/registro', '/404', '/401']; 
  
    const generalRoutes = ['/', '/universidad-interna', '/perfil'];
  
    if (auth.user && !guestGuard) {
      const allowedRoutesByRole = {
        docente: ['/desempeno', '/gd-responde','/asignaciones','/asignaciones/divisiones','/asignaciones/actividades',
          '/asignaciones/planificacion-unificada','/area-academica/formacion','/area-academica/desempenio-profesional',
          '/area-academica/docencia-univeritaria','/area-academica/gestion-academica','/area-academica/desempenio-no-academica',
          '/area-academica/investigacion','/area-academica/reuniones-cientificas','/area-academica/comites-jurados',
          '/area-academica/otra-informacion','/evaluacion-profesoral', '/licencias', '/calendario'
        ], // Rutas para docentes
        codocente: ['/evaluacion-profesoral',],
      };
  
      const allowedRoutes = allowedRoutesByRole[auth.user.puesto] || [];
  
      const isGeneralRoute = generalRoutes.includes(router.route);
      const isAllowedRoute = allowedRoutes.includes(router.route);
  
      if (auth.user.puesto === 'docente') { 
        if (auth.user.tieneED == false) {

          const allowedForNoED = ['/informacion', '/area-academica/formacion'];
          const isAllowedForNoED = allowedForNoED.includes(router.route);
          if (!isAllowedForNoED) {
            if (router.route !== '/informacion') {
              router.replace('/informacion');
            }
          }
        } else if (auth.user.tieneED == true) {

          if (!isGeneralRoute && !isAllowedRoute && !excludedRoutes.includes(router.route)) {
            if (router.route !== '/401') {
              router.replace('/401');
            }
          }
        }
      } else if (auth.user.puesto === 'codocente'){

        if (!isGeneralRoute && !isAllowedRoute && !excludedRoutes.includes(router.route)) {
          if (router.route !== '/401') {
            router.replace('/401');
          }
        }
      }
    }
  }, [auth.user, guestGuard, router]);
  
  
  
  return <>{children}</>
  // If guest guard or no guard is true or any error page
  // if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard) {
  //   // If user is logged in and his ability is built
  //   if (auth.user && ability) {
  //     return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  //   } else {
  //     // If user is not logged in (render pages like login, register etc..)
  //     return <>{children}</>
  //   }
  // }

  // // Check the access of current user and render pages
  // if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
  //   if (router.route === '/') {
  //     return <Spinner />
  //   }

  //   return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  // }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      {/* <NotAuthorized /> */}
      <>No estas autorizado</>
    </BlankLayout>
  )
}

export default AclGuard
