import { useState, useEffect } from "react";
import instance from "@/utils/axios";
import { Organization } from "./apiOrganizations";

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
  organization?: Organization;
  tenantId?: string;
  isActive: boolean;
  createdAt: string;
}

interface UseUsersReturn {
  users: User[];
  organizations: Organization[];
  loading: boolean;
  orgLoading: boolean;
  error: string | null;
  refetch: () => void;
  total: number;
  createUser: (data: any) => Promise<any>;
  toggleUserStatus: (id: string, status: boolean) => Promise<any>;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [orgLoading, setOrgLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await instance.get("/user");
      if (res.data.success) {
        setUsers(res.data.data.users);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrgs = async () => {
    try {
      setOrgLoading(true);
      const res = await instance.get("/organizations");
      if (res.data.success) {
        setOrganizations(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load organizations");
    } finally {
      setOrgLoading(false);
    }
  };

  const createUser = async (payload: any) => {
    try {
      const res = await instance.post("/api/users", payload);
      await fetchUsers();
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to create user");
    }
  };

  const toggleUserStatus = async (id: string, isActive: boolean) => {
    try {
      await instance.patch(`/user/${id}/status`, { isActive: !isActive });
      await fetchUsers();
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrgs();
  }, []);

  return {
    users,
    organizations,
    loading,
    orgLoading,
    error,
    refetch: fetchUsers,
    total: users.length,
    createUser,
    toggleUserStatus,
  };
}