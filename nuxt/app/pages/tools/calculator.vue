<script setup lang="ts">

//Reactive variables
const hours = ref(0)

//Computed variables
const result = computed(() => hours.value * 60)
</script>

<template>
  <div>
    <h1>Movie Duration Calculator</h1>

    <p>
      Convert hours to minutes.
    </p>

    <input v-model="hours" type="number" class="form-control mb-3">

    <p>
      Total minutes: {{ result }}
    </p>
  </div>
</template>