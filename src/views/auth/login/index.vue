<template>
  <div class="relative min-h-screen bg-white">
    <!-- Background Blue -->
    <div class="absolute top-0 left-0 w-full h-1/2 bg-blue-500 z-0"></div>

    <!-- Header -->
    <div class="absolute top-0 left-0 w-full flex flex-col sm:flex-row justify-between items-center p-4 z-10">
      <span class="text-white text-lg font-bold text-center sm:text-left mb-2 sm:mb-0">Warung Madura</span>
      <span class="text-white text-lg font-medium text-center sm:text-right">Call Us: 08342678991729</span>
    </div>

    <!-- Main Content -->
    <div class="relative flex flex-col justify-end sm:justify-center min-h-screen z-10 p-4">
      <!-- Form Container -->
      <div class="bg-white shadow-md rounded-lg p-8 max-w-sm w-full mx-auto sm:mb-0 mb-4">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 text-center">Login</h2>
        <form @submit.prevent="login">
          <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email address</label>
            <input v-model="formData.email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@company.com" required>
          </div>
          <div class="mb-6 relative">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <div class="relative">
              <input :type="showPassword ? 'text' : 'password'" v-model="formData.password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10" placeholder="•••••••••" required>
              <button type="button" @click="togglePassword" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg :class="showPassword ? 'text-blue-500' : 'text-gray-500'" class="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                  <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h.01M9 12h.01M12 12h.01M21 12c0 1.64-4 7-9 7s-9-5.36-9-7 4-7 9-7 9 5.36 9 7z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825L13.5 19.5l-.375-.675A7.978 7.978 0 0112 20c-5 0-9-5.36-9-7 0-.847.65-2.615 2.03-4.508L7.197 10.76M7.5 5.5L5.73 3.73A7.978 7.978 0 0112 4c5 0 9 5.36 9 7 0 .847-.65 2.615-2.03 4.508L16.803 13.24M9.375 18.825L9 19.5l-.375-.675M5.197 14.24L3.73 12.73A7.978 7.978 0 012 12c0-.36.214-.87.66-1.46M13.5 10.5L15 12m-6 0l1.5-1.5M9 6.75v-.5a1.25 1.25 0 10-2.5 0v.5m0 0a1.25 1.25 0 002.5 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex justify-center">
            <button type="submit" class="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.store.js"

export default {
  data() {
    return {
      authStore: useAuthStore(),
      formData: {
        email: "",
        password: "",
      },
      showPassword: false
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    login() {
      this.authStore.login(this.formData)
    }
  }
}
</script>

<style scoped>
@media (max-width: 640px) {
  .relative {
    flex-direction: column;
    justify-content: flex-end;
  }
  .bg-white {
    margin-bottom: 0;
  }
}
@media (min-width: 641px) {
  .relative {
    flex-direction: column;
    justify-content: center;
  }
  .bg-white {
    margin-bottom: 4rem; /* adjust if needed */
  }
}
</style>
