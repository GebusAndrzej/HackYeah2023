import { LeafletEvent } from 'leaflet'
import { useMapEvents } from 'react-leaflet'


const MapHandlerExample = () => {
  const map = useMapEvents({
    click(data: LeafletEvent) {
        console.log(data)
    },
})
  return null
}

export default MapHandlerExample