import { IEventPhotos } from "./EventPhotos";
import { ILocalization } from "./Localization";

export interface IPredictedReport {
    predictionId: number
    localization: ILocalization,
    photo: IEventPhotos,
}