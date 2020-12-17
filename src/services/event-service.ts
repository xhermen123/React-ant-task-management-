import { get, post, put, del, QueryParam } from './base'
import { apiUrl } from '../config'
import { EventServiceModel, Testimonial, EventServiceType, EventServiceCustomOption } from '../models/event-service';
import { EventType } from '../models/venue';
import {EventServiceTypeOption} from '../models/event-service'

export interface EventServiceResponse {
    data: EventServiceModel;
}

export interface EventServicesResponse {
    data: EventServiceModel[];
}

export interface EventServiceTypeResponse {
    data: EventServiceType;
}

export interface EventServiceTypesResponse {
    data: EventServiceType[];
}

export interface CreateEventServiceRequest {
    contactName: string;
    stageName: string;
    commission: string;
    demoUrl: string;
    email: string;
    phoneNumber: string;
    bio: string;
    serviceTypeId: string;
    rating: number;
    hourlyRate: number;
    startingPackagePrice: number;
    reviewQty: number;
    testimonials: Testimonial[];
    images: string[];
    eventType: EventType;
    customOptions: EventServiceCustomOption[];
}

export interface UpdateEventServiceRequest {
    id: string;
    contactName: string;
    stageName: string;
    commission: string;
    demoUrl: string;
    email: string;
    phoneNumber: string;
    bio: string;
    serviceTypeId: string;
    rating: number;
    hourlyRate: number;
    startingPackagePrice: number;
    reviewQty: number;
    testimonials: Testimonial[];
    images: string[];
    eventType: EventType;

    customOptions: EventServiceCustomOption[];
}

export default {
    create(req: CreateEventServiceRequest): Promise<EventServiceResponse> {
        req.phoneNumber = req.phoneNumber ? req.phoneNumber.replace(/\D/g, '').substring(0, 10) : ''
        return post(`${apiUrl()}/event-services`, req);
    },
    list(params?: QueryParam): Promise<EventServicesResponse> {
        let q = '?'
        if (params) {
            {params}
            Object.keys(params).forEach((key, i) => {
                if (i !== 0) q += '&'
                q += `${key}=${params[key]}`
            })
        }
        return get(`${apiUrl()}/event-services${q}`);
    },
    update(req: UpdateEventServiceRequest): Promise<EventServiceResponse> {
        req.phoneNumber = req.phoneNumber.replace(/\D/g, '');
        return put(`${apiUrl()}/event-services/${req.id}`, req)
    },
    get(id: string): Promise<EventServiceResponse> {
        return get(`${apiUrl()}/event-services/${id}`);
    },
    del(id: string) {
        return del(`${apiUrl()}/event-services/${id}`);
    },
    createServiceType(name: string, options: EventServiceTypeOption[]): Promise<EventServiceTypeResponse> {
        return post(`${apiUrl()}/event-service-types`, {
            name,
            options
        });
    },
    listServiceTypes(): Promise<EventServiceTypesResponse> {
        return get(`${apiUrl()}/event-service-types`);
    },
    getServiceType(id: string): Promise<EventServiceTypeResponse> {
        return get(`${apiUrl()}/event-service-types/${id}`);
    },
    updateServiceType(id: string, name: string, options: EventServiceTypeOption[]): Promise<EventServiceTypeResponse> {
        return put(`${apiUrl()}/event-service-types/${id}`, {
            id,
            name,
            options
        });
    },
}
