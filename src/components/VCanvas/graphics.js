import {
  BLACK_RGBA,
  DIMENSIONS_COUNT,
} from '@/const';
import {
  applyBuffer,
  clear,
  createBuffer,
  createProgram,
  createTexture,
  updateCanvasSize,
} from '@/utils/webgl';

import VERTEX_SHADER_SRC from './vertex.glsl';
import FRAGMENT_SHADER_SRC from './fragment.glsl';

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
  const positionsAttribPointer = gl.getAttribLocation(program, 'a_position');
  const textureCoordinatesPointer = gl.getAttribLocation(program, 'a_textureCoordinates');
  const resolutionUniformPointer = gl.getUniformLocation(program, 'u_resolution');

  const positions = getPositions(gl, picture);
  const positionsBuffer = createBuffer(gl, positions);
  const textureCoordinatesBuffer = createBuffer(gl, TEXTURE_COORDINATES);
  createTexture(gl, picture);

  applyBuffer(gl, positionsBuffer, positionsAttribPointer);
  applyBuffer(gl, textureCoordinatesBuffer, textureCoordinatesPointer);

  updateCanvasSize(gl, resolutionUniformPointer);
  return {
    gl,
    positions,
  };
};

export const draw = ({
  gl,
  positions,
}) => {
  clear(gl, BLACK_RGBA);
  gl.drawArrays(
    gl.TRIANGLE_STRIP, // Primitive type.
    0, // Offset.
    positions.length / DIMENSIONS_COUNT, // Count.
  );
};
