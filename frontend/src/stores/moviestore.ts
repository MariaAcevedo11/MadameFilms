// Author: Gabriela Sanabria
// External imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Internal imports
import type { MovieInterface } from '@/interfaces/MovieInterface.js';

export const useMovieStore = defineStore('movie', () => {
  const movies = ref<MovieInterface[]>([]);

  return { movies };
});
