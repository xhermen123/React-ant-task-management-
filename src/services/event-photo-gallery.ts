import { post, get, put, del } from './base'
import { apiUrl } from '../config'
import {EventPhotoGalleryModel} from '../models/event-photo-gallery'

export interface CreateEventPhotoGalleryRequest {
    title: string;
    location: string;
    imgUrls: string[];
    photographerId: string;
    date: string;
    description: string;
    coverImg: string;
    password: string;
    passwordProtected: boolean;
    featured: boolean;
    eventType: string;
}

export interface UpdateEventPhotoGalleryRequest {
    id: string;
    title: string;
    location: string;
    imgUrls: string[];
    photographerId: string;
    date: string;
    description: string;
    coverImg: string;
    password: string;
    passwordProtected: boolean;
    featured: boolean;
    eventType: string;
}

export interface EventPhotoGalleryResponse {
    data: EventPhotoGalleryModel;
}

export interface EventPhotoGalleriesResponse {
    data: EventPhotoGalleryModel[];
}

export default {
    create(req: CreateEventPhotoGalleryRequest): Promise<EventPhotoGalleryResponse> {
        return post(`${apiUrl()}/event-photo-galleries`, req);
    },
    list(): Promise<EventPhotoGalleriesResponse> {
        return get(`${apiUrl()}/event-photo-galleries`);
    },
    get(id: string): Promise<EventPhotoGalleryResponse> {
        return get(`${apiUrl()}/event-photo-galleries/${id}`);
    },
    update(req: UpdateEventPhotoGalleryRequest): Promise<EventPhotoGalleryResponse> {
        return put(`${apiUrl()}/event-photo-galleries/${req.id}`, req);
    },
    delete(id: string): Promise<any> {
        return del(`${apiUrl()}/event-photo-galleries/${id}`);
    }
}