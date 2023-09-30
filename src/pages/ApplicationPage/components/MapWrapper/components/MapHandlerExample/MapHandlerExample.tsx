import { lastClickedPoint } from '@/pages/ApplicationPage/utils/state';
import { GugikService } from '@/services/GugikService'
import { LeafletMouseEvent } from 'leaflet'
import { useMapEvents } from 'react-leaflet'


const MapHandlerExample = () => {
  const service = new GugikService();

  const map = useMapEvents({
      async click(data: LeafletMouseEvent) {
          lastClickedPoint.value = data.latlng
      },
  })

  return null
}

export default MapHandlerExample