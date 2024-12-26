<template>
    <div class="container mx-auto px-4 mt-10 text-center">
      <div class="flex justify-center mb-5">
        <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
      <h2 class="text-xl font-semibold mb-5">Payment Success</h2>
      <p class="text-lg">Thank you for your purchase!</p>
      <p class="text-lg">Total Amount: Rp {{ totalAmount }}</p>
      <button @click="navigateToHome" class="bg-blue-500 text-white rounded px-4 py-2 mt-4">Back to Home</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        totalAmount: 0
      };
    },
    mounted() {
      this.totalAmount = localStorage.getItem('totalAmount') || 0;
      localStorage.removeItem('totalAmount');
    },
    methods: {
      navigateToHome() {
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  