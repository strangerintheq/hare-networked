import {Cell} from "../../../data/Cell";
import React from 'react';
import {CellType} from "../../../data/CellType";
import {Ocean} from "./Ocean";
import {Water} from "./Water";
import {Grass} from "./Grass";
import {Sand} from "./Sand";

type CellBaseParams = {
    cell: Cell,
    key: any
};

export const GroundCell = (props: CellBaseParams) => {
    const c = props.cell
    const t = props.cell.type;
    let height = props.cell.isWater() ? 0 : c.height;
    return <group key={c.getId()} position={[c.x, height, c.y]}>
        {getGroundCell(t)}
    </group>
};

function getGroundCell(type: CellType){
    if (type === CellType.OCEAN)
        return <Ocean />
    if (type === CellType.WATER)
        return <Water />
    if (type === CellType.COAST)
        return <Sand />
    return <Grass />
}