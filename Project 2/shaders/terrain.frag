#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainTex;
uniform sampler2D terrainMap;
uniform sampler2D colorGradient;

void main() {
	vec4 filter = texture2D(terrainMap,vTextureCoord);
	vec4 color = texture2D(terrainTex, vTextureCoord) + 0.7 * texture2D(colorGradient, vec2(0.9, -filter.r - filter.b - filter.g)/3.0);
	
	gl_FragColor = color;
}