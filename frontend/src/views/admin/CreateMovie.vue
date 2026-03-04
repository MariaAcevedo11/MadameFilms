<script setup lang="ts">

// External import
import { ref } from 'vue'

// Internal imports
import { ActressService } from '@/services/ActressService'
import { MovieService } from '@/services/MovieService'
import type { CreateMovieDTO } from '@/dtos/CreateMovieDTO.js'

// Variable
const actresses = ActressService.getActress()

// Reactive variables
const selectedActressId = ref<number | ''>('')
const successMessage = ref('')

const form = ref<CreateMovieDTO>({
  title: '',
  description: '',
  cast: '',
  director: '',
  releaseDate: new Date(),
  genre: '',
  durationMin: 0,
  country: '',
  language: '',
  actress: undefined,
  image: ''
})

// Functions
function submitForm() {
  const selectedActress =
    selectedActressId.value !== ''
      ? ActressService.getActressById(Number(selectedActressId.value))
      : undefined

  form.value.actress = selectedActress

  MovieService.createMovie(form.value)

  successMessage.value = 'Movie added successfully!'

  resetForm()
}

function resetForm() {
  form.value = {
    title: '',
    description: '',
    cast: '',
    director: '',
    releaseDate: new Date(),
    genre: '',
    durationMin: 0,
    country: '',
    language: '',
    actress: undefined,
    image: ''
  }

  selectedActressId.value = ''
}

</script>

<template>
  <section class="max-w-2xl mx-auto py-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-8">Add a New Movie</h2>

    <form class="bg-white rounded-lg shadow-md p-8 space-y-6" @submit.prevent="submitForm">

      <!-- Title -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Title</label>
        <input v-model="form.title" type="text"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required placeholder="Movie Title" />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Description</label>
        <textarea v-model="form.description"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required placeholder="Movie description"></textarea>
      </div>

      <!-- Cast -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Cast</label>
        <input v-model="form.cast" type="text"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required placeholder="Main actors" />
      </div>

      <!-- Director -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Director</label>
        <input v-model="form.director" type="text"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required placeholder="Director name" />
      </div>

      <!-- Release Date -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Release Date</label>
        <input v-model="form.releaseDate" type="date"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required />
      </div>

      <!-- Genre -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Genre</label>
        <input v-model="form.genre" type="text"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required placeholder="Action, Drama, Comedy..." />
      </div>

      <!-- Duration -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Duration (minutes)</label>
        <input v-model.number="form.durationMin" type="number" min="1"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required placeholder="120" />
      </div>

      <!-- Country -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Country</label>
        <input v-model="form.country" type="text"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required placeholder="USA, UK, France..." />
      </div>

      <!-- Language -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Language</label>
        <input v-model="form.language" type="text"
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

      <!-- Image URL -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Image URL</label>
        <input v-model="form.image" type="text"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="https://..." />
        <!-- preview -->
        <img v-if="form.image.trim()" :src="form.image" alt="Movie preview"
          class="mt-3 w-32 h-44 object-cover rounded shadow" />
      </div>


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
