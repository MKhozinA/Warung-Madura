<template>
  <!-- Desktop View -->
  <div id="destop" class="desktop-view px-16">
    <div class="flex justify-end mt-5">
      <button @click="navigateToCategoryAdd" class="bg-blue-200 p-2 rounded-md text-blue-600 hover:bg-blue-400 ml-2">
        + Add Category
      </button>
      <button @click="navigateToAddProduct" class="bg-blue-200 p-2 rounded-md text-blue-600 hover:bg-blue-400 ml-2">
        + Add Product
      </button>
      <button @click="navigateToCart" class="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-600 ml-2">
        Cart
      </button>
    </div>

    <h2 class="font-semibold text-lg mt-5">Categories</h2>
    <div class="relative">
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-300"></div>
      <div class="overflow-x-auto scrollbar-hidden">
        <ul class="flex space-x-4 -mx-4 px-4">
          <li v-for="category in categoryStore.categories" :key="category.id" class="flex-shrink-0">
            <a
              href="#"
              @click.prevent="selectCategory(category.id)"
              :class="{
                'bg-transparent text-blue-600 border-b-2 border-blue-600 mb-1': selectedCategoryId === category.id,
                'bg-transparent text-gray-800 border-b-2 border-transparent mb-1': selectedCategoryId !== category.id
              }"
              class="p-2 rounded-md block text-center hover:bg-gray-300"
            >
              {{ category.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <p v-if="categoryStore.fetchError" class="text-red-500">{{ categoryStore.fetchError }}</p>
    
    <!-- Hasil Desktop -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
      <div v-for="product in filteredProducts" :key="product.id" class="border border-gray-300 rounded-md p-2">
        <img :src="product.picture_url" alt="Product Image" class="w-full h-40 object-cover mb-5 rounded-md" />
        <div class="flex justify-between items-center mb-2">
          <p class="text-sm font-semibold">{{ product.name }}</p>
          <button @click="deleteProduct(product.id)" class="bg-red-500 text-white hover:bg-red-700 p-1 rounded">
            Delete
          </button>
        </div>
        <p class="text-left text-gray-800 font-bold">Rp {{ Intl.NumberFormat('en-ID').format(product.price) }}</p>

        <div class="flex justify-center mt-3">
          <button @click="addToCart(product)" class="bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-md">
            + Add To Cart
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-5 fixed bottom-0 right-0 mb-4 mr-4 px-16">
      <button @click="navigateToCart" class="bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-md">
        Total Bill: Rp {{ totalBill }}
      </button>
    </div>

    <p v-if="productStore.fetchError" class="text-red-500">{{ productStore.fetchError }}</p>
  </div>

  <!-- Mobile View -->
  <div id="mobail">
    <div class="relative mt-5 px-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="w-full p-2 border rounded-md"
      />
    </div>
    <div v-for="category in categoryStore.categories" :key="category.id" class="mt-5">
      <h3 class="font-semibold text-md">{{ category.name }}</h3>
      <div class="relative">
        <div class="overflow-x-auto scrollbar-hidden">
          <div class="flex space-x-4 mt-2">
            <div v-for="product in filteredProductsForCategory(category.id)" :key="product.id" class="flex-shrink-0 border border-gray-300 rounded-md p-2 w-60">
              <img :src="product.picture_url" alt="Product Image" class="w-full h-40 object-cover mb-5 rounded-md" />
              <div class="flex justify-between items-center mb-2">
                <p class="text-sm font-semibold truncate">{{ product.name }}</p>
                <button @click="deleteProduct(product.id)" class="bg-red-500 text-white hover:bg-red-700 p-1 rounded">
                  Delete
                </button>
              </div>
              <p class="text-left text-gray-800 font-bold">Rp {{ Intl.NumberFormat('en-ID').format(product.price) }}</p>

              <div class="flex justify-center mt-3">
                <button @click="addToCart(product)" class="bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-md">
                  + Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative mt-5">
  <!-- Tombol Keranjang dengan latar belakang biru dan ikon putih -->
  
    <button @click="navigateToCart" class="bg-blue-500 border border-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-white hover:bg-blue-600 fixed bottom-4 right-4">
    <i class="fas fa-shopping-cart text-xl"></i> <!-- Ikon keranjang Font Awesome -->
  </button>
    <button @click="navigateToCategoryAdd" class="bg-white border border-blue-500 w-full p-2 rounded-md text-blue-600 hover:bg-blue-50 mb-2">
      + Add Category
    </button>
    <button @click="navigateToAddProduct" class="bg-white border border-blue-500 w-full p-2 rounded-md text-blue-600 hover:bg-blue-50">
      + Add Product
    </button>
  </div>


    <p v-if="productStore.fetchError" class="text-red-500">{{ productStore.fetchError }}</p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useCategoryStore } from "@/stores/category.store.js";
import { useProductStore } from "@/stores/product.store.js";

export default {
  data() {
    return {
      categoryStore: useCategoryStore(),
      productStore: useProductStore(),
      selectedCategoryId: null,
      cart: [],
      searchQuery: ''  // Tambahkan properti untuk pencarian
    };
  },
  mounted() {
    this.categoryStore.fetchCategories().then(() => {
      this.productStore.fetchProducts().then(() => {
        this.loadCart();
        // Set the default category if categories are available
        if (this.categoryStore.categories.length > 0) {
          this.selectedCategoryId = this.categoryStore.categories[0].id;
        }
      });
    });
  },
  methods: {
    navigateToCategoryAdd() {
      this.$router.push('/category/add');
    },
    navigateToAddProduct() {
      this.$router.push('/product/add');
    },
    navigateToCart() {
      this.$router.push('/cart');
    },
    async deleteProduct(productId) {
      const confirmed = confirm('Are you sure you want to delete this product?');
      if (confirmed) {
        try {
          await this.productStore.deleteProduct(productId);
          console.log(`Product ${productId} deleted successfully.`);
        } catch (error) {
          console.error(`Failed to delete product: ${error.message}`);
        }
      }
    },
    addToCart(product) {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = storedCart.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.qty += 1;
        existingProduct.supTotal = existingProduct.qty * existingProduct.price;
      } else {
        storedCart.push({
          ...product,
          qty: 1,
          supTotal: product.price,
        });
      }

      localStorage.setItem('cart', JSON.stringify(storedCart));
      this.loadCart();
    },
    loadCart() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    },
    selectCategory(categoryId) {
      this.selectedCategoryId = categoryId;
    },
    filteredCategories() {
      return this.categoryStore.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filteredProductsForCategory(categoryId) {
      return this.productStore.products
        .filter(product => product.category_id === categoryId)
        .filter(product => product.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  computed: {
    filteredProducts() {
      if (this.selectedCategoryId) {
        return this.productStore.products
          .filter(product => product.category_id === this.selectedCategoryId)
          .filter(product => product.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }
      return this.productStore.products
        .filter(product => product.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
    totalBill() {
      return this.cart.reduce((total, item) => total + item.supTotal, 0);
    }
  }
}



</script>

<style>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

#destop {
  display: none;
}

#mobail {
  display: block;
}

@media (min-width: 768px) {
  #destop {
    display: block;
  }

  #mobail {
    display: none;
  }
}
</style>
