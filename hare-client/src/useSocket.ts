import {useEffect} from "react";

export const useSocket = () => useEffect(() => {
    //@ts-ignore
    const socket = io();
    socket.on('connect', () => socket.emit('join'));
    return () => socket.close();
}, []);