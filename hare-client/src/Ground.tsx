import React from 'react';
import {Cell} from "../../hare-server/src/data/Cell";
import {Cube} from "./Cube";

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

const CellBase = (props:{cell:Cell}) => {
    return <>
        <Cube col={brown1} size={[1,0.9,1]} position={[0,-0.1,0]}/>
        <Cube col={green} size={[1,0.1,1]} position={[0,0.4,0]}/>
    </>;
};

const CellObject = (props:{cell:Cell, key:any}) => {
    let cell = props.cell;
    let hs = (Cell.sectorSize-1)/2
    return <>
        <group position={[cell.x - hs, cell.height, cell.y - hs]}>
            <CellBase cell={props.cell}/>
        </group>
    </>;
};

type GroundParams = {
    cells: Cell[]
};

export const Ground = (props:GroundParams) => {
    return <>
        {props.cells.map(c => <CellObject cell={c} key={c.getId()}/>)}
    </>;
};