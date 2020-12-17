import { post, get, put, del } from './base'
import { apiUrl } from '../config'
import { ReservationModel, EventServiceReservationModel } from '../models/reservation';

export interface ReservationResponse {
    data: ReservationModel;
}

export interface ReservationsResponse {
    data: ReservationModel[];
}

export interface EventServiceReservationResponse {
    data: EventServiceReservationModel;
}

export interface EventServiceReservationsResponse {
    data: EventServiceReservationModel[];
}

export interface CreateReservationRequest {
    venueId: string;
    userId: string;
    guestQty: number;
    startTime: string;
    endTime: string;
    eventType: string;
    notes: string;
    phoneNumber: string;
    flexible: boolean;
    privateEvent: boolean;
    mobileDevice: boolean;
}

export interface UpdateReservationRequest {
    id: string;
    status: string;
}

export interface CreateEventServiceReservationRequest {
    eventServiceId: string;
    userId: string;
    guestQty: number;
    startTime: string;
    endTime: string;
    eventType: string;
    notes: string;
    phoneNumber: string;
    location: string;
    mobileDevice: boolean;
}

export default {
    create(req: CreateReservationRequest): Promise<ReservationResponse> {
        req.phoneNumber = req.phoneNumber ? req.phoneNumber.replace(/\D/g,'') : ''
        return post(`${apiUrl()}/reservations`, req);
    },
    list(): Promise<ReservationsResponse> {
        return get(`${apiUrl()}/reservations`)
    },
    get(id: string): Promise<ReservationResponse> {
        return get(`${apiUrl()}/reservations/${id}`)
    },
    update(req: UpdateReservationRequest): Promise<ReservationResponse> {
        return put(`${apiUrl()}/reservations/${req.id}`, req)
    },
    del(id: string): Promise<any> {
        return del(`${apiUrl()}/reservations/${id}`)
    },
    createEventServiceRes(req: CreateEventServiceReservationRequest): Promise<EventServiceReservationResponse> {
        req.phoneNumber = req.phoneNumber ? req.phoneNumber.replace(/\D/g,'') : ''
        return post(`${apiUrl()}/event-services/${req.eventServiceId}/reservations`, req);
    },
    listEventServiceRes(): Promise<EventServiceReservationsResponse> {
        return get(`${apiUrl()}/event-services/reservations`)
    },
    getEventServiceRes(id: string): Promise<EventServiceReservationResponse> {
        return get(`${apiUrl()}/event-services/reservations/${id}`)
    },
}