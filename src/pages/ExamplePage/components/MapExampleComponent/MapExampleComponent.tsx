import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import styles from './MapExampleComponent.module.css'
import MapHandlerExample from './components/MapHandlerExample/MapHandlerExample'
import { point } from '../../utils/consts'
import { untracked } from '@preact/signals-react'

type Props = {}

const MapExampleComponent = (props: Props) => {

    untracked(() => {
        console.log("Observerd change in point: ", point.value)
    })
    
  return (
    <>
        <div className={styles.wrapper}>
            <MapContainer center={[50.0410866, 21.9991853]} zoom={13} >
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[50.0410866, 21.9991853]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <MapHandlerExample />
            </MapContainer>
        </div>
        <div>
            {point.value}
        </div>
    </>
  )
}

export default MapExampleComponent