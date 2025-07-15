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
  signInWithEmailOTP: (email: string, otp: string) => Promise<{ success: boolean }>;
  isEmailLink: (link: string) => boolean;
  setUserData: (userData: UserType) => void;
  userData: UserType | null;
  userToken: string | null;
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
        setCurrentUser(user);
        try {
          const token = await user.getIdToken();
          setUserToken(token);
          const userData = await getUser(token);
          setUserData(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setCurrentUser(null);
        setUserToken(null);
        setUserData(null);
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
    setCurrentUser(null);
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
    // This will be called from the Login component after OTP verification
    // The actual OTP verification is handled by the backend
    // Here we just need to handle the user session
    try {
      // Get user data from backend using the token
      const userData = await getUser("");
      setUserData(userData);
      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const isEmailLink = (link: string) => {
    return isSignInWithEmailLink(auth, link);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
