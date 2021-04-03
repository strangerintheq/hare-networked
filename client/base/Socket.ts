import {ServerEvent} from "../../src/data/ServerEvent";
import {useEffect} from "react";
import {ClientEvent} from "../../src/data/ClientEvent";

const clientIdKey = 'hare-client-clientId';
export let clientId = localStorage.getItem(clientIdKey);
if (!clientId) {
    clientId = 'p_' + Math.random().toString(36).substring(2);
    localStorage.setItem(clientIdKey, clientId);
}

const bus = document.createElement('div')

//@ts-ignore
const socket = io();
socket.on('connect', () => socket.emit(ClientEvent.JOIN, clientId));
Object.keys(ServerEvent).forEach(evt => {
    socket.on(evt, (detail) => {
       // console.log(evt, detail)
        bus.dispatchEvent(new CustomEvent(evt, {detail}))
    });
});

export const useServerEvent = (ev: ServerEvent, fn, deps = []) => {
    useEffect(() => {
        const listener = e => {
          //  console.log('useServerEvent listener',ev, e.detail)
            fn(e.detail);
        };
        // console.log('add useServerEvent')
        bus.addEventListener(ev, listener);
        return () => {
            // console.log('remove useServerEvent')
            bus.removeEventListener(ev, listener)
        };
    }, deps)
}

export function sendClientEvent(e:ClientEvent, arg){
    socket.emit(e, arg)
    // console.log('sendClientEvent', e, arg)
}