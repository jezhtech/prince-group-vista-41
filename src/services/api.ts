const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export interface ApiResponse<T> {
    data: T;
    message?: string;
    error?: string;
}

export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public statusText: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export const apiRequest = async <T>(
    endpoint: string,
    options: RequestInit = {},
    token?: string
): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorText = await response.text();
            console.log(errorText);
            throw new ApiError(
                `HTTP error! status: ${response.status}`,
                response.status,
                errorText
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(
            error instanceof Error ? error.message : 'Unknown error occurred',
            0,
            'Network Error'
        );
    }
};

export const getAuthHeaders = (token: string): HeadersInit => ({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
}); 