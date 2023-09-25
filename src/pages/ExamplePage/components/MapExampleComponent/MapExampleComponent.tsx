import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import styles from './MapExampleComponent.module.css'
import MapHandlerExample from './components/MapHandlerExample/MapHandlerExample'

type Props = {}

const MapExampleComponent = (props: Props) => {
  return (
    <>
    <div className={styles.wrapper}>
        <MapContainer center={[51.505, -0.09]} zoom={13} >
            <TileLayer
                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <MapHandlerExample />
        </MapContainer>
    </div>
    <div>

    </div>
    </>
  )
}

export default MapExampleComponent