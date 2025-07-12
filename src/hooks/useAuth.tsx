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
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, googleAuthProvider } from "@/lib/firebase";
import { createUser, getUser } from "@/services/user";
import { User as UserType } from "@/types/user";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (user: Partial<UserType>, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<{ isNewUser: boolean; needsProfileCompletion?: boolean }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  sendPhoneOTP: (
    phoneNumber: string,
    recaptchaVerifier: RecaptchaVerifier
  ) => Promise<any>;
  verifyPhoneOTP: (verificationId: string, otp: string) => Promise<any>;
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

    // Check if user already exists in our database
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
    } catch (error: any) {
      // User already exists, check if profile is complete
      try {
        const existingUser = await getUser(token);
        if (!existingUser.mobile || !existingUser.address) {
          // Profile incomplete, needs completion
          return { isNewUser: false, needsProfileCompletion: true };
        }
        // Profile complete
        return { isNewUser: false, needsProfileCompletion: false };
      } catch (getUserError: any) {
        console.log("Error checking user data:", getUserError.message);
        // Assume profile needs completion if we can't fetch user data
        return { isNewUser: false, needsProfileCompletion: true };
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
    userData,
    userToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
