import React from 'react';
import {Canvas} from "react-three-fiber";
import {SocketProvider} from "react-socket-io-hooks";
import {Ground} from "./Ground";
import {Players} from "./Players";
import {Atmosphere} from "./Atmosphere";
import {useSocket} from "./useSocket";

export const App = () => {

    useSocket()


    return <>

        <Canvas orthographic
                camera={{zoom: 55}}
                style={{height:'100vh', width:'100vw'}}>

            <Ground />
            <Players />
            <Atmosphere/>

        </Canvas>

    </>
};