#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainTex;
uniform sampler2D terrainMap;
uniform sampler2D colorGradient;

void main() {
	vec4 filter = texture2D(terrainMap,vTextureCoord);
	vec4 color = texture2D(terrainTex, vTextureCoord) * texture2D(colorGradient, vec2(0.0, 1.0 - filter.r));
	
	gl_FragColor = color;
}