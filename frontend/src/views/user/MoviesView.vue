<!-- Author: Gabriela Martinez -->
<script setup lang="ts">
// External imports
import { Chart, registerables, type ChartConfiguration } from 'chart.js';
import { computed, onMounted, ref, watch } from 'vue';

// Internal imports
import type { MovieInterface } from '@/interfaces/MovieInterface';
import { ActressService } from '@/services/ActressService';
import { MovieService } from '@/services/MovieService';

// Forms
Chart.register(...registerables);

// Variables
const CHART_COLORS = [
  'rgba(168, 85, 247, 0.8)',
  'rgba(236, 72, 153, 0.8)',
  'rgba(59, 130, 246, 0.8)',
  'rgba(16, 185, 129, 0.8)',
  'rgba(245, 158, 11, 0.8)',
  'rgba(239, 68, 68, 0.8)',
  'rgba(99, 102, 241, 0.8)',
  'rgba(20, 184, 166, 0.8)',
];
const ROWS_PER_PAGE = 5;

// Reactive variables
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const currentPage = ref<number>(1);
const movies = ref<MovieInterface[]>([]);
const searchQuery = ref<string>('');
const selectedCountry = ref<string>('All');
const selectedGenre = ref<string>('All');
let chartInstance: Chart | null = null;

// Computed variables
const countries = computed<string[]>(() => {
  const unique = [...new Set(movies.value.map((m) => m.country))];
  return ['All', ...unique.sort()];
});

