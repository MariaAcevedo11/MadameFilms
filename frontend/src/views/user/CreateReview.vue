<script setup lang="ts">

// External import
import { ref } from 'vue'

// Internal imports
import { ReviewService } from '@/services/ReviewService'
import { MovieService } from '@/services/MovieService'
import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO'
import { UserService } from '@/services/UserService'

// Variable
const movies = MovieService.getMovies()

// Reactive variables
const selectedMovieId = ref<number | ''>('')
const successMessage = ref('')

const form = ref<CreateReviewDTO>({
  rating: 5,
  comment: '',
  user: UserService.getCurrentUser()!,
  movie: undefined
})

// Functions
function submitForm() {
  const selectedMovie =
    selectedMovieId.value !== ''
      ? MovieService.getMovieById(Number(selectedMovieId.value))
      : undefined

  form.value.movie = selectedMovie!

  form.value.comment = form.value.comment.trim()

  ReviewService.createReview(form.value)

  successMessage.value = 'Review created successfully!'

  resetForm()
}

function resetForm() {
  form.value = {
    rating: 5,
    comment: '',
    user: UserService.getCurrentUser()!,
    movie: undefined
  }

  selectedMovieId.value = ''
}

</script>

<template>
  <section class="max-w-2xl mx-auto py-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-8">
      Create a New Review
    </h2>

    <form class="bg-white rounded-lg shadow-md p-8 space-y-6" @submit.prevent="submitForm">

      <!-- Select movie-->
      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="rating">
          Movie
        </label>
        <select v-model="selectedMovieId"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-purple-300">
          <option value="">Select a movie</option>

          <option v-for="movie in movies" :key="movie.id" :value="movie.id">
            {{ movie.title }}, {{ movie.director }}
          </option>

        </select>

      </div>

      <!-- Rating -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="rating">
          Rating
        </label>
        <select v-model.number="form.rating" id="rating"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required>
          <option v-for="n in 5" :key="n" :value="n">
            {{ n }} star{{ n > 1 ? 's' : '' }}
          </option>
        </select>
      </div>

      <!-- Comment -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="comment">
          Comment
        </label>
        <textarea v-model="form.comment" id="comment" rows="4"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required placeholder="Write your review..." />
      </div>

      <div class="pt-4">
        <button type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition">
          Create Review
        </button>
      </div>

      <p v-if="successMessage" class="text-green-600 mt-4">
        {{ successMessage }}
      </p>
    </form>
  </section>
</template>
