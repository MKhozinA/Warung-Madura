<template>
    <div class="container mx-auto p-4">
      <!-- Add Product Heading -->
      <h1 class="text-xl font-semibold mb-4">Add Product</h1>
      <!-- Line Separator -->
      <hr class="mb-4" />
  
      <div class="flex space-x-4">
        <!-- Left Side: Product Image Upload -->
        <div class="w-1/2 border border-gray-300 rounded-md p-4">
          <div class="flex flex-col items-center justify-center h-full">
            <!-- SVG Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7m-5 10H8m10 0a1 1 0 001-1v-5a1 1 0 00-1-1H7a1 1 0 00-1 1v5a1 1 0 001 1h11zM5 8h14m-3 4H8" />
            </svg>
            <!-- Upload Image Label -->
            <label for="picture" class="block font-medium mb-2 text-center text-gray-500">Upload Product Image</label>
            <input type="file" id="picture" @change="handleFileUpload" class="border border-gray-300 rounded-md p-2 w-full" required />
          </div>
        </div>
  
        <!-- Right Side: Product Form -->
        <div class="w-1/2">
          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label for="name" class="block font-medium mb-1">Product Name</label>
              <input type="text" id="name" v-model="form.name" class="border border-gray-300 rounded-md p-2 w-full" required />
            </div>
            <div>
              <label for="price" class="block font-medium mb-1">Price</label>
              <input type="number" id="price" v-model="form.price" class="border border-gray-300 rounded-md p-2 w-full" required />
            </div>
            <div>
              <label for="category" class="block font-medium mb-1">Category</label>
              <select id="category" v-model="form.category_id" class="border border-gray-300 rounded-md p-2 w-full" required>
                <option v-if="!categories || categories.length === 0" disabled>No categories available</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
  
            <!-- Buttons -->
            <div class="flex justify-end space-x-2">
              <button type="button" @click="cancel" class="bg-white text-blue-500 border border-blue-500 rounded-md px-4 py-2">
                Cancel
              </button>
              <button type="submit" class="bg-blue-500 text-white rounded-md px-4 py-2">
                Confirm
              </button>
            </div>
          </form>
          <!-- Error Message -->
          <p v-if="fetchError" class="text-red-500 mt-4">{{ fetchError }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useProductStore } from '@/stores/product.store.js';
  import { useCategoryStore } from '@/stores/category.store.js';
  import { toast } from 'vue3-toastify';
  
  export default {
    data() {
      return {
        form: {
          category_id: '',
          name: '',
          price: '',
          picture: null,
        },
        categories: [],
        fetchError: null,
      };
    },
    async mounted() {
      try {
        const categoryStore = useCategoryStore();
        await categoryStore.fetchCategories();
        this.categories = categoryStore.categories || [];
    
        if (this.categories.length > 0) {
          this.form.category_id = this.categories[0].id;
        }
      } catch (error) {
        this.fetchError = 'Failed to fetch categories';
      }
    },
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
          this.form.picture = file;
        } else {
          this.fetchError = 'Please upload a valid image file.';
        }
      },
      async submitForm() {
        // console.log('Data to be sent to the API:', this.form);
        const productStore = useProductStore();
        await productStore.addProduct(this.form);
        if (!productStore.fetchError) {
        toast.success('Add product successfully');
        //   this.$router.push('/');
        } else {
          this.fetchError = productStore.fetchError;
          toast.error('Add product failed, please try again')
        }
      },
      cancel() {
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  