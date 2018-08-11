import Vue from 'vue';
import Vuex from 'vuex';

import { DEFAULT_EFFECT_PRESET } from '@/const';
import mutations from './mutations';

Vue.use(Vuex);
const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: {
    effects: [{
      ...DEFAULT_EFFECT_PRESET,
      id: 1,
    }],
    pictureId: '2',
    pictures: {
      1: {
        name: 'Architecture',
        original: 'architectural-background.jpg',
      },
      2: {
        name: 'Daisies',
        original: 'daisies.jpg',
      },
      3: {
        name: 'Desert safari',
        original: 'desert-safari.jpg',
      },
      4: {
        name: 'Pumpkins',
        original: 'pumpkins.jpg',
      },
      5: {
        name: 'Atlantis',
        original: 'space-shuttle-atlantis.jpg',
      },
    },
  },
  getters: {
    picture: state => state.pictures[state.pictureId],
    pictureUrl: (state, getters) => `./static/${getters.picture.original}`,
  },
  mutations,
});

export default store;
