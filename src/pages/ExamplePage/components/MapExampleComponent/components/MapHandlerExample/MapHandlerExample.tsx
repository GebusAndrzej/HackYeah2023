import { projectLatLngToGUGIK } from '@/helpers/projectionHelpers';
import { GugikService } from '@/services/GugikService'
import { LeafletMouseEvent } from 'leaflet'
import { useMapEvents } from 'react-leaflet'


const MapHandlerExample = () => {
  const service = new GugikService();

  const map = useMapEvents({
      async click(data: LeafletMouseEvent) {
          const [x,y] = projectLatLngToGUGIK(data.latlng);

          const response = await service.getPlotByXY({x,y})
          console.log(response)
      },
  })

  return null
}

export default MapHandlerExample