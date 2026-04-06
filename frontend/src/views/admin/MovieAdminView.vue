<!--Author: María Acevedo-->
<script setup lang="ts">
// External imports
import { onMounted, ref } from 'vue';

// Internal imports
import { ActressService } from '@/services/ActressService';
import type { ActressInterface } from '@/interfaces/ActressInterface';
import type { MovieInterface } from '@/interfaces/MovieInterface';
import { MovieService } from '@/services/MovieService';

// Components
import StyledButtonComponent from '@/components/StyledButtonComponent.vue';

//Reactive variables 
const actressNames = ref<Record<number, string>>({});

// Selectors
const selectedEditingMovieId = ref<number | null>(null);
const selectorActresses = ref<ActressInterface[] | null>(null);
const selectorMovies = ref<MovieInterface[] | null>(null);

// Forms
const editForm = ref({
  title: '',
  description: '',
  cast: '',
  director: '',
  releaseDate: '',
  genre: '',
  durationMin: 0,
  country: '',
  language: '',
  image: '',
  selectedActressId: '' as number | '',
});

// Functions
function startEdit(movie: MovieInterface) {
  selectedEditingMovieId.value = movie.id;
  editForm.value = {
    title: movie.title,
    description: movie.description,
    cast: movie.cast,
    director: movie.director,
    releaseDate: new Date(movie.releaseDate).toISOString().slice(0, 10),
    genre: movie.genre,
    durationMin: movie.durationMin,
    country: movie.country,
    language: movie.language,
    image: movie.image,
    selectedActressId: movie.actressId,
  };
}

function cancelEdit() {
  selectedEditingMovieId.value = null;
}

async function saveEdit() {
  if (selectedEditingMovieId.value === null) return;

  try {
    await MovieService.updateMovie(selectedEditingMovieId.value, {
      title: editForm.value.title.trim(),
      description: editForm.value.description.trim(),
      cast: editForm.value.cast.trim(),
      director: editForm.value.director.trim(),
      releaseDate: new Date(editForm.value.releaseDate),
      genre: editForm.value.genre.trim(),
      durationMin: editForm.value.durationMin,
      country: editForm.value.country.trim(),
      language: editForm.value.language.trim(),
      image: editForm.value.image.trim(),
      actressId:
        editForm.value.selectedActressId !== '' ? Number(editForm.value.selectedActressId) : 0,
    });

    selectedEditingMovieId.value = null;
  } catch (err) {
    alert(err instanceof Error ? err.message : 'Failed to update movie');
  }
}

