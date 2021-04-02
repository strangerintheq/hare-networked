
const circumference = Math.PI*2;

export function angleLerp(a0, a1, t) {
    const deltaAngle = (a1 - a0) % circumference;
    return a0 + (2*deltaAngle % circumference - deltaAngle)*t;
}

export function lerp(a, b, t) {
    return a + (b - a) * t;
}

export function clamp(x) {
    return Math.max(0, Math.min(1, x));
}





