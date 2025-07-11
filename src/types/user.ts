export interface User {
  id: number;
  userId: string;
  firebaseId: string;
  role: "admin" | "user";
  fullName: string;
  email: string;
  mobile: string;
  createdAt: string;
  updatedAt: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CreateUserRequest extends Partial<User> {
  userId: string;
  firebaseId: string;
  role: "admin" | "user";
  fullName: string;
  email: string;
  mobile: string;
}