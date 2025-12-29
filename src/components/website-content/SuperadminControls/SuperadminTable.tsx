// SuperadminTable.jsx - Updated version
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Trash2,
  Shield,
  Activity,
  Settings,
  Mail,
  Lock,
  Eye,
  Bell,
  Database,
  Users,
  Key,
  Server,
  AlertCircle,
  Zap
} from "lucide-react";

// Icon mapping for Superadmin Controls
const SUPERADMIN_ICONS = {
  "mail": Mail,
  "shield": Shield,
  "activity": Activity,
  "settings": Settings,
  "lock": Lock,
  "eye": Eye,
  "bell": Bell,
  "database": Database,
  "users": Users,
  "key": Key,
  "server": Server,
  "alert": AlertCircle,
  "alert-circle": AlertCircle,
  "zap": Zap,
  "default": Settings
};

export function SuperadminTable({ items, onEdit, onDelete }) {
  // Function to get icon component
  const getIconComponent = (iconName) => {
    const key = iconName?.toLowerCase() || "default";
    return SUPERADMIN_ICONS[key] || SUPERADMIN_ICONS.default;
  };

  // Function to get control type based on title and description
  const getControlType = (item) => {
    const title = item.title?.toLowerCase() || '';
    const desc = item.description?.toLowerCase() || '';

    if (title.includes('email') || title.includes('mail') || desc.includes('email') || desc.includes('mail'))
      return { type: 'Email', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', icon: 'mail' };
    if (title.includes('security') || title.includes('access') || title.includes('lock') || desc.includes('security'))
      return { type: 'Security', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', icon: 'shield' };
    if (title.includes('monitor') || title.includes('activity') || title.includes('log') || desc.includes('monitor'))
      return { type: 'Monitoring', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: 'activity' };
    if (title.includes('notification') || title.includes('alert') || title.includes('bell') || desc.includes('alert'))
      return { type: 'Alerts', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200', icon: 'bell' };
    if (title.includes('database') || title.includes('storage') || title.includes('backup') || desc.includes('database'))
      return { type: 'Database', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200', icon: 'database' };
    if (title.includes('user') || title.includes('role') || title.includes('permission') || desc.includes('user'))
      return { type: 'User Management', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200', icon: 'users' };

    return { type: 'General', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200', icon: 'settings' };
  };

  // Function to get icon color
  const getIconColor = (iconName, type) => {
    const colors = {
      'mail': 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
      'shield': 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30',
      'activity': 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30',
      'bell': 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30',
      'database': 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30',
      'users': 'text-cyan-600 bg-cyan-100 dark:text-cyan-400 dark:bg-cyan-900/30',
      'default': 'text-primary bg-primary/10'
    };

    const key = iconName?.toLowerCase() || type?.icon || 'default';
    return colors[key] || colors.default;
  };

  return (
    <div className="rounded-lg border dark:border-gray-800 overflow-hidden bg-card">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="w-20">Control</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-32">Type</TableHead>
            <TableHead className="text-right w-40">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item) => {
            const IconComponent = getIconComponent(item.icon);
            const controlType = getControlType(item);
            const iconColor = getIconColor(item.icon, controlType);

            return (
              <TableRow key={item._id || item.id} className="group hover:bg-muted/20 transition-all duration-200">
                <TableCell>
                  <div className="space-y-2">
                    <div className={`w-12 h-12 rounded-xl ${iconColor} flex items-center justify-center shadow-sm`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="font-medium text-foreground text-sm">
                      {item.title}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium">{item.icon}</span>
                      <span className="text-muted-foreground/50">•</span>
                      <span>Superadmin Control</span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <Badge
                    className={`${controlType.color} border-0 font-medium flex items-center justify-center gap-1.5`}
                  >
                    {controlType.type}
                  </Badge>
                </TableCell>


                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(item)}
                      className="h-8 px-3 gap-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-200 dark:hover:border-blue-800"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(item)}
                      className="h-8 px-3 gap-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 hover:border-red-200 dark:hover:border-red-800"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {items?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Superadmin Controls</h3>
          <p className="text-muted-foreground">Add your first superadmin control to get started.</p>
        </div>
      )}
    </div>
  );
}