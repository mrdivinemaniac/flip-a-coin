export const vertexShaderSrc = `
precision mediump float;

attribute vec3 vertPosition;
attribute vec2 texCoord;
varying vec2 fragTexCoord;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main () {
  fragTexCoord = texCoord;
  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}
`

export const fragmentShaderSrc = `
precision mediump float;

varying vec2 fragTexCoord;
uniform sampler2D sampler;

void main () {
  gl_FragColor = texture2D(sampler, fragTexCoord);
}
`