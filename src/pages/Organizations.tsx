"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AddOrganizationDialog } from "@/components/AddOrganizationDialog";
import { Search, MoreVertical, Users, CreditCard, Loader2, RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOrganizations } from "../ApiService/apiOrganizations";
import { toast } from "sonner";

const Organizations = () => {
  const navigate = useNavigate();
  const {
    organizations,
    loading,
    error,
    refetch,
    total,
    changeStatus,
    deleteOrganization
  } = useOrganizations();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrgs = organizations.filter(org =>
    org.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = async (orgId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    try {
      await changeStatus(orgId, newStatus);
      toast.success(`Organization ${newStatus === "active" ? "activated" : "suspended"} successfully`);
    } catch (err) {
      toast.error("Failed to change status");
    }
  };

  const handleDelete = async (orgId: string) => {
    if (confirm("Are you sure you want to delete this organization?")) {
      try {
        await deleteOrganization(orgId);
        toast.success("Organization deleted successfully");
      } catch (err) {
        toast.error("Failed to delete organization");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary mr-3" />
        <span className="text-lg">Loading organizations...</span>
      </div>
    );
  }

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organizations</h1>
          <p className="text-muted-foreground mt-1">
            Manage all tenant organizations ({total} total)
          </p>
        </div>
        <AddOrganizationDialog onSuccess={refetch} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Organizations</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search organizations..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" onClick={refetch}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrgs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No organizations found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrgs.map((org) => (
                  <TableRow key={org._id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{org.businessName}</p>
                        {org.practiceName && (
                          <p className="text-sm text-muted-foreground">{org.practiceName}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">
                          {org.firstName} {org.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">{org.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {org.metrics?.totalUsers || 1}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="capitalize">{org.planName || 'starter'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          org.status === "active" ? "default" :
                            org.status === "pending" ? "secondary" :
                              "destructive"
                        }
                      >
                        {org.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(org.lastActive).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/organizations/${org._id}`)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Organization</DropdownMenuItem>
                          <DropdownMenuItem>Manage Users</DropdownMenuItem>
                          <DropdownMenuItem>Change Plan</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(org._id, org.status)}
                          >
                            {org.status === "active" ? "Suspend" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(org._id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Organizations;