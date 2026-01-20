import { useState, useCallback } from "react";
import instance from "@/utils/axios";

export interface TenantUser {
  _id: string;
  email: string;
  tenantId: string;
  dbName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TenantUsersResponse {
  success: boolean;
  data: {
    users: TenantUser[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

export function useTenantUsers() {
  const [users, setUsers] = useState<TenantUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false); // 👈 important

  const fetchUsers = useCallback(async (tenantId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await instance.get<TenantUsersResponse>(
        `/user/tenant-users?tenantId=${tenantId}`
      );

      if (res.data.success) {
        setUsers(res.data.data.users);
        setLoaded(true);
      } else {
        throw new Error("Invalid response");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    error,
    loaded,
    fetchUsers,
  };
}
