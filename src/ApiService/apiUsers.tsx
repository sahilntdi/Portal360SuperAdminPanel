import { useState, useEffect } from "react";
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
  tenantId?: string;
  stripeCustomerId?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
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

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  total: number;
  createUser: (data: CreateUserData) => Promise<User>;
  updateUser: (id: string, data: UpdateUserData) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  toggleUserStatus: (id: string, status: boolean) => Promise<User>;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await instance.get("/user");
      if (res.data.success) {
        const data: ListUsersResponse = res.data.data;
        setUsers(data.users || []);
      } else {
        setError("Failed to load users");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (data: CreateUserData): Promise<User> => {
    try {
      const res = await instance.post("/user", data);
      if (res.data.success) {
        await fetchUsers();
        return res.data.data;
      }
      throw new Error("Failed to create user");
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to create user");
    }
  };

  const updateUser = async (id: string, data: UpdateUserData): Promise<User> => {
    try {
      const res = await instance.put(`/user/${id}`, data);
      if (res.data.success) {
        await fetchUsers();
        return res.data.data;
      }
      throw new Error("Failed to update user");
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to update user");
    }
  };

  const deleteUser = async (id: string): Promise<void> => {
    try {
      const res = await instance.patch(`/user/${id}/deactivate`);
      if (res.data.success) {
        await fetchUsers();
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to delete user");
    }
  };

  const toggleUserStatus = async (id: string, status: boolean): Promise<User> => {
    try {
      // First get the current user to see if we need to activate or deactivate
      const res = await instance.put(`/user/${id}`, { isActive: !status });
      if (res.data.success) {
        await fetchUsers();
        return res.data.data;
      }
      throw new Error("Failed to update status");
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    total: users.length,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
  };
}