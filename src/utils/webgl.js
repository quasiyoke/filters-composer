import { DIMENSIONS_COUNT } from '@/const';

export const clear = (gl, rgba) => {
  gl.clearColor(...rgba);
  gl.clear(gl.COLOR_BUFFER_BIT);
};

export const applyBuffer = (gl, buffer, pointer) => {
  gl.enableVertexAttribArray(pointer);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(
    pointer,
    DIMENSIONS_COUNT, // Size. Count of components per iteration.
    gl.FLOAT, // Type. The data is 32-bit floats.
    false, // Is normalization needed.
    /*
     * Stride. 0 -- means to move forward size * sizeof(type) each iteration to get the next
     * position.
     */
    0,
    0, // Offset. Start at the beginning of the buffer.
  );
};

export const createBuffer = (gl, arr) => {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW);
  return buffer;
};

const createShader = (gl, type, src) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  const isSuccess = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (!isSuccess) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(`Problems during shader compilation: ${gl.getShaderInfoLog(shader)}`);
    }

    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

export const createProgram = (gl, vertexShaderSrc, fragmentShaderSrc) => {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const isSuccess = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (!isSuccess) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(`Problems during shader linking: ${gl.getProgramInfoLog(program)}`);
    }

    gl.deleteProgram(program);
    return null;
  }

  gl.useProgram(program);
  return program;
};

export const createTexture = (gl, picture) => {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Wrapping function for texture coordinate `s`.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  // Wrapping function for texture coordinate `t`.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  // Texture minification filter.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Default texture magnification filter is LINEAR, so we'll keep it as is.
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, picture);
  return texture;
};

export const updateCanvasSize = (gl, pointer) => {
  const { canvas } = gl;
  const { clientWidth, clientHeight } = canvas;

  if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
    // eslint-disable-next-line no-param-reassign
    canvas.width = clientWidth;
    // eslint-disable-next-line no-param-reassign
    canvas.height = clientHeight;
  }

  gl.viewport(0, 0, clientWidth, clientHeight);
  gl.uniform2f(pointer, clientWidth, clientHeight);
};
