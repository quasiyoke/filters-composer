/* eslint-disable no-param-reassign */

import * as R from 'ramda';

import { DEFAULT_EFFECT_PRESET_ID } from '@/const';
import { selectEffect, getEffectAttribute } from './selectors';

let newEffectId = 100;

export default {
  addEffect: (state) => {
    state.effects.push({
      ...R.clone(state.effectsPresets[DEFAULT_EFFECT_PRESET_ID]),
      id: newEffectId,
    });
    newEffectId += 1;
  },
  removeEffect: (state, effectId) => {
    state.effects = state.effects.filter(effect => effect.id !== effectId);
  },
  setEffectAttributeValue: (state, { effectId, attributeId, value }) => {
    getEffectAttribute(
      selectEffect(state, effectId),
      attributeId,
    ).value = value;
  },
  setEffectType: (state, { effectId, type }) => {
    const effect = selectEffect(state, effectId);
    const effectPreset = state.effectsPresets[type];
    Object.assign(effect, R.clone(effectPreset));
  },
  setPictureId: (state, pictureId) => {
    state.pictureId = pictureId;
  },
};
