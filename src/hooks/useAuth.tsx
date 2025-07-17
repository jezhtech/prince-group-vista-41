import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { auth, googleAuthProvider, actionCodeSettings } from "@/lib/firebase";
import { createUser, getUser } from "@/services/user";
import { User as UserType } from "@/types/user";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (user: Partial<UserType>, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<{
    isNewUser: boolean;
    needsProfileCompletion?: boolean;
  }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  sendPhoneOTP: (
    phoneNumber: string,
    recaptchaVerifier: RecaptchaVerifier
  ) => Promise<any>;
  verifyPhoneOTP: (verificationId: string, otp: string) => Promise<any>;
  sendEmailOTP: (email: string) => Promise<void>;
  verifyEmailOTP: (email: string) => Promise<void>;
  signInWithEmailOTP: (
    email: string,
    otp: string
  ) => Promise<{ success: boolean }>;
  isEmailLink: (link: string) => boolean;
  setUserData: (userData: UserType) => void;
  userData: UserType | null;
  userToken: string | null;
  getApiToken: () => string | null;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { useAuth };

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data from backend
  const fetchUserData = async (token: string): Promise<UserType> => {
    try {
      console.log("Fetching user data with token:", token.substring(0, 20) + "...");
      const userData = await getUser(token);
      console.log("User data fetched successfully:", userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user data from backend:", error);
      throw error; // Re-throw to handle it properly
    }
  };

  // Function to create a custom Firebase user for backend authentication
  const createCustomFirebaseUser = (backendUser: UserType, token: string): User => {
    return {
      uid: backendUser.id?.toString() || backendUser.email,
      email: backendUser.email,
      displayName: backendUser.fullName || backendUser.email,
      getIdToken: async () => token,
      emailVerified: true,
      isAnonymous: false,
      metadata: {
        creationTime: backendUser.createdAt || new Date().toISOString(),
        lastSignInTime: new Date().toISOString(),
      },
    } as User;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user ? "User authenticated" : "No user");
      try {
        if (user) {
          // Firebase user is authenticated
          console.log("Setting current user:", user.email);
          setCurrentUser(user);
          
          try {
            const token = await user.getIdToken();
            console.log("Got Firebase token:", token.substring(0, 20) + "...");
            setUserToken(token);

            // Fetch real user data from backend
            console.log("Fetching user data from backend...");
            const userData = await fetchUserData(token);
            console.log("Setting user data:", userData);
            setUserData(userData);
          } catch (error) {
            console.error("Error fetching user data:", error);
            
            // If backend fetch fails, check if we have stored backend session
            const backendToken = localStorage.getItem("backend_token");
            const backendUserStr = localStorage.getItem("backend_user");

            if (backendToken && backendUserStr) {
              try {
                console.log("Trying to restore backend session...");
                const backendUser = JSON.parse(backendUserStr);
                const customUser = createCustomFirebaseUser(backendUser, backendToken);
                
                setCurrentUser(customUser);
                setUserToken(backendToken);
                setUserData(backendUser);
                console.log("Backend session restored successfully");
              } catch (parseError) {
                console.error("Error parsing stored backend session:", parseError);
                // Clear invalid session and sign out
                localStorage.removeItem("backend_token");
                localStorage.removeItem("backend_user");
                await signOut(auth);
              }
            } else {
              // No valid session found, sign out to force re-authentication
              console.error("No valid user session found, signing out");
              await signOut(auth);
            }
          }
        } else {
          // Firebase user is null, check for backend authentication
          console.log("Checking for backend authentication...");
          const backendToken = localStorage.getItem("backend_token");
          const backendUserStr = localStorage.getItem("backend_user");

          if (backendToken && backendUserStr) {
            try {
              console.log("Restoring backend session...");
              const backendUser = JSON.parse(backendUserStr);
              const customUser = createCustomFirebaseUser(backendUser, backendToken);

              setCurrentUser(customUser);
              setUserToken(backendToken);
              setUserData(backendUser);
              console.log("Backend session restored successfully");
            } catch (error) {
              console.error("Error restoring backend session:", error);
              // Clear invalid backend session
              localStorage.removeItem("backend_token");
              localStorage.removeItem("backend_user");
              setCurrentUser(null);
              setUserToken(null);
              setUserData(null);
            }
          } else {
            // No authentication found
            console.log("No authentication found");
            setCurrentUser(null);
            setUserToken(null);
            setUserData(null);
          }
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
        // On any error, clear everything and sign out
        setCurrentUser(null);
        setUserToken(null);
        setUserData(null);
        localStorage.removeItem("backend_token");
        localStorage.removeItem("backend_user");
        await signOut(auth);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (user: UserType, password: string) => {
    const result = await createUserWithEmailAndPassword(
      auth,
      user.email,
      password
    );

    const token = await result.user.getIdToken();
    await createUser(token, { ...user, firebaseId: result.user.uid });

    await updateProfile(result.user, { displayName: user.fullName });
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const token = await result.user.getIdToken();

    // First, try to get existing user
    try {
      const existingUser = await getUser(token);
      // User exists, check if profile is complete
      if (!existingUser.mobile || !existingUser.address) {
        // Profile incomplete, needs completion
        return { isNewUser: false, needsProfileCompletion: true };
      }
      // Profile complete - ensure userData is set
      setUserData(existingUser);
      return { isNewUser: false, needsProfileCompletion: false };
    } catch (error: any) {
      // User doesn't exist, create new user
      try {
        await createUser(token, {
          userId: result.user.uid,
          firebaseId: result.user.uid,
          email: result.user.email || "",
          fullName: result.user.displayName || "",
          mobile: "", // Will be filled in the next step
          role: "user" as const,
        });

        // Fetch the newly created user data
        const newUserData = await getUser(token);
        setUserData(newUserData);

        // New user created, will need to complete profile
        return { isNewUser: true };
      } catch (createError: any) {
        console.error("Error creating user:", createError);
        throw createError;
      }
    }
  };

  // Function to refresh user data
  const refreshUserData = async () => {
    if (!currentUser) return;

    try {
      const token = await currentUser.getIdToken();
      const userData = await fetchUserData(token);
      setUserData(userData);
    } catch (error) {
      console.error("Error refreshing user data:", error);
      // If refresh fails, the auth state change handler will handle it
    }
  };

  const logout = async () => {
    // Clear backend session
    localStorage.removeItem("backend_token");
    localStorage.removeItem("backend_user");

    // Clear state
    setCurrentUser(null);
    setUserToken(null);
    setUserData(null);

    // Sign out from Firebase
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (displayName: string) => {
    if (currentUser) {
      await updateProfile(currentUser, { displayName });
    }
  };

  const sendPhoneOTP = async (
    phoneNumber: string,
    recaptchaVerifier: RecaptchaVerifier
  ) => {
    return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

  const verifyPhoneOTP = async (verificationId: string, otp: string) => {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    return await signInWithCredential(auth, credential);
  };

  const sendEmailOTP = async (email: string) => {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  };

  const verifyEmailOTP = async (email: string) => {
    if (isSignInWithEmailLink(auth, email)) {
      await signInWithEmailLink(auth, email);
    }
  };

  const signInWithEmailOTP = async (email: string, otp: string) => {
    try {
      // Call the backend OTP verification
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "/api/v1"}/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();

      if (data.success && data.token && data.user) {
        // Store the backend token and user data
        setUserToken(data.token);
        setUserData(data.user);

        // Create a custom Firebase user object for backend authentication
        const customUser = createCustomFirebaseUser(data.user, data.token);

        // Set the user state directly
        setCurrentUser(customUser);

        // Store the backend token in localStorage for persistence
        localStorage.setItem("backend_token", data.token);
        localStorage.setItem("backend_user", JSON.stringify(data.user));

        return { success: true };
      } else {
        throw new Error(data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  };

  const isEmailLink = (link: string) => {
    return isSignInWithEmailLink(auth, link);
  };

  const getApiToken = () => {
    return userToken || localStorage.getItem("backend_token");
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    sendPhoneOTP,
    verifyPhoneOTP,
    sendEmailOTP,
    verifyEmailOTP,
    signInWithEmailOTP,
    isEmailLink,
    userData,
    setUserData,
    userToken,
    getApiToken,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
