
import { useState, useEffect, useCallback } from "react";
import instance from "@/utils/axios";
import type { 
  Organization, 
  CreateOrganizationData, 
  UpdateOrganizationData 
} from "@/types/organizations";

interface OrganizationsResponse {
  success: boolean;
  data: Organization[];
  total?: number;
}

interface UseOrganizationsReturn {
  organizations: Organization[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  total: number;
  createOrganization: (data: CreateOrganizationData) => Promise<Organization>;
  updateOrganization: (id: string, data: UpdateOrganizationData) => Promise<Organization>;
  deleteOrganization: (id: string) => Promise<void>;
  changeStatus: (id: string, status: string) => Promise<Organization>;
  getOrganizationById: (id: string) => Organization | undefined;
}

export function useOrganizations(): UseOrganizationsReturn {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await instance.get<OrganizationsResponse>("/organizations");
      
      if (response.data.success && response.data.data) {
        setOrganizations(response.data.data);
        setTotal(response.data.total || response.data.data.length);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Failed to fetch organizations";
      setError(message);
      console.error("Organizations API Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrganization = async (data: CreateOrganizationData): Promise<Organization> => {
    try {
      const response = await instance.post("http://localhost:8181/api/V2/auth/register", {
        ...data,
        planName: data.paymentOption === 'alreadyPaid' ? data.plan : undefined
      });
      
      if (response.data.success && response.data.data) {
        await fetchOrganizations();
        return response.data.data;
      }
      throw new Error("Failed to create organization");
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to create organization";
      throw new Error(message);
    }
  };

  const updateOrganization = async (id: string, data: UpdateOrganizationData): Promise<Organization> => {
    try {
      const response = await instance.patch(`http://localhost:8181/api/V2/auth/user`, data);
      

      if (response.data.success && response.data.data) {
        setOrganizations(prev => 
          prev.map(org => org._id === id ? response.data.data : org)
        );
        return response.data.data;
      }
      throw new Error("Failed to update organization");
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to update organization";
      throw new Error(message);
    }
  };

  const changeStatus = async (id: string, status: string): Promise<Organization> => {
    try {
      const response = await instance.patch(`/organizations/${id}/status`, { status });
      
      if (response.data.success && response.data.data) {
        setOrganizations(prev => 
          prev.map(org => org._id === id ? response.data.data : org)
        );
        return response.data.data;
      }
      throw new Error("Failed to change status");
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to change status";
      throw new Error(message);
    }
  };

  const deleteOrganization = async (id: string): Promise<void> => {
    try {
      await instance.delete(`/organizations/${id}`);
      setOrganizations(prev => prev.filter(org => org._id !== id));
      setTotal(prev => prev - 1);
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to delete organization";
      throw new Error(message);
    }
  };

  const getOrganizationById = (id: string): Organization | undefined => {
    return organizations.find(org => org._id === id);
  };

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  return {
    organizations,
    loading,
    error,
    refetch: fetchOrganizations,
    total,
    createOrganization,
    updateOrganization,
    deleteOrganization,
    changeStatus,
    getOrganizationById
  };
}

export { type Organization };