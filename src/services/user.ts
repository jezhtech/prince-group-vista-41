import { User, CreateUserRequest } from "@/types/user";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const createUser = async (token: string, user: CreateUserRequest): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/user/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error("Failed to create user");
    }

    const data = await response.json();
    return data.user;
};

export const getUser = async (token: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/user/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get user");
    }
    const data = await response.json();
    return data.user;
};

export const getUserById = async (token: string, id: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/user/${id}/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get user");
    }
    const data = await response.json();
    return data.user;
};

export const updateUser = async (token: string, userData: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/user/`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("Failed to update user");
    }
    const data = await response.json();
    return data.user;
};

export const getAllUsers = async (token: string): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/user/all/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get users");
    }
    const data = await response.json();
    return data.users;
};

export const deleteUser = async (token: string, id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/user/${id}/`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete user");
    }
};