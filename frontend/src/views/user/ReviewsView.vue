<script setup lang="ts">
import { ReviewService } from '@/services/ReviewService.js';
import StyledButton from '@/components/StyledButton.vue';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { UserService } from '@/services/UserService';
import { useReviewStore } from '@/stores/reviewstore';

const reviews = ReviewService.getReviews();
const loggedUser = UserService.getLoggedUser()

function canDelete(review: ReviewInterface) {
  if (!loggedUser) return false

  return (
    review.user.id === loggedUser.id ||
    loggedUser.type === 'admin'
  )
}
const reviewStore = useReviewStore()

function deleteReview(id: number) {
  const loggedUser = UserService.getLoggedUser()
  if (!loggedUser) return

  const review = reviewStore.reviews.find(r => r.id === id)
  if (!review) return

  if (
    review.user.id !== loggedUser.id &&
    loggedUser.type !== 'admin'
  ) {
    alert("You cannot delete this review")
    return
  }

  reviewStore.reviews = reviewStore.reviews.filter(r => r.id !== id)
}

</script>

<template>
  <section>
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-end mb-6">
        <StyledButton to="/reviews/create" :showIcon="true">
          Add Review
        </StyledButton>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="review in reviews" :key="review.id">
          <div
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-200 overflow-hidden">

            <!-- Movie banner -->
            <div class="relative h-36 bg-gray-100">
              <img :src="review.movie.image" :alt="review.movie.title" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <span class="absolute bottom-2 left-3 text-white text-sm font-semibold drop-shadow">
                {{ review.movie.title }}
              </span>
            </div>

            <!-- Comment -->
            <div class="px-5 pt-4 pb-2">
              <p class="text-gray-800 text-sm leading-relaxed">"{{ review.comment }}"</p>
            </div>

            <!-- User + Rating -->
            <div class="flex items-center justify-between px-5 py-4 border-t border-gray-100 mt-2">
              <div class="flex items-center gap-3">
                <img :src="review.user.image" :alt="review.user.username"
                  class="w-10 h-10 object-cover rounded-full ring-2 ring-purple-400" />
                <span class="text-sm font-semibold text-gray-700">{{ review.user.username }}</span>
              </div>
              <div class="flex items-center gap-1 bg-yellow-50 border border-yellow-200 rounded-full px-3 py-1">
                <span class="text-yellow-500 text-sm">⭐</span>
                <span class="text-sm font-bold text-yellow-600">{{ review.rating }}/5</span>
              </div>
              <button v-if="canDelete(review)" @click="deleteReview(review.id)" class="text-red-500 text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>