import {Cell} from "../../../hare-server/src/data/Cell";
import React from 'react';
import {CellType} from "../../../hare-server/src/data/CellType";
import {Ocean} from "./ground/Ocean";
import {Water} from "./ground/Water";
import {Grass} from "./ground/Grass";
import {Sand} from "./ground/Sand";

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