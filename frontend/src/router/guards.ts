import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { UserService } from '@/services/UserService';

export function adminGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const isLogged = UserService.isLogged();
  const isAdmin = UserService.isAdmin();

  if (to.meta.requiresAuth && !isLogged) {
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    });
    return;
  }

  if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: 'home' });
    return;
  }

  if (to.meta.guestOnly && isLogged) {
    next({ name: 'home' });
    return;
  }

  next();
}
