import type { RouteLocationNormalized } from 'vue-router';
import { AuthService } from '@/services/AuthService';

export async function guards(to: RouteLocationNormalized) {
  try {
    const user = await AuthService.getCurrentUser();
    const isLogged = !!user;
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
  } catch (err) {
    if (to.meta.requiresAuth) {
      return { name: 'login', query: { redirect: to.fullPath } };
    }
  }
}
