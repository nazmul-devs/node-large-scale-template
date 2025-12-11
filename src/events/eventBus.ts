import { EventEmitter } from "events";
import { EventTypes } from "./eventTypes";

const emitter = new EventEmitter();

export function emitEvent(event: EventTypes, payload: any) {
  emitter.emit(event, payload);
}

export function onEvent(event: EventTypes, listener: (payload: any) => void) {
  emitter.on(event, listener);
}

// register handlers
import "./handlers/userCreated.handler";
