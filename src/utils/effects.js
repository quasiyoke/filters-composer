import * as R from 'ramda';

const builders = {
  emboss: ({ strength }) => [
    -2 * strength, -1 * strength, 0,
    -1 * strength, 1, 1 * strength,
    0, 1 * strength, 2 * strength,
  ],
  gaussianBlur: ({ strength }) => [
    1 * strength, 2 * strength, 1 * strength,
    2 * strength, 1, 2 * strength,
    1 * strength, 2 * strength, 1 * strength,
  ],
  sharpness: ({ strength }) => [
    0, -1 * strength, 0,
    -1 * strength, 5, -1 * strength,
    0, -1 * strength, 0,
  ],
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
