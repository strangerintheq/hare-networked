import * as React from "react";

import {Ref} from "react";

import {Color} from "@react-three/fiber";



const zeroes = [0,0,0];
const units = [1,1,1];

export interface CubeParams {
    size?: number[];
    position?: number[];
    col: Color;
    rotation?: number[];
    scale?: number[];
    onClick?: (event: MouseEvent) => void;
    noShadow?:boolean;
    noCastShadow?:boolean;
}

export const Cube = React.forwardRef((props: CubeParams, ref:Ref) => {
    let castShadow = true;
    if (!props.noShadow && !props.noCastShadow)
        castShadow = true
    else if (!props.noShadow)
        castShadow = false
    else if (!props.noCastShadow)
        castShadow = false

    return <mesh ref={ref} castShadow={castShadow}
              receiveShadow={!props.noShadow}
              scale={props.scale || units}
              onClick={props.onClick}
              rotation={props.rotation || zeroes}
              position={props.position || zeroes}>
            <boxGeometry args={props.size || units}/>
            <meshStandardMaterial color={props.col} metalness={0.1}/>
        </mesh>
    ;
})