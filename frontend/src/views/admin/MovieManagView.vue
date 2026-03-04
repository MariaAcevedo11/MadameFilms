<script setup lang="ts">
import StyledButton from '@/components/StyledButton.vue'
</script>

<template>
  <section class="max-w-2xl mx-auto py-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-8">Movie Management</h2>

    <p>Hello here's the movies dashboard not the oficial admin dashboard</p>

    <StyledButton to="/admin/movies/create" :showIcon="true">
      Add Movie
    </StyledButton>
  </section>
</template>
