import { useState, useEffect } from "react";

export interface PricingPlan {
  _id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  isActive: boolean;
  order: number;
  recommendedFor?: string | number;
  planId?: string;
  stripePriceId?: string;
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

      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("token") || import.meta.env.VITE_BEARER_TOKEN;

      if (!baseUrl) {
        throw new Error("API base URL not found in .env");
      }

      if (!token) {
        throw new Error("token not found");
      }

      const res = await fetch(`${baseUrl}/pricing`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to fetch pricing plans");
      }

      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        const activePlans = json.data
          .filter((p: PricingPlan) => p.isActive)
          .sort((a: PricingPlan, b: PricingPlan) => (a.order || 0) - (b.order || 0));

        setPlans(activePlans);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Pricing API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return { plans, loading, error, refetch: fetchPlans };
}