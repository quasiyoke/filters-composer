import * as R from 'ramda';
import Vue from 'vue';
import Vuex from 'vuex';

import { DEFAULT_EFFECT_PRESET_ID } from '@/const';
import { presets } from '@/utils/effects';
import mutations from './mutations';

Vue.use(Vuex);
const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: {
    effects: [{
      ...R.clone(presets[DEFAULT_EFFECT_PRESET_ID]),
      id: 1,
    }],
    effectsPresets: presets,
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
