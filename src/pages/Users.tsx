import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Users as UsersIcon, RefreshCw, Loader2 } from "lucide-react";
import instance from "@/utils/axios";
import { UserAddDialog } from "@/components/users/UserAddDialog";
import { UserEditDialog } from "@/components/users/UserEditDialog";
import { UserDeleteDialog } from "@/components/users/UserDeleteDialog";
import { UserTable } from "@/components/users/UserTable";
import { UserFilters } from "@/components/users/UserFilters";
import type { User } from "@/ApiService/apiUsers";

interface Organization {
  _id: string;
  businessName?: string;
  email?: string;
}

export default function UsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [orgLoading, setOrgLoading] = useState(true);
  
  // Dialog states
  const [addOpen, setAddOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  
  // Filter states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await instance.get("/user");
      if (res.data.success) {
        setUsers(res.data.data.users || []);
      } else {
        throw new Error("Failed to load users");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganizations = async () => {
    try {
      setOrgLoading(true);
      const res = await instance.get("/organizations");
      if (res.data.success) {
        setOrganizations(res.data.data || []);
      }
    } catch (error) {
      console.error("Failed to load organizations:", error);
    } finally {
      setOrgLoading(false);
    }
  };

  const createUser = async (data: any) => {
    try {
      const res = await instance.post("/user", data);
      if (res.data.success) {
        await fetchUsers();
        return res.data.data;
      }
      throw new Error("Failed to create user");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to create user");
    }
  };

  const updateUser = async (id: string, data: any) => {
    try {
      const res = await instance.put(`/user/${id}`, data);
      if (res.data.success) {
        await fetchUsers();
        return res.data.data;
      }
      throw new Error("Failed to update user");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to update user");
    }
  };

  const deleteUserHandler = async (id: string) => {
    try {
      const res = await instance.delete(`/user/${id}`);
      if (res.data.success) {
        await fetchUsers();
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const toggleUserStatus = async (id: string, status: boolean) => {
    try {
      const res = await instance.patch(`/user/${id}/status`, { isActive: !status });
      if (res.data.success) {
        await fetchUsers();
        return res.data.data;
      }
      throw new Error("Failed to update status");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrganizations();
  }, []);

  // Filter users
  const filteredUsers = users.filter((user) => {
    // Search filter
    const searchMatch = `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase());
    
    // Status filter
    const statusMatch = statusFilter === "all" || 
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);
    
    // Role filter
    const roleMatch = roleFilter === "all" || user.role?._id === roleFilter;
    
    return searchMatch && statusMatch && roleMatch;
  });

  const activeUsers = users.filter(u => u.isActive).length;
  const totalUsers = users.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage all system users ({totalUsers} total, {activeUsers} active)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchUsers}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <UsersIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{activeUsers}</p>
              </div>
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <div className="h-5 w-5 text-green-600 dark:text-green-400">✓</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
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
            onStatusToggle={toggleUserStatus}
            organizations={organizations}
          />
        </CardContent>
      </Card>

      {/* Dialogs */}
      <UserAddDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreate={createUser}
        organizations={organizations}
        orgLoading={orgLoading}
      />
      
      <UserEditDialog
        open={!!editUser}
        onClose={() => setEditUser(null)}
        onUpdate={updateUser}
        user={editUser}
        organizations={organizations}
      />
      
      <UserDeleteDialog
        open={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        onDelete={deleteUserHandler}
        user={deleteUser}
      />
    </div>
  );
}