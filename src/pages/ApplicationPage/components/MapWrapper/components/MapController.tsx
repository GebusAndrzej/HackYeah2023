import {
    LastTrackedPointProvider,
    mapElementState
} from '@/pages/ApplicationPage/utils/state'
import { useMapEvents } from 'react-leaflet';
import {
    FC,
    useEffect
} from 'react'
import { LatLng } from 'leaflet';

interface Props {
    setIsInMove: (value: boolean) => void
    setLastPickedLocation: (value: LatLng) => void
}

export const MapController: FC<Props> = (props: Props) => {
    // initalize global map object
    const map = useMapEvents({
        dragstart() {
            props.setIsInMove(true)
        },
        drag() {
            const point = map.getCenter()
            props.setIsInMove(false)
            props.setLastPickedLocation(point)
            // LastTrackedPointProvider.getInstance().setLastClickedPoint(point)
        },
        dragend() {
            const point = map.getCenter()
            props.setIsInMove(false)
            props.setLastPickedLocation(point)
            LastTrackedPointProvider.getInstance().setLastClickedPoint(point)
        }
    })

    useEffect(() => {
        mapElementState.value = map
    }, [map])

    return null;
}