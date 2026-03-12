<script setup lang="ts">

// Internal imports
import { MovieService } from '@/services/MovieService'

// Variables
const movies = MovieService.getMovies()

</script>

<template>
  <section class="max-w-7xl mx-auto py-10 px-6">
    <p class="text-gray-600 mb-8">
      Movie catalog.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="movie in movies" :key="movie.id"
        class="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-purple-100 overflow-hidden">
        <!-- Image -->
        <img :src="movie.image" alt="Movie Cover" class="w-full h-56 object-cover" />

        <!-- Content -->
        <div class="p-6 space-y-3">
          <!-- Title + Delete -->
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-bold text-purple-900">
              {{ movie.title }}
            </h3>
          </div>

          <!-- Description -->
          <p class="text-gray-600 text-sm line-clamp-3">
            {{ movie.description }}
          </p>

          <!-- Info Grid -->
          <div class="grid grid-cols-2 gap-2 text-sm mt-4">
            <p><span class="font-semibold text-purple-700">Genre:</span> {{ movie.genre }}</p>
            <p><span class="font-semibold text-purple-700">Duration:</span> {{ movie.durationMin }} min</p>
            <p><span class="font-semibold text-purple-700">Director:</span> {{ movie.director }}</p>
            <p><span class="font-semibold text-purple-700">Country:</span> {{ movie.country }}</p>
            <p><span class="font-semibold text-purple-700">Language:</span> {{ movie.language }}</p>
            <p>
              <span class="font-semibold text-purple-700">Release:</span>
              {{ new Date(movie.releaseDate).toLocaleDateString() }}
            </p>
          </div>

          <!-- Cast -->
          <div class="pt-3 border-t border-purple-100 text-sm">
            <span class="font-semibold text-purple-700">Cast:</span>
            <p class="text-gray-600">{{ movie.cast }}</p>
          </div>

          <!-- Actress (optional) -->
          <div v-if="movie.actress" class="bg-purple-50 rounded-lg p-3 mt-3 text-sm">
            ⭐ Featured Actress:
            <span class="font-semibold text-purple-800">
              {{ movie.actress.fullName }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>