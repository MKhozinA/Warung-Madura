import { defineStore } from 'pinia';
import { useAuthStore } from './auth.store.js';
import { axiosWrapper } from '@/helper/axios-wrapper.js';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useCategoryStore = defineStore({
    id: 'category',
    state: () => ({
        categories: [],
        fetchError: null,
        addError: null,
    }),
    actions: {
        async fetchCategories() {
            const authStore = useAuthStore();
            const token = authStore.user?.token;

            if (!token) {
                this.fetchError = "Authorization token not found.";
                return;
            }

            try {
                const response = await axiosWrapper.get(`${baseUrl}/category`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.categories = response.data;
            } catch (error) {
                this.fetchError = error.response?.data?.message || "Failed to fetch categories.";
            }
        },

        async addCategory(name) {
            const authStore = useAuthStore();
            const token = authStore.user?.token;

            if (!token) {
                this.addError = "Authorization token not found.";
                return;
            }

            try {
                const response = await axiosWrapper.post(`${baseUrl}/category`, 
                { name }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                this.categories.push(response.data);

                this.addError = null;
            } catch (error) {
                this.addError = error.response?.data?.message || "Failed to add category.";
            }
        }
    }
});
