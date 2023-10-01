import {
    LastTrackedPointProvider,
    mapElementState
} from '@/pages/ApplicationPage/utils/state'
import { useMapEvents } from 'react-leaflet';
import {
    FC,
    useEffect,
} from 'react'

interface Props {
    setIsInMove: (value: boolean) => void
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
            LastTrackedPointProvider.getInstance().setLastClickedPoint(point)
        },
        dragend() {
            const point = map.getCenter()
            props.setIsInMove(false)
            LastTrackedPointProvider.getInstance().setLastClickedPoint(point)
        },
        locationfound(event) {
            map.flyTo(event.latlng, map.getZoom())
            const point = map.getCenter()
            LastTrackedPointProvider.getInstance().setLastClickedPoint(point)
        }
    })

    useEffect(() => {
        mapElementState.value = map
        map.locate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return null;
}