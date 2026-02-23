// src/pages/Users.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Users as UsersIcon, RefreshCw } from "lucide-react";
import { UserAddDialog } from "@/components/users/UserAddDialog";
import { UserEditDialog } from "@/components/users/UserEditDialog";
import { UserDeleteDialog } from "@/components/users/UserDeleteDialog";
import { UserTable } from "@/components/users/UserTable";
import { UserFilters } from "@/components/users/UserFilters";
import { Pagination } from "@/components/ui/pagination";
import { UserService, type User, type Organization, type PaginatedResponse } from "@/ApiService/apiUsers";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [orgLoading, setOrgLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pageSize] = useState(10); // You can make this configurable if needed

  // Dialog states
  const [addOpen, setAddOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  // Filter states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  // Fetch users with pagination
  const fetchUsers = useCallback(async (page: number = currentPage) => {
    try {
      setLoading(true);
      const response = await UserService.getUsers(page, pageSize);
      setUsers(response.users);
      setTotalPages(response.pagination.pages);
      setTotalUsers(response.pagination.total);
      setCurrentPage(response.pagination.page);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, toast]);

  const fetchOrganizations = async () => {
    try {
      setOrgLoading(true);
      const data = await UserService.getOrganizations();
      setOrganizations(data);
    } catch (error: any) {
      console.error("Failed to load organizations:", error);
    } finally {
      setOrgLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchUsers(page);
  };

  // Handle actions
  const handleCreateUser = async (data: any) => {
    await UserService.createUser(data);
    await fetchUsers(1); // Go back to first page after create
    setAddOpen(false); // Close dialog after table is refreshed
    toast({
      title: "Success",
      description: "User created successfully",
    });
  };

  const handleUpdateUser = async (id: string, data: any) => {
    await UserService.updateUser(id, data);
    await fetchUsers(currentPage);
    setEditUser(null); // Close dialog after table is refreshed
    toast({
      title: "Success",
      description: "User updated successfully",
    });
  };

  const handleDeleteUser = async (id: string) => {
    await UserService.deleteUser(id);
    // If current page becomes empty after deletion, go to previous page
    const targetPage = (users.length === 1 && currentPage > 1) ? currentPage - 1 : currentPage;
    await fetchUsers(targetPage);
    setDeleteUser(null); // Close dialog after table is refreshed
    toast({
      title: "Success",
      description: "User deleted successfully",
    });
  };

  const handleToggleStatus = async (id: string, status: boolean) => {
    await UserService.toggleUserStatus(id, status);
    await fetchUsers(currentPage);
    toast({
      title: "Success",
      description: `User ${status ? 'deactivated' : 'activated'} successfully`,
    });
  };

  // Load data on mount
  useEffect(() => {
    fetchUsers(1);
    fetchOrganizations();
  }, []);

  // Apply filters locally (since we're paginating on the server)
  const filteredUsers = users.filter((user) => {
    const searchMatch = `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const statusMatch = statusFilter === "all" ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);

    const roleMatch = roleFilter === "all" || user.role?._id === roleFilter;

    return searchMatch && statusMatch && roleMatch;
  });

  const activeUsers = users.filter(u => u.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage all system users ({totalUsers} total, {activeUsers} active on this page)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchUsers(currentPage)}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <UsersIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">{activeUsers}</p>
                </div>
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <div className="h-5 w-5 text-green-600 dark:text-green-400">✓</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Admins</p>
                  <p className="text-2xl font-bold">
                    {users.filter(u => u.role?._id === "679f31947a4e717c2fcd0099").length}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <div className="h-5 w-5 text-purple-600 dark:text-purple-400">A</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                View and manage all system users
              </CardDescription>
            </div>
            <UserFilters
              search={search}
              onSearchChange={setSearch}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              roleFilter={roleFilter}
              onRoleFilterChange={setRoleFilter}
            />
          </div>
        </CardHeader>
        <CardContent>
          <UserTable
            users={filteredUsers}
            loading={loading}
            onEdit={setEditUser}
            onDelete={setDeleteUser}
            onStatusToggle={handleToggleStatus}
            organizations={organizations}
          />

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <UserAddDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreate={handleCreateUser}
        organizations={organizations}
        orgLoading={orgLoading}
      />

      <UserEditDialog
        open={!!editUser}
        onClose={() => setEditUser(null)}
        onUpdate={handleUpdateUser}
        user={editUser}
        organizations={organizations}
      />

      <UserDeleteDialog
        open={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        onDelete={handleDeleteUser}
        user={deleteUser}
      />
    </div>
  );
}