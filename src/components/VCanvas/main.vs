#version 300 es

in vec2 a_position;
in vec2 a_textureCoordinates;
/**
 * Pixels to clip space scale.
 */
uniform vec2 u_resolution;
/**
 * Clip space scaling factor.
 */
uniform vec2 u_scale;
out vec2 v_textureCoordinates;

void main() {
  vec2 clipSpacePosition = a_position / u_resolution * 2.0 - 1.0;
  gl_Position = vec4(clipSpacePosition * vec2(1, -1), 0, 1);
  v_textureCoordinates = a_textureCoordinates;
}
