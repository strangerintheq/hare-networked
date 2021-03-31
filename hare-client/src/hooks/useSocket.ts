import {useEffect} from "react";

const clientId = 'hare-client-id';
let id = localStorage.getItem(clientId);
if (!id) {
    id = 'p_' + Math.random().toString(2);
    localStorage.setItem(clientId, id);
}

export const useSocket = () => useEffect(() => {
    //@ts-ignore
    const socket = io();
    socket.on('connect', () => socket.emit('join', id));
    return () => socket.close();
}, []);