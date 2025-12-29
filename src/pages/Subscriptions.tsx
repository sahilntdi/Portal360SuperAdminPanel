"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MetricsGrid } from "@/components/MetricsGrid";
import { PageHeader } from "@/components/PageHeader";
import { CreditCard, TrendingUp, AlertCircle, Users, RefreshCw, Search, Filter, Loader2, CalendarDays } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrganizations, Organization } from "@/ApiService/apiOrganizations";
import { format, differenceInDays, isAfter, isBefore, addDays } from "date-fns";

const Subscriptions = () => {
  const { organizations, loading, error, refetch } = useOrganizations();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [trialFilter, setTrialFilter] = useState("all");
  const [subscriptionStatusFilter, setSubscriptionStatusFilter] = useState("all"); // नया filter

  // Filter organizations with subscriptions
  const organizationsWithSubscriptions = organizations.filter(org =>
    org.subscription && org.subscription.status
  );

  // Calculate trial status
  const getTrialStatus = (org: Organization): string => {
    if (!org.subscription?.trialEndsAt || org.subscription.status !== "trial") {
      return "no_trial";
    }

    const trialEnd = new Date(org.subscription.trialEndsAt);
    const today = new Date();
    const diffDays = differenceInDays(trialEnd, today);

    if (diffDays > 7) return "active_trial";
    if (diffDays > 0 && diffDays <= 7) return "ending_soon_trial";
    if (diffDays <= 0) return "ended_trial";

    return "no_trial";
  };

  // नया: subscription status के आधार पर फिल्टर करने के लिए function
  const getSubscriptionStatus = (org: Organization): string => {
    if (org.subscription?.status === "trial") {
      return "trial";
    } else if (org.subscription?.status === "active" && org.status === "active") {
      return "paid";
    } else {
      return "unpaid";
    }
  };

  // Calculate metrics
  const activeSubscriptions = organizationsWithSubscriptions.filter(
    org => org.status === 'active'
  ).length;

  const monthlyRevenue = organizationsWithSubscriptions.reduce((total, org) => {
    if (org.status === 'active' && org.subscription?.planSubs?.price) {
      return total + org.subscription.planSubs.price;
    }
    return total;
  }, 0);



  // Calculate trial metrics
  const activeTrials = organizationsWithSubscriptions.filter(
    org => getTrialStatus(org) === "active_trial"
  ).length;

  const endingSoonTrials = organizationsWithSubscriptions.filter(
    org => getTrialStatus(org) === "ending_soon_trial"
  ).length;

  const endedTrials = organizationsWithSubscriptions.filter(
    org => getTrialStatus(org) === "ended_trial"
  ).length;

  // Filter data based on search and filters
  const filteredSubscriptions = organizationsWithSubscriptions.filter((org) => {
    const matchesSearch =
      org.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${org.firstName} ${org.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || org.status === statusFilter;
    const matchesPlan = planFilter === "all" || org.planName?.toLowerCase().includes(planFilter.toLowerCase());

    // Trial filter logic
    let matchesTrial = true;
    if (trialFilter !== "all") {
      const trialStatus = getTrialStatus(org);
      matchesTrial = trialStatus === trialFilter;
    }

    // नया: Subscription status filter logic
    let matchesSubscriptionStatus = true;
    if (subscriptionStatusFilter !== "all") {
      const subscriptionStatus = getSubscriptionStatus(org);
      matchesSubscriptionStatus = subscriptionStatus === subscriptionStatusFilter;
    }

    return matchesSearch && matchesStatus && matchesPlan && matchesTrial && matchesSubscriptionStatus;
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
      title: "Active Trials",
      value: activeTrials.toString(),
      icon: Users,
      description: `${endingSoonTrials} ending soon, ${endedTrials} ended`,
    },
    {
      title: "Total Organizations",
      value: organizations.length.toString(),
      icon: Users,
      description: `${organizationsWithSubscriptions.length} with subscriptions`,
    },
  ];

  const getPaymentStatusBadge = (org: Organization) => {
    // नया logic: subscription status के आधार पर बैज
    const subscriptionStatus = getSubscriptionStatus(org);
    
    if (subscriptionStatus === "trial") {
      const trialInfo = getTrialInfo(org);
      if (trialInfo.status === "ending_soon_trial") {
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-700 bg-amber-50">
            Trial (Ending Soon)
          </Badge>
        );
      } else if (trialInfo.status === "ended_trial") {
        return (
          <Badge variant="outline" className="border-red-500 text-red-700 bg-red-50">
            Trial Ended
          </Badge>
        );
      }
      return (
        <Badge variant="outline" className="border-blue-500 text-blue-700 bg-blue-50">
          Trial
        </Badge>
      );
    } else if (subscriptionStatus === "paid") {
      return (
        <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50">
          Success
        </Badge>
      );
    } else if (subscriptionStatus === "unpaid") {
      if (org.status === "past_due") {
        return (
          <Badge variant="destructive">
            Past Due
          </Badge>
        );
      } else if (org.status === "pending") {
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-700 bg-amber-50">
            Pending
          </Badge>
        );
      } else {
        return (
          <Badge variant="destructive">
            Unpaid
          </Badge>
        );
      }
    }
    
    // Default fallback
    return (
      <Badge variant="outline">
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

  // Calculate trial days remaining and get trial status badge
  const getTrialInfo = (org: Organization) => {
    if (!org.subscription?.trialEndsAt || org.subscription.status !== "trial") {
      return { days: null, status: "no_trial", badge: null };
    }

    const trialEnd = new Date(org.subscription.trialEndsAt);
    const today = new Date();
    const diffTime = trialEnd.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let status = "no_trial";
    let badge = null;

    if (diffDays > 7) {
      status = "active_trial";
      badge = (
        <Badge variant="secondary" className="text-xs">
          {diffDays} days
        </Badge>
      );
    } else if (diffDays > 0 && diffDays <= 7) {
      status = "ending_soon_trial";
      badge = (
        <Badge variant="destructive" className="text-xs">
          {diffDays} days
        </Badge>
      );
    } else if (diffDays <= 0) {
      status = "ended_trial";
      badge = (
        <Badge variant="outline" className="text-xs border-red-300 text-red-600">
          Ended
        </Badge>
      );
    }

    return { days: diffDays, status, badge };
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
            <TableHead>Trial Days</TableHead>
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
                  {activeSubscriptions} Active • ${monthlyRevenue.toLocaleString()} MRR • {activeTrials} Trials
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
               

                {/* Subscription Status Filter */}
                <div className="flex border rounded-md overflow-hidden">
                  <Button
                    variant={subscriptionStatusFilter === "all" ? "default" : "outline"}
                    size="sm"
                    className="rounded-none border-0"
                    onClick={() => setSubscriptionStatusFilter("all")}
                  >
                    All Subs
                  </Button>
                  <Button
                    variant={subscriptionStatusFilter === "trial" ? "default" : "outline"}
                    size="sm"
                    className="rounded-none border-0 border-l"
                    onClick={() => setSubscriptionStatusFilter("trial")}
                  >
                    Trial
                  </Button>
                  <Button
                    variant={subscriptionStatusFilter === "paid" ? "default" : "outline"}
                    size="sm"
                    className="rounded-none border-0 border-l"
                    onClick={() => setSubscriptionStatusFilter("paid")}
                  >
                    Paid
                  </Button>
                  <Button
                    variant={subscriptionStatusFilter === "unpaid" ? "default" : "outline"}
                    size="sm"
                    className="rounded-none border-0 border-l"
                    onClick={() => setSubscriptionStatusFilter("unpaid")}
                  >
                    Unpaid
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setPlanFilter("all");
                    setTrialFilter("all");
                    setSubscriptionStatusFilter("all");
                  }}
                  title="Clear all filters"
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
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Active: {activeSubscriptions}</span>
              <span>Trials: {activeTrials}</span>
              <span>MRR: ${monthlyRevenue.toLocaleString()}/month</span>
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
                  <TableHead>
                    <div className="flex flex-col">
                      <span>Trial</span>
                      <span className="text-xs font-normal text-muted-foreground">Days Remaining</span>
                    </div>
                  </TableHead>
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
                    const trialInfo = getTrialInfo(org);

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
                          {trialInfo.badge ? (
                            <div className="flex flex-col space-y-1">
                              {trialInfo.badge}
                              {trialInfo.status === "ending_soon_trial" && (
                                <span className="text-xs text-amber-600">
                                  ⚠️ Ends soon
                                </span>
                              )}
                              {trialInfo.status === "ended_trial" && (
                                <span className="text-xs text-red-600">
                                  Trial expired
                                </span>
                              )}
                              {org.subscription?.trialEndsAt && (
                                <span className="text-xs text-muted-foreground">
                                  until {formatDate(org.subscription.trialEndsAt)}
                                </span>
                              )}
                            </div>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              No trial
                            </Badge>
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
              {['trial', 'paid', 'unpaid'].map((status) => {
                const count = organizationsWithSubscriptions.filter(
                  org => getSubscriptionStatus(org) === status
                ).length;

                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${status === 'trial' ? 'bg-blue-500' :
                          status === 'paid' ? 'bg-green-500' :
                            'bg-red-500'
                        }`} />
                      <span className="text-sm capitalize">{status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{count}</span>
                      <span className="text-xs text-muted-foreground">
                        ({organizationsWithSubscriptions.length > 0
                          ? Math.round((count / organizationsWithSubscriptions.length) * 100)
                          : 0
                        }%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Trial Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Trial Status</CardTitle>
            <CardDescription className="text-xs">Trial period analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Active Trials", value: activeTrials, color: "bg-green-500" },
                { label: "Ending Soon (≤7 days)", value: endingSoonTrials, color: "bg-amber-500" },
                { label: "Trial Ended", value: endedTrials, color: "bg-red-500" },
                { label: "No Trial", value: organizationsWithSubscriptions.length - (activeTrials + endingSoonTrials + endedTrials), color: "bg-gray-400" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${item.color}`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.value}</span>
                    <span className="text-xs text-muted-foreground">
                      ({organizationsWithSubscriptions.length > 0
                        ? Math.round((item.value / organizationsWithSubscriptions.length) * 100)
                        : 0
                      }%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Trial Endings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Upcoming Trial Endings</CardTitle>
            <CardDescription className="text-xs">Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {organizationsWithSubscriptions
                .filter(org => {
                  const trialStatus = getTrialStatus(org);
                  return trialStatus === "ending_soon_trial" || trialStatus === "active_trial";
                })
                .sort((a, b) => {
                  const daysA = getTrialInfo(a).days || 999;
                  const daysB = getTrialInfo(b).days || 999;
                  return daysA - daysB;
                })
                .slice(0, 3)
                .map((org) => {
                  const trialInfo = getTrialInfo(org);
                  const trialEndDate = org.subscription?.trialEndsAt
                    ? format(new Date(org.subscription.trialEndsAt), "MMM dd")
                    : "N/A";

                  return (
                    <div key={org._id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium truncate max-w-[120px]">{org.businessName}</p>
                        <p className="text-xs text-muted-foreground">{trialEndDate}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge
                          variant={trialInfo.status === "ending_soon_trial" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {trialInfo.days} days
                        </Badge>
                        <span className="text-xs text-muted-foreground mt-1">
                          {org.planName}
                        </span>
                      </div>
                    </div>
                  );
                })
              }

              {organizationsWithSubscriptions.filter(org => {
                const trialStatus = getTrialStatus(org);
                return trialStatus === "ending_soon_trial" || trialStatus === "active_trial";
              }).length === 0 && (
                  <div className="text-center py-2">
                    <p className="text-sm text-muted-foreground">No active trials</p>
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