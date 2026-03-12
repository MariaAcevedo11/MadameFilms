// Internal imports
import type { ActressInterface } from '@/interfaces/ActressInterface';
import { useActressStore } from '@/stores/actressestore';

// Variables
// (none)

// Reactive variables
// (none)

// Functions
export class ActressService {
  static getActress(): ActressInterface[] {
    return useActressStore().actresses;
  }

  static getActressById(id: number): ActressInterface | undefined {
    return useActressStore().actresses.find((actress) => actress.id === id);
  }
}
