import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FeatureMetaForm, validateFeatureMetaForm } from "./FeatureMetaForm";

export function FeatureMetaEditDialog({ open, onClose, item, onSubmit }) {
    const [formData, setFormData] = useState({
        badgeText: "",
        heading: "",
        highlightText: "",
        description: "",
        stats: [],
        isActive: true,
        _id: null,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (item) {
            setFormData({
                badgeText: item.badgeText || "",
                heading: item.heading || "",
                highlightText: item.highlightText || "",
                description: item.description || "",
                stats: item.stats || [],
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
        const validationErrors = validateFeatureMetaForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        onSubmit(formData);
        onClose();
    };

    if (!item) return null;

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Feature Section Meta</DialogTitle>
                </DialogHeader>
                <FeatureMetaForm formData={formData} setFormData={setFormData} errors={errors} />
                <Button className="mt-4 w-full" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </DialogContent>
        </Dialog>
    );
}
