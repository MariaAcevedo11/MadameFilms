<script setup lang="ts">
import { ref } from 'vue';
import { ReviewService } from '@/services/ReviewService';
import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO.js';
import { userSeeder } from '@/stores/seeders/userseeder';
import { MovieService } from '@/services/MovieService';

const rating = ref(5);
const comment = ref('');
const successMessage = ref('');
const movies = MovieService.getMovies();
const selectedMovieId = ref<number | ''>('')

function submitForm() {

const selectedMovie = MovieService.getMovieById(Number(selectedMovieId.value));
    if (!selectedMovie) 
    return;

const newReview: CreateReviewDTO = {
    rating: rating.value,
    comment: comment.value.trim(),
    user: userSeeder[1]!,
    movie: selectedMovie, 
};

    ReviewService.createReview(newReview);

    successMessage.value = 'Review created successfully!';
    rating.value = 5;
    comment.value = '';
    selectedMovieId.value = '';
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
                    {{ movie.title }}, {{ movie.director}}
                </option>

            </select>

            </div>    

            <!-- Rating -->
            <div>
                <label class="block text-gray-700 font-semibold mb-2" for="rating">
                    Rating
                </label>
                <select v-model.number="rating" id="rating"
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
                <textarea v-model="comment" id="comment" rows="4"
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
