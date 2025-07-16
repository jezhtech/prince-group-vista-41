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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Firebase user is authenticated
        setCurrentUser(user);
        try {
          const token = await user.getIdToken();
          setUserToken(token);
          const userData = await getUser();
          setUserData(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // Firebase user is null, check for backend authentication
        const backendToken = localStorage.getItem("backend_token");
        const backendUserStr = localStorage.getItem("backend_user");

        if (backendToken && backendUserStr) {
          try {
            const backendUser = JSON.parse(backendUserStr);
            console.log("Backend session found:", backendUser.email);

            // Create a custom user object for backend authentication
            const customUser = {
              uid: backendUser.id?.toString() || backendUser.email,
              email: backendUser.email,
              displayName: backendUser.fullName || backendUser.email,
              getIdToken: async () => backendToken,
              emailVerified: true,
              isAnonymous: false,
              metadata: {
                creationTime: new Date().toISOString(),
                lastSignInTime: new Date().toISOString(),
              },
            } as User;

            setCurrentUser(customUser);
            setUserToken(backendToken);
            setUserData(backendUser);
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
          setCurrentUser(null);
          setUserToken(null);
          setUserData(null);
        }
      }
      setLoading(false);
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
      // Profile complete
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
        // New user created, will need to complete profile
        return { isNewUser: true };
      } catch (createError: any) {
        console.error("Error creating user:", createError);
        throw createError;
      }
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

        // Create a Firebase user session using custom token
        // This ensures Firebase session management works properly
        try {
          // Create a custom Firebase user object that mimics Firebase auth
          const customUser = {
            uid: data.user.id?.toString() || data.user.email,
            email: data.user.email,
            displayName: data.user.fullName || data.user.email,
            getIdToken: async () => data.token,
            // Add other Firebase User properties as needed
            emailVerified: true,
            isAnonymous: false,
            metadata: {
              creationTime: new Date().toISOString(),
              lastSignInTime: new Date().toISOString(),
            },
          } as User;

          // Set the user state directly (this will be overridden by Firebase listener)
          setCurrentUser(customUser);

          // Store the backend token in localStorage for persistence
          localStorage.setItem("backend_token", data.token);
          localStorage.setItem("backend_user", JSON.stringify(data.user));

          return { success: true };
        } catch (firebaseError) {
          console.error("Firebase session creation error:", firebaseError);
          // Even if Firebase session creation fails, we still have backend auth
          return { success: true };
        }
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
