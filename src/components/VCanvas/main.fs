#version 300 es
precision mediump float;

const int KERNEL_SIDE = 3;
const int KERNEL_SIZE = KERNEL_SIDE * KERNEL_SIDE;

in vec2 v_textureCoordinates;
uniform sampler2D u_picture;
uniform float u_kernel[KERNEL_SIZE];
uniform float u_kernelWeight;
out vec4 outColor;

void main() {
  /**
   * 1 "real" pixel in texture coordinates.
   */
  vec2 texturePixel = vec2(1) / vec2(textureSize(u_picture, 0));
  vec4 colorSum = vec4(0);

  for (int i = 0; i < KERNEL_SIZE; ++i) {
    int x = i % KERNEL_SIDE - 1;
    int y = i / KERNEL_SIDE - 1;
    colorSum += texture(
      u_picture,
      v_textureCoordinates + texturePixel * vec2(x, y)
    ) * u_kernel[i];
  }

  outColor = vec4(colorSum.rgb / u_kernelWeight, 1);
}
