// Internal imports
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { UserService } from '@/services/UserService';

export function adminGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const loggedUser = UserService.getLoggedUser();

  if (!loggedUser || loggedUser.type !== 'admin') {
    return next('/login');
  }

  next();
}
