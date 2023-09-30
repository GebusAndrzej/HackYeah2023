import { AHttpClient } from "@/http/axiosAbstract";
import { IReport } from "@/types/Report";

const markers: IReport[] = [
    {
        title: "Kamburger z kutczaka",
        lat: 50.0420866, 
        lng: 21.9991853,
    },
    {
        title: "zzz",
        lat: 50.0412866, 
        lng: 21.9997853,
    },
    {
        title: "ttt",
        lat: 50.0410966, 
        lng: 21.9991653,
    },
    {
        title: "rrr",
        lat: 50.0414866, 
        lng: 21.9994853,
    },
]

export class BackendService extends AHttpClient {
    constructor() {
        super();
    }

    getMarkers = () =>
        Promise.resolve(markers)
}