import React from 'react';
import {Cell} from "../../hare-server/src/data/Cell";
import {Cube} from "./objects/Cube";
import {MouseEvent} from "react-three-fiber/canvas";


function hsl(h,s,l){
    return `hsl(${h},${s}%,${l}%)`
}

export const green = hsl(90, 50, 70);
export const green2 = hsl(90, 50, 60);
export const green3 = hsl(90, 50, 30);
export const white = hsl(0, 0, 100);
export const brown1 = hsl(33, 50, 50);
export const brown2 = hsl(44, 0, 30);
export const blue1 = hsl(222, 50, 50);
export const blue2 = hsl(222, 50, 30);
export const gold = hsl(50, 70, 60);
export const red = hsl(0, 100, 50);
export const orange = hsl(25, 100, 50);

type CellBaseParams = {
    cell: Cell,
    onClick?: (cell: MouseEvent) => void
};

const CellBase = (props:CellBaseParams) => {
    return <>

        <Cube col={brown1}
              size={[1,0.9,1]}
              position={[0,-0.1,0]}/>

        <Cube col={green}
              size={[1,0.1,1]}
              position={[0,0.4,0]}/>

    </>;
};

type CellObjectParams = {
    cell: Cell,
    key: any
};

const CellObject = (props:CellObjectParams) => {
    let cell = props.cell;
    return <>
        <group position={[cell.x, cell.height, cell.y]}>
            <CellBase cell={props.cell} />
        </group>
    </>;
};

type GroundParams = {
    cells: Cell[],
    onClick: any
};

export const Ground = (props:GroundParams) => {
    return <group onClick={props.onClick}>
        {props.cells.map(c => <CellObject cell={c} key={c.getId()} />)}
    </group>;
};