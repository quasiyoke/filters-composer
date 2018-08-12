export const selectEffect = (state, effectId) => state.effects
  .find(effect => effect.id === effectId);

export const getEffectAttribute = (effect, attributeId) => effect.attributes
  .find(attribute => attribute.id === attributeId);
