import {EventServiceModel} from './event-service'

export interface EventPhotoGalleryModel {
    id: string;
    title: string;
    location: string;
    imgUrls: string[];
    photographer: EventServiceModel;
    photographerId?: string;
    date: string;
    description: string;
    password: string;
    passwordProtected: boolean;
    coverImg: string;
    featured: boolean;
    eventType: string;
}