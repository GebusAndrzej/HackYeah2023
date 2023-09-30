import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import styles from './MapWrapper.module.css'
import MapHandlerExample from './components/MapHandlerExample/MapHandlerExample'

type Props = {}

const MapWrapper = (props: Props) => {
    
  return (
    <>
        <div className={styles.wrapper}>
            <MapContainer center={[50.0410866, 21.9991853]} zoom={13} >
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    // url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    // url='https://miip.geomalopolska.pl/arcgis/rest/services/MIIP_Orto2023/MapServer/tile/{z}/{y}/{x}'
                    
                />
                
                <MapHandlerExample />
            </MapContainer>
        </div>
    </>
  )
}

export default MapWrapper