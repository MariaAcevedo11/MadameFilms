<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

import { ref, onMounted } from 'vue'
import { UserService } from '@/services/UserService'
import type { UserInterface } from '@/interfaces/UserInterface'

const loggedUser = ref<UserInterface | null>(null)

onMounted(() => {
  loggedUser.value = UserService.getLoggedUser()
})

function logout() {
  UserService.logout()
  loggedUser.value = null
}


</script>

<template>
  <div class="bg-linear-to-t from-darkerPurple to-darkPurple min-h-screen">
    <div class="flex h-screen overflow-hidden">
      <!-- sidebar -->
      <!-- From Uiverse.io by icochran10 -->
      <ul class="w-1 flex flex-col gap-1 border-l border-gray-200 pl-1 mt-70">

        <!-- These elements will be converted to reusable components later :P-->
        <!--Home button-->
        <li
          class="group w-14 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-30 hover:border-gray-200 hover:shadow-lg has-[:focus]:w-30 has-[:focus]:shadow-lg">
          <RouterLink to="/"
            class="peer flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-purple-800 transition-all active:scale-95">
            <div class="rounded-lg border-2 border-purple-300 bg-purple-100 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="purple" viewBox="0 0 512 512" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M240 6.1c9.1-8.2 22.9-8.2 32 0l232 208c9.9 8.8 10.7 24 1.8 33.9s-24 10.7-33.9 1.8l-8-7.2 0 205.3c0 35.3-28.7 64-64 64l-288 0c-35.3 0-64-28.7-64-64l0-205.3-8 7.2c-9.9 8.8-25 8-33.9-1.8s-8-25 1.8-33.9L240 6.1zm16 50.1L96 199.7 96 448c0 8.8 7.2 16 16 16l48 0 0-104c0-39.8 32.2-72 72-72l48 0c39.8 0 72 32.2 72 72l0 104 48 0c8.8 0 16-7.2 16-16l0-248.3-160-143.4zM208 464l96 0 0-104c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24l0 104z">
                </path>
              </svg>
            </div>
            <div class="font-semibold">Home</div>
          </RouterLink>

        </li>
        <!--Movies button-->
        <li
          class="group w-14 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-35 hover:border-gray-200 hover:shadow-lg has-[:focus]:w-30 has-[:focus]:shadow-lg">
          <RouterLink to="/movies"
            class="peer flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-purple-800 transition-all active:scale-95">
            <div class="rounded-lg border-2 border-purple-300 bg-purple-100 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="purple" viewBox="0 0 448 512" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path
                  d="M0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM48 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm304-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm304-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 112l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16L64 96c-8.8 0-16 7.2-16 16zM352 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0z"
                  stroke-linejoin="round" stroke-linecap="round"></path>
              </svg>
            </div>
            <div class="font-semibold">Movies</div>
          </RouterLink>

        </li>
        <!--Actress button-->
        <li
          class="group w-14 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-35 hover:border-gray-200 hover:shadow-lg has-[:focus]:w-30 has-[:focus]:shadow-lg">
          <RouterLink to="/actresses"
            class="peer flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-purple-800 transition-all active:scale-95">
            <div class="rounded-lg border-2 border-purple-300 bg-purple-100 p-1">
              <svg class="size-6" stroke="currentColor" stroke-width="1.5" viewBox="0 0 384 512" fill="purple"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M136 24a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zM112 384l-25.8 0c-10.9 0-18.6-10.7-15.2-21.1l43-129-48.3 65.1c-10.5 14.2-30.6 17.2-44.8 6.6s-17.2-30.6-6.6-44.8l70.5-95C110 132 149.7 112 192 112s82 20 107.2 53.9l70.5 95c10.5 14.2 7.6 34.2-6.6 44.8s-34.2 7.6-44.8-6.6L270 234 313 362.9c3.5 10.4-4.3 21.1-15.2 21.1l-25.8 0 0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128-32 0 0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128z"
                  stroke-linejoin="round" stroke-linecap="round"></path>
              </svg>
            </div>
            <div class="font-semibold">Actress</div>
          </RouterLink>
          <div class="grid grid-rows-[0fr] overflow-hidden transition-all duration-500 peer-focus:grid-rows-[1fr]">
          </div>
        </li>
        <!--Reviews button-->
        <li
          class="group w-14 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-35 hover:border-gray-200 hover:shadow-lg has-[:focus]:w-30 has-[:focus]:shadow-lg">
          <RouterLink to="/reviews"
            class="peer flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-purple-800 transition-all active:scale-95">
            <div class="rounded-lg border-2 border-purple-300 bg-purple-100 p-1">
              <svg class="size-6" stroke="currentColor" stroke-width="1.5" viewBox="0 0 576 512" fill="purple"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"
                  stroke-linejoin="round" stroke-linecap="round"></path>
              </svg>
            </div>
            <div class="font-semibold">Reviews</div>
          </RouterLink>
          <!--Movie Management, this can only be shown if user is admin, later...-->
          <RouterLink v-if="loggedUser?.type === 'admin'" to="/admin/movies"
            class="peer flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-purple-800 transition-all active:scale-95">
            <div class="rounded-lg border-2 border-purple-300 bg-purple-100 p-1">
              <svg class="size-6" stroke="currentColor" stroke-width="1.5" viewBox="0 0 576 512" fill="purple"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"
                  stroke-linejoin="round" stroke-linecap="round"></path>
              </svg>
            </div>
            <div class="font-semibold">Movie Management</div>
          </RouterLink>

          <div class="grid grid-rows-[0fr] overflow-hidden transition-all duration-500 peer-focus:grid-rows-[1fr]">
          </div>
        </li>
      </ul>

      <!-- Usuario logeado -->
      <li v-if="loggedUser" class="mt-auto bg-white rounded-lg p-3 w-60">

        <div class="flex flex-col text-sm">
          <span class="font-bold text-purple-800">
            {{ loggedUser.username }}
          </span>

          <span class="text-gray-500">
            {{ loggedUser.email }}
          </span>

          <span class="font-semibold" :class="loggedUser.type === 'admin' ? 'text-red-500' : 'text-blue-500'">
            {{ loggedUser.type }}
          </span>
        </div>

        <button @click="logout" class="mt-2 text-xs text-red-500 hover:underline">
          Logout
        </button>
      </li>

      <!-- Si no está logeado -->
      <li v-else class="mt-auto">
        <RouterLink to="/login" class="text-white text-sm">
          Login
        </RouterLink>
      </li>

      <!-- main content area -->
      <div class="flex-1 flex flex-col overflow-hidden ml-20">
        <!-- main content -->
        <main class="flex-1 overflow-y-auto p-6">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>