<script setup lang="ts">
import { ReviewService } from '@/services/ReviewService.js';

const reviews = ReviewService.getReviews();

</script>

<template>
  <section>
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-end mb-6">
        <RouterLink to="/reviews/create"
          class="inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded hover:bg-blue-700 transition">+ Add
          Review</RouterLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="review in reviews" :key="review.id">
          <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 border border-gray-200">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xl font-semibold text-gray-800">
                {{ review.comment }}

                {{ review.date }}
              </h3>
            </div>

            <div class="flex justify-center mb-4">
              <img src="https://picsum.photos/seed/picsum/536/354" alt="review Cover"
                class="object-cover rounded shadow-sm w-full h-auto" />
            </div>

            <p class="text-gray-500 text-sm mb-3">
              <i class="fas fa-tag mr-2"></i>
              {{ review.user }}
            </p>

            <div class="bg-gray-50 rounded-lg p-3 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Price:</span>
                <span class="font-semibold">${{ review.rating }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
