// Author: Gabriela Sanabria
// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';
import { useUserStore } from '@/stores/userstore';

// Functions
export class UserService {
  static getUserById(id: number): UserInterface | undefined {
    return useUserStore().users.find((user) => user.id === id);
  }
}
