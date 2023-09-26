import proj4 from 'proj4'

proj4.defs([
    // Tile layer
    [
      'EPSG:3857',
      '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs',
    ],
    // Lat/Lng standard
    [
      'EPSG:4326',
      "+proj=longlat +datum=WGS84 +no_defs +type=crs",
    ],
    // GUGIK
    [
      'EPSG:2180',
      "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
    ],
]);

interface LatLng {
  lat: number,
  lng: number;
}

export const projectLatLngToGUGIK = (point: LatLng) => {
  const [x,y] = proj4('EPSG:4326','EPSG:2180', [point.lng, point.lat])
  return [x,y]
}
  