onMounted(async () => {
  try {
    selectorActresses.value = await ActressService.getActress();
    selectorMovies.value = await MovieService.getMovies();

    if (selectorMovies.value) {
      for (const movie of selectorMovies.value) {
        if (movie.actressId) {
          actressNames.value[movie.actressId] = await ActressService.getActressName(movie.actressId);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <section class="max-w-7xl mx-auto py-10 px-6">
    <h2 class="text-3xl font-bold text-purple-800 mb-2">🎬 Movie Management</h2>

    <p class="text-gray-600 mb-8">Manage your movie catalog.</p>

    <StyledButtonComponent to="/admin/movies/create" :showIcon="true" class="mb-10">
      Add Movie
    </StyledButtonComponent>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="movie in selectorMovies" :key="movie.id"
        class="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-purple-100 overflow-hidden">
        <!-- Image (or preview when editing) -->
        <div class="relative w-full h-56 bg-gray-100">
          <img :src="selectedEditingMovieId === movie.id ? editForm.image || movie.image : movie.image"
            alt="Movie Cover" class="w-full h-full object-cover" />
        </div>

        <!-- Content: view mode -->
        <div v-if="selectedEditingMovieId !== movie.id" class="p-6 space-y-3">
          <!-- Title + Actions -->
          <div class="flex justify-between items-start gap-2">
            <h3 class="text-xl font-bold text-purple-900">
              {{ movie.title }}
            </h3>
            <div class="flex items-center gap-2 shrink-0">
              <button @click="startEdit(movie)" type="button"
                class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-sm transition">
                Edit
              </button>
              <button @click="MovieService.deleteMovie(movie.id)" type="button"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition">
                Delete
              </button>
            </div>
          </div>

          <p class="text-gray-600 text-sm line-clamp-3">{{ movie.description }}</p>

          <div class="grid grid-cols-2 gap-2 text-sm mt-4">
            <p><span class="font-semibold text-purple-700">Genre:</span> {{ movie.genre }}</p>
            <p>
              <span class="font-semibold text-purple-700">Duration:</span>
              {{ movie.durationMin }} min
            </p>
            <p><span class="font-semibold text-purple-700">Director:</span> {{ movie.director }}</p>
            <p><span class="font-semibold text-purple-700">Country:</span> {{ movie.country }}</p>
            <p><span class="font-semibold text-purple-700">Language:</span> {{ movie.language }}</p>
            <p>
              <span class="font-semibold text-purple-700">Release:</span>
              {{ new Date(movie.releaseDate).toLocaleDateString() }}
            </p>
          </div>

          <div class="pt-3 border-t border-purple-100 text-sm">
            <span class="font-semibold text-purple-700">Cast:</span>
            <p class="text-gray-600">{{ movie.cast }}</p>
          </div>

          <div v-if="movie.actressId" class="bg-purple-50 rounded-lg p-3 mt-3 text-sm">
            ⭐ Featured Actress:
            <span class="font-semibold text-purple-800">
              {{ actressNames[movie.actressId] }}
            </span>
          </div>
        </div>

        <!-- Content: edit form -->
        <div v-else class="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
          <div class="flex justify-between items-center border-b border-purple-100 pb-2">
            <span class="font-semibold text-purple-800">Edit movie</span>
            <div class="flex gap-2">
              <button @click="saveEdit" type="button"
                class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-sm transition">
                Save
              </button>
              <button @click="cancelEdit" type="button"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-sm transition">
                Cancel
              </button>
            </div>
          </div>

          <div class="space-y-2 text-sm">
            <div>
              <label class="block font-semibold text-gray-700 mb-0.5">Title</label>
              <input v-model="editForm.title" type="text"
                class="w-full border border-gray-300 rounded py-1.5 px-2 focus:outline-none focus:ring focus:border-purple-300" />
            </div>
            <div>
              <label class="block font-semibold text-gray-700 mb-0.5">Description</label>
              <textarea v-model="editForm.description" rows="2"
                class="w-full border border-gray-300 rounded py-1.5 px-2 focus:outline-none focus:ring focus:border-purple-300" />
            </div>
            <div>
              <label class="block font-semibold text-gray-700 mb-0.5">Cast</label>
              <input v-model="editForm.cast" type="text"
                class="w-full border border-gray-300 rounded py-1.5 px-2 focus:outline-none focus:ring focus:border-purple-300" />
            </div>
            <div>
              <label class="block font-semibold text-gray-700 mb-0.5">Director</label>
              <input v-model="editForm.director" type="text"
                class="w-full border border-gray-300 rounded py-1.5 px-2 focus:outline-none focus:ring focus:border-purple-300" />
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block font-semibold text-gray-700 mb-0.5">Release date</label>
                <input v-model="editForm.releaseDate" type="date"
                  class="w-full border border-gray-300 rounded py-1.5 px-2 focus:outline-none focus:ring focus:border-purple-300" />
              </div>
              <div>
                <label class="block font-semibold text-gray-700 mb-0.5">Duration (min)</label>
                <input v-model.number="editForm.durationMin" type="number" min="1"
                  class="w-full border border-gray-300 rounded py-1.5 px-2 focus:outline-none focus:ring focus:border-purple-300" />
              </div>
            </div>
            <div>
              <label class="block font-semibold text-gray-700 mb-0.5">Genre</label>
              <input v-model="editForm.genre" type="text"
                class="w-full border border-gray-300 rounded py-1.5 px-2 focus:outline-none focus:ring focus:border-purple-300" />
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block font-semibold text-gray-700 mb-0.5">Country</label>
                <input v-model="editForm.country" type="text"
                  class="w-full border border-gray-300 rounded py-1.5 px-2 focus:outline-none focus:ring focus:border-purple-300" />
              </div>
              <div>
                <label class="block font-semibold text-gray-700 mb-0.5">Language</label>
                <input v-model="editForm.language" type="text"
                  class="w-full border border-gray-300 rounded py-1.5 px-2 focus:outline-none focus:ring focus:border-purple-300" />
              </div>
            </div>
            <div>
              <label class="block font-semibold text-gray-700 mb-0.5">Actress</label>
              <select v-model="editForm.selectedActressId"
                class="w-full border border-gray-300 rounded py-1.5 px-2 focus:outline-none focus:ring focus:border-purple-300">
                <option value="">None</option>
                <option v-for="actress in selectorActresses" :key="actress.id" :value="actress.id">
                  {{ actress.fullName }}
                </option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-gray-700 mb-0.5">Image URL</label>
              <input v-model="editForm.image" type="text"
                class="w-full border border-gray-300 rounded py-1.5 px-2 focus:outline-none focus:ring focus:border-purple-300"
                placeholder="https://..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
