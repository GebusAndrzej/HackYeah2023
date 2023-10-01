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
    BullshitSingleton,
    LastTrackedPointProvider,
    appState
} from '../../utils/state'
import { MapController } from './components/MapController'
import { LatLng } from 'leaflet'
import clsx from 'clsx'
import { IPredictedReport } from '@/types/PredictedReport'
import PredictedReportPopup from './components/ReportPopup/PredictedRecordPopup'

const MapWrapper = () => {
    const backendService = useMemo(() => new BackendService(), [])
    const [markers, setMarkers] = useState<IReport[]>([])
    const [predictedMarkers, setPredictedMarkers] = useState<IPredictedReport[]>([])
    const [isInMove, setIsInMove] = useState(false)
    const [lastPickedLocation, setLastPickedLocation] = useState<LatLng | null>(null)

    const fetchExistingMarkers = useCallback(
        () => {
            backendService
                .getAllReports()
                .then(setMarkers)

                console.log("asdasd")
            backendService
                .getPredictedPins()
                .then(setPredictedMarkers)
        },
        [backendService]
    )

    useEffect(
        () => {
            fetchExistingMarkers()
        },
        [fetchExistingMarkers]
    )

    useEffect(() => {
        LastTrackedPointProvider.getInstance().addListener((location) => {
            setLastPickedLocation(location)
        })

        BullshitSingleton.getInstance().addListener(() => {
            fetchExistingMarkers()
        })
    }, [fetchExistingMarkers])

    return (
        <>
            <div className={clsx(
                styles.wrapper,
                appState.value == APP_STATE.ADD && styles.shrink
            )}
            >
                <MapContainer
                    center={[49.0674221, 19.9919528]}
                    zoom={13}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {appState.value === APP_STATE.VIEW && markers.map(marker => (
                        <Marker
                            position={[marker.localization.latitude, marker.localization.longitude]}
                            key={marker.eventId}
                        >
                            <Popup>
                                <ReportPopup report={marker} />
                            </Popup>
                        </Marker>
                    ))}
                    { appState.value === APP_STATE.VIEW && predictedMarkers.map((marker) => (
                        <Marker
                            opacity={0.5}
                            position={[marker.localization.latitude, marker.localization.longitude]}
                            key={marker.predictionId}
                        >
                            <Popup>
                                <PredictedReportPopup report={marker} />
                            </Popup>
                        </Marker>
                    ))}

                    {appState.value === APP_STATE.ADD && lastPickedLocation && (
                        <Marker position={[lastPickedLocation.lat, lastPickedLocation.lng]} />
                    )}

                    <MapController setIsInMove={setIsInMove} />
                </MapContainer>
            </div>
        </>
    )
}

export default MapWrapper