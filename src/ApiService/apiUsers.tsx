// hooks/useUsers.ts
import { useState, useEffect } from "react";
import instance from "@/utils/axios"; 

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: {
    _id: string;
    permissions: string[];
  };
  tenantId?: string;
  stripeCustomerId?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UsersResponse {
  success: boolean;
  data: {
    users: User[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  total: number;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await instance.get<UsersResponse>("/user"); 

      if (response.data.success && response.data.data?.users) {
        setUsers(response.data.data.users);
        setTotal(response.data.data.pagination.total);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Failed to fetch users";
      setError(message);
      console.error("Users API Error:", err);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch: fetchUsers, total };
}