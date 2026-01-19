import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreVertical, Edit2, Trash2, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import type { User as ApiUser } from "@/ApiService/apiUsers";
import { UserStatusToggle } from "./UserStatusToggle";

interface UserTableProps {
  users: ApiUser[];
  loading?: boolean;
  onEdit: (user: ApiUser) => void;
  onDelete: (user: ApiUser) => void;
  onStatusToggle: (id: string, status: boolean) => Promise<void>;
}

export function UserTable({
  users,
  loading = false,
  onEdit,
  onDelete,
  onStatusToggle,
}: UserTableProps) {
  const getInitials = (first?: string, last?: string) =>
    `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();

  const getRoleName = (role: any) => {
    if (!role) return "—";
    return role.name || role.role || "—";
  };

  const getOrganizationName = (user: any) => {
    return (
      user.practiceName ||
      user.businessName ||
      user.organization?.businessName ||
      user.organization?.email ||
      "—"
    );
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-16" />
              <Skeleton className="h-9 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <User className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No users found</h3>
        <p className="text-muted-foreground">
          Create your first user to get started
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              {/* USER */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(user.firstName, user.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ID: {user._id.slice(-6)}
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* EMAIL */}
              <TableCell className="font-mono text-sm">
                {user.email}
              </TableCell>

              {/* ORGANIZATION */}
              <TableCell>
                <span className="text-sm">
                  {getOrganizationName(user)}
                </span>
              </TableCell>

              {/* ROLE */}
              <TableCell>
                <Badge variant="outline">
                  {getRoleName(user.role)}
                </Badge>
              </TableCell>

              {/* STATUS */}
              <TableCell>
                <div className="flex items-center gap-2">
                  {typeof user.isActive === "boolean" && (
                    <UserStatusToggle
                      user={user}
                      onToggle={onStatusToggle}
                    />
                  )}
                  <Badge
                    variant={user.isActive ? "default" : "secondary"}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </TableCell>

              {/* CREATED AT */}
              <TableCell className="text-sm text-muted-foreground">
                {user.createdAt
                  ? format(new Date(user.createdAt), "dd MMM yyyy")
                  : "—"}
              </TableCell>

              {/* ACTIONS */}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        window.open(`mailto:${user.email}`)
                      }
                    >
                      Send Email
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => onEdit(user)}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit User
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => onDelete(user)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
