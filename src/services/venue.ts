import { get, post, put, del, QueryParam } from './base'
import { 
    VenueModel,
    VenueStatsModel,
    VenueImage,
    VenueDish,
    MealPrice,
    EventType,
    VenueOptions
} from '../models/venue';
import { apiUrl } from '../config'

export interface VenueResponse {
    data: VenueModel;
}

export interface VenuesResponse {
    data: VenueModel[];
}

export interface VenueStatsResponse {
    data: VenueStatsModel;
}

export interface CreateVenueRequest {
    listingName: string;
    name: string;
    roomName: string;
    commission: number;
    email: string;
    featuredImageUrl: string;
    phoneNumber: string;
    description: string;
    venueType: string;
    googleReviewRating: number;
    googleReviewQty: number;
    address: string;
    city: string;
    neighbourhood: string;
    amenities: string[];
    iGuideLink: string;
    lookFeels: string[];
    seatedCapacity: number;
    standingCapacity: number;
    rentalFee: number;
    notes: string;
    foodDrinkOptions: string[];
    cuisineOptions: string[];
    images: VenueImage[];
    dishes: VenueDish[];
    eventType: EventType;
    contactName: string;
    phoneExt: string;
    fullAddress: string;
    minCapacity: number;
    lunchPrice: MealPrice;
    dinnerPrice: MealPrice;
}

export interface VenueOptionsResponse {
    data: VenueOptions;
}

export interface UpdateVenueRequest {
    id: string;
    listingName: string;
    name: string;
    featuredImageUrl: string;
    roomName: string;
    commission: number;
    email: string;
    phoneNumber: string;
    description: string;
    venueType: string;
    googleReviewRating: number;
    googleReviewQty: number;
    address: string;
    city: string;
    neighbourhood: string;
    amenities: string[];
    iGuideLink: string;
    lookFeels: string[];
    seatedCapacity: number;
    active: boolean;
    standingCapacity: number;
    rentalFee: number;
    threeCourseMealPrice: number;
    notes: string;
    foodDrinkOptions: string[];
    cuisineOptions: string[];
    images: VenueImage[];
    dishes: VenueDish[];
    eventType: EventType;
    contactName: string;
    phoneExt: string;
    fullAddress: string;
    minCapacity: number;
    lunchPrice: MealPrice;
    dinnerPrice: MealPrice;
}

export default {
    create(req: CreateVenueRequest): Promise<VenueResponse> {
        req.phoneNumber = req.phoneNumber ? req.phoneNumber.replace(/\D/g, '').substring(0, 10) : ''
        req.phoneExt = req.phoneExt ? req.phoneExt.replace(/\D/g, '').substring(0, 5) : ''
        return post(`${apiUrl()}/venues`, req);
    },
    list(params?: QueryParam): Promise<VenuesResponse> {
        let q = '?'
        if (params) {
            Object.keys(params).forEach((key, i) => {
                if (i !== 0) q += '&'
                q += `${key.replace(/([A-Z])/g, (g) => `_${g[0].toLowerCase()}`)}=${params[key]}`
            })
        }
        return get(`${apiUrl()}/venues${q}`);
    },
    listAdminVenues(): Promise<VenuesResponse> {
        return get(`${apiUrl()}/venues?from_admin=true`);
    },
    update(req: UpdateVenueRequest): Promise<VenueResponse> {
        req.phoneNumber = req.phoneNumber.replace(/\D/g, '');
        return put(`${apiUrl()}/venues/${req.id}`, req)
    },
    get(id: string): Promise<VenueResponse> {
        return get(`${apiUrl()}/venues/${id}`);
    },
    getStats(): Promise<VenueStatsResponse> {
        return get(`${apiUrl()}/stats/venues`)
    },
    listOptions(): Promise<VenueOptionsResponse> {
        return get(`${apiUrl()}/options/venues`);
    },
    addOption(type: string, name: string): Promise<VenueOptionsResponse> {
        return post(`${apiUrl()}/options/venues`, { type, name });
    },
    removeOption(type: string, id: string): Promise<VenueOptionsResponse> {
        return del(`${apiUrl()}/options/${type}/${id}`);
    },
    del(id: string) {
        return del(`${apiUrl()}/venues/${id}`);
    }
}