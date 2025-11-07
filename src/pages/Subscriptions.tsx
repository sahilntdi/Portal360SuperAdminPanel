import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricsGrid } from "@/components/MetricsGrid";
import { PageHeader } from "@/components/PageHeader";
import { CreditCard, TrendingUp, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { subscriptions } from "@/data/data";

const Subscriptions = () => {
  const metrics = [
    {
      title: "Active Subscriptions",
      value: "38",
      icon: CreditCard,
      trend: { value: "3", isPositive: true },
      description: "3 new this month",
    },
    {
      title: "Monthly Recurring Revenue",
      value: "$12,450",
      icon: TrendingUp,
      trend: { value: "15%", isPositive: true },
      description: "+$1,950 from last month",
    },
    {
      title: "Failed Payments",
      value: "3",
      icon: AlertCircle,
      description: "Requires attention",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Subscriptions" description="Manage billing and subscriptions" />

      <MetricsGrid metrics={metrics} columns={3} />

      <Card>
        <CardHeader>
          <CardTitle>All Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead>Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{sub.organization}</TableCell>
                  <TableCell>{sub.plan}</TableCell>
                  <TableCell>{sub.price}</TableCell>
                  <TableCell>
                    <Badge variant={sub.status === "active" ? "default" : "destructive"}>
                      {sub.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{sub.nextBilling}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={sub.paymentStatus === "success" ? "outline" : "destructive"}
                      className={sub.paymentStatus === "success" ? "border-success text-success" : ""}
                    >
                      {sub.paymentStatus}
                    </Badge>
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

export default Subscriptions;
