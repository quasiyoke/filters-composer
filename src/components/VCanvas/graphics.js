import * as R from 'ramda';

import {
  BLACK_RGBA,
  DIMENSIONS_COUNT,
} from '@/const';
import { getWeight } from '@/utils/effects';
import {
  applyBuffer,
  clear,
  createBuffer,
  createProgram,
  createTexture,
  createTextureAndFramebuffer,
  updateCanvasSize,
} from '@/utils/webgl';

import VERTEX_SHADER_SRC from './main.vs';
import FRAGMENT_SHADER_SRC from './main.fs';

const FRAMEBUFFERS_COUNT = 2;
const TEXTURE_COORDINATES = [
  0, 0,
  1, 0,
  0, 1,
  1, 1,
];

/**
 * Calculates vertices' positions.
 */
const getPositions = (gl, { width, height }) => {
  const { clientWidth, clientHeight } = gl.canvas;
  const scale = clientWidth / clientHeight > width / height
    ? clientHeight / height
    : clientWidth / width;
  const newWidth = width * scale;
  const newHeight = height * scale;
  const left = (clientWidth - newWidth) / 2;
  const top = (clientHeight - newHeight) / 2;
  return [
    left, top,
    left + newWidth, top,
    left, top + newHeight,
    left + newWidth, top + newHeight,
  ];
};

export const createContext = (canvas, picture) => {
  const gl = canvas.getContext('webgl2');

  if (!gl) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('No WebGL context was obtained');
    }

    return null;
  }

  const program = createProgram(gl, VERTEX_SHADER_SRC, FRAGMENT_SHADER_SRC);
  const positionsPointer = gl.getAttribLocation(program, 'a_position');
  const textureCoordinatesPointer = gl.getAttribLocation(program, 'a_textureCoordinates');
  const kernelUniformPointer = gl.getUniformLocation(program, 'u_kernel[0]');
  const kernelWeightUniformPointer = gl.getUniformLocation(program, 'u_kernelWeight');
  const resolutionUniformPointer = gl.getUniformLocation(program, 'u_resolution');

  const positions = getPositions(gl, picture);
  const positionsBuffer = createBuffer(gl, positions);
  const textureCoordinatesBuffer = createBuffer(gl, TEXTURE_COORDINATES);
  const pictureTexture = createTexture(gl, picture);
  const [textures, framebuffers] = R.compose(
    R.transpose,
    R.times(() => (
      createTextureAndFramebuffer(gl, picture.width, picture.height)
    )),
  )(FRAMEBUFFERS_COUNT);

  applyBuffer(gl, positionsBuffer, positionsPointer);
  applyBuffer(gl, textureCoordinatesBuffer, textureCoordinatesPointer);

  return {
    framebuffers,
    gl,
    kernelUniformPointer,
    kernelWeightUniformPointer,
    pictureTexture,
    positions,
    resolutionUniformPointer,
    textures,
  };
};

const drawWithKernel = ({
  gl,
  kernelUniformPointer,
  kernelWeightUniformPointer,
  positions,
}, kernel) => {
  gl.uniform1fv(kernelUniformPointer, kernel);
  gl.uniform1f(kernelWeightUniformPointer, getWeight(kernel));
  gl.drawArrays(
    gl.TRIANGLE_STRIP, // Primitive type.
    0, // Offset.
    positions.length / DIMENSIONS_COUNT, // Count.
  );
};

export const draw = (ctx, kernels) => {
  const {
    gl,
    pictureTexture,
    resolutionUniformPointer,
  } = ctx;
  updateCanvasSize(gl, resolutionUniformPointer);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  clear(gl, BLACK_RGBA);
  gl.bindTexture(gl.TEXTURE_2D, pictureTexture);
  drawWithKernel(ctx, kernels[0]);
};
