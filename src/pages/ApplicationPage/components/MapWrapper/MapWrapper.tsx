import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import styles from './MapWrapper.module.css'
import { useCallback, useEffect, useState } from 'react'
import { BackendService } from '@/services/BackendService'
import { IReport } from '@/types/Report'
import ReportPopup from './components/ReportPopup/ReportPopup'
import { APP_STATE, appState, lastClickedPoint } from '../../utils/state'
import { MapController } from './components/MapController'
import { addOnDragEndListener, addOnDragStartListener, getMapCenterLocation } from '@/helpers/locationHelper'

type Props = {}

const MapWrapper = (props: Props) => {
  const backendService = new BackendService();
  const [markers, setMarkers] = useState<IReport[]>([])
  const [isInMove, setIsInMove] = useState(false)

  const fetchExistingMarkers = useCallback(
    () => {
      backendService
        .getMarkers()
        .then(setMarkers)
    },
    []
  )

  useEffect(
    () => {
      fetchExistingMarkers()
    },
    [fetchExistingMarkers]
  )

  const addDragStartCallback = useCallback(() => {
    addOnDragStartListener(() => {
      console.log("start")
      setIsInMove(true)
    })
  }, [])

  const addDragEndCallback = useCallback(() => {
    addOnDragEndListener(() => {
      setIsInMove(false)
      console.log("end")
      const location = getMapCenterLocation()
      if (location) {
        lastClickedPoint.value = location
      }
    })
  }, [])

  useEffect(() => {
    addDragStartCallback()
    addDragEndCallback()
  }, [addDragStartCallback, addDragEndCallback])

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

          {appState.value === APP_STATE.ADD && lastClickedPoint.value && (
            <Marker
              position={[lastClickedPoint.value.lat, lastClickedPoint.value.lng]}
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