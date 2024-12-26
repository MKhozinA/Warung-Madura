<template>
  <div class="px-16">
    <div class="flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="font-semibold text-lg mb-4">Add Category</h1>
        <div class="border-t border-gray-300 mb-4"></div>
        <input
          v-model="newCategoryName"
          type="text"
          placeholder="New Category Name"
          class="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <p v-if="categoryStore.addError" class="text-red-500 mb-4">
          {{ categoryStore.addError }}
        </p>
        <div class="flex">
          <button
            @click="cancel"
            class="bg-white border border-blue-500 text-blue-500 p-2 rounded w-full mr-2"
          >
            Cancel
          </button>
          <button
            @click="addCategory"
            class="bg-blue-500 text-white p-2 rounded w-full ml-2"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { useCategoryStore } from "@/stores/category.store.js";
import { useRouter } from "vue-router";
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      newCategoryName: "",
      categoryStore: useCategoryStore(),
    };
  },
  methods: {
    async addCategory() {
      if (this.newCategoryName.trim()) {
        try {
          await this.categoryStore.addCategory(this.newCategoryName);
          toast.success('Add category successfully');
          this.newCategoryName = ""; // Reset input setelah berhasil
        } catch (error) {
          toast.error('Add category failed, please try again ');
        }
      } else {
        toast.warn('Add category failed, please try again');
      }
    },
    cancel() {
      this.$router.push("/");
    },
  },
};
</script>
