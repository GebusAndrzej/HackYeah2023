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
    LastTrackedPointProvider,
    appState
} from '../../utils/state'
import { MapController } from './components/MapController'
import {
    addOnDragEndListener,
    addOnDragStartListener,
    getMapCenterLocation
} from '@/helpers/locationHelper'
import { LatLng } from 'leaflet'

const MapWrapper = () => {
    const backendService = useMemo(() => new BackendService(), [])
    const [lastClickedValue, setLastClickedValue] = useState<LatLng | null>(null)
    const [markers, setMarkers] = useState<IReport[]>([])
    const [isInMove, setIsInMove] = useState(false)

    console.log("kurwa raz")

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
            console.log("kurwa jus efekt 1")

            fetchExistingMarkers()
        },
        [fetchExistingMarkers]
    )

    useEffect(() => {
        console.log("kurwa jus efekt 2")

        addOnDragStartListener(() => {
            setIsInMove(true)
        })

        addOnDragEndListener(() => {
            setIsInMove(false)
            const location = getMapCenterLocation()
            if (location) {
                LastTrackedPointProvider.getInstance().setLastClickedPoint(location)
                setLastClickedValue(location)
            }
        })
    }, [setLastClickedValue, setIsInMove])

    return (
        <>
            <div className={styles.wrapper}>
                <MapContainer
                    center={[50.0410866, 21.9991853]}
                    zoom={13}
                >
                    <MapController />
                    <TileLayer
                        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        // url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                        // url='https://miip.geomalopolska.pl/arcgis/rest/services/MIIP_Orto2023/MapServer/tile/{z}/{y}/{x}'
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

                    {appState.value === APP_STATE.ADD && lastClickedValue && (
                        <Marker
                            position={[lastClickedValue.lat, lastClickedValue.lng]}
                        />
                    )}
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