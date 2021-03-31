import React from 'react';
import {Canvas} from "react-three-fiber";
import {SocketProvider} from "react-socket-io-hooks";
import {Ground} from "./Ground";
import {Players} from "./Players";
import {Atmosphere} from "./Atmosphere";

export const App = () => {

    const reducer = (state) => {
        console.log(state)
    }

    //@ts-ignore
    return <SocketProvider uri="http://localhost"
                           reducer={reducer}
                           initialState={{}}>

        <Canvas orthographic
                camera={{zoom: 55}}
                style={{height:'100vh', width:'100vw'}}>

            <Ground />
            <Players />
            <Atmosphere/>

        </Canvas>

    </SocketProvider>
};