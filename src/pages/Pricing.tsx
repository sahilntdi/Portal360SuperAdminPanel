import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricsGrid } from "@/components/MetricsGrid";
import { PageHeader } from "@/components/PageHeader";
import { DollarSign, Percent, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pricingPlans, coupons } from "@/data/data";

const Pricing = () => {
  const metrics = [
    {
      title: "Active Plans",
      value: "3",
      icon: DollarSign,
      description: "Subscription tiers",
    },
    {
      title: "Total Subscribers",
      value: "85",
      icon: DollarSign,
      trend: { value: "12", isPositive: true },
      description: "+12 this month",
    },
    {
      title: "Active Coupons",
      value: "2",
      icon: Percent,
      description: "Out of 3 total",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Pricing & Coupons" description="Manage subscription plans and discount codes" />

      <MetricsGrid metrics={metrics} columns={3} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pricing Plans</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Plan
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Subscribers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{plan.price}</span>
                      <span className="text-xs text-muted-foreground">/{plan.interval}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {plan.features.slice(0, 2).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {plan.features.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{plan.features.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{plan.subscribers}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{plan.status}</Badge>
                  </TableCell>
                  <TableCell>
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Discount Coupons</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Coupon
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coupon Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>
                    <code className="font-mono font-semibold bg-muted px-2 py-1 rounded">
                      {coupon.code}
                    </code>
                  </TableCell>
                  <TableCell className="font-semibold">{coupon.discount}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{coupon.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">
                      {coupon.uses} / {coupon.maxUses}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{coupon.expiresAt}</TableCell>
                  <TableCell>
                    <Badge variant={coupon.status === "active" ? "default" : "destructive"}>
                      {coupon.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
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
    </div>
  );
};

export default Pricing;
