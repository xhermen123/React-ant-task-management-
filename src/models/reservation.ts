import { VenueModel } from "./venue";
import { UserModel } from "./user";
import { EventServiceModel } from "./event-service";

export interface ReservationModel {
    id: string;
    venue: VenueModel;
    user: UserModel;
    privateEvent: boolean;
    status: string;
    guestQty: number;
    startTime: string;
    endTime: string;
    flexible: boolean;
    eventType: string;
    notes: string;
    mobileDevice: boolean;
}

export interface EventServiceReservationModel {
    id: string;
    eventService: EventServiceModel;
    user: UserModel;
    status: string;
    location: string;
    guestQty: number;
    startTime: string;
    endTime: string;
    eventType: string;
    notes: string;
    mobileDevice: boolean;
}