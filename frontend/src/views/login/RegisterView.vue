<script setup lang="ts">
// External imports
import { ref } from 'vue';

// Internal imports
import { AuthService } from '@/services/AuthService';

// Reactive variables
const errorMessage = ref('');
const successMessage = ref('');

// Form
const form = ref({
  username: '',
  email: '',
  password: '',
  image: '',
  role: '',
});

// Functions
async function handleRegister() {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    await AuthService.register(form.value);
    await AuthService.login(form.value.email, form.value.password);

    successMessage.value = 'Usuario registrado correctamente';
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Register failed';
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-200 to-purple-400"
  >
    <div class="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
      <h2 class="text-3xl font-bold text-purple-800 mb-8 text-center">📝 Register</h2>

      ```
      <div class="space-y-5">
        <div>
          <label class="block text-purple-700 font-semibold mb-2"> Username </label>
          <input
            v-model="form.username"
            class="w-full p-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500"
          />
        </div>

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

        <div>
          <label class="block text-purple-700 font-semibold mb-2"> Role </label>
          <select
            v-model="form.role"
            class="w-full p-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500"
          >
            <option disabled value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label class="block text-purple-700 font-semibold mb-2"> Image URL </label>
          <input
            v-model="form.image"
            class="w-full p-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm">
          {{ errorMessage }}
        </p>

        <p v-if="successMessage" class="text-green-600 text-sm">
          {{ successMessage }}
        </p>

        <button
          @click="handleRegister"
          class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Register
        </button>
      </div>
    </div>
    ```
  </div>
</template>
