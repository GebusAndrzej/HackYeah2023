import { AHttpClient } from "@/http/axiosAbstract";
import { parseGugikRespone } from "./helpers/GugukResponseHelpers";

const result = [
    'geom_wkb',
    'geom_wkt',
    'geom_extent',
    'teryt',
    'id',
    'function',
    'voivodeship',
    'county',
    'commune',
    'region',
    'parcel',
]

export class GugikService extends AHttpClient {
    constructor() {
        super();
    }

    getPlotByXY = ({x,y}: {x: number, y: number}) => 
        this.http
            .get<string>(`https://uldk.gugik.gov.pl/?request=GetParcelByXY&xy=${x},${y}&result=${result.join()}`)
            .then(response => parseGugikRespone(response.data))
}