export interface Referral {
    id: number;
    referralId: string;
    name: string;
    socialMedia: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateReferralRequest {
    referralId: string;
    name: string;
    socialMedia: string;
}

export interface UpdateReferralRequest extends Partial<CreateReferralRequest> {
    id: number;
} 