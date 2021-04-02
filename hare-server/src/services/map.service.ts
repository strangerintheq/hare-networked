import {Injectable} from '@nestjs/common';
import * as SimplexNoise from 'simplex-noise'
import {Cell} from "../data/Cell";
import {CellType} from "../data/CellType";
import {CellObjectType} from "../data/CellObjectType";

@Injectable()
export class MapService {

    seed = 'seed';
   // cells = new Map<string, Cell>();
    noises = new Map<string, SimplexNoise>();

    getSector(sx: number, sy: number): Cell[][] {
        let s = Cell.sectorSize;
        let hs = (s - 1)/2
        return Array(s).fill(0).map((_, x: number) => {
            return Array(s).fill(0).map((_, y: number) => {
                return this.getCell(x - hs,y - hs, sx, sy);
            });
        });
    }

    private getCell(x: number, y: number, sx: number, sy: number): Cell {
        const cell = new Cell(x, y, sx, sy);
        cell.height = this.getCellHeight(cell);
        cell.type = this.getCellTypeByHeight(cell.height);
        cell.object = this.getCellObject(cell)
        return cell
    }

    private getCellTypeByHeight(height: number): CellType {
        if (height < -0.5)
            return CellType.OCEAN
        if (height < 0)
            return CellType.WATER
        return CellType.GRASS
    }

    private getCellObject(cell: Cell) : CellObjectType{
        if (cell.type === CellType.GRASS) {
            let all = Object.keys(CellObjectType);
            for (let i=7; i<all.length; i++)
                if (this.noise(CellObjectType[i], cell.getX(), cell.getY()) > 0.9)
                    return i
        }

        return CellObjectType.NONE;
    }

    private noise(key, x, y): number {
        if (!this.noises.has(key))
            this.noises.set(key, new SimplexNoise(this.seed + key))
        return this.noises.get(key).noise2D(x, y)
    }

    getCellHeight(c: Cell) {
        let h = this.noise('terrain1', c.x / 40, c.y / 40) * 0.8;
        h += this.noise('terrain2', c.x / 10, c.y / 10) * 0.2;
        h = Math.floor(h * 10) / 10
        if (h < 0) h -= 0.15
        return h;
    }
}
