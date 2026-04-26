// Author: Maria Acevedo
import type { UserInterface } from '@/interfaces/UserInterface';

export type CreateUserDTO = Omit<UserInterface, 'id'>;
