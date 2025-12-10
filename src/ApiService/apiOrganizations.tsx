import { useState, useEffect } from "react";
import instance from "@/utils/axios";

export interface Organization {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  businessName: string;
  practiceName?: string;
  dbName?: string;
  plan?: string;
  planName: string;
  status: "active" | "suspended" | "cancelled" | "pending";
  onboardingData?: {
    clientsRange?: string;
    nature?: string[];
    structure?: any;
    connectedEmail?: string;
    completedAt?: Date;
  };
  subscription?: {
    status: "trial" | "active" | "expired" | "cancelled" | "past_due";
    trialStartDate?: Date;
    trialEndsAt?: Date;
    billingCycle?: "monthly" | "yearly";
    nextBillingDate?: Date;
    planSubs?: {
      name?: string;
      price?: number;
      period?: string;
      features?: any[];
    };
  };
  metrics?: {
    totalUsers: number;
    totalClients: number;
    storageUsed: number;
    apiCallsThisMonth: number;
  };
  registeredAt: string;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
}

interface OrganizationsResponse {
  success: boolean;
  data: Organization[];
  total?: number;
}

interface UseOrganizationsReturn {
  organizations: Organization[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  total: number;
  createOrganization: (data: any) => Promise<any>;
  updateOrganization: (id: string, data: any) => Promise<any>;
  deleteOrganization: (id: string) => Promise<any>;
  changeStatus: (id: string, status: string) => Promise<any>;
}

export function useOrganizations(): UseOrganizationsReturn {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizations = async () => {
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
  };

  const createOrganization = async (data: any) => {
    try {
      const response = await instance.post("/organizations", data);
      await fetchOrganizations(); // Refresh list
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to create organization";
      throw new Error(message);
    }
  };

  const updateOrganization = async (id: string, data: any) => {
    try {
      const response = await instance.put(`/organizations/${id}`, data);
      await fetchOrganizations();
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to update organization";
      throw new Error(message);
    }
  };

  const changeStatus = async (id: string, status: string) => {
    try {
      const response = await instance.patch(`/organizations/${id}/status`, { status });
      await fetchOrganizations();
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to change status";
      throw new Error(message);
    }
  };

  const deleteOrganization = async (id: string) => {
    try {
      const response = await instance.delete(`/organizations/${id}`);
      await fetchOrganizations();
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to delete organization";
      throw new Error(message);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

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
  };
}