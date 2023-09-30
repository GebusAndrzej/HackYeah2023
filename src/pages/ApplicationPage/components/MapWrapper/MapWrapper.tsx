import {
    MapContainer,
    Marker,
    Popup,
    TileLayer
} from 'react-leaflet'
import styles from './MapWrapper.module.css'
import {
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react'
import { BackendService } from '@/services/BackendService'
import { IReport } from '@/types/Report'
import ReportPopup from './components/ReportPopup/ReportPopup'
import {
    APP_STATE,
    appState
} from '../../utils/state'
import { MapController } from './components/MapController'
import { LatLng } from 'leaflet'
import clsx from 'clsx'

const MapWrapper = () => {
    const backendService = useMemo(() => new BackendService(), [])
    const [markers, setMarkers] = useState<IReport[]>([])
    const [isInMove, setIsInMove] = useState(false)
    const [lastPickedLocation, setLastPickedLocation] = useState<LatLng | null>(null)

    const fetchExistingMarkers = useCallback(
        () => {
            backendService
                .getMarkers()
                .then(setMarkers)
        },
        [backendService]
    )

    useEffect(
        () => {
            fetchExistingMarkers()
        },
        [fetchExistingMarkers]
    )

    useEffect(
        () => {
            fetchExistingMarkers()
        },
        [fetchExistingMarkers]
    )

    return (
        <>
            <div className={clsx(
                styles.wrapper,
                appState.value == APP_STATE.ADD && styles.shrink
            )}
            >
                <MapContainer
                    center={[50.0410866, 21.9991853]}
                    zoom={13}
                    dragging
                >
                    <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {appState.value === APP_STATE.VIEW && markers.map(marker => (
                        <Marker
                            position={[marker.lat, marker.lng]}
                            key={marker.title}
                        >
                            <Popup>
                                <ReportPopup report={marker} />
                            </Popup>
                        </Marker>
                    ))}

                    {appState.value === APP_STATE.ADD && lastPickedLocation && (
                        <Marker position={[lastPickedLocation.lat, lastPickedLocation.lng]} />
                    )}

                    <MapController setIsInMove={setIsInMove}
                        setLastPickedLocation={setLastPickedLocation}
                    />
                </MapContainer>

                {appState.value === APP_STATE.ADD && (
                    <div>
                        {`${isInMove}`}
                    </div>
                )}
            </div>
        </>
    )
}

export default MapWrapper