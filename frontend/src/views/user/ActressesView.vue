<!-- Author: Gaby -->
<script setup lang="ts">
// External imports
import { Chart, registerables } from 'chart.js';
import { computed, onMounted, ref } from 'vue';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Internal imports
import type { ActressInterface } from '@/interfaces/ActressInterface';
import { ActressService } from '@/services/ActressService';

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

const modules = [Navigation, Pagination];
const ROWS_PER_PAGE = 5;

// Reactive variables
const actresses = ref<ActressInterface[]>([]);
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const currentPage = ref<number>(1);
const searchQuery = ref<string>('');
const selectedNationality = ref<string>('All');

// Computed variables
const filteredActresses = computed<ActressInterface[]>(() => {
  currentPage.value = 1;

  return actresses.value.filter((a) => {
    const byNationality =
      selectedNationality.value === 'All' || a.nationality === selectedNationality.value;

    const byName = a.fullName.toLowerCase().includes(searchQuery.value.toLowerCase());

    return byNationality && byName;
  });
});

const nationalities = computed<string[]>(() => {
  const unique = [...new Set(actresses.value.map((a) => a.nationality))];
  return ['All', ...unique.sort()];
});

const nationalityCounts = computed<Record<string, number>>(() => {
  return actresses.value.reduce(
    (acc, a) => {
      acc[a.nationality] = (acc[a.nationality] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
});

const paginatedActresses = computed<ActressInterface[]>(() => {
  const start = (currentPage.value - 1) * ROWS_PER_PAGE;
  return filteredActresses.value.slice(start, start + ROWS_PER_PAGE);
});

const totalPages = computed<number>(() =>
  Math.ceil(filteredActresses.value.length / ROWS_PER_PAGE),
);

// Lifecycle hooks
onMounted(() => {
  actresses.value = ActressService.getActress();
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

  const labels = Object.keys(nationalityCounts.value);

  new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Actresses',
          data: Object.values(nationalityCounts.value),
          backgroundColor: labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y} actress${ctx.parsed.y !== 1 ? 'es' : ''}`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
          grid: { color: 'rgba(0,0,0,0.05)' },
        },
        x: {
          grid: { display: false },
        },
      },
    },
  });
}
</script>

<template>
  <section class="mt-4 mb-8 px-2">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h2 class="text-3xl font-bold text-white font-mono">Actresses</h2>
        <RouterLink to="/" class="text-sm text-purple-300 hover:text-white transition-colors">
          ← Back
        </RouterLink>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-4 items-center">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name..."
          class="px-4 py-2 rounded-lg border border-purple-300 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-56"
        />
        <div class="relative">
          <select
            v-model="selectedNationality"
            class="appearance-none px-4 py-2 pr-8 rounded-lg border border-purple-300 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          >
            <option v-for="nat in nationalities" :key="nat" :value="nat">
              {{ nat === 'All' ? 'All Nationalities' : nat }}
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
        <span class="text-purple-300 text-sm">
          {{ filteredActresses.length }} result{{ filteredActresses.length !== 1 ? 's' : '' }}
        </span>
      </div>

      <!-- Table + Chart -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Table with pagination -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow overflow-hidden flex flex-col">
          <table class="w-full text-sm">
            <thead class="bg-purple-100 text-purple-900">
              <tr>
                <th class="px-4 py-3 text-left font-semibold">#</th>
                <th class="px-4 py-3 text-left font-semibold">Name</th>
                <th class="px-4 py-3 text-left font-semibold">Nationality</th>
                <th class="px-4 py-3 text-left font-semibold">Movies</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(actress, index) in paginatedActresses"
                :key="actress.id"
                class="border-t border-gray-100 hover:bg-purple-50 transition-colors"
              >
                <td class="px-4 py-3 text-gray-400">
                  {{ (currentPage - 1) * 5 + index + 1 }}
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <img
                      :src="actress.image"
                      :alt="actress.fullName"
                      class="w-8 h-8 rounded-full object-cover"
                    />
                    <span class="font-medium text-gray-800">{{ actress.fullName }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-600">{{ actress.nationality }}</td>
                <td class="px-4 py-3 text-gray-600 text-xs">{{ actress.movies }}</td>
              </tr>
              <tr v-if="filteredActresses.length === 0">
                <td colspan="4" class="px-4 py-8 text-center text-gray-400">No actresses found.</td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div
            v-if="totalPages > 1"
            class="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50"
          >
            <span class="text-xs text-gray-500"> Page {{ currentPage }} of {{ totalPages }} </span>
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

        <!-- Colorful chart -->
        <div class="bg-white rounded-2xl shadow p-4 flex flex-col">
          <h3 class="text-sm font-semibold text-purple-900 mb-3">By Nationality</h3>
          <div class="flex-1 flex items-center justify-center">
            <canvas ref="chartCanvas" />
          </div>
        </div>
      </div>

      <!-- Actress cards carousel -->
      <div class="bg-white/5 rounded-2xl p-4">
        <h3 class="text-white font-semibold mb-4 text-lg">Actress Profiles</h3>
        <Swiper
          :modules="modules"
          :slides-per-view="1.1"
          :space-between="16"
          :navigation="true"
          :pagination="{ clickable: true }"
          :breakpoints="{
            640: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3.1 },
          }"
          class="w-full pb-10"
        >
          <SwiperSlide v-for="actress in filteredActresses" :key="actress.id">
            <div class="bg-white rounded-2xl shadow p-5 flex gap-4 h-full">
              <img
                :src="actress.image"
                :alt="actress.fullName"
                class="w-14 h-14 rounded-full object-cover shrink-0"
              />
              <div class="overflow-hidden">
                <p class="font-semibold text-gray-800 truncate">{{ actress.fullName }}</p>
                <p class="text-xs text-purple-600 mb-2">{{ actress.nationality }}</p>
                <p class="text-sm text-gray-500 line-clamp-3">{{ actress.biography }}</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide v-if="filteredActresses.length === 0">
            <div class="bg-white rounded-2xl shadow p-5 text-center text-gray-400 text-sm">
              No actresses match your filters.
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>
