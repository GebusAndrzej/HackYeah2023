import { signal } from "@preact/signals-react";
import { LatLng } from "leaflet";
import { Map } from "leaflet";

export enum APP_STATE {
    VIEW = 'view',
    ADD = 'add',
}

export const mapElementState = signal<Map | null>(null) 

export const appState = signal(APP_STATE.VIEW);

export const lastClickedPoint = signal<LatLng | undefined>(undefined);