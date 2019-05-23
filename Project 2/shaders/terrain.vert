attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D terrainMap;

uniform float normScale;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);

	vTextureCoord = aTextureCoord;

	offset = aVertexNormal * 6.0 * (texture2D(terrainMap, vTextureCoord).r + texture2D(terrainMap, vTextureCoord).b + texture2D(terrainMap, vTextureCoord).g);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}