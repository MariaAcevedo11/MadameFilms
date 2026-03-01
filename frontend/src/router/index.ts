import ActressesView from '@/views/user/ActressesView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/user/HomeView.vue';
import MoviesView from '@/views/user/MoviesView.vue';
import ReviewsView from '@/views/user/ReviewsView.vue';
import MovieManagView from '@/views/admin/MovieManagView.vue';
import MovieAddMovie from '@/views/admin/MovieAddMovie.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    { path: '/actresses', name: 'actresses', component: ActressesView, meta: { title: 'Actresses' } },
    { path: '/movies', name: 'movies', component: MoviesView, meta: { title: 'Movies' } },
    { path: '/admin/movies', name: 'adminMovies', component: MovieManagView, meta: { title: 'MovieManag' } },
    { path: '/admin/movies/create', name: 'adminMovies.create', component: MovieAddMovie, meta: { title: 'AdminMoviesCreate' } },
    { path: '/reviews', name: 'reviews', component: ReviewsView, meta: { title: 'Reviews' } },

  ],
});

export default router;
