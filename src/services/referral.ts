import { Referral, CreateReferralRequest, UpdateReferralRequest } from "@/types/referral";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const getReferralById = async (token: string, id: string): Promise<Referral> => {
    const response = await fetch(`${API_BASE_URL}/referral/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch referral");
    }

    const data = await response.json();
    return data.referral;
};

export const getAllReferrals = async (token: string): Promise<Referral[]> => {
    const response = await fetch(`${API_BASE_URL}/referral/all`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch referrals");
    }

    const data = await response.json();
    return data.referrals;
};

export const createReferral = async (token: string, referral: CreateReferralRequest): Promise<Referral> => {
    const response = await fetch(`${API_BASE_URL}/referral/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(referral),
    });

    if (!response.ok) {
        throw new Error("Failed to create referral");
    }

    const data = await response.json();
    return data.referral;
};

export const updateReferral = async (token: string, referral: UpdateReferralRequest): Promise<Referral> => {
    const response = await fetch(`${API_BASE_URL}/referral/${referral.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(referral),
    });

    if (!response.ok) {
        throw new Error("Failed to update referral");
    }

    const data = await response.json();
    return data.referral;
};

export const deleteReferral = async (token: string, id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/referral/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete referral");
    }
};

export const checkReferralCode = async (token: string, referralCode: string): Promise<{ found: boolean, referral?: Referral }> => {
    const response = await fetch(`${API_BASE_URL}/referral/check-referral?referralCode=${referralCode}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to check referral code");
    }

    const data = await response.json();
    return data;
};