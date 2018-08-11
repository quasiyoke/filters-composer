export const EFFECTS_PRESETS = [
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
export const DEFAULT_EFFECT_PRESET = EFFECTS_PRESETS[0];
