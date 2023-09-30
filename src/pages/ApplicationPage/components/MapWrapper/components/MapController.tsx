import { mapElementState } from "@/pages/ApplicationPage/utils/state";
import { useMap } from "react-leaflet";
import { FC } from 'react'

export const MapController: FC = () => {
    // initalize global map object
    mapElementState.value = useMap();

    return null;
}