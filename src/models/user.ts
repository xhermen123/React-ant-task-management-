import { ReservationModel } from "./reservation";

export interface UserModel {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    provider?: string;
    birthday?: string;
    avatarUrl: string;
    isActive: boolean;
    viewVenueName: boolean;
    createdAt: string;
    reservations?: ReservationModel[];
}