const countryCount = computed<Record<string, number>>(() => {
  return movies.value.reduce(
    (acc, m) => {
      acc[m.country] = (acc[m.country] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
});

const filteredMovies = computed<MovieInterface[]>(() => {
  return movies.value.filter((m) => {
    const byCountry = selectedCountry.value === 'All' || m.country === selectedCountry.value;
    const byGenre = selectedGenre.value === 'All' || m.genre === selectedGenre.value;
    const bySearch = m.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    return byCountry && byGenre && bySearch;
  });
});

const genres = computed<string[]>(() => {
  const unique = [...new Set(movies.value.map((m) => m.genre))];
  return ['All', ...unique.sort()];
});

const paginatedMovies = computed<MovieInterface[]>(() => {
  const start = (currentPage.value - 1) * ROWS_PER_PAGE;
  return filteredMovies.value.slice(start, start + ROWS_PER_PAGE);
});

const totalPages = computed<number>(() => Math.ceil(filteredMovies.value.length / ROWS_PER_PAGE));

// Lifecycle hooks
onMounted(() => {
  movies.value = MovieService.getMovies();
  renderChart();
});

// Functions
function nextPage(): void {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage(): void {
  if (currentPage.value > 1) currentPage.value--;
}

function renderChart(): void {
  if (!chartCanvas.value) return;
  if (chartInstance) chartInstance.destroy();

  const labels = Object.keys(countryCount.value);
  const config: ChartConfiguration = {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data: Object.values(countryCount.value),
          backgroundColor: labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
          borderColor: '#fff',
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 12, font: { size: 11 } },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${ctx.parsed} movie${ctx.parsed !== 1 ? 's' : ''}`,
          },
        },
      },
    },
  };

  chartInstance = new Chart(chartCanvas.value, config);
}

watch([searchQuery, selectedCountry, selectedGenre], () => {
  currentPage.value = 1;
});
</script>

<template>
  <section class="mt-4 mb-8 px-2">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h2 class="text-3xl font-bold text-white font-mono">Movies</h2>
        <span class="text-purple-300 text-sm">
          {{ filteredMovies.length }} result{{ filteredMovies.length !== 1 ? 's' : '' }}
        </span>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-3 items-center">
        <!-- Search -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by title..."
          class="px-4 py-2 rounded-lg border border-purple-300 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-52"
        />

        <!-- Genre selector -->
        <div class="relative">
          <select
            v-model="selectedGenre"
            class="appearance-none px-4 py-2 pr-8 rounded-lg border border-purple-300 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          >
            <option v-for="genre in genres" :key="genre" :value="genre">
              {{ genre === 'All' ? 'All Genres' : genre }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <svg
              class="w-4 h-4 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <!-- Country selector -->
        <div class="relative">
          <select
            v-model="selectedCountry"
            class="appearance-none px-4 py-2 pr-8 rounded-lg border border-purple-300 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          >
            <option v-for="country in countries" :key="country" :value="country">
              {{ country === 'All' ? 'All Countries' : country }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <svg
              class="w-4 h-4 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Table + Chart -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Table -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow overflow-hidden flex flex-col">
          <table class="w-full text-sm">
            <thead class="bg-purple-100 text-purple-900">
              <tr>
                <th class="px-4 py-3 text-left font-semibold">#</th>
                <th class="px-4 py-3 text-left font-semibold">Title</th>
                <th class="px-4 py-3 text-left font-semibold">Genre</th>
                <th class="px-4 py-3 text-left font-semibold">Country</th>
                <th class="px-4 py-3 text-left font-semibold">Duration</th>
                <th class="px-4 py-3 text-left font-semibold">Release</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(movie, index) in paginatedMovies"
                :key="movie.id"
                class="border-t border-gray-100 hover:bg-purple-50 transition-colors"
              >
                <td class="px-4 py-3 text-gray-400">
                  {{ (currentPage - 1) * ROWS_PER_PAGE + index + 1 }}
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <img
                      :src="movie.image"
                      :alt="movie.title"
                      class="w-8 h-10 rounded object-cover shrink-0"
                    />
                    <span class="font-medium text-gray-800 line-clamp-1">{{ movie.title }}</span>
                  </div>
                </td>
                <td class="px-4 py-3">
                  <span
                    class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium"
                  >
                    {{ movie.genre }}
                  </span>
                </td>
                <td class="px-4 py-3 text-gray-600">{{ movie.country }}</td>
                <td class="px-4 py-3 text-gray-600">{{ movie.durationMin }} min</td>
                <td class="px-4 py-3 text-gray-500 text-xs">
                  {{ new Date(movie.releaseDate).toLocaleDateString() }}
                </td>
              </tr>
              <tr v-if="filteredMovies.length === 0">
                <td colspan="6" class="px-4 py-8 text-center text-gray-400">No movies found.</td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div
            v-if="totalPages > 1"
            class="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50"
          >
            <span class="text-xs text-gray-500">Page {{ currentPage }} of {{ totalPages }}</span>
            <div class="flex gap-2">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-3 py-1 rounded-lg text-sm font-medium border border-purple-200 text-purple-700 hover:bg-purple-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Prev
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 rounded-lg text-sm font-medium border border-purple-200 text-purple-700 hover:bg-purple-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        <!-- Chart -->
        <div class="bg-white rounded-2xl shadow p-4 flex flex-col">
          <h3 class="text-sm font-semibold text-purple-900 mb-3">Movies by Country</h3>
          <div class="flex-1 flex items-center justify-center" style="min-height: 260px">
            <canvas ref="chartCanvas" />
          </div>
        </div>
      </div>

      <!-- Cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="movie in filteredMovies"
          :key="movie.id"
          class="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-purple-100 overflow-hidden"
        >
          <img :src="movie.image" :alt="movie.title" class="w-full h-48 object-cover" />
          <div class="p-5 space-y-3">
            <div class="flex items-start justify-between gap-2">
              <h3 class="text-lg font-bold text-purple-900 line-clamp-1">{{ movie.title }}</h3>
              <span
                class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full whitespace-nowrap shrink-0"
              >
                {{ movie.genre }}
              </span>
            </div>

            <p class="text-gray-500 text-sm line-clamp-2">{{ movie.description }}</p>

            <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 pt-1">
              <p>
                <span class="font-semibold text-purple-700">Director:</span> {{ movie.director }}
              </p>
              <p>
                <span class="font-semibold text-purple-700">Duration:</span>
                {{ movie.durationMin }} min
              </p>
              <p><span class="font-semibold text-purple-700">Country:</span> {{ movie.country }}</p>
              <p>
                <span class="font-semibold text-purple-700">Language:</span> {{ movie.language }}
              </p>
              <p class="col-span-2">
                <span class="font-semibold text-purple-700">Release:</span>
                {{ new Date(movie.releaseDate).toLocaleDateString() }}
              </p>
            </div>

            <div class="pt-2 border-t border-purple-100 text-xs text-gray-500">
              <span class="font-semibold text-purple-700">Cast:</span> {{ movie.cast }}
            </div>

            <div v-if="movie.actressId" class="bg-purple-50 rounded-lg px-3 py-2 text-xs">
              ⭐
              <span class="font-semibold text-purple-800">
                {{ ActressService.getActressById(movie.actressId)?.fullName }}
              </span>
            </div>
          </div>
        </div>

        <div
          v-if="filteredMovies.length === 0"
          class="col-span-3 text-center text-purple-300 py-12"
        >
          No movies match your filters.
        </div>
      </div>
    </div>
  </section>
</template>
