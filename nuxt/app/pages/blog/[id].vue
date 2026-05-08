<script setup lang="ts">
//Internal imports 
import { movies } from '~/data/movies'

//Functions
definePageMeta({
  validate(route) {
    const param = Number(route.params.id)

    return movies.some((movie) => movie.id === param)
  },
})

//Router
const route = useRoute()

// Computed Variables
const id = computed(() => Number(route.params.id))
const movie = computed(() =>
  movies.find((m) => m.id === id.value)
)
</script>

<template>
  <div v-if="movie">
    <NuxtLink to="/blog" class="text-decoration-none">
      ← Volver al blog
    </NuxtLink>

    <div class="card mt-3">
      <img :src="movie.image" class="card-img-top" :alt="movie.title" style="max-height: 600px; object-fit: cover;">

      <div class="card-body">
        <h1 class="card-title">
          {{ movie.title }}
        </h1>

        <p class="text-muted">
          {{ movie.genre }} | {{ movie.releaseDate }}
        </p>

        <p>
          {{ movie.description }}
        </p>

        <ul class="list-group">
          <li class="list-group-item">
            <strong>Director:</strong>
            {{ movie.director }}
          </li>

          <li class="list-group-item">
            <strong>Cast:</strong>
            {{ movie.cast }}
          </li>

          <li class="list-group-item">
            <strong>Duration:</strong>
            {{ movie.durationMin }} minutes
          </li>

          <li class="list-group-item">
            <strong>Country:</strong>
            {{ movie.country }}
          </li>

          <li class="list-group-item">
            <strong>Language:</strong>
            {{ movie.language }}
          </li>

          <li class="list-group-item">
            <strong>Actress Id:</strong>
            {{ movie.actressId }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>