// src/ApiService/apiUsers.tsx
import instance from "@/utils/axios";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: {
    _id: string;
    name?: string;
    permissions: string[];
  };
  organization?: {
    _id: string;
    businessName?: string;
    email?: string;
  };
  tenantId?: string;
  stripeCustomerId?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface Organization {
  _id: string;
  businessName?: string;
  email?: string;
}

interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  organization: string[];
}

interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
  password?: string;
}

interface ListUsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export class UserService {
  // Get all users
  static async getUsers(): Promise<User[]> {
    const res = await instance.get<ApiResponse<ListUsersResponse>>("/user");
    if (res.data.success) {
      return res.data.data.users || [];
    }
    throw new Error(res.data.message || "Failed to fetch users");
  }

  // Get a single user by ID
  static async getUserById(id: string): Promise<User> {
    const res = await instance.get<ApiResponse<User>>(`/user/${id}`);
    if (res.data.success) {
      return res.data.data;
    }
    throw new Error(res.data.message || "Failed to fetch user");
  }

  // Create a new user
  static async createUser(data: CreateUserData): Promise<User> {
    const res = await instance.post<ApiResponse<User>>("/user", data);
    if (res.data.success) {
      return res.data.data;
    }
    throw new Error(res.data.message || "Failed to create user");
  }

  // Update a user
  static async updateUser(id: string, data: UpdateUserData): Promise<User> {
    const res = await instance.put<ApiResponse<User>>(`/user/${id}`, data);
    if (res.data.success) {
      return res.data.data;
    }
    throw new Error(res.data.message || "Failed to update user");
  }

  // Delete a user (deactivate)
  static async deleteUser(id: string): Promise<void> {
    const res = await instance.patch<ApiResponse<void>>(`/user/${id}/deactivate`);
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to delete user");
    }
  }

  // Toggle user status
  static async toggleUserStatus(id: string, status: boolean): Promise<User> {
    const res = await instance.patch<ApiResponse<User>>(`/user/${id}/status`, { 
      isActive: !status 
    });
    if (res.data.success) {
      return res.data.data;
    }
    throw new Error(res.data.message || "Failed to update status");
  }

  // Get all organizations
  static async getOrganizations(): Promise<Organization[]> {
    const res = await instance.get<ApiResponse<Organization[]>>("/organizations");
    if (res.data.success) {
      return res.data.data || [];
    }
    throw new Error(res.data.message || "Failed to fetch organizations");
  }
}

// React Hook for using users
export function useUsers() {
  const getUsers = UserService.getUsers;
  const createUser = UserService.createUser;
  const updateUser = UserService.updateUser;
  const deleteUser = UserService.deleteUser;
  const toggleUserStatus = UserService.toggleUserStatus;
  const getOrganizations = UserService.getOrganizations;

  return {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    getOrganizations,
  };
}