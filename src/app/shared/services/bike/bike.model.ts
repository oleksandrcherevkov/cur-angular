import { Station } from "../station/station.model";
import { BikeStatusEnum } from "./bike-status.enum";

export interface Bike {
    id: string;
    latitude: number;
    longtitude: number;
    status: BikeStatusEnum;
    station: Station | null;
}