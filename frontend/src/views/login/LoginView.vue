<script setup lang="ts">
// External imports
import { ref } from 'vue';

// Internal imports
import { AuthService } from '@/services/AuthService';

// Reactive variables
const errorMessage = ref('');

const form = ref({
  email: '',
  password: '',
});

// Functions
function handleLogin() {
  errorMessage.value = ''

  try {
    UserService.login(form.value.email, form.value.password)
  } catch (err) {
    errorMessage.value =
      err instanceof Error ? err.message : 'Login failed'
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-purple-400"
  >
    <div class="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
      <h2 class="text-3xl font-bold text-purple-800 mb-8 text-center">🔐 Login</h2>

      <div class="space-y-5">
        <div>
          <label class="block text-purple-700 font-semibold mb-2"> Email </label>
          <input
            v-model="form.email"
            type="email"
            class="w-full p-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label class="block text-purple-700 font-semibold mb-2"> Password </label>
          <input
            v-model="form.password"
            type="password"
            class="w-full p-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm">
          {{ errorMessage }}
        </p>

        <button
          @click="handleLogin"
          class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>
