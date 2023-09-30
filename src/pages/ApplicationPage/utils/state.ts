import { signal } from "@preact/signals-react";

export enum APP_STATE {
    VIEW = 'view',
    ADD = 'add',
}

export const appState = signal(APP_STATE.VIEW);