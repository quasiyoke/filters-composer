/* eslint-disable no-param-reassign */

import { DEFAULT_EFFECT_PRESET } from '@/const';

let newEffectId = 100;

export default {
  addEffect: (state) => {
    state.effects.push({
      ...DEFAULT_EFFECT_PRESET,
      id: newEffectId,
    });
    newEffectId += 1;
  },
  removeEffect: (state, effectId) => {
    state.effects = state.effects.filter(effect => effect.id !== effectId);
  },
  setEffectAttribute: (state, { effectId, attribute }) => {
    state.effects
      .find(effect => effect.id === effectId)
      .attribute = attribute;
  },
  setPictureId: (state, pictureId) => {
    state.pictureId = pictureId;
  },
};
