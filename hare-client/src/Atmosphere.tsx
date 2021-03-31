import * as React from "react";

export const Atmosphere = () => {
    return <>
        <ambientLight intensity={0.05}/>
        <directionalLight
            position={[0, 15, 15]}
            intensity={0.55} />
        <directionalLight
            position={[15, 15, 0]}
            intensity={0.15} />
    </>;
};