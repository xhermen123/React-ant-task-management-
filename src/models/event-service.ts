import { EventType } from "./venue";

export interface EventServiceModel {
    id: string;
    contactName: string;
    demoUrl: string;
    commission: string;
    stageName: string;
    email: string;
    phoneNumber: string;
    bio: string;
    serviceType: EventServiceType;
    serviceTypeId?: string;
    reviewQty: number;
    rating: number;
    startingPackagePrice: number;
    hourlyRate: number;
    testimonials: Testimonial[];
    images: string[];
    eventType: EventType;
    customOptions: EventServiceCustomOption[];
    createdAt: string;
    updatedAt: string;
}

export interface EventServiceCustomOption {
    name: string;
    type: string;
    data: any
}

export interface Testimonial {
    name: string;
    description: string;
}

export interface EventServiceType {
    id: string;
    name: string;
    options: EventServiceTypeOption[];
}

export interface EventServiceTypeOption {
    name: string;
    type: string;
    keys: string[];
}