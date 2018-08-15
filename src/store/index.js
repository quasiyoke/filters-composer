import * as R from 'ramda';
import Vue from 'vue';
import Vuex from 'vuex';

import { DEFAULT_EFFECT_PRESET_ID } from '@/const';
import mutations from './mutations';

const effectsPresets = {
  emboss: {
    type: 'emboss',
    name: 'Emboss',
    attributes: [
      {
        id: 'strength',
        name: 'Strength',
        min: 0,
        max: 1,
        value: 0.5,
      },
    ],
  },
  gaussianBlur: {
    type: 'gaussianBlur',
    name: 'Gaussian blur',
    attributes: [
      {
        id: 'strength',
        name: 'Strength',
        min: 0,
        max: 1,
        value: 0.5,
      },
    ],
  },
  sharpness: {
    type: 'sharpness',
    name: 'Sharpness',
    attributes: [
      {
        id: 'strength',
        name: 'Strength',
        min: 0,
        max: 1,
        value: 0.5,
      },
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
