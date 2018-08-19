import * as R from 'ramda';

const builders = {
  edgeDetect: () => {
    const W = -0.125; // Weight.
    return [
      W, W, W,
      W, 1, W,
      W, W, W,
    ];
  },
  emboss: ({ strength }) => [
    -2 * strength, -1 * strength, 0,
    -1 * strength, 1, strength,
    0, strength, 2 * strength,
  ],
  gaussianBlur: ({ strength }) => {
    const S = 0.367 * strength; // Side weight.
    const C = 0.136 * strength; // Corner weight.
    return [
      C, S, C,
      S, 1, S,
      C, S, C,
    ];
  },
  sharpness: ({ strength }) => {
    const W = -strength; // Weight.
    return [
      0, W, 0,
      W, 5, W,
      0, W, 0,
    ];
  },
};

/**
 * Creates a table of attributes' values.
 *
 * @example
 * getAttributesHash([
 *   { id: 'strength', value: 0.3, },
 *   { id: 'foo', value: 0.1, },
 * ]);
 * //=> {
 * //=>   strength: 0.3,
 * //=>   foo: 0.1,
 * //=> },
 */
export const getAttributesHash = attributes => attributes.reduce(
  (acc, { id, value }) => {
    acc[id] = value;
    return acc;
  },
  {},
);

export const getKernel = effect => R.compose(
  builders[effect.type],
  getAttributesHash,
  R.prop('attributes'),
)(effect);

/**
 * Computes convolution kernel's weight.
 */
export const getWeight = R.compose(
  R.cond([
    [R.lt(0), R.identity],
    [R.T, R.always(1)],
  ]),
  R.sum,
);
