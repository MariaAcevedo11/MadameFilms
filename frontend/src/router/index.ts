// External imports
import { createRouter, createWebHistory } from 'vue-router';

// Internal imports
// User views
import HomeView from '@/views/user/HomeView.vue';
import MoviesView from '@/views/user/MoviesView.vue';
import ReviewsView from '@/views/user/ReviewsView.vue';
import CreateReview from '@/views/user/CreateReview.vue';
import ActressesView from '@/views/user/ActressesView.vue';

// Admin views
import CreateMovie from '@/views/admin/CreateMovie.vue';
import MovieManagView from '@/views/admin/MovieManagView.vue';

// Auth views
import LoginView from '@/views/login/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    {
      path: '/actresses',
      name: 'actresses',
      component: ActressesView,
      meta: { title: 'Actresses' },
    },
    { path: '/movies', name: 'movies', component: MoviesView, meta: { title: 'Movies' } },
    {
      path: '/admin/movies',
      name: 'adminMovies',
      component: MovieManagView,
      meta: { title: 'adminMovies', requiresAdmin: true },
    },
    {
      path: '/admin/movies/create',
      name: 'adminMovies.create',
      component: CreateMovie,
      meta: { title: 'AdminMoviesCreate', requiresAdmin: true },
    },

    { path: '/reviews', name: 'reviews', component: ReviewsView, meta: { title: 'Reviews' } },
    {
      path: '/reviews/create',
      name: 'reviews.create',
      component: CreateReview,
      meta: { title: 'ReviewsCreate', requiresAuth: true },
    },
    { path: '/login', name: 'login', component: LoginView, meta: { title: 'Login' } },
  ],
});

export default router;
