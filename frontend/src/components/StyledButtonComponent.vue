<!-- Author: Maria Acevedo-->
<template>
  <RouterLink
    :to="to"
    :class="[
      'inline-flex items-center gap-2 px-5 py-2.5',
      'rounded-lg',
      'bg-purple-400 hover:bg-purple-500',
      'text-white font-semibold',
      'shadow-md',
      'transition-all duration-200',
      'hover:shadow-lg active:scale-95',
      customClass,
    ]"
  >
    <span v-if="showIcon" class="text-lg font-bold">+</span>
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: '',
  },
});
</script>
