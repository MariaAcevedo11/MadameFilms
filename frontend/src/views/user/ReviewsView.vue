<script setup lang="ts">

// External imports
import { ref, computed } from 'vue'

// Internal imports
import { ReviewService } from '@/services/ReviewService.js'
import StyledButtonComponent from '@/components/StyledButtonComponent.vue'
import type { ReviewInterface } from '@/interfaces/ReviewInterface'
import { useReviewStore } from '@/stores/reviewstore'

// Variables
// (none)

// Reactive variables
const reviewStore = useReviewStore()
const editingReviewId = ref<number | null>(null)
const editForm = ref({ rating: 5, comment: '' })

// Computed
const reviews = computed(() => reviewStore.reviews)

// Functions
function startEdit(review: ReviewInterface) {
  editingReviewId.value = review.id
  editForm.value = { rating: review.rating, comment: review.comment }
}

function cancelEdit() {
  editingReviewId.value = null
}

function saveEdit() {
  if (editingReviewId.value === null) return

  try {
    ReviewService.updateReview(editingReviewId.value, {
      rating: editForm.value.rating,
      comment: editForm.value.comment.trim(),
    })

    editingReviewId.value = null
  } catch (err) {
    alert(err instanceof Error ? err.message : 'Failed to update review')
  }
}

</script>

<template>
  <section>
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-end mb-6">
        <StyledButtonComponent to="/reviews/create" :showIcon="true">
          Add Review
        </StyledButtonComponent>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="review in reviews" :key="review.id">
          <div
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-200 overflow-hidden">

            <!-- Movie banner -->
            <div class="relative h-36 bg-gray-100">
              <img :src="review.movie.image" :alt="review.movie.title" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              <span class="absolute bottom-2 left-3 text-white text-sm font-semibold drop-shadow">
                {{ review.movie.title }}
              </span>
            </div>

            <!-- Comment or Edit form -->
            <div class="px-5 pt-4 pb-2">
              <template v-if="editingReviewId === review.id">
                <label class="block text-gray-700 text-xs font-semibold mb-1">Rating</label>
                <select v-model.number="editForm.rating"
                  class="w-full border border-gray-300 rounded py-1.5 px-2 text-sm mb-3 focus:outline-none focus:ring focus:border-purple-300">
                  <option v-for="n in 5" :key="n" :value="n">{{ n }} star{{ n > 1 ? 's' : '' }}</option>
                </select>
                <label class="block text-gray-700 text-xs font-semibold mb-1">Comment</label>
                <textarea v-model="editForm.comment" rows="3"
                  class="w-full border border-gray-300 rounded py-1.5 px-2 text-sm focus:outline-none focus:ring focus:border-purple-300"
                  placeholder="Your comment..." />
              </template>
              <p v-else class="text-gray-800 text-sm leading-relaxed">"{{ review.comment }}"</p>
            </div>

            <!-- User + Rating + Actions -->
            <div class="flex items-center justify-between px-5 py-4 border-t border-gray-100 mt-2">
              <div class="flex items-center gap-3">
                <img :src="review.user.image" :alt="review.user.username"
                  class="w-10 h-10 object-cover rounded-full ring-2 ring-purple-400" />
                <span class="text-sm font-semibold text-gray-700">{{ review.user.username }}</span>
              </div>
              <template v-if="editingReviewId === review.id">
                <div class="flex items-center gap-2">
                  <button @click="saveEdit" type="button"
                    class="text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded px-3 py-1.5 transition">
                    Save
                  </button>
                  <button @click="cancelEdit" type="button"
                    class="text-sm font-medium text-gray-600 hover:text-gray-800 rounded px-3 py-1.5 transition">
                    Cancel
                  </button>
                </div>
              </template>
              <template v-else>
                <div class="flex items-center gap-2">
                  <div class="flex items-center gap-1 bg-yellow-50 border border-yellow-200 rounded-full px-3 py-1">
                    <span class="text-yellow-500 text-sm">⭐</span>
                    <span class="text-sm font-bold text-yellow-600">{{ review.rating }}/5</span>
                  </div>
                  <button v-if="ReviewService.canEdit(review)" @click="startEdit(review)" type="button"
                    class="text-purple-600 text-sm font-medium hover:text-purple-800">
                    Edit
                  </button>
                  <button v-if="ReviewService.canDelete(review)" @click="ReviewService.deleteReview(review.id)"
                    type="button" class="text-red-500 text-sm hover:text-red-700">
                    Delete
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>