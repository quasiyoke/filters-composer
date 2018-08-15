/* eslint-disable no-param-reassign */

import * as R from 'ramda';

import { DEFAULT_EFFECT_PRESET_ID } from '@/const';
import { getAttributesHash } from '@/utils/effects';
import { selectEffect, getEffectAttribute } from './selectors';

let newEffectId = 100;

/**
 * Takes values for the new attributes' set from the old one.
 *
 * @example
 * fillAttributesPreset(
 *   [
 *     { id: 'strength', value: 0.3, },
 *     { id: 'foo', value: 0.1, },
 *   ],
 *   [
 *     { id: 'strength', value: 0.4, },
 *     { id: 'bar', value: 0.5, },
 *   ],
 * );
 * //=> [
 * //=>   { id: 'strength', value: 0.3, },
 * //=>   { id: 'bar', value: 0.5, },
 * //=> ],
 */
const fillAttributesPreset = (old, fresh) => {
  const oldHash = getAttributesHash(old);
  return fresh.map((attribute) => {
    const { id, min, max } = attribute;
    const freshAttribute = { ...attribute };
    const oldValue = oldHash[id];

    if (
      typeof oldValue === 'number' && Number.isFinite(oldValue)
      && oldValue >= min && oldValue <= max
    ) {
      freshAttribute.value = oldValue;
    }

    return freshAttribute;
  });
};

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
    effect.type = type;
    effect.name = effectPreset.name;
    effect.attributes = fillAttributesPreset(effect.attributes, effectPreset.attributes);
  },
  setPictureId: (state, pictureId) => {
    state.pictureId = pictureId;
  },
};
