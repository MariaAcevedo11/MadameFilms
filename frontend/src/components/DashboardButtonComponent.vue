<!-- Author: Maria Acevedo-->
<template>
  <RouterLink
    :to="to"
    class="peer flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-purple-800 transition-all active:scale-95"
  >
    <div class="rounded-lg border-2 border-purple-300 bg-purple-100 p-1 flex-shrink-0">
      <slot name="icon" />
    </div>
    <span class="font-semibold whitespace-nowrap">
      <slot>Default</slot>
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
});
</script>
