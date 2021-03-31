import React, {useEffect, useState} from 'react';
import {Canvas} from "react-three-fiber";
import {Ground} from "./Ground";
import {Players} from "./Players";
import {Atmosphere} from "./Atmosphere";
import {useSocket} from "./hooks/useSocket";
import {Cell} from "../../hare-server/src/data/Cell";

export const App = () => {

    useSocket()

    const [cells, setCells] = useState<Cell[]>(null);

    useEffect(() => {

        const set = (result) => {
            setCells(result.flat().map(c => {
                let cell = new Cell(c.x, c.y, c.sx, c.sy);
                cell.height = c.height;
                return cell;
            }))
        }

        const err = (error) => console.error(error)

        fetch("/sector")
            .then(res => res.json())
            .then(set, err);
    }, [])

    return <>

        <Canvas orthographic
                camera={{zoom: 50, position:[15,15,15]}}
                style={{height:'100vh', width:'100vw'}}>

            <Ground cells={cells}/>
            <Players />
            <Atmosphere/>

        </Canvas>

    </>
};