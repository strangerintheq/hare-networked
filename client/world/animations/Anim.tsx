import * as React from "react";
import {AnimationState} from "../../base/AnimationState";

import {WaterSplashAnimation} from "./WaterSplashAnimation";
import {AnimationType} from "../../../src/data/AnimationType";

type AnimParams = {
    animation: AnimationState,
    key
};

export const Anim = (props:AnimParams) => {

    if (props.animation.type === AnimationType.WATER_SPLASH)
        return <WaterSplashAnimation player={props.animation.player} />

    return <></>;
};