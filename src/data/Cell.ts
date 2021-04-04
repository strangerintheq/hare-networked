import {CellType} from "./CellType";
import {CellObjectType} from "./CellObjectType";
import {AnimationType} from "./AnimationType";

export class Cell {

    static sectorSize = 21;
    type: CellType;
    height: number;
    x: number;
    y: number;
    object?: CellObjectType;
    sx: number;
    sy: number;

    constructor(x: number, y: number, sx: number, sy: number) {
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
    }

    isWater() {
        return this.type === CellType.OCEAN || this.type === CellType.WATER
    }

    getX() {
        return this.x + this.sx*(Cell.sectorSize-2);
    }

    getY(){
        return this.y + this.sy*(Cell.sectorSize-2);
    }

    getId() {
        return this.getX() + ':' + this.getY();
    }

    getCellAnimation() : AnimationType {
        if (this.isWater())
            return AnimationType.WATER_SPLASH;
        return AnimationType.NONE;
    }

}