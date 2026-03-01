<script setup lang="ts">
</script>

<template>
    <section class="max-w-2xl mx-auto py-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-8">Movie Management</h2>

        <p>Hello here's the movies dashboard not the oficial admin dashboard</p>

        <RouterLink to="/admin/movies/create" class="inline-flex items-center gap-2 px-5 py-2.5 
         rounded-lg 
         bg-purple-400 hover:bg-purple-500 
         text-white font-semibold 
         shadow-md 
         transition-all duration-200 
         hover:shadow-lg active:scale-95">
            <span class="text-lg font-bold">+</span>
            <span>Add Movie</span>
        </RouterLink>
    </section>
</template>
