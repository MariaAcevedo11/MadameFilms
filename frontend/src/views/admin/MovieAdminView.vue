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
const expandedRow = ref<number | null>(null);

// Selectors
const selectedEditingMovieId = ref<number | null>(null);
const selectorActresses = ref<ActressInterface[]>([]);
const selectorMovies = ref<MovieInterface[]>([]);

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
async function startEdit(movie: MovieInterface) {
  selectedEditingMovieId.value = movie.id;
  expandedRow.value = movie.id;
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

async function cancelEdit() {
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

    refreshMovies();

    selectedEditingMovieId.value = null;
  } catch (err) {
    alert(err instanceof Error ? err.message : 'Failed to update movie');
  }
}

//On Mounted
onMounted(async () => {
  try {
    selectorActresses.value = await ActressService.getActress();
    selectorMovies.value = await MovieService.getMovies();

    for (const actress of selectorActresses.value) {
      actressNames.value[actress.id] = actress.fullName;
    }

  } catch (error) {
    console.error(error);
  }
});

async function refreshMovies() {
  selectorMovies.value = await MovieService.getMovies();
}

async function deleteMovie(id: number) {
  try {
    await MovieService.deleteMovie(id);

    selectorMovies.value = await MovieService.getMovies();
  } catch (err) {
    alert(err instanceof Error ? err.message : 'Failed to delete review');
  }
}

// Style functions
function toggleRow(id: number) {
  expandedRow.value = expandedRow.value === id ? null : id;
}
</script>

<template>
  <section class="max-w-7xl mx-auto py-10 px-6">
    <h2 class="text-3xl font-bold text-purple-800 mb-2">🎬 Movie Management</h2>
    <p class="text-gray-600 mb-6">Manage your movie catalog.</p>

    <StyledButtonComponent to="/admin/movies/create" :showIcon="true" class="mb-6">
      Add Movie
    </StyledButtonComponent>

    <div class="overflow-x-auto bg-white rounded-2xl shadow-md border border-purple-100">
      <table class="min-w-full text-sm">
        <!-- HEADER -->
        <thead class="bg-purple-100 text-purple-800">
          <tr>
            <th class="px-3 py-2">Image</th>
            <th class="px-3 py-2">Title</th>
            <th class="px-3 py-2">Genre</th>
            <th class="px-3 py-2">Duration</th>
            <th class="px-3 py-2">Director</th>
            <th class="px-3 py-2">Actress</th>
            <th class="px-3 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="movie in selectorMovies" :key="movie.id">
            <!-- ROW PRINCIPAL -->
            <tr class="border-t hover:bg-purple-50 cursor-pointer" @click="toggleRow(movie.id)">
              <!-- IMAGE -->
              <td class="px-3 py-2">
                <img
                  :src="
                    selectedEditingMovieId === movie.id
                      ? editForm.image || movie.image
                      : movie.image
                  "
                  class="w-16 h-20 object-cover rounded"
                />
              </td>

              <!-- TITLE -->
              <td class="px-3 py-2">
                <input
                  v-if="selectedEditingMovieId === movie.id"
                  v-model="editForm.title"
                  class="border rounded px-2 py-1 w-full"
                />
                <span v-else>{{ movie.title }}</span>
              </td>

              <!-- GENRE -->
              <td class="px-3 py-2">
                <input
                  v-if="selectedEditingMovieId === movie.id"
                  v-model="editForm.genre"
                  class="border rounded px-2 py-1 w-full"
                />
                <span v-else>{{ movie.genre }}</span>
              </td>

              <!-- DURATION -->
              <td class="px-3 py-2">
                <input
                  v-if="selectedEditingMovieId === movie.id"
                  v-model.number="editForm.durationMin"
                  type="number"
                  class="border rounded px-2 py-1 w-full"
                />
                <span v-else>{{ movie.durationMin }} min</span>
              </td>

              <!-- DIRECTOR -->
              <td class="px-3 py-2">
                <input
                  v-if="selectedEditingMovieId === movie.id"
                  v-model="editForm.director"
                  class="border rounded px-2 py-1 w-full"
                />
                <span v-else>{{ movie.director }}</span>
              </td>

              <!-- ACTRESS -->
              <td class="px-3 py-2">
                <select
                  v-if="selectedEditingMovieId === movie.id"
                  v-model="editForm.selectedActressId"
                  class="border rounded px-2 py-1 w-full"
                >
                  <option value="">None</option>
                  <option
                    v-for="actress in selectorActresses"
                    :key="actress.id"
                    :value="actress.id"
                  >
                    {{ actress.fullName }}
                  </option>
                </select>

                <span v-else>
                  {{ actressNames[movie.actressId] || '—' }}
                </span>
              </td>

              <!-- ACTIONS -->
              <td class="px-3 py-2 space-x-2" @click.stop>
                <template v-if="selectedEditingMovieId === movie.id">
                  <button
                    @click="saveEdit"
                    class="bg-purple-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Save
                  </button>

                  <button @click="cancelEdit" class="bg-gray-300 px-2 py-1 rounded text-xs">
                    Cancel
                  </button>
                </template>

                <template v-else>
                  <button
                    @click="startEdit(movie)"
                    class="bg-purple-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>

                  <button
                    @click="deleteMovie(movie.id)"
                    class="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </template>
              </td>
            </tr>

            <!-- ROW EXPANDIBLE -->
            <tr v-if="expandedRow === movie.id">
              <td colspan="7" class="px-6 py-5 bg-linear-to-r from-purple-50 to-white">
                <div class="bg-white rounded-2xl shadow-sm border border-purple-100 p-5">
                  <!-- HEADER -->
                  <div class="flex justify-between items-center mb-4">
                    <h4 class="text-lg font-semibold text-purple-800">Movie Details</h4>
                  </div>

                  <!-- MODO EDICIÓN -->
                  <div v-if="selectedEditingMovieId === movie.id" class="space-y-4 text-sm">
                    <div>
                      <label class="font-semibold text-purple-700">Description</label>
                      <textarea
                        v-model="editForm.description"
                        class="w-full border rounded px-2 py-1"
                      ></textarea>
                    </div>

                    <div>
                      <label class="font-semibold text-purple-700">Cast</label>
                      <input v-model="editForm.cast" class="w-full border rounded px-2 py-1" />
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="font-semibold text-purple-700">Country</label>
                        <input v-model="editForm.country" class="w-full border rounded px-2 py-1" />
                      </div>

                      <div>
                        <label class="font-semibold text-purple-700">Language</label>
                        <input
                          v-model="editForm.language"
                          class="w-full border rounded px-2 py-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label class="font-semibold text-purple-700">Release Date</label>
                      <input
                        type="date"
                        v-model="editForm.releaseDate"
                        class="w-full border rounded px-2 py-1"
                      />
                    </div>
                  </div>

                  <!-- MODO VISTA -->
                  <div v-else class="space-y-3 text-sm">
                    <p>
                      <span class="font-semibold text-purple-700">Description:</span>
                      {{ movie.description }}
                    </p>
                    <p><span class="font-semibold text-purple-700">Cast:</span> {{ movie.cast }}</p>
                    <p>
                      <span class="font-semibold text-purple-700">Country:</span>
                      {{ movie.country }}
                    </p>
                    <p>
                      <span class="font-semibold text-purple-700">Language:</span>
                      {{ movie.language }}
                    </p>
                    <p>
                      <span class="font-semibold text-purple-700">Release:</span>
                      {{ new Date(movie.releaseDate).toLocaleDateString() }}
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </section>
</template>
