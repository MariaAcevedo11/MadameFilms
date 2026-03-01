<script setup lang="ts">
import { ActressService } from '@/services/ActressService'
import { ref } from 'vue';
import { MovieService } from '@/services/MovieService';
import type { CreateMovieDTO } from '@/dtos/CreateMovieDTO.js';

const title = ref('');
const description = ref('');
const cast = ref('');
const director = ref('');
const releaseDate = ref('');
const genre = ref('');
const durationMin = ref(0);
const country = ref('');
const language = ref('');
const successMessage = ref('');
const actresses = ActressService.getActress();
const selectedActressId = ref<number | ''>('')

function submitForm() {

    const selectedActress =
        selectedActressId.value !== ''
            ? ActressService.getActressById(Number(selectedActressId.value))
            : undefined

    const newMovie: CreateMovieDTO = {

        title: title.value,
        description: description.value,
        cast: cast.value,
        director: director.value,
        releaseDate: new Date(releaseDate.value),
        genre: genre.value,
        durationMin: durationMin.value,
        country: country.value,
        language: language.value,
        actress: selectedActress,
    };

    MovieService.createMovie(newMovie);
    successMessage.value = 'Movie added successfully!';

    title.value = '';
    description.value = '';
    cast.value = '';
    director.value = '';
    releaseDate.value = '';
    genre.value = '';
    durationMin.value = 0;
    country.value = '';
    language.value = '';
    selectedActressId.value = '';
}
</script>

<template>
    <section class="max-w-2xl mx-auto py-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-8">Add a New Movie</h2>

        <form class="bg-white rounded-lg shadow-md p-8 space-y-6" @submit.prevent="submitForm">

            <!-- Title -->
            <div>
                <label class="block text-gray-700 font-semibold mb-2">Title</label>
                <input v-model="title" type="text"
                    class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    required placeholder="Movie Title" />
            </div>

            <!-- Description -->
            <div>
                <label class="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea v-model="description"
                    class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    required placeholder="Movie description"></textarea>
            </div>

            <!-- Cast -->
            <div>
                <label class="block text-gray-700 font-semibold mb-2">Cast</label>
                <input v-model="cast" type="text"
                    class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    required placeholder="Main actors" />
            </div>

            <!-- Director -->
            <div>
                <label class="block text-gray-700 font-semibold mb-2">Director</label>
                <input v-model="director" type="text"
                    class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    required placeholder="Director name" />
            </div>

            <!-- Release Date -->
            <div>
                <label class="block text-gray-700 font-semibold mb-2">Release Date</label>
                <input v-model="releaseDate" type="date"
                    class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    required />
            </div>

            <!-- Genre -->
            <div>
                <label class="block text-gray-700 font-semibold mb-2">Genre</label>
                <input v-model="genre" type="text"
                    class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    required placeholder="Action, Drama, Comedy..." />
            </div>

            <!-- Duration -->
            <div>
                <label class="block text-gray-700 font-semibold mb-2">Duration (minutes)</label>
                <input v-model.number="durationMin" type="number" min="1"
                    class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    required placeholder="120" />
            </div>

            <!-- Country -->
            <div>
                <label class="block text-gray-700 font-semibold mb-2">Country</label>
                <input v-model="country" type="text"
                    class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    required placeholder="USA, UK, France..." />
            </div>

            <!-- Language -->
            <div>
                <label class="block text-gray-700 font-semibold mb-2">Language</label>
                <input v-model="language" type="text"
                    class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    required placeholder="English, Spanish..." />
            </div>

            <!-- Actress -->
            <select v-model="selectedActressId"
                class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-purple-300">

                <option value="">Select an actress</option>

                <option v-for="actress in actresses" :key="actress.id" :value="actress.id">
                    {{ actress.fullName }} ({{ actress.nationality }})
                </option>

            </select>


            <div class="pt-4">
                <button type="submit"
                    class="w-full bg-purple-600 text-white font-semibold py-3 rounded hover:bg-purple-700 transition">
                    Add Movie
                </button>
            </div>

            <p v-if="successMessage" class="text-green-600 mt-4">
                {{ successMessage }}
            </p>

        </form>
    </section>
</template>
