import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { Puzzle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

import {
  getAllFeatures,
  updateFeature,
} from "@/ApiService/feature.service";

import FeatureAddDialog from "@/components/features/FeatureAddDialog";

import { FeatureEditDialog } from "@/components/features/FeatureEditDialog";
import { FeatureDeleteDialog } from "@/components/features/FeatureDeleteDialog";

export default function Features() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Dialog states
  const [openAdd, setOpenAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // Fetch feature list
  const loadFeatures = async () => {
    setLoading(true);
    try {
      const res = await getAllFeatures();
      setFeatures(res?.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeatures();
  }, []);

  // ⭐ Optimistic Toggle Switch Handler
  const handleToggle = async (feature) => {
    const newValue = !feature.isActive;

    // 1️⃣ Update UI immediately
    setFeatures((prev) =>
      prev.map((item) =>
        item._id === feature._id ? { ...item, isActive: newValue } : item
      )
    );

    try {
      // 2️⃣ API update
      const res = await updateFeature(feature._id, { isActive: newValue });

      toast({
        title: "Feature Updated",
        description: res?.meta || "Status changed successfully",
      });

    } catch (error) {
      // 3️⃣ Rollback if failed
      setFeatures((prev) =>
        prev.map((item) =>
          item._id === feature._id ? { ...item, isActive: feature.isActive } : item
        )
      );

      toast({
        title: "Update Failed",
        variant: "destructive",
        description: "Could not update toggle state",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Feature Management"
        description="Manage module availability and onboarding templates across all organizations"
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Puzzle className="h-5 w-5" />
                Features
              </CardTitle>
              <CardDescription>Control feature availability per organization</CardDescription>
            </div>
            <Button onClick={() => setOpenAdd(true)}>+ Add Feature</Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* ================= SKELETON LOADER ================= */}
              {loading ? (
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>

                      <TableCell>
                        <Skeleton className="h-6 w-20" />
                      </TableCell>

                      <TableCell className="text-right flex justify-end gap-2">
                        <Skeleton className="h-6 w-10" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : features.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3}>No features found.</TableCell>
                </TableRow>
              ) : (
                /* ================= DATA ROWS ================= */
                features.map((feature) => (
                  <TableRow key={feature._id}>
                    <TableCell className="font-medium">{feature.name}</TableCell>

                    <TableCell>
                      <Badge variant={feature.isActive ? "default" : "secondary"}>
                        {feature.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right flex justify-end gap-2">
                      <Switch
                        checked={feature.isActive}
                        onCheckedChange={() => handleToggle(feature)}
                      />

                      <Button variant="outline" size="sm" onClick={() => setEditItem(feature)}>
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button variant="destructive" size="sm" onClick={() => setDeleteItem(feature)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <FeatureAddDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={loadFeatures}
      />

      <FeatureEditDialog
        open={!!editItem}
        feature={editItem}
        onClose={() => setEditItem(null)}
        onSuccess={loadFeatures}
      />

      <FeatureDeleteDialog
        open={!!deleteItem}
        featureId={deleteItem?._id}
        onClose={() => setDeleteItem(null)}
        onSuccess={loadFeatures}
      />
    </div>
  );
}
