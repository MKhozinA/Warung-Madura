import { defineStore } from 'pinia';
import { useAuthStore } from './auth.store.js';
import { axiosWrapper } from '@/helper/axios-wrapper.js';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useProductStore = defineStore({
  id: 'product',
  state: () => ({
    products: [],
    fetchError: null,
  }),
  actions: {
    async fetchProducts() {
      const authStore = useAuthStore();
      const token = authStore.user?.token;
      if (!token) {
        this.fetchError = "Authorization token not found.";
        return;
      }

      try {
        const response = await axiosWrapper.get(`${baseUrl}/product`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        this.products = response.data;
        this.fetchError = null;
      } catch (error) {
        console.error('Fetch products error:', error.response?.data || error.message);
        this.fetchError = error.response?.data?.message || "Failed to fetch products.";
      }
    },

    async addProduct(productData) {
      console.log("Product data:", productData);

      const authStore = useAuthStore();
      const token = authStore.user?.token;
      if (!token) {
        this.fetchError = "Authorization token not found.";
        return;
      }

      try {
        const formData = new FormData();
        formData.append('category_id', productData.category_id);
        formData.append('name', productData.name);
        formData.append('price', productData.price);

        if (productData.picture && (productData.picture instanceof File || productData.picture instanceof Blob)) {
          formData.append('picture', productData.picture);
        } else {
          throw new Error("Invalid picture format or missing picture.");
        }

        const response = await axios.post(`${baseUrl}/product`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Product added response:', response.data);
        this.products.push(response.data);
        this.fetchError = null;
      } catch (error) {
        this.fetchError = error.response?.data?.message || "Failed to add product.";
      }
    },

    async deleteProduct(productId) {
      const authStore = useAuthStore();
      const token = authStore.user?.token;
      if (!token) {
        this.fetchError = "Authorization token not found.";
        return;
      }

      try {
        const response = await axios.delete(`${baseUrl}/product/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Product deleted response:', response.data);

        // Remove the deleted product from the products array
        this.products = this.products.filter(product => product.id !== productId);
        this.fetchError = null;
      } catch (error) {
        console.error('Delete product error:', error.response?.data || error.message);
        this.fetchError = error.response?.data?.message || "Failed to delete product.";
      }
    },
  },
});
