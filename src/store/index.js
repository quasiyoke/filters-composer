/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';

const EFFECTS_PRESETS = [
  {
    name: 'Blur',
    attributes: [
      {
        id: 'strength',
        name: 'Strength',
        min: 0,
        max: 1,
        default: 0.5,
      },
    ],
    getKernel: ({ strength }) => [
      strength, strength, strength,
      1, 1, 1,
      1, 1, 1,
    ],
  },
  {
    name: 'Emboss',
    attributes: [
      {
        id: 'strength',
        name: 'Strength',
        min: 0,
        max: 1,
        default: 0.5,
      },
    ],
    getKernel: ({ strength }) => [
      strength, strength, strength,
      1, 1, 1,
      1, 1, 1,
    ],
  },
  {
    name: 'Sharpen',
    attributes: [
      {
        id: 'strength',
        name: 'Strength',
        min: 0,
        max: 1,
        default: 0.5,
      },
    ],
    getKernel: ({ strength }) => [
      strength, strength, strength,
      1, 1, 1,
      1, 1, 1,
    ],
  },
];
const DEFAULT_EFFECT_PRESET = EFFECTS_PRESETS[0];

let newEffectId = 100;

Vue.use(Vuex);
const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: {
    effects: [{
      ...DEFAULT_EFFECT_PRESET,
      id: 1,
    }],
  },
  mutations: {
    addEffect: (state, newEffect) => {
      state.effects.push(newEffect);
    },
    removeEffect: (state, effectId) => {
      state.effects = state.effects.filter(effect => effect.id !== effectId);
    },
    setEffectAttribute: (state, { effectId, attribute }) => {
      state.effects
        .find(effect => effect.id === effectId)
        .attribute = attribute;
    },
  },
  actions: {
    addEffect: (ctx) => {
      ctx.commit('addEffect', {
        ...DEFAULT_EFFECT_PRESET,
        id: newEffectId,
      });
      newEffectId += 1;
    },
    removeEffect: (ctx, effectId) => {
      ctx.commit('removeEffect', effectId);
    },
    setEffectAttribute: (ctx, { effectId, attribute }) => {
      ctx.commit('setEffectAttribute', { effectId, attribute });
    },
  },
});

export default store;
