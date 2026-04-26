// Author: Gabriela Martinez

import type { CreateUserDTO } from '@/dtos/CreateUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';
import { UserService } from '@/services/UserService';


import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as UserInterface[],
    loading: false as boolean,
  }),

  actions: {
    async fetchUsers(): Promise<void> {
      this.loading = true;

      try {
        this.users = await UserService.getUsers();
      } finally {
        this.loading = false;
      }
    },

    async addUser(userData: CreateUserDTO): Promise<UserInterface | null> {
      try {
        const newUser = await UserService.createUser(userData);
        this.users.push(newUser);
        return newUser;
      } catch {
        return null;
      }
    },

    async deleteUserById(id: number): Promise<boolean> {
      try {
        await UserService.deleteUser(id);

        this.users = this.users.filter((user) => user.id !== id);
        return true;
      } catch {
        return false;
      }
    },
  },
});
