import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FeatureCardForm, validateFeatureCardForm } from "./FeatureCardForm";

const DEFAULT_CARD = {
    icon: "",
    title: "",
    description: "",
    stats: "",
    badge: "",
    gradient: "",
    cardBg: "",
    textColor: "",
    accentColor: "",
    iconBg: "",
    iconColor: "",
    progressBar: "",
    pattern: "",
    dark: {
        gradient: "",
        cardBg: "",
        textColor: "",
        accentColor: "",
        iconBg: "",
        iconColor: "",
        progressBar: "",
        pattern: "",
    },
    order: 1,
    isActive: true,
};

export function FeatureCardAddDialog({ open, onClose, onSubmit }) {
    const [formData, setFormData] = useState({ ...DEFAULT_CARD });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (open) {
            setFormData({ ...DEFAULT_CARD });
            setErrors({});
        }
    }, [open]);

    const handleClose = () => {
        setErrors({});
        onClose();
    };

    const handleSubmit = () => {
        const validationErrors = validateFeatureCardForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        onSubmit(formData);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Feature Card</DialogTitle>
                </DialogHeader>
                <FeatureCardForm formData={formData} setFormData={setFormData} errors={errors} />
                <Button className="mt-4 w-full" onClick={handleSubmit}>
                    Add Card
                </Button>
            </DialogContent>
        </Dialog>
    );
}
