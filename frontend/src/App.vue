<!--Author: Gabriela Sanabria-->
<script setup lang="ts">
// External imports
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

// Internal imports
import { AuthService } from '@/services/AuthService';
import DashboardButtonComponent from './components/DashboardButtonComponent.vue';

// Computed
const isAdmin = computed(() => AuthService.isAdmin());
const loggedUser = computed(() => AuthService.getCurrentUser());
</script>

<template>
  <div class="bg-linear-to-t from-darkerPurple to-darkPurple min-h-screen">
    <div class="flex h-screen overflow-hidden">
      <div class="absolute left-0 top-0 h-full flex flex-col justify-center gap-1 pl-1 z-50">
        <ul class="flex flex-col gap-1">
          <li
            class="group w-14 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-36 hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
          >
            <DashboardButtonComponent to="/">
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="purple"
                  viewBox="0 0 512 512"
                  class="size-6"
                >
                  <path
                    d="M240 6.1c9.1-8.2 22.9-8.2 32 0l232 208c9.9 8.8 10.7 24 1.8 33.9s-24 10.7-33.9 1.8l-8-7.2 0 205.3c0 35.3-28.7 64-64 64l-288 0c-35.3 0-64-28.7-64-64l0-205.3-8 7.2c-9.9 8.8-25 8-33.9-1.8s-8-25 1.8-33.9L240 6.1zm16 50.1L96 199.7 96 448c0 8.8 7.2 16 16 16l48 0 0-104c0-39.8 32.2-72 72-72l48 0c39.8 0 72 32.2 72 72l0 104 48 0c8.8 0 16-7.2 16-16l0-248.3-160-143.4zM208 464l96 0 0-104c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24l0 104z"
                  />
                </svg>
              </template>
              Home
            </DashboardButtonComponent>
          </li>

          <li
            class="group w-14 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-36 hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
          >
            <DashboardButtonComponent to="/movies">
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="purple"
                  viewBox="0 0 448 512"
                  class="size-6"
                >
                  <path
                    d="M0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM48 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm304-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm304-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 112l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16L64 96c-8.8 0-16 7.2-16 16zM352 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0z"
                  />
                </svg>
              </template>
              Movies
            </DashboardButtonComponent>
          </li>

          <li
            class="group w-14 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-36 hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
          >
            <DashboardButtonComponent to="/actresses">
              <template #icon>
                <svg
                  class="size-6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 384 512"
                  fill="purple"
                >
                  <path
                    d="M136 24a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zM112 384l-25.8 0c-10.9 0-18.6-10.7-15.2-21.1l43-129-48.3 65.1c-10.5 14.2-30.6 17.2-44.8 6.6s-17.2-30.6-6.6-44.8l70.5-95C110 132 149.7 112 192 112s82 20 107.2 53.9l70.5 95c10.5 14.2 7.6 34.2-6.6 44.8s-34.2 7.6-44.8-6.6L270 234 313 362.9c3.5 10.4-4.3 21.1-15.2 21.1l-25.8 0 0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128-32 0 0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128z"
                  />
                </svg>
              </template>
              Actress
            </DashboardButtonComponent>
          </li>

          <li
            class="group w-14 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-36 hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
          >
            <DashboardButtonComponent to="/reviews">
              <template #icon>
                <svg
                  class="size-6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 576 512"
                  fill="purple"
                >
                  <path
                    d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1z"
                  />
                </svg>
              </template>
              Reviews
            </DashboardButtonComponent>
          </li>

          <li
            v-if="isAdmin"
            class="group w-14 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-36 hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
          >
            <DashboardButtonComponent to="/admin/movies">
              <template #icon>
                <svg
                  class="size-6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 576 512"
                  fill="purple"
                >
                  <path
                    d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1z"
                  />
                </svg>
              </template>
              Admin
            </DashboardButtonComponent>
          </li>
        </ul>

        <div class="absolute bottom-2 left-1">
          <div
            v-if="loggedUser"
            class="group w-14 overflow-hidden rounded-lg bg-white transition-all duration-500 hover:w-36 hover:shadow-[0_4px_20px_rgba(0,0,0,0.35)] p-2"
          >
            <div class="flex items-center gap-2">
              <img
                :src="loggedUser.image"
                :alt="loggedUser.username"
                class="w-9 h-9 rounded-full object-cover shrink-0"
              />
              <div class="flex flex-col text-xs whitespace-nowrap">
                <span class="font-bold text-purple-800">{{ loggedUser.username }}</span>
                <span
                  class="font-semibold"
                  :class="loggedUser.role === 'admin' ? 'text-red-500' : 'text-blue-500'"
                >
                  {{ loggedUser.role }}
                </span>
                <button
                  @click="AuthService.logout()"
                  class="text-red-400 hover:underline text-left mt-0.5"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div v-else class="w-14 flex items-center justify-center py-1">
            <RouterLink
              to="/login"
              class="flex items-center justify-center w-14 rounded-lg bg-white p-2 hover:shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-all"
            >
              <div class="rounded-lg border-2 border-purple-300 bg-purple-100 p-1">
                <svg class="size-6" fill="purple" viewBox="0 0 24 24">
                  <path
                    d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
                  />
                </svg>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col overflow-hidden ml-20">
        <main class="flex-1 overflow-y-auto p-6">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>