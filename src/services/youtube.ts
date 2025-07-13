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
            throw new Error('User not authenticated. Please sign in to continue.');
        }

        let accessToken: string | null = null;
        const isGoogleProvider = currentUser.providerData.some(
            provider => provider.providerId === 'google.com'
        );

        if (isGoogleProvider) {
            // Try to re-authenticate first
            try {
                const result = await reauthenticateWithPopup(currentUser, googleAuthProvider);
                const credential = GoogleAuthProvider.credentialFromResult(result);
                accessToken = credential?.accessToken || null;
            } catch (reauthError) {
                console.warn('Re-authentication failed, attempting sign-in with Google:', reauthError);
                // If re-auth fails (popup closed, etc.), try sign-in
                try {
                    const result = await signInWithPopup(auth, googleAuthProvider);
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    accessToken = credential?.accessToken || null;
                } catch (signInError) {
                    console.error('Google sign-in failed:', signInError);
                    throw new Error('Google access token not available. Please allow popups and sign in with Google to use this feature.');
                }
            }
        } else {
            // Not signed in with Google, prompt sign-in
            try {
                const result = await signInWithPopup(auth, googleAuthProvider);
                const credential = GoogleAuthProvider.credentialFromResult(result);
                accessToken = credential?.accessToken || null;
            } catch (signInError) {
                console.error('Google sign-in failed:', signInError);
                throw new Error('Google access token not available. Please allow popups and sign in with Google to use this feature.');
            }
        }

        if (!accessToken) {
            throw new Error('Google access token not available after authentication. Please try again.');
        }
        const token = await currentUser.getIdToken();

        // Make the API request with the access token
        const response = await apiRequest<YouTubeSubscriptionResponse>(
            `/youtube/check-subscription?channelId=${channelId}`,
            {
                method: 'GET',
                headers: {
                    'X-Google-Access-Token': accessToken,
                    'Authorization': `Bearer ${token}`,
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