// Author: Gaby
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';
import { useMovieStore } from '@/stores/moviestore';
import { useActressStore } from '@/stores/actressestore';
import { useReviewStore } from '@/stores/reviewstore';

Chart.register(...registerables);

const movieStore = useMovieStore();
const actressStore = useActressStore();
const reviewStore = useReviewStore();

const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const totalMovies = computed(() => movieStore.movies.length);
const totalActresses = computed(() => actressStore.actresses.length);

const averageRating = computed(() => {
  if (reviewStore.reviews.length === 0) return 0;
  const sum = reviewStore.reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviewStore.reviews.length).toFixed(1);
});

const recentReviews = computed(() => {
  return reviewStore.reviews
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
});

const genreChart = computed(() => {
  const genreCount: Record<string, number> = {};

  movieStore.movies.forEach((movie) => {
    genreCount[movie.genre] = (genreCount[movie.genre] || 0) + 1;
  });

  const genres = Object.keys(genreCount);
  const counts = Object.values(genreCount);

  return { genres, counts };
});

const createChart = () => {
  if (!chartRef.value || genreChart.value.genres.length === 0) return;

  const ctx = chartRef.value.getContext('2d');
  if (!ctx) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  const config: ChartConfiguration = {
    type: 'pie',
    data: {
      labels: genreChart.value.genres,
      datasets: [
        {
          data: genreChart.value.counts,
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
          labels: {
            padding: 20,
            font: {
              size: 12,
            },
          },
        },
      },
    },
  };

  chartInstance = new Chart(ctx, config);
};

onMounted(() => {
  createChart();
});
</script>

<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-white text-center mb-12">MadameFilms Dashboard</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white rounded-lg shadow-md p-6 border border-purple-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 mr-4">
              <svg
                class="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H3a1 1 0 0 1 0-2h4z"
                ></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Total Movies</p>
              <p class="text-3xl font-bold text-purple-900">{{ totalMovies }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border border-purple-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 mr-4">
              <svg
                class="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"
                ></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Total Actresses</p>
              <p class="text-3xl font-bold text-purple-900">{{ totalActresses }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border border-purple-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 mr-4">
              <svg
                class="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                ></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Average Rating</p>
              <p class="text-3xl font-bold text-purple-900">{{ averageRating }}/5</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div class="bg-white rounded-lg shadow-md p-6 border border-purple-100">
          <h2 class="text-2xl font-bold text-purple-900 mb-6">Movies by Genre</h2>
          <div class="h-80">
            <canvas ref="chartRef"></canvas>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border border-purple-100">
          <h2 class="text-2xl font-bold text-purple-900 mb-6">Recent Reviews</h2>

          <div v-if="recentReviews.length === 0" class="text-center py-8">
            <p class="text-gray-500">No reviews available yet.</p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="review in recentReviews"
              :key="review.id"
              class="border border-purple-100 rounded-lg p-4 hover:bg-purple-50 transition-colors"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center space-x-2">
                  <span class="font-semibold text-purple-900">{{ review.user.username }}</span>
                  <span class="text-gray-500">•</span>
                  <span class="text-sm text-gray-600">{{ review.movie.title }}</span>
                </div>
                <div class="flex items-center">
                  <div class="flex text-yellow-400">
                    <svg
                      v-for="star in 5"
                      :key="star"
                      class="w-4 h-4"
                      :class="star <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.922-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>
                  <span class="ml-1 text-sm font-medium text-gray-700">{{ review.rating }}/5</span>
                </div>
              </div>

              <p class="text-gray-700 mb-2">{{ review.comment }}</p>

              <div class="text-xs text-gray-500">
                {{
                  new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
