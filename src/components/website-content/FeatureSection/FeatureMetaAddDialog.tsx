import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FeatureMetaForm, validateFeatureMetaForm } from "./FeatureMetaForm";

export function FeatureMetaAddDialog({ open, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        badgeText: "",
        heading: "",
        highlightText: "",
        description: "",
        stats: [{ value: "", label: "" }],
        isActive: true,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (open) {
            setFormData({
                badgeText: "",
                heading: "",
                highlightText: "",
                description: "",
                stats: [{ value: "", label: "" }],
                isActive: true,
            });
            setErrors({});
        }
    }, [open]);

    const handleClose = () => {
        setErrors({});
        onClose();
    };

    const handleSubmit = () => {
        const validationErrors = validateFeatureMetaForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        onSubmit(formData);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Feature Section Meta</DialogTitle>
                </DialogHeader>
                <FeatureMetaForm formData={formData} setFormData={setFormData} errors={errors} />
                <Button className="mt-4 w-full" onClick={handleSubmit}>
                    Add Meta
                </Button>
            </DialogContent>
        </Dialog>
    );
}
