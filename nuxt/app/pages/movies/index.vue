<script setup lang="ts">
//Internal imports
const { data: movies } = await useFetch('/api/movies')
</script>

<template>
  <div>
    <h1 class="h2 mb-4">
      Movies
    </h1>

    <div class="row">
      <div v-for="movie in movies" :key="movie.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <img :src="movie.image" class="card-img-top" :alt="movie.title" style="height: 400px; object-fit: cover;">

          <div class="card-body">
            <h5 class="card-title">
              {{ movie.title }}
            </h5>

            <p class="card-text">
              {{ movie.genre }}
            </p>

            <NuxtLink :to="`/movies/${movie.id}`" class="btn btn-primary">
              View movie
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>