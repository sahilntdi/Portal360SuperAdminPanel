"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { OrganizationAddDialog } from "@/components/organizations/OrganizationAddDialog";
import { OrganizationEditDialog } from "@/components/organizations/OrganizationEditDialog";
import { OrganizationDeleteDialog } from "@/components/organizations/OrganizationDeleteDialog";
import { OrganizationTable } from "@/components/organizations/OrganizationTable";
import { OrganizationFilters } from "@/components/organizations/OrganizationFilters";
import { RefreshCw, Loader2 } from "lucide-react";
import { useOrganizations } from "@/ApiService/apiOrganizations";
import { toast } from "sonner";
import type { Organization } from "@/types/organizations";

const Organizations = () => {
  const navigate = useNavigate();
  const {
    organizations,
    loading,
    error,
    refetch,
    total,
    changeStatus,
    deleteOrganization,
    updateOrganization,
  } = useOrganizations();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [deletingOrg, setDeletingOrg] = useState<Organization | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const filteredOrgs = organizations.filter((org) => {
    const matchesSearch =
      org.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.lastName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || org.status === statusFilter;
    const matchesPlan = planFilter === "all" || org.planName === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const activeFiltersCount = [
    statusFilter !== "all",
    planFilter !== "all",
  ].filter(Boolean).length;

  const handleEdit = (org: Organization) => {
    setEditingOrg(org);
    setEditDialogOpen(true);
  };

  const handleDelete = (org: Organization) => {
    setDeletingOrg(org);
    setDeleteDialogOpen(true);
  };

  const handleView = (org: Organization) => {
    navigate(`/organizations/${org._id}`);
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await changeStatus(id, status);
      toast.success(`Organization ${status === "active" ? "activated" : "Inactive"}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to change status");
    }
  };

  const handleDeleteOrganization = async () => {
    if (!deletingOrg) return;

    try {
      await deleteOrganization(deletingOrg.email);
      toast.success("Organization deleted successfully");
      setDeleteDialogOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete organization");
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPlanFilter("all");
  };

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          {loading && organizations.length === 0 ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-36" />
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold">Organizations</h1>
              <p className="text-muted-foreground mt-1">
                Manage all tenant organizations ({total} total)
              </p>
            </>
          )}
        </div>
        {loading && organizations.length === 0 ? (
          <Skeleton className="h-10 w-40" />
        ) : (
          <OrganizationAddDialog onSuccess={refetch} />
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            {loading && organizations.length === 0 ? (
              <Skeleton className="h-6 w-48" />
            ) : (
              <CardTitle>All Organizations</CardTitle>
            )}

            {loading && organizations.length === 0 ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Skeleton className="h-10 flex-1" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-[140px]" />
                    <Skeleton className="h-10 w-[140px]" />
                    <Skeleton className="h-10 w-20" />
                  </div>
                </div>
              </div>
            ) : (
              <OrganizationFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                planFilter={planFilter}
                onPlanFilterChange={setPlanFilter}
                onClearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
              />
            )}
          </div>
        </CardHeader>

        <CardContent>
          {loading && organizations.length === 0 ? (
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          ) : (
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredOrgs.length} of {total} organizations
              </p>
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
          )}

          <OrganizationTable
            organizations={filteredOrgs}
            loading={loading}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusToggle={handleStatusChange}
          />
        </CardContent>
      </Card>

      {/* Dialogs */}
      <OrganizationEditDialog
        organization={editingOrg}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSuccess={refetch}
      />

      <OrganizationDeleteDialog
        organization={deletingOrg}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDelete={async () => {
          if (!deletingOrg) return;
          try {
            await deleteOrganization(deletingOrg.email); // This will call the API
            toast.success("Organization deleted successfully");
            setDeleteDialogOpen(false);
          } catch (err: any) {
            throw new Error(err.message || "Failed to delete organization");
          }
        }}
      />
    </div>
  );
};

export default Organizations;