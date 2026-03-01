import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { MovieInterface } from '@/interfaces/MovieInterface.js';

export const useMovieStore = defineStore('movie', () => {
  const movies = ref<MovieInterface[]>([]);

  return { movies };
});
