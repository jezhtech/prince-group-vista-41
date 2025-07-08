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
}

export interface CreateUserRequest {
  userId: string;
  firebaseId: string;
  role: "admin" | "user";
  fullName: string;
  email: string;
  mobile: string;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: number;
}