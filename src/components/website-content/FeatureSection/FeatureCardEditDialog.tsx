import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FeatureCardForm, validateFeatureCardForm } from "./FeatureCardForm";

export function FeatureCardEditDialog({ open, onClose, item, onSubmit }) {
    const [formData, setFormData] = useState({
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
        dark: {},
        order: 1,
        isActive: true,
        _id: null,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (item) {
            setFormData({
                icon: item.icon || "",
                title: item.title || "",
                description: item.description || "",
                stats: item.stats || "",
                badge: item.badge || "",
                gradient: item.gradient || "",
                cardBg: item.cardBg || "",
                textColor: item.textColor || "",
                accentColor: item.accentColor || "",
                iconBg: item.iconBg || "",
                iconColor: item.iconColor || "",
                progressBar: item.progressBar || "",
                pattern: item.pattern || "",
                dark: item.dark || {},
                order: item.order || 1,
                isActive: item.isActive ?? true,
                _id: item._id,
            });
            setErrors({});
        }
    }, [item]);

    const handleClose = () => {
        setErrors({});
        onClose();
    };

    const handleSubmit = () => {
        if (!formData._id) {
            console.error("No _id found in form data");
            return;
        }
        const validationErrors = validateFeatureCardForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        onSubmit(formData);
        onClose();
    };

    if (!item) return null;

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Feature Card</DialogTitle>
                </DialogHeader>
                <FeatureCardForm formData={formData} setFormData={setFormData} errors={errors} />
                <Button className="mt-4 w-full" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </DialogContent>
        </Dialog>
    );
}
