<template>
  <div class="container mx-auto px-4 mt-10">
    <h2 class="text-xl font-semibold mb-5">Shopping Cart</h2>
    <table class="table-auto w-full mb-5 border-collapse">
      <thead>
        <tr class="bg-gray-100">
          <th class="text-left px-4 py-2">Product</th>
          <th class="text-center px-4 py-2">Qty</th>
          <th class="text-right px-4 py-2">Sub Total</th>
          <th class="text-center px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItems" :key="item.id" class="border-b">
          <td class="flex items-center px-4 py-2">
            <span class="mr-2">{{ index + 1 }}.</span>
            <img :src="item.picture_url" alt="Product Image" class="w-16 h-16 object-cover mr-4 rounded-md" />
            <div>
              <p class="font-semibold">{{ item.name }}</p>
              <p class="text-gray-500">Rp {{ Intl.NumberFormat('en-US').format(item.price) }}</p>
            </div>
          </td>
          <td class="text-center px-4 py-2">
            <div class="flex justify-center items-center">
              <button @click="decreaseQty(item)" class="bg-gray-300 rounded-full px-3 py-1">-</button>
              <span class="mx-3">{{ item.qty }}</span>
              <button @click="increaseQty(item)" class="bg-gray-300 rounded-full px-3 py-1">+</button>
            </div>
          </td>
          <td class="text-right px-4 py-2 font-bold">Rp {{ Intl.NumberFormat('en-US').format(item.subTotal) }}</td>
          <td class="text-center px-4 py-2">
            <button @click="removeItem(item.id)" class="bg-red-500 text-white rounded px-4 py-1">Remove Item</button>
          </td>
        </tr>
        <!-- Total row -->
        <tr>
          <td colspan="3" class="text-right font-semibold px-4 py-2 border-t border-gray-300">Total:</td>
          <td class="text-right font-bold px-4 py-2 border-t border-gray-300">Rp {{ Intl.NumberFormat('en-US').format(totalAmount) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-end space-x-4 mt-4">
      <button @click="navigateToHome" class="bg-white border border-blue-500 text-blue-500 rounded px-4 py-2">Back To Home</button>
      <button @click="payBill" class="bg-blue-500 text-white rounded px-4 py-2">Pay Bill</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [],
      totalAmount: 0
    };
  },
  mounted() {
    this.loadCart();
  },
  methods: {
    loadCart() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.cartItems = cart.map(item => ({
        ...item,
        subTotal: item.qty * item.price // Recalculate subTotal
      }));
      this.calculateTotal();
    },
    calculateTotal() {
      this.totalAmount = this.cartItems.reduce((total, item) => total + item.subTotal, 0);
    },
    increaseQty(item) {
      item.qty += 1;
      item.subTotal = item.qty * item.price; // Recalculate subTotal
      this.updateCart();
    },
    decreaseQty(item) {
      if (item.qty > 1) {
        item.qty -= 1;
        item.subTotal = item.qty * item.price; // Recalculate subTotal
        this.updateCart();
      }
    },
    removeItem(itemId) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.calculateTotal();
    },
    navigateToHome() {
      this.$router.push('/');
    },
    payBill() {
      // Simpan totalAmount ke localStorage sebelum menghapus cart
      localStorage.setItem('totalAmount', this.totalAmount);

      // Handle payment logic
      localStorage.removeItem('cart');
      this.$router.push('/sukses'); // Redirect to success page
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
