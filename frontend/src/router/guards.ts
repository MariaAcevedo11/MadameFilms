// External imports
import type { RouteLocationNormalized } from 'vue-router';

// Internal imports
import { AuthService } from '@/services/AuthService';

export async function guards(to: RouteLocationNormalized) {
  let isLogged = false;
  let isAdmin = false;
  try {
    isLogged = await AuthService.isLogged();
    isAdmin = await AuthService.isAdmin();
  } catch {}

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
