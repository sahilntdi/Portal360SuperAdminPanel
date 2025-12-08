"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    Loader2,
    Edit,
    Trash2
} from "lucide-react";
import instance from "@/utils/axios";
import { toast } from "sonner";
import { Organization } from "../ApiService/apiOrganizations";

const OrganizationDetailView = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOrganizationDetail();
    }, [params.id]);

    const fetchOrganizationDetail = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await instance.get(`/organizations/${params.id}`);

            if (response.data.success && response.data.data) {
                setOrganization(response.data.data);
            } else {
                throw new Error("Failed to fetch organization details");
            }
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to load organization";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-10 w-10 animate-spin text-primary mr-3" />
                <span className="text-lg">Loading organization details...</span>
            </div>
        );
    }

    if (error || !organization) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 mb-4">{error || "Organization not found"}</p>
                <Button onClick={() => navigate("/organizations")}
                    variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Organizations
                </Button>
            </div>
        );
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate("/organizations")}

                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">{organization.businessName}</h1>
                        <p className="text-muted-foreground mt-1">
                            Organization Details
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                    <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-3">
                <Badge
                    variant={
                        organization.status === "active" ? "default" :
                            organization.status === "pending" ? "secondary" :
                                "destructive"
                    }
                    className="text-sm px-4 py-1"
                >
                    {organization.status.toUpperCase()}
                </Badge>
                {organization.subscription && (
                    <Badge variant="outline" className="text-sm px-4 py-1">
                        {organization.subscription.status.toUpperCase()}
                    </Badge>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5" />
                                Basic Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Business Name</p>
                                    <p className="font-medium">{organization.businessName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Practice Name</p>
                                    <p className="font-medium">{organization.practiceName || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        {organization.email}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Admin Name</p>
                                    <p className="font-medium flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        {organization.firstName} {organization.lastName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Database Name</p>
                                    <p className="font-medium flex items-center gap-2">
                                        <Database className="h-4 w-4 text-muted-foreground" />
                                        {organization.dbName || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Provider</p>
                                    {/* <p className="font-medium capitalize">{organization.provider || "local"}</p> */}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Onboarding Data */}
                    {organization.onboardingData && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    Onboarding Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Clients Range</p>
                                        <p className="font-medium">{organization.onboardingData.clientsRange || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Connected Email</p>
                                        <p className="font-medium">{organization.onboardingData.connectedEmail || "N/A"}</p>
                                    </div>
                                    {organization.onboardingData.nature && organization.onboardingData.nature.length > 0 && (
                                        <div className="col-span-2">
                                            <p className="text-sm text-muted-foreground mb-2">Nature of Business</p>
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
                                        <div className="col-span-2">
                                            <p className="text-sm text-muted-foreground mb-2">Structure</p>
                                            <div className="grid grid-cols-2 gap-3 bg-muted/50 p-4 rounded-lg">
                                                {organization.onboardingData.structure.type && (
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Type</p>
                                                        <p className="font-medium text-sm">{organization.onboardingData.structure.type}</p>
                                                    </div>
                                                )}
                                                {organization.onboardingData.structure.country && (
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Country</p>
                                                        <p className="font-medium text-sm">{organization.onboardingData.structure.country}</p>
                                                    </div>
                                                )}
                                                {organization.onboardingData.structure.partners && (
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Partners</p>
                                                        <p className="font-medium text-sm">{organization.onboardingData.structure.partners}</p>
                                                    </div>
                                                )}
                                                {organization.onboardingData.structure.admin && (
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Admin Staff</p>
                                                        <p className="font-medium text-sm">{organization.onboardingData.structure.admin}</p>
                                                    </div>
                                                )}
                                                {organization.onboardingData.structure.accountants && (
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Accountants</p>
                                                        <p className="font-medium text-sm">{organization.onboardingData.structure.accountants}</p>
                                                    </div>
                                                )}
                                                {organization.onboardingData.structure.clients && (
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Clients</p>
                                                        <p className="font-medium text-sm">{organization.onboardingData.structure.clients}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {organization.onboardingData.completedAt && (
                                        <div className="col-span-2">
                                            <p className="text-sm text-muted-foreground">Onboarding Completed</p>
                                            <p className="font-medium">{formatDate(organization.onboardingData.completedAt.toString())}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Subscription Details */}
                    {organization.subscription && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Subscription Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Status</p>
                                        <Badge variant="outline" className="mt-1">
                                            {organization.subscription.status}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Billing Cycle</p>
                                        <p className="font-medium capitalize">{organization.subscription.billingCycle || "N/A"}</p>
                                    </div>
                                    {organization.subscription.trialStartDate && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Trial Started</p>
                                            <p className="font-medium">{formatDate(organization.subscription.trialStartDate.toString())}</p>
                                        </div>
                                    )}
                                    {organization.subscription.trialEndsAt && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Trial Ends</p>
                                            <p className="font-medium">{formatDate(organization.subscription.trialEndsAt.toString())}</p>
                                        </div>
                                    )}
                                    {organization.subscription.nextBillingDate && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Next Billing</p>
                                            <p className="font-medium">{formatDate(organization.subscription.nextBillingDate.toString())}</p>
                                        </div>
                                    )}
                                    {/* {organization.subscription.paymentMethodId && (
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Method</p>
                      <p className="font-medium">{organization.subscription.paymentMethodId}</p>
                    </div>
                  )} */}
                                </div>

                                {organization.subscription.planSubs && (
                                    <>
                                        <Separator />
                                        <div>
                                            <p className="text-sm font-semibold mb-3">Plan Details</p>
                                            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium text-lg">{organization.subscription.planSubs.name}</p>
                                                        <p className="text-sm text-muted-foreground">{organization.subscription.planSubs.period}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-bold">${organization.subscription.planSubs.price}</p>
                                                    </div>
                                                </div>
                                                {organization.subscription.planSubs.features && organization.subscription.planSubs.features.length > 0 && (
                                                    <div>
                                                        <p className="text-xs text-muted-foreground mb-2">Features</p>
                                                        <ul className="space-y-1">
                                                            {organization.subscription.planSubs.features.map((feature: any, idx: number) => (
                                                                <li key={idx} className="text-sm flex items-center gap-2">
                                                                    <span className="text-green-600">✓</span>
                                                                    <span>{feature.name}: {JSON.stringify(feature.value)}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Right Column - Metrics & Dates */}
                <div className="space-y-6">
                    {/* Metrics */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5" />
                                Metrics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Total Users</span>
                                    </div>
                                    <span className="font-bold text-lg">{organization.metrics?.totalUsers || 0}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Total Clients</span>
                                    </div>
                                    <span className="font-bold text-lg">{organization.metrics?.totalClients || 0}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Database className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Storage Used</span>
                                    </div>
                                    <span className="font-bold text-lg">{organization.metrics?.storageUsed || 0} MB</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Activity className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">API Calls</span>
                                    </div>
                                    <span className="font-bold text-lg">{organization.metrics?.apiCallsThisMonth || 0}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Plan Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                Current Plan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <p className="text-2xl font-bold capitalize">{organization.planName || "Starter"}</p>
                                <p className="text-sm text-muted-foreground mt-1">Active Plan</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Important Dates */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Important Dates
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Registered At</p>
                                <p className="font-medium">{formatDate(organization.registeredAt)}</p>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm text-muted-foreground">Last Active</p>
                                <p className="font-medium">{formatDate(organization.lastActive)}</p>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm text-muted-foreground">Created At</p>
                                <p className="font-medium">{formatDate(organization.createdAt)}</p>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm text-muted-foreground">Updated At</p>
                                <p className="font-medium">{formatDate(organization.updatedAt)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default OrganizationDetailView;