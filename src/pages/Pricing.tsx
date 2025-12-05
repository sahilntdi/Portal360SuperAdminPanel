// app/admin/pricing/page.tsx  (ya components/PricingDashboard.tsx)

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricsGrid } from "@/components/MetricsGrid";
import { PageHeader } from "@/components/PageHeader";
import { DollarSign, Plus, Loader2, RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePricingPlans } from "../ApiService/PricingPlans";

export default function Pricing() {
  const { plans, loading, error, refetch } = usePricingPlans();

  const metrics = [
    {
      title: "Active Plans",
      value: plans.length.toString(),
      icon: DollarSign,
      description: "Live subscription tiers",
    },
    {
      title: "Most Popular",
      value: plans.find((p) => p.highlighted)?.name || "N/A",
      icon: DollarSign,
      description: "Recommended plan",
    },
    {
      title: "Total Plans",
      value: plans.length.toString(),
      icon: DollarSign,
      description: "In production",
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground">Loading pricing plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={refetch} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Pricing & Coupons"
        description="Manage subscription plans and discount codes"
      />

      <MetricsGrid metrics={metrics} columns={3} />

      {/* Pricing Plans Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pricing Plans ({plans.length})</CardTitle>
          <div className="flex gap-3">
            <Button size="sm" variant="outline" onClick={refetch}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Plan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Recommended For</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {plan.name}
                      {plan.highlighted && (
                        <Badge variant="default" className="text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="font-bold text-lg">${plan.price}</span>
                      <span className="text-muted-foreground text-sm">
                        {" "}/{plan.period}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {plan.recommendedFor ? (
                      <Badge variant="secondary">
                        {plan.recommendedFor} users
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  {/* Features column mein yeh daal do */}
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {plan.features.slice(0, 3).map((feature, i) => {
                        const text = typeof feature === "string"
                          ? feature
                          : feature?.name
                            ? `${feature.name}: ${feature.value}`
                            : "—";
                        return (
                          <Badge key={i} variant="outline" className="text-xs">
                            {text}
                          </Badge>
                        );
                      })}
                      {plan.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{plan.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={plan.isActive ? "default" : "secondary"}>
                      {plan.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Coupons Section (Abhi static hai – chahoge to uska bhi hook bana denge) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Discount Coupons</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Coupon
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Coupon management coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}