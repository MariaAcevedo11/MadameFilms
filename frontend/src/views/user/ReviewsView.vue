<!--Author: María Acevedo-->
<script setup lang="ts">
// External imports
import { onMounted, ref } from 'vue';

// Internal imports
import { MovieService } from '@/services/MovieService';
import { ReviewService } from '@/services/ReviewService.js';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import StyledButtonComponent from '@/components/StyledButtonComponent.vue';
import type { MovieInterface } from '@/interfaces/MovieInterface';
import { AuthService } from '@/services/AuthService';

// Variables
const movies = ref<MovieInterface[]>([]);
const currentUserId = ref<number | null>(null);

//Selectors
const selectorReviews = ref<ReviewInterface[]>([]);
const selectedEditingReviewId = ref<number | null>(null);

// Form
const editForm = ref({ rating: 5, comment: '' });

// Functions
async function startEdit(review: ReviewInterface) {
  selectedEditingReviewId.value = review.id;
  editForm.value = { rating: review.rating, comment: review.comment };
}

async function cancelEdit() {
  selectedEditingReviewId.value = null;
}

async function saveEdit() {
  if (selectedEditingReviewId.value === null) return;

  try {
    await ReviewService.updateReview(selectedEditingReviewId.value, {
      rating: editForm.value.rating,
      comment: editForm.value.comment.trim(),
    });

    selectedEditingReviewId.value = null;
    selectorReviews.value = await ReviewService.getReviews();
  } catch (err) {
    alert(err instanceof Error ? err.message : 'Failed to update review');
  }
}

async function deleteReview(id: number) {
  try {
    await ReviewService.deleteReview(id);

    selectorReviews.value = await ReviewService.getReviews();
  } catch (err) {
    alert(err instanceof Error ? err.message : 'Failed to delete review');
  }
}

onMounted(async () => {
  try {
    const user = await AuthService.getCurrentUser();
    currentUserId.value = user.id;
    selectorReviews.value = await ReviewService.getReviews();
    movies.value = await MovieService.getMovies();
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <section class="pb-10">
    <div class="max-w-7xl mx-auto mb-6">
      <div class="flex justify-end mb-6">
        <StyledButtonComponent to="/reviews/create" :showIcon="true">
          Add Review
        </StyledButtonComponent>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="review in selectorReviews" :key="review.id">
          <div
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-200 overflow-hidden"
          >
            <!-- Comment or Edit form -->
            <div class="px-5 pt-4 pb-2">
              <template v-if="selectedEditingReviewId === review.id">
                <label class="block text-gray-700 text-xs font-semibold mb-1">Rating</label>
                <select
                  v-model.number="editForm.rating"
                  class="w-full border border-gray-300 rounded py-1.5 px-2 text-sm mb-3 focus:outline-none focus:ring focus:border-purple-300"
                >
                  <option v-for="n in 5" :key="n" :value="n">
                    {{ n }} star{{ n > 1 ? 's' : '' }}
                  </option>
                </select>

                <label class="block text-gray-700 text-xs font-semibold mb-1">Comment</label>
                <textarea
                  v-model="editForm.comment"
                  rows="3"
                  class="w-full border border-gray-300 rounded py-1.5 px-2 text-sm focus:outline-none focus:ring focus:border-purple-300"
                  placeholder="Your comment..."
                />
              </template>

              <p v-else class="text-gray-800 text-sm leading-relaxed">"{{ review.comment }}"</p>
            </div>

            <template v-if="selectedEditingReviewId === review.id">
              <div class="flex items-center gap-2 px-5 pb-4">
                <button
                  @click="saveEdit"
                  type="button"
                  class="text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded px-3 py-1.5 transition"
                >
                  Save
                </button>
                <button
                  @click="cancelEdit"
                  type="button"
                  class="text-sm font-medium text-gray-600 hover:text-gray-800 rounded px-3 py-1.5 transition"
                >
                  Cancel
                </button>
              </div>
            </template>

            <template v-else>
              <div class="flex items-center gap-2 px-5 pb-4">
                <div
                  class="flex items-center gap-1 bg-yellow-50 border border-yellow-200 rounded-full px-3 py-1"
                >
                  <span class="text-yellow-500 text-sm">⭐</span>
                  <span class="text-sm font-bold text-yellow-600"> {{ review.rating }}/5 </span>
                </div>

                <button
                  v-if="review.userId === currentUserId"
                  @click="startEdit(review)"
                  type="button"
                  class="text-purple-600 text-sm font-medium hover:text-purple-800"
                >
                  Edit
                </button>

                <button
                  v-if="review.userId === currentUserId"
                  @click="deleteReview(review.id)"
                  type="button"
                  class="text-red-500 text-sm hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
