varying vec2 vUv;
uniform float time;

void main() {
    vec2 uv = vUv-0.5;
    gl_FragColor = vec4(1.0-vec3(length(uv)*2.), 1.0);
}