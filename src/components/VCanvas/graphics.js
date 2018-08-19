import * as R from 'ramda';

import { BLACK_RGBA } from '@/const';
import { getWeight } from '@/utils/effects';
import {
  applyBuffer,
  bindFramebuffer,
  clear,
  createProgram,
  createTexture,
  createTextureAndFramebuffer,
  setBufferData,
  updateCanvasSize,
} from '@/utils/webgl';

import VERTEX_SHADER_SRC from './main.vs';
import FRAGMENT_SHADER_SRC from './main.fs';

const FRAMEBUFFERS_COUNT = 2;
const POINTS_COUNT = 4;
const TEXTURE_COORDINATES = [
  0, 0,
  1, 0,
  0, 1,
  1, 1,
];

/**
 * Calculates vertices' positions.
 */
const getCenteredPicturePositions = (gl, { width, height }) => {
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

const getDummyPositions = ({ width, height }) => ([
  0, 0,
  width, 0,
  0, height,
  width, height,
]);

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
  const scaleUniformPointer = gl.getUniformLocation(program, 'u_scale');

  const positionsBuffer = gl.createBuffer();
  const textureCoordinatesBuffer = gl.createBuffer();
  setBufferData(gl, textureCoordinatesBuffer, TEXTURE_COORDINATES);
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
    picture,
    positionsBuffer,
    resolutionUniformPointer,
    scaleUniformPointer,
    textures,
  };
};

const drawWithKernel = ({
  gl,
  kernelUniformPointer,
  kernelWeightUniformPointer,
}, kernel) => {
  gl.uniform1fv(kernelUniformPointer, kernel);
  gl.uniform1f(kernelWeightUniformPointer, getWeight(kernel));
  gl.drawArrays(
    gl.TRIANGLE_STRIP, // Primitive type.
    0, // Offset.
    POINTS_COUNT, // Count.
  );
};

export const draw = (ctx, kernels) => {
  const {
    framebuffers,
    gl,
    pictureTexture,
    picture,
    positionsBuffer,
    scaleUniformPointer,
    textures,
  } = ctx;
  const { width, height } = updateCanvasSize(gl);
  gl.bindTexture(gl.TEXTURE_2D, pictureTexture);
  // Bind dummy scale to prevent scaling the image during the processing.
  gl.uniform2f(scaleUniformPointer, 1, 1);
  setBufferData(
    gl,
    positionsBuffer,
    getDummyPositions(picture),
  );

  /*
   * Apply effects to an image one by one writing the result to the
   * alternating framebuffers.
   */
  kernels.forEach((kernel, i) => {
    if (i === kernels.length - 1) {
      setBufferData(
        gl,
        positionsBuffer,
        getCenteredPicturePositions(gl, picture),
      );
      bindFramebuffer(ctx, null, width, height);
      clear(gl, BLACK_RGBA);
      // Bind vertical-flipping scale to draw picture on the viewport correctly.
      gl.uniform2f(scaleUniformPointer, 1, -1);
    } else {
      bindFramebuffer(
        ctx,
        framebuffers[i % FRAMEBUFFERS_COUNT],
        picture.width,
        picture.height,
      );
    }

    drawWithKernel(ctx, kernel);
    gl.bindTexture(gl.TEXTURE_2D, textures[i % FRAMEBUFFERS_COUNT]);
  });
};
