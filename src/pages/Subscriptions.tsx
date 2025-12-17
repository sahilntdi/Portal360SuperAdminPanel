"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MetricsGrid } from "@/components/MetricsGrid";
import { PageHeader } from "@/components/PageHeader";
import { CreditCard, TrendingUp, AlertCircle, Users, RefreshCw, Search, Filter, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOrganizations, Organization } from "@/ApiService/apiOrganizations";
import { format } from "date-fns";

const Subscriptions = () => {
  const { organizations, loading, error, refetch } = useOrganizations();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  // Filter organizations with subscriptions
  const organizationsWithSubscriptions = organizations.filter(org => 
    org.subscription && org.subscription.status
  );

  // Calculate metrics CORRECTLY
  const activeSubscriptions = organizationsWithSubscriptions.filter(
    org => org.status === 'active'  // ✅ Use organization.status instead of subscription.status
  ).length;

  const monthlyRevenue = organizationsWithSubscriptions.reduce((total, org) => {
    // ✅ Only count active organizations with subscription price
    if (org.status === 'active' && org.subscription?.planSubs?.price) {
      return total + org.subscription.planSubs.price;
    }
    return total;
  }, 0);

  const failedPayments = organizationsWithSubscriptions.filter(
    org => org.status === 'past_due' || org.status === 'suspended'
  ).length;

  const cancelledSubscriptions = organizationsWithSubscriptions.filter(
    org => org.status === 'cancelled'
  ).length;

  // Filter data based on search and filters
  const filteredSubscriptions = organizationsWithSubscriptions.filter((org) => {
    const matchesSearch =
      org.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${org.firstName} ${org.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || org.status === statusFilter;
    const matchesPlan = planFilter === "all" || org.planName?.toLowerCase().includes(planFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const metrics = [
    {
      title: "Active Subscriptions",
      value: activeSubscriptions.toString(),
      icon: CreditCard,
      trend: { value: "+3", isPositive: true },
      description: `${activeSubscriptions} active subscriptions`,
    },
    {
      title: "Monthly Recurring Revenue",
      value: `$${monthlyRevenue.toLocaleString()}`,
      icon: TrendingUp,
      trend: { value: "+15%", isPositive: true },
      description: `From ${activeSubscriptions} subscriptions`,
    },
    {
      title: "Payment Issues",
      value: failedPayments.toString(),
      icon: AlertCircle,
      description: failedPayments > 0 ? "Requires attention" : "All good",
    },
    {
      title: "Total Organizations",
      value: organizations.length.toString(),
      icon: Users,
      description: `${organizationsWithSubscriptions.length} with subscriptions`,
    },
  ];

  const getPaymentStatusBadge = (org: Organization) => {
    // Use organization.status for payment status
    if (org.status === "active") {
      return (
        <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50">
          Success
        </Badge>
      );
    } else if (org.status === "pending") {
      return (
        <Badge variant="outline" className="border-amber-500 text-amber-700 bg-amber-50">
          Pending
        </Badge>
      );
    } else if (org.status === "suspended" || org.status === "cancelled") {
      return (
        <Badge variant="destructive">
          Failed
        </Badge>
      );
    } else if (org.status === "past_due") {
      return (
        <Badge variant="destructive">
          Past Due
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline">
          {org.status}
        </Badge>
      );
    }
  };

  const getSubscriptionStatusBadge = (org: Organization) => {
    // Use organization.status for subscription status
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      trial: "secondary",
      pending: "outline",
      past_due: "destructive",
      cancelled: "destructive",
      suspended: "destructive",
      expired: "destructive"
    };

    return (
      <Badge variant={variants[org.status] || "outline"} className="capitalize">
        {org.status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  // Calculate trial days remaining
  const getTrialDaysRemaining = (org: Organization) => {
    if (!org.subscription?.trialEndsAt) return null;
    
    const trialEnd = new Date(org.subscription.trialEndsAt);
    const today = new Date();
    const diffTime = trialEnd.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  const SkeletonTable = () => {
    const rows = 5;
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Trial</TableHead>
            <TableHead>Next Billing</TableHead>
            <TableHead>Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-36" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  if (loading && organizations.length === 0) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <SkeletonTable />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={refetch} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader 
        title="Subscriptions" 
        description={`Manage billing and subscriptions (${activeSubscriptions} active, ${organizationsWithSubscriptions.length} total)`}
      />

      <MetricsGrid metrics={metrics} columns={4} />

      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle>All Subscriptions</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {activeSubscriptions} Active • ${monthlyRevenue.toLocaleString()} MRR
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={refetch}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by organization, admin, or email..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="trial">Trial</SelectItem>
                    <SelectItem value="past_due">Past Due</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                    <SelectItem value="abc">ABC</SelectItem>
                    <SelectItem value="starter">Starter</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setPlanFilter("all");
                  }}
                  title="Clear filters"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredSubscriptions.length} of {organizationsWithSubscriptions.length} subscriptions
            </p>
            <div className="text-sm text-muted-foreground">
              Total MRR: ${monthlyRevenue.toLocaleString()}/month
            </div>
          </div>

          {loading ? (
            <SkeletonTable />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Trial Days</TableHead>
                  <TableHead>Next Billing</TableHead>
                  <TableHead>Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                      <div className="flex flex-col items-center justify-center">
                        <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium">No subscriptions found</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {organizationsWithSubscriptions.length === 0 
                            ? "No organizations have active subscriptions" 
                            : "Try adjusting your search or filters"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubscriptions.map((org) => {
                    const trialDays = getTrialDaysRemaining(org);
                    
                    return (
                      <TableRow key={org._id} className="hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <p className="font-medium">{org.businessName}</p>
                            {org.practiceName && (
                              <p className="text-sm text-muted-foreground">{org.practiceName}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">
                              {org.firstName} {org.lastName}
                            </p>
                            <p className="text-xs text-muted-foreground">{org.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{org.planName || "No Plan"}</span>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold">
                            ${org.subscription?.planSubs?.price || 0}
                            <span className="text-sm text-muted-foreground font-normal ml-1">
                              /{org.subscription?.planSubs?.period || 'month'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getSubscriptionStatusBadge(org)}
                        </TableCell>
                        <TableCell>
                          {trialDays !== null ? (
                            <div className="flex items-center">
                              <Badge 
                                variant={trialDays > 7 ? "secondary" : "destructive"}
                                className="text-xs"
                              >
                                {trialDays} days
                              </Badge>
                              {trialDays <= 3 && (
                                <span className="ml-2 text-xs text-amber-600">
                                  Ending soon
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">N/A</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {org.subscription?.nextBillingDate 
                            ? formatDate(org.subscription.nextBillingDate)
                            : "N/A"
                          }
                        </TableCell>
                        <TableCell>
                          {getPaymentStatusBadge(org)}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Additional Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['active', 'pending', 'trial', 'cancelled', 'suspended', 'past_due'].map((status) => {
                const count = organizationsWithSubscriptions.filter(
                  org => org.status === status
                ).length;
                
                if (count === 0) return null;
                
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        status === 'active' ? 'bg-green-500' :
                        status === 'trial' ? 'bg-blue-500' :
                        status === 'pending' ? 'bg-amber-500' :
                        status === 'cancelled' ? 'bg-gray-400' :
                        status === 'suspended' ? 'bg-red-500' :
                        'bg-red-400'
                      }`} />
                      <span className="text-sm capitalize">{status.replace('_', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{count}</span>
                      <span className="text-xs text-muted-foreground">
                        ({Math.round((count / organizationsWithSubscriptions.length) * 100)}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Revenue by Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from(new Set(organizationsWithSubscriptions.map(org => org.planName)))
                .filter(planName => planName)
                .map((planName) => {
                  const planOrgs = organizationsWithSubscriptions.filter(org => 
                    org.planName === planName && org.status === 'active'
                  );
                  const revenue = planOrgs.reduce((total, org) => {
                    if (org.subscription?.planSubs?.price) {
                      return total + org.subscription.planSubs.price;
                    }
                    return total;
                  }, 0);
                  
                  if (revenue === 0) return null;
                  
                  const orgCount = planOrgs.length;
                  
                  return (
                    <div key={planName} className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{planName}</span>
                        <span className="text-xs text-muted-foreground">{orgCount} orgs</span>
                      </div>
                      <span className="font-medium">${revenue.toLocaleString()}</span>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Renewals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Upcoming Billing</CardTitle>
            <CardDescription className="text-xs">Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {organizationsWithSubscriptions
                .filter(org => {
                  if (!org.subscription?.nextBillingDate) return false;
                  const billingDate = new Date(org.subscription.nextBillingDate);
                  const today = new Date();
                  const nextWeek = new Date(today);
                  nextWeek.setDate(today.getDate() + 7);
                  return billingDate >= today && billingDate <= nextWeek;
                })
                .sort((a, b) => 
                  new Date(a.subscription!.nextBillingDate!).getTime() - 
                  new Date(b.subscription!.nextBillingDate!).getTime()
                )
                .slice(0, 3)
                .map((org) => {
                  const billingDate = org.subscription?.nextBillingDate 
                    ? format(new Date(org.subscription.nextBillingDate), "MMM dd")
                    : "N/A";
                  
                  return (
                    <div key={org._id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium truncate max-w-[120px]">{org.businessName}</p>
                        <p className="text-xs text-muted-foreground">{billingDate}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge variant="outline" className="text-xs">
                          ${org.subscription?.planSubs?.price || 0}
                        </Badge>
                        <span className={`text-xs mt-1 ${
                          org.status === 'active' ? 'text-green-600' : 
                          org.status === 'pending' ? 'text-amber-600' : 
                          'text-red-600'
                        }`}>
                          {org.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              }
              
              {organizationsWithSubscriptions.filter(org => {
                if (!org.subscription?.nextBillingDate) return false;
                const billingDate = new Date(org.subscription.nextBillingDate);
                const today = new Date();
                const nextWeek = new Date(today);
                nextWeek.setDate(today.getDate() + 7);
                return billingDate >= today && billingDate <= nextWeek;
              }).length === 0 && (
                <div className="text-center py-2">
                  <p className="text-sm text-muted-foreground">No upcoming billing</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscriptions;