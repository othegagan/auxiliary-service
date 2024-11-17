export interface VehicleFeatures {
    id: number;
    vin: string;
    make: string;
    model: string;
    series: string | null;
    backupCamera?: boolean | null;
    description: string;
    year: string;
    cityname: string;
    price_per_hr: number;
    latitude: string;
    longitude: string;
    address1: string;
    address2?: string;
    zipcode: string;
    state: string;
    country: string;
    name: string;
    delivery?: boolean;
    airportDelivery?: boolean;
    bedtype?: string;
    transmissionStyle?: string;
    bodyclass?: string;
    busfloortype?: string;
    bustype?: string;
    cabtype?: string;
    custommotortype?: string;
    doors: string;
    drivetype?: string;
    electrificationlevel?: string;
    enginebrake?: string;
    enginepower?: string;
    frontairbaglocation?: string | null;
    fueltypeprimary?: string;
    manufacturename?: string;
    engineNumberOfCylinders?: number | null;
    motorcyclechasistype?: string | null;
    motorcyclesuspensiontype?: string | null;
    othetengineinfo?: string;
    OtherRestraintSystemInfo?: string;
    plantCity?: string;
    plantCompanyName?: string;
    plantCountry?: string;
    plantstate?: string;
    seatbelttype?: string;
    SideAirBagLocations?: string;
    SteeringLocation?: string;
    tirePressure?: string;
    trailerBodyType?: string;
    trailerTypeConnection?: string;
    trim?: string;
    turbo?: string;
    vehicleType?: string;
    count: number;
    tripcount: number;
    rating: number;
    wishList: boolean;
    vehicleDescription?: string;
    seatingCapacity?: string;
    parkingDetails?: string;
    guideLines?: string;
    policies?: string | null;
    GuestInstructionsAndGuideLines?: string | null;
    completedStages?: string;
    vehicleState?: string | null;
    color?: string;
    number?: string;
    isActive: boolean;
    uploadStatus: string;
    isDiscountAvailable?: boolean;
    [key: string]: any; // Catch-all for additional keys with uncertain types
}

export interface CreateNewIndividualPayload {
    first_name: string;
    last_name: string;
    email: string;
    external_id: string;
    phone_number: string;
    address?: {
        addr1: string;
        addr2?: string;
        city?: string;
        state_name?: string;
        zipcode: string;
        country: string;
    };
}

export interface ExtractPolicyDetails {
    policyNumber: string;
    startDate: string;
    expiryDate: string;
    policyHolders: {
        name: string;
        address: {
            addr1: string;
            addr2?: string;
            city?: string;
            state?: string;
            zipcode: string;
        };
    }[];
    insuranceProvider: {
        name: string;
        phoneNumber: string;
        address: {
            addr1: string;
            addr2?: string;
            city?: string;
            state?: string;
            zipcode: string;
        };
    };
    coverages: any;
}

export const insranceVerificationStatus = {
    NOT_VERIFIED: 'notVerified',
    IN_PROGRESS: 'inProgress',
    VERIFIED: 'verified',
    FAILED: 'failed'
};
