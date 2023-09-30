import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import styles from './MapWrapper.module.css'
import MapHandlerExample from './components/MapHandlerExample/MapHandlerExample'
import { useCallback, useEffect, useState } from 'react'
import { BackendService } from '@/services/BackendService'
import { IReport } from '@/types/Report'
import ReportPopup from './components/ReportPopup/ReportPopup'
import { APP_STATE, appState } from '../../utils/state'
import clsx from 'clsx'

type Props = {}

const MapWrapper = (props: Props) => {
  const backendService = new BackendService();
  const [markers, setMarkers] = useState<IReport[]>([])

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

  return (
    <>
        <div className={clsx(
          styles.wrapper,
          appState.value == APP_STATE.ADD && styles.shrink
        )}>
            <MapContainer 
              center={[50.0410866, 21.9991853]} 
              zoom={13}
              dragging
            >
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
                
                <MapHandlerExample />
            </MapContainer>
        </div>
    </>
  )
}

export default MapWrapper