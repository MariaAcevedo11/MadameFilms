import { actressesSeeder } from '@/stores/seeders/actresseseeder';
import { createPinia } from 'pinia';
import { moviesSeeder } from '@/stores/seeders/movieseeder';
import { reviewSeeder } from '@/stores/seeders/reviewseeder.js';
import { watch } from 'vue';

export default class PiniaConfig {
  public static init() {
    const pinia = createPinia();

    const savedState = localStorage.getItem('piniaState');
    if (savedState) {
      pinia.state.value = JSON.parse(savedState);
    } else {
      // initialize the state with the seeders
      pinia.state.value = {
        movie: {
          movies: moviesSeeder,
        },
        actress: {
          actresses: actressesSeeder,
        },
        review: {
          reviews: reviewSeeder,
        },

      };

      // save the initial state to localStorage
      localStorage.setItem('piniaState', JSON.stringify(pinia.state.value));
    }

    // watch for changes and save to localStorage
    watch(
      pinia.state,
      (state) => {
        localStorage.setItem('piniaState', JSON.stringify(state));
      },
      { deep: true },
    );

    return pinia;
  }
}
