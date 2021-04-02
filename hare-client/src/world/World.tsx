import React from 'react';
import {Cell} from "../../../hare-server/src/data/Cell";
import {GroundCell} from "./ground/GroundCell";

type CellObjectParams = {
    cell: Cell,
    key: any
};

const CellObject = (props:CellObjectParams) => {
    let cell = props.cell;
    return <>
        <group position={[cell.x, cell.height, cell.y]}>
            <GroundCell cell={props.cell} />
        </group>
    </>;
};

type GroundParams = {
    cells: Cell[],
    onClick: any
};

export const World = (props:GroundParams) => {
    return <group onClick={props.onClick}>
        {props.cells.map(c => <CellObject cell={c} key={c.getId()} />)}
    </group>;
};