import * as R from 'ramda';
import Vue from 'vue';
import Vuex from 'vuex';

import { DEFAULT_EFFECT_PRESET_ID } from '@/const';
import mutations from './mutations';

const effectsPresets = {
  blur: {
    type: 'blur',
    name: 'Blur',
    attributes: [
      {
        id: 'strength',
        name: 'Strength',
        min: 0,
        max: 1000,
        value: 500,
      },
    ],
    getKernel: ({ strength }) => [
      strength, strength, strength,
      1, 1, 1,
      1, 1, 1,
    ],
  },
  emboss: {
    type: 'emboss',
    name: 'Emboss',
    attributes: [
      {
        id: 'strength',
        name: 'Strength',
        min: 0,
        max: 1000,
        value: 500,
      },
    ],
    getKernel: ({ strength }) => [
      strength, strength, strength,
      1, 1, 1,
      1, 1, 1,
    ],
  },
  sharpen: {
    type: 'sharpen',
    name: 'Sharpen',
    attributes: [
      {
        id: 'strength',
        name: 'Strength',
        min: 0,
        max: 1000,
        value: 500,
      },
    ],
    getKernel: ({ strength }) => [
      strength, strength, strength,
      1, 1, 1,
      1, 1, 1,
    ],
  },
};

Vue.use(Vuex);
const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: {
    effects: [{
      ...R.clone(effectsPresets[DEFAULT_EFFECT_PRESET_ID]),
      id: 1,
    }],
    effectsPresets,
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
