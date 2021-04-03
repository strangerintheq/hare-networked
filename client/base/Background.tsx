import * as React from "react";

//@ts-ignore
import vertexShader from "../shaders/default.vertex.glsl";
//@ts-ignore
import fragmentShader from "../shaders/bg.fragment.glsl";

let uf = {
    time: 0,
};

export const Background = () => <mesh position={[-12,-12,-12]} rotation={[0,Math.PI/4,0]}>
    <planeGeometry args={[40,40]}/>
    <shaderMaterial attach="material"
                    uniforms={uf}
                    fragmentShader={fragmentShader}
                    vertexShader={vertexShader} />
</mesh>;