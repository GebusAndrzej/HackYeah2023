import { signal } from '@preact/signals-react';
import {
    LatLng,
    Map
} from 'leaflet'

export enum APP_STATE {
    VIEW = 'view',
    ADD = 'add',
}

export const mapElementState = signal<Map | null>(null)

export const appState = signal(APP_STATE.VIEW);

export class LastTrackedPointProvider {
    private lastTrackedPoint: LatLng = new LatLng(0, 0)
    private listeners: Array<(point: LatLng) => void> = []
    private static instance: LastTrackedPointProvider | null = null

    static getInstance(): LastTrackedPointProvider {
        if (!this.instance) {
            this.instance = new LastTrackedPointProvider()
        }
        return this.instance
    }

    getLastLocalization() {
        return this.lastTrackedPoint
    }

    setLastClickedPoint(point: LatLng) {
        this.lastTrackedPoint = point
        this.listeners.forEach((listener) => listener(this.lastTrackedPoint))
    }

    addListener(listener: (point: LatLng) => void) {
        this.listeners.push(listener)
    }
}