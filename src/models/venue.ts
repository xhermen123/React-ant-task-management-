export interface VenueStatsModel {
    seatedCapacity: MinMaxStat,
    standingCapacity: MinMaxStat,
    rentalFee: MinMaxStat,
    lunchPrice: MinMaxStat,
    dinnerPrice: MinMaxStat,
    eventServicePackagePrice: MinMaxStat,
    eventServiceHourlyRate: MinMaxStat,
}

export interface MinMaxStat {
    min: number;
    max: number;
    avg: number;
}

export interface EventType {
    wedding: boolean,
    corporate: boolean
    social: boolean;
};

export interface VenueModel {
    id: string;
    name: string;
    active: boolean;
    roomName: string;
    contactName: string;
    commission: number;
    listingName: string;
    email: string;
    phoneNumber: string;
    description: string;
    featuredImgUrl: string;
    venueType: string;
    eventType: EventType;
    googleReviewRating: number;
    googleReviewQty: number;
    minCapacity: number;
    phoneExt: string;
    address: string;
    city: string;
    neighbourhood: string;
    amenities: VenueOptionItem[];
    iGuideLink: string;
    cuisineOptions: VenueOptionItem[];
    lookFeels: VenueOptionItem[];
    seatedCapacity: number;
    standingCapacity: number;
    rentalFee: number;
    threeCourseMealPrice: number;
    notes: string;
    foodDrinkOptions: VenueOptionItem[];
    images: VenueImage[];
    dishes: VenueDish[];
    lunchPrice: MealPrice;
    dinnerPrice: MealPrice;
    fullAddress: string;
}

export interface VenueImage {
    url: string;
}

export interface VenueDish {
    imgUrl: string;
    name: string;
}

export interface MealPrice {
    perPerson: number;
    buyout: number;
}

export interface VenueOptions {
    amenities: VenueOptionItem[];
    cuisineOptions: VenueOptionItem[];
    foodDrinkOptions: VenueOptionItem[];
    lookFeels: VenueOptionItem[];
    eventServiceTypes: VenueOptionItem[];
}

export interface VenueOptionItem {
    name: string;
    id: string;
}