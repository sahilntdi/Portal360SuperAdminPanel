"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, CreditCard, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import instance from "@/utils/axios";
import { PricingPlan } from "@/ApiService/PricingPlans";

interface UpgradePlanDialogProps {
    isOpen: boolean;
    onClose: () => void;
    organizationId: string;
    currentPlanId?: string;
    onSuccess?: () => void;
}

const UpgradePlanDialog: React.FC<UpgradePlanDialogProps> = ({
    isOpen,
    onClose,
    organizationId,
    currentPlanId,
    onSuccess
}) => {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(false);
    const [upgrading, setUpgrading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            fetchPlans();
        }
    }, [isOpen]);

    const fetchPlans = async () => {
        try {
            setLoading(true);
            // Using the public pricing endpoint as requested by user
            const response = await instance.get("/pricing/public");
            if (response.data.success && Array.isArray(response.data.data)) {
                setPlans(response.data.data.filter((p: PricingPlan) => p.isActive));
            } else {
                throw new Error("Failed to fetch plans");
            }
        } catch (err: any) {
            console.error("Fetch plans error:", err);
            toast.error("Failed to load pricing plans");
        } finally {
            setLoading(false);
        }
    };

    const handleUpgrade = async () => {
        if (!selectedPlan) {
            toast.error("Please select a plan");
            return;
        }

        try {
            setUpgrading(true);
            const response = await instance.post("https://portal360v2-gpamdychg2hgbbf6.australiaeast-01.azurewebsites.net/api/V2/plan/upgrade-plan", {
                newPlanId: selectedPlan,
            });

            if (response.data.success) {
                toast.success("Subscription upgraded successfully");
                if (onSuccess) onSuccess();
                onClose();
            } else {
                throw new Error(response.data.message || "Upgrade failed");
            }
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to upgrade subscription";
            toast.error(message);
        } finally {
            setUpgrading(false);
        }
    };

    const renderPlans = () => {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Loading available plans...</p>
                </div>
            );
        }

        if (plans.length === 0) {
            return (
                <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No active plans found.</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 max-h-[60vh] overflow-y-auto p-1">
                {plans.map((plan) => (
                    <div
                        key={plan._id}
                        className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${selectedPlan === plan._id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                            } ${currentPlanId === plan._id ? "opacity-75 cursor-default" : ""}`}
                        onClick={() => currentPlanId !== plan._id && setSelectedPlan(plan._id)}
                    >
                        {selectedPlan === plan._id && (
                            <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                                <Check className="h-4 w-4 text-white" />
                            </div>
                        )}

                        <div className="mb-2">
                            <h4 className="font-bold text-lg">{plan.name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">{plan.description}</p>
                        </div>

                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-2xl font-bold">${plan.price}</span>
                            <span className="text-muted-foreground text-sm">/{plan.period}</span>
                        </div>

                        <ul className="space-y-2 mb-4">
                            {plan.features?.slice(0, 3).map((feature: any, idx: number) => (
                                <li key={idx} className="flex items-center gap-2 text-xs">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                                    <span className="truncate">
                                        {typeof feature === 'string'
                                            ? feature
                                            : `${feature.displayName || feature.name}: ${feature.value}`}
                                    </span>
                                </li>
                            ))}
                            {plan.features?.length > 3 && (
                                <li className="text-[10px] text-muted-foreground">
                                    +{plan.features.length - 3} more features
                                </li>
                            )}
                        </ul>

                        {currentPlanId === plan._id && (
                            <Badge variant="secondary" className="w-full justify-center py-1">
                                Current Plan
                            </Badge>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <CreditCard className="h-6 w-6 text-primary" />
                        Upgrade Subscription
                    </DialogTitle>
                    <DialogDescription>
                        Select a new plan for this organization. Your billing will be updated accordingly.
                    </DialogDescription>
                </DialogHeader>

                {renderPlans()}

                <DialogFooter className="flex sm:justify-between items-center mt-6">
                    <Button variant="outline" onClick={onClose} disabled={upgrading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleUpgrade}
                        disabled={!selectedPlan || upgrading || loading}
                        className="px-8"
                    >
                        {upgrading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Upgrading...
                            </>
                        ) : (
                            "Confirm Upgrade"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpgradePlanDialog;
