#version 300 es
precision mediump float;

in vec2 v_textureCoordinates;
uniform sampler2D u_picture;
out vec4 outColor;

void main() {
  outColor = texture(u_picture, v_textureCoordinates);
}
