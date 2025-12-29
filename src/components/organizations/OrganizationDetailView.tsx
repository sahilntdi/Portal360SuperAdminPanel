"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Mail,
  User,
  Building2,
  CreditCard,
  Calendar,
  Users,
  Database,
  Activity,
  Settings,
  Globe,
  Phone,
  MapPin,
  FileText,
  DollarSign,
  Shield,
  Bell,
  Loader2,
  Edit,
  Trash2,
  RefreshCw,
  MoreVertical,
  Download,
  Copy,
  ExternalLink
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import instance from "@/utils/axios";
import { Organization } from "../../ApiService/apiOrganizations";

const OrganizationDetailView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchOrganizationDetail();
  }, [params.id]);

  const fetchOrganizationDetail = async () => {
    try {
      setLoading(true);
      const response = await instance.get(`/organizations/${params.id}`);

      if (response.data.success && response.data.data) {
        setOrganization(response.data.data);
      } else {
        throw new Error("Failed to fetch organization details");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to load organization";
      toast.error(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrganizationDetail();
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      pending: "secondary",
      suspended: "destructive",
      cancelled: "destructive"
    };

    return (
      <Badge variant={variants[status] || "outline"} className="capitalize">
        {status}
      </Badge>
    );
  };

  const getSubscriptionStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      trial: "secondary",
      past_due: "destructive",
      cancelled: "outline",
      expired: "destructive"
    };

    const labels: Record<string, string> = {
      trial: "Free Trial",
      past_due: "Past Due",
      active: "Active",
      cancelled: "Cancelled",
      expired: "Expired"
    };

    return (
      <Badge variant={variants[status] || "outline"}>
        {labels[status] || status}
      </Badge>
    );
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatStorage = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  if (loading && !organization) {
    return (
      <div className="p-6 space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-md" />
            <div>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Tabs Skeleton */}
        <Skeleton className="h-10 w-full" />

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Building2 className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Organization Not Found</h2>
        <p className="text-muted-foreground mb-6">The organization you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/organizations")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Organizations
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/organizations")}
            className="shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold truncate">
                {organization.businessName}
              </h1>
              <div className="flex gap-2">
                {getStatusBadge(organization.status)}
                {organization.subscription && getSubscriptionStatusBadge(organization.subscription.status)}
              </div>
            </div>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Mail className="h-3 w-3" />
              <span className="truncate">{organization.email}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4"
                      onClick={() => copyToClipboard(organization.email, "Email")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy email</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => window.open(`mailto:${organization.email}`)}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 lg:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Organization Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Business Name</label>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">{organization.businessName}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(organization.businessName, "Business name")}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Practice Name</label>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">{organization.practiceName || "Not set"}</span>
                        {organization.practiceName && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(organization.practiceName!, "Practice name")}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Database</label>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          <span className="font-mono text-sm">{organization.dbName || "Default"}</span>
                        </div>
                        <Badge variant="outline">Active</Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Current Plan</label>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium capitalize">{organization.planName || "Starter"}</span>
                          </div>
                          <Badge variant="default" className="capitalize">
                            {organization.planName || "Starter"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Admin Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Admin Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {organization.firstName} {organization.lastName}
                      </h3>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {organization.email}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(organization.email, "Email")}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Metrics Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Usage Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Users</span>
                        <span className="text-muted-foreground">
                          {organization.metrics?.totalUsers || 0} active
                        </span>
                      </div>
                      <Progress value={Math.min((organization.metrics?.totalUsers || 0) * 10, 100)} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Clients</span>
                        <span className="text-muted-foreground">
                          {organization.metrics?.totalClients || 0} total
                        </span>
                      </div>
                      <Progress value={Math.min((organization.metrics?.totalClients || 0) * 2, 100)} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Storage</span>
                        <span className="text-muted-foreground">
                          {formatStorage(organization.metrics?.storageUsed || 0)}
                        </span>
                      </div>
                      <Progress value={Math.min((organization.metrics?.storageUsed || 0) / 100, 100)} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">API Calls (This Month)</span>
                        <span className="text-muted-foreground">
                          {organization.metrics?.apiCallsThisMonth || 0}
                        </span>
                      </div>
                      <Progress value={Math.min((organization.metrics?.apiCallsThisMonth || 0) / 1000 * 100, 100)} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Dates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Registered</label>
                    <div className="text-sm font-medium">{formatDate(organization.registeredAt)}</div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Last Active</label>
                    <div className="text-sm font-medium">{formatDate(organization.lastActive)}</div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Created</label>
                    <div className="text-sm font-medium">{formatDate(organization.createdAt)}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Subscription Details
              </CardTitle>
              <CardDescription>
                Manage subscription, billing, and plan details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {organization.subscription ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        {getSubscriptionStatusBadge(organization.subscription.status)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Billing Cycle</label>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium capitalize">
                            {organization.subscription.billingCycle || "Monthly"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {organization.subscription.nextBillingDate && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Next Billing</label>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="font-medium">
                            {formatDate(organization.subscription.nextBillingDate)}
                          </div>
                        </div>
                      </div>
                    )}

                    {organization.subscription.trialEndsAt && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Trial Ends</label>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="font-medium">
                            {formatDate(organization.subscription.trialEndsAt)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {organization.subscription.planSubs && (
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-semibold">{organization.subscription.planSubs.name}</h3>
                          <p className="text-muted-foreground">{organization.subscription.planSubs.period}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">
                            ${organization.subscription.planSubs.price}
                            <span className="text-sm text-muted-foreground font-normal">
                              /{organization.subscription.billingCycle === 'yearly' ? 'year' : 'month'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {organization.subscription.planSubs.features && (
                        <div className="space-y-3">
                          <h4 className="font-medium">Features included:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {organization.subscription.planSubs.features.map((feature: any, idx: number) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span>{feature.name}: {JSON.stringify(feature.value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Subscription</h3>
                  <p className="text-muted-foreground mb-4">
                    This organization doesn't have an active subscription plan.
                  </p>
                  <Button>Assign a Plan</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onboarding Tab */}
        <TabsContent value="onboarding" className="space-y-6">
          {organization.onboardingData ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Onboarding Information
                </CardTitle>
                <CardDescription>
                  Setup and configuration details provided during onboarding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Clients Range
                      </label>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">
                          {organization.onboardingData.clientsRange || "Not specified"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Connected Email
                      </label>
                      <div className="p-3 bg-muted/50 rounded-lg flex items-center justify-between">
                        <span className="font-medium">
                          {organization.onboardingData.connectedEmail || "Not connected"}
                        </span>
                        {organization.onboardingData.connectedEmail && (
                          <Badge variant="outline">Connected</Badge>
                        )}
                      </div>
                    </div>

                    {organization.onboardingData.completedAt && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Onboarding Completed
                        </label>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium">
                            {formatDate(organization.onboardingData.completedAt)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {organization.onboardingData.nature && organization.onboardingData.nature.length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Nature of Business
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {organization.onboardingData.nature.map((nat, idx) => (
                            <Badge key={idx} variant="secondary">
                              {nat}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {organization.onboardingData.structure && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Team Structure
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(organization.onboardingData.structure).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                              <label className="text-xs text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </label>
                              <div className="p-2 bg-muted/50 rounded text-sm font-medium">
                                {String(value)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12">
              <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Onboarding Data</h3>
              <p className="text-muted-foreground">
                This organization hasn't completed the onboarding process yet.
              </p>
            </div>
          )}
        </TabsContent>

        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Users className="h-5 w-5 text-blue-500" />
                    <Badge variant="outline" className="text-xs">+12%</Badge>
                  </div>
                  <div className="text-2xl font-bold">
                    {organization.metrics?.totalUsers || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Users className="h-5 w-5 text-green-500" />
                    <Badge variant="outline" className="text-xs">+8%</Badge>
                  </div>
                  <div className="text-2xl font-bold">
                    {organization.metrics?.totalClients || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Clients</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Database className="h-5 w-5 text-amber-500" />
                    <Badge variant="outline" className="text-xs">64%</Badge>
                  </div>
                  <div className="text-2xl font-bold">
                    {formatStorage(organization.metrics?.storageUsed || 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Storage Used</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Activity className="h-5 w-5 text-purple-500" />
                    <Badge variant="outline" className="text-xs">+23%</Badge>
                  </div>
                  <div className="text-2xl font-bold">
                    {(organization.metrics?.apiCallsThisMonth || 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">API Calls This Month</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
              <CardDescription>Monthly usage patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-lg">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Usage Analytics Coming Soon</h4>
                  <p className="text-sm text-muted-foreground">
                    Detailed analytics and charts will be available soon.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Organization events and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Organization created', date: organization.createdAt, icon: Building2 },
                  { action: 'Last active', date: organization.lastActive, icon: Activity },
                  { action: 'Profile updated', date: organization.updatedAt, icon: Edit },
                  ...(organization.onboardingData?.completedAt ? [
                    { action: 'Onboarding completed', date: organization.onboardingData.completedAt, icon: Settings }
                  ] : [])
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.action}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(item.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizationDetailView;