import { Plot } from "@/types/Plot";

export const parseGugikRespone = (response: string): Plot => {
    const [status, data] = response.split('\n')

    const [
        geom_wkb, 
        geom_wkt,
        geom_extent,
        teryt,
        id,
        fun,
        voivodeship,
        county,
        commune,
        region,
        parcel,
    ] = data.split("|")

    return ({
        geom_wkb, 
        geom_wkt,
        geom_extent,
        teryt,
        id,
        function: fun,
        voivodeship,
        county,
        commune,
        region,
        parcel,
    })
}