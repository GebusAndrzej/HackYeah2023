import { IEventPhotos } from "./EventPhotos";
import { ILocalization } from "./Localization";
import { IUser } from "./User";

export interface IReport {
    eventId: number,
    localization: ILocalization,
    user: IUser,
    eventPhotos: IEventPhotos,
    animalId: number
}