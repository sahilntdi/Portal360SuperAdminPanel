import { useState, useEffect } from "react";

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

      const baseUrl = import.meta.env.VITE_API_BASE_URLs;
      const token = localStorage.getItem("token") || import.meta.env.VITE_BEARER_TOKEN;

      if (!baseUrl) {
        throw new Error("API URL not configured");
      }

      if (!token) {
        throw new Error("token not found");
      }

      const res = await fetch(`${baseUrl}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to fetch users");
      }

      const json: UsersResponse = await res.json();

      if (json.success && json.data?.users) {
        setUsers(json.data.users);
        setTotal(json.data.pagination.total);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      setError(err.message);
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