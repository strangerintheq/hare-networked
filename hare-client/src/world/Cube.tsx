import * as React from "react";
import {Color} from "react-three-fiber";
import {MouseEvent} from "react-three-fiber/canvas";

const zeroes = [0,0,0];
const units = [1,1,1];

export interface CubeParams {
    size?: number[];
    position?: number[];
    col: Color;
    rotation?: number[];
    scale?: number[];
    onClick?: (event: MouseEvent) => void;
    noShadow?:boolean
}

export const Cube = (props: CubeParams) => <>
    <mesh castShadow={!props.noShadow}
          receiveShadow={!props.noShadow}
          scale={props.scale||units}
          onClick={props.onClick}
          rotation={props.rotation||zeroes}
          position={props.position||zeroes}>
        <boxGeometry args={props.size||units}/>
        <meshStandardMaterial  color={props.col}/>
    </mesh>
</>