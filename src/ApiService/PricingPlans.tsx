// hooks/usePricingPlans.ts

import { useState, useEffect } from "react";
import instance from "@/utils/axios";

export interface PricingPlan {
  _id: string;
  name: string;
  price: number;
  discountAmount?: number;
  discountPeriod?: string;
  period: string;
  description: string;
  features: Array<string | { name: string; value: any }>;
  highlighted?: boolean;
  isActive: boolean;
  order: number;
  recommendedFor?: string | number;
  planId?: string;
  stripePriceId?: string;
}

interface PricingResponse {
  success: boolean;
  data: PricingPlan[];
}

interface UsePricingPlansReturn {
  plans: PricingPlan[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePricingPlans(): UsePricingPlansReturn {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await instance.get<PricingResponse>("/pricing");

      // ← YEH SAHI HAI: response.data.data (sirf do baar .data)
      if (response.data.success && Array.isArray(response.data.data)) {
        const activePlans = response.data.data  // ← SIRF YAHAN TAK!
          .filter((p: PricingPlan) => p.isActive)
          .sort((a: PricingPlan, b: PricingPlan) => (a.order || 0) - (b.order || 0));

        setPlans(activePlans);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Failed to fetch pricing plans";
      setError(message);
      console.error("Pricing Plans API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return { plans, loading, error, refetch: fetchPlans };
}