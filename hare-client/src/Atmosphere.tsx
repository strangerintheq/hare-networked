import * as React from "react";

export const Atmosphere = () => {
    return <>
        <ambientLight />
        <pointLight position={[1, 1, 1]} intensity={0.55} />
    </>;
};