<template>
  <div class="w-screen h-[75px] bg-blue-500 flex justify-between items-center px-4">
    <div class="flex items-center text-white">
      <div class="text-xl font-bold">Warung Madura</div>
    </div>
    <div class="relative flex items-center text-white">
      <div @click="toggleDropdown" class="link flex items-center cursor-pointer">
        {{ authStore.user.name }}
        <img src="@/assets/profile.jpg" alt="Profile Icon" class="ml-2 w-8 h-8 rounded-full"/>
      </div>
      <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
        <!-- Menambahkan informasi nama pengguna di atas dropdown dengan teks hitam -->
        <div class="px-4 py-2 font-semibold border-b text-black">
          {{ authStore.user.name }}
        </div>
        <div @click="authStore.logout" class="link px-4 py-2 hover:bg-gray-100 text-black">
          Logout
        </div>
      </div>
    </div>
  </div>
  <div class="p-5">
    <slot />
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.store.js";

export default {
  name: 'NavigationBar',
  data() {
    return {
      authStore: useAuthStore(),
      dropdownOpen: false
    };
  },
  methods: {
    toggleDropdown(event) {
      event.stopPropagation();
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  }
};
</script>

<style>
.link {
  @apply px-2 cursor-pointer hover:text-red-400;
}
</style>
