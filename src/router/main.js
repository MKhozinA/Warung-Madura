import HomeView from '@/views/home/index.vue';
import CategoryAdd from '@/views/category/index.vue';
import ProductAdd from '@/views/product/index.vue';
import CartView from '@/views/cart/index.vue';
import SuksesView from '@/views/successfull/index.vue';



import UserView from '@/views/user/index.vue';
import UserCreateView from '@/views/user/create.vue';
import UserUpdateView from '@/views/user/update.vue';

import ExampleLayout from '@/layouts/ExampleLayout.vue';
import NavigationBar from '@/layouts/NavigationBar.vue';

// middleware
import AuthMiddleware from '@/middleware/auth.middleware.js';

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home',
      layout: NavigationBar,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: '/category/add',
    name: 'category.add',
    component: CategoryAdd,
    meta: {
      title: 'Add Category',
      layout: NavigationBar,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: '/product/add',
    name: 'product.add',
    component: ProductAdd,
    meta: {
      title: 'Add Product',
      layout: NavigationBar,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView,
    meta: {
      title: 'Add Product',
      layout: NavigationBar,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: '/sukses',
    name: 'Sukses',
    component: SuksesView,
    meta: {
      title: 'Sukses',
      middleware: [AuthMiddleware],
    },
  },
];
