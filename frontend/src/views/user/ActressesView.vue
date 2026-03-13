<!-- Author: Gaby -->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';
import { ActressService } from '@/services/ActressService';
import type { ActressInterface } from '@/interfaces/ActressInterface';

Chart.register(...registerables);

const actresses = ref<ActressInterface[]>([]);
const selectedNationality = ref<string>('All');
const searchQuery = ref<string>('');
const chartCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  actresses.value = ActressService.getActress();
  renderChart();
});

const nationalities = computed<string[]>(() => {
  const unique = [...new Set(actresses.value.map((a) => a.nationality))];
  return ['All', ...unique.sort()];
});

const filteredActresses = computed<ActressInterface[]>(() => {
  return actresses.value.filter((a) => {
    const byNationality =
      selectedNationality.value === 'All' || a.nationality === selectedNationality.value;
    const byName = a.fullName.toLowerCase().includes(searchQuery.value.toLowerCase());
    return byNationality && byName;
  });
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

function renderChart(): void {
  if (!chartCanvas.value) return;

  new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: Object.keys(nationalityCounts.value),
      datasets: [
        {
          label: 'Actresses',
          data: Object.values(nationalityCounts.value),
          backgroundColor: 'rgba(147, 51, 234, 0.7)',
          borderColor: 'rgb(147, 51, 234)',
          borderWidth: 2,
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
    },
  });
}
</script>

<template>
  <section class="mt-4 mb-8 px-2">
    <div class="max-w-7xl mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-3xl font-bold text-white font-mono">Actresses</h2>
        <RouterLink to="/" class="text-sm text-purple-300 hover:text-white transition-colors">
          ← Back
        </RouterLink>
      </div>

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

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white rounded-2xl shadow overflow-hidden">
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
                v-for="(actress, index) in filteredActresses"
                :key="actress.id"
                class="border-t border-gray-100 hover:bg-purple-50 transition-colors"
              >
                <td class="px-4 py-3 text-gray-400">{{ index + 1 }}</td>
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
        </div>

        <div class="bg-white rounded-2xl shadow p-4 flex items-center justify-center">
          <canvas ref="chartCanvas" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="actress in filteredActresses"
          :key="actress.id"
          class="bg-white rounded-2xl shadow p-5 flex gap-4"
        >
          <img
            :src="actress.image"
            :alt="actress.fullName"
            class="w-14 h-14 rounded-full object-cover flex-shrink-0"
          />
          <div>
            <p class="font-semibold text-gray-800">{{ actress.fullName }}</p>
            <p class="text-xs text-purple-600 mb-2">{{ actress.nationality }}</p>
            <p class="text-sm text-gray-500">{{ actress.biography }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
