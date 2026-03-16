<!-- Author: Gabriela Martinez -->
<script setup lang="ts">
// External imports
import { Chart, registerables, type ChartConfiguration } from 'chart.js';
import { computed, onMounted, ref } from 'vue';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Internal imports
import { ActressService } from '@/services/ActressService';
import type { MovieInterface } from '@/interfaces/MovieInterface';
import { MovieService } from '@/services/MovieService';
import { ReviewService } from '@/services/ReviewService';
import { UserService } from '@/services/UserService';

// Forms
Chart.register(...registerables);

// Variables
const modules = [Navigation, Pagination];
let chartInstance: Chart | null = null;

// Reactive variables
const chartRef = ref<HTMLCanvasElement | null>(null);
const movies = ref<MovieInterface[]>([]);

// Computed variables
const averageRating = computed(() => {
  const reviews = ReviewService.getReviews();
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return (sum / reviews.length).toFixed(1);
});

const genreData = computed(() => {
  const count: Record<string, number> = {};

  MovieService.getMovies().forEach((m) => {
    count[m.genre] = (count[m.genre] || 0) + 1;
  });

  return count;
});

const recentReviews = computed(() => {
  return ReviewService.getReviews()
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
});

const totalActresses = computed(() => ActressService.getActress().length);

const totalMovies = computed(() => MovieService.getMovies().length);

// Lifecycle hooks
onMounted(() => {
  movies.value = MovieService.getMovies();
  createChart();
});

// Functions
function createChart(): void {
  if (!chartRef.value || Object.keys(genreData.value).length === 0) return;

  const ctx = chartRef.value.getContext('2d');
  if (!ctx) return;

  if (chartInstance) chartInstance.destroy();

  const config: ChartConfiguration = {
    type: 'pie',
    data: {
      labels: Object.keys(genreData.value),
      datasets: [
        {
          data: Object.values(genreData.value),
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 20, font: { size: 12 } },
        },
      },
    },
  };

  chartInstance = new Chart(ctx, config);
}
</script>

<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <h1 class="text-4xl font-bold text-white text-center tracking-tight">Madame Films</h1>

      <!-- Carrusel -->
      <Swiper
        :modules="modules"
        :slides-per-view="2.3"
        :space-between="16"
        :navigation="true"
        :pagination="{ clickable: true }"
        :breakpoints="{ 640: { slidesPerView: 2.3 }, 1024: { slidesPerView: 3.2 } }"
        class="w-full pb-10"
      >
        <SwiperSlide v-for="movie in movies" :key="movie.id">
          <div class="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer">
            <img
              :src="movie.image"
              :alt="movie.title"
              class="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            />
            <div class="absolute bottom-0 left-0 p-4">
              <h2 class="text-white font-bold text-lg line-clamp-1">{{ movie.title }}</h2>
              <div class="flex gap-2 mt-1">
                <span class="text-xs bg-purple-500/80 text-white px-2 py-0.5 rounded-full">{{
                  movie.genre
                }}</span>
                <span class="text-xs text-gray-300">{{ movie.durationMin }} min</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          class="rounded-2xl bg-white border border-purple-100 p-6 flex items-center gap-4 shadow-md"
        >
          <div class="p-3 rounded-xl bg-purple-100">
            <svg
              class="w-7 h-7 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H3a1 1 0 0 1 0-2h4z"
              />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Total Movies</p>
            <p class="text-4xl font-bold text-purple-900">{{ totalMovies }}</p>
          </div>
        </div>

        <div
          class="rounded-2xl bg-white border border-purple-100 p-6 flex items-center gap-4 shadow-md"
        >
          <div class="p-3 rounded-xl bg-purple-100">
            <svg
              class="w-7 h-7 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"
              />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Total Actresses</p>
            <p class="text-4xl font-bold text-purple-900">{{ totalActresses }}</p>
          </div>
        </div>

        <div
          class="rounded-2xl bg-white border border-purple-100 p-6 flex items-center gap-4 shadow-md"
        >
          <div class="p-3 rounded-xl bg-purple-100">
            <svg
              class="w-7 h-7 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Average Rating</p>
            <p class="text-4xl font-bold text-purple-900">
              {{ averageRating }}<span class="text-lg text-gray-400">/5</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Chart + Reviews -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="rounded-2xl bg-white p-6 shadow-lg">
          <h2 class="text-xl font-bold text-purple-900 mb-4">Movies by Genre</h2>
          <div class="h-72">
            <canvas ref="chartRef"></canvas>
          </div>
        </div>

        <div class="rounded-2xl bg-white p-6 shadow-lg">
          <h2 class="text-xl font-bold text-purple-900 mb-4">Recent Reviews</h2>
          <div v-if="recentReviews.length === 0" class="text-center py-8 text-gray-400">
            No reviews yet.
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="review in recentReviews"
              :key="review.id"
              class="rounded-xl border border-purple-100 p-4 hover:bg-purple-50 transition-colors"
            >
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center gap-2">
                  <img
                    :src="UserService.getUserById(review.userId)?.image"
                    :alt="UserService.getUserById(review.userId)?.username"
                    class="w-8 h-8 rounded-full object-cover"
                  />
                  <span class="font-semibold text-purple-900 text-sm">
                    {{ UserService.getUserById(review.userId)?.username ?? 'Unknown' }}
                  </span>
                </div>
                <span
                  class="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full"
                >
                  ★ {{ review.rating }}/5
                </span>
              </div>
              <p class="text-gray-600 text-sm mt-2">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
