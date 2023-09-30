import { mapElementState } from "@/pages/ApplicationPage/utils/state";
import { LatLng, LocationEvent } from "leaflet";

export function centerMap() {
    const map = mapElementState.value;
    map?.locate()

    map?.addEventListener('locationfound', onLocationFound)

    function onLocationFound(e: LocationEvent) {
        map?.flyTo(e.latlng, map.getZoom());
        map?.removeEventListener('locationfound', onLocationFound);
    }
}

export function getMapCenterLocation(): LatLng | null {
    const map = mapElementState.value;

    if (!map) {
        console.log("map is null")
        return null;
    }

    return map.getCenter();
}

export function addOnDragEndListener(callback: () => void) {
    const map = mapElementState.value;

    if (!map) {
        console.log("map is null")
        return;
    }

    map.addEventListener('dragend', callback)
}

export function addOnDragStartListener(callback: () => void) {
    const map = mapElementState.value;

    if (!map) {
        console.log("map is null")
        return;
    }

    map.addEventListener('dragstart', callback)
}