import { apiRequest } from './api';
import { auth, googleAuthProvider } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, reauthenticateWithPopup } from 'firebase/auth';

export interface YouTubeSubscriptionResponse {
    isSubscribed: boolean;
    message?: string;
}

export const checkYouTubeSubscription = async (channelId: string): Promise<boolean> => {
    try {
        // Get the current user
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error('User not authenticated');
        }

        let accessToken: string | null = null;

        // Try to get the access token from the user's provider data
        if (currentUser.providerData.length > 0) {
            // Check if user is already signed in with Google
            const googleProvider = currentUser.providerData.find(provider => provider.providerId === 'google.com');

            if (googleProvider) {
                // User is already signed in with Google, try to get a fresh credential
                try {
                    // Use reauthenticateWithPopup instead of signInWithPopup
                    const result = await reauthenticateWithPopup(currentUser, googleAuthProvider);
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    accessToken = credential?.accessToken || null;
                } catch (error) {
                    console.warn('Failed to re-authenticate for access token:', error);
                    // If re-authentication fails, we might need to force a new sign-in
                    throw new Error('Google access token not available. Please sign in with Google to use this feature.');
                }
            } else {
                // User is not signed in with Google
                throw new Error('Google access token not available. Please sign in with Google to use this feature.');
            }
        }

        if (!accessToken) {
            throw new Error('Google access token not available. Please sign in with Google to use this feature.');
        }

        // Make the API request with the access token
        const response = await apiRequest<YouTubeSubscriptionResponse>(
            `/youtube/subscription?channelId=${channelId}`,
            {
                method: 'GET',
                headers: {
                    'X-Google-Access-Token': accessToken,
                },
            }
        );

        return response.isSubscribed;
    } catch (error) {
        console.error('Error checking YouTube subscription:', error);
        throw error;
    }
};

export const useYouTubeSubscription = () => {
    const checkSubscription = async (channelId: string): Promise<boolean> => {
        return checkYouTubeSubscription(channelId);
    };

    return { checkSubscription };
}; 