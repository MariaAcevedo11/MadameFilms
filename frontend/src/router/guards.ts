// External imports
import type { RouteLocationNormalized } from 'vue-router';

// Internal imports
import { AuthService } from '@/services/AuthService';

export async function guards(to: RouteLocationNormalized) {
  const isLogged = await AuthService.isLogged();
  const isAdmin = await AuthService.isAdmin();

  if (to.meta.requiresAuth && !isLogged) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  if (to.meta.requiresAdmin && !isAdmin) {
    return { name: 'home' };
  }

  if (to.meta.guestOnly && isLogged) {
    return { name: 'home' };
  }
}
