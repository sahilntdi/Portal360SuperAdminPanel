"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useOrganizations } from "@/ApiService/apiOrganizations";

interface ExtendTrialDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    organizationEmail: string;
    organizationName: string;
    onSuccess: () => void;
}

const ExtendTrialDialog = ({
    isOpen,
    onOpenChange,
    organizationEmail,
    organizationName,
    onSuccess,
}: ExtendTrialDialogProps) => {
    const [additionalDays, setAdditionalDays] = useState<string>("7");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { extendTrial } = useOrganizations();

    const handleExtend = async () => {
        const days = parseInt(additionalDays);
        if (isNaN(days) || days <= 0) {
            toast.error("Please enter a valid number of days");
            return;
        }

        try {
            setIsSubmitting(true);
            await extendTrial(organizationEmail, days);
            toast.success(`Trial extended for ${organizationName} by ${days} days`);
            onSuccess();
            onOpenChange(false);
        } catch (error: any) {
            toast.error(error.message || "Failed to extend trial period");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Extend Trial Period
                    </DialogTitle>
                    <DialogDescription>
                        Extend the free trial period for <span className="font-semibold">{organizationName}</span>.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="days">Additional Days</Label>
                        <Input
                            id="days"
                            type="number"
                            min="1"
                            value={additionalDays}
                            onChange={(e) => setAdditionalDays(e.target.value)}
                            placeholder="Enter number of days"
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleExtend} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Extending...
                            </>
                        ) : (
                            "Extend Trial"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ExtendTrialDialog;
