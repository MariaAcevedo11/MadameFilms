import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { AuthService } from '@/services/AuthService';

export function requiresAdmin(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  if (!AuthService.isAdmin()) return next('/login');
  next();
}
