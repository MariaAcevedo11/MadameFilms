import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { UserService } from '@/services/UserService';

export function adminGuard(to: RouteLocationNormalized) {
  const isLogged = UserService.isLogged()
  const isAdmin = UserService.isAdmin()

  if (to.meta.requiresAuth && !isLogged) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.requiresAdmin && !isAdmin) {
    return { name: 'home' }
  }

  if (to.meta.guestOnly && isLogged) {
    return { name: 'home' }
  }
}
