// ModernTeamTable.jsx - Updated version
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
  Users, 
  Brain, 
  Zap, 
  Shield, 
  Cloud, 
  Clock,
  Mail,
  Layout,
  Cpu,
  Globe,
  Sparkles
} from "lucide-react";

// Icon mapping for Modern Teams
const MODERN_TEAM_ICONS = {
  "brain": Brain,
  "zap": Zap,
  "shield": Shield,
  "cloud": Cloud,
  "clock": Clock,
  "mail": Mail,
  "layout": Layout,
  "cpu": Cpu,
  "globe": Globe,
  "sparkles": Sparkles,
  "users": Users,
  "default": Sparkles
};

export function ModernTeamTable({ items, onEdit, onDelete }) {
  // Function to get icon component
  const getIconComponent = (iconName) => {
    const key = iconName?.toLowerCase() || "default";
    return MODERN_TEAM_ICONS[key] || MODERN_TEAM_ICONS.default;
  };

  // Function to get icon color based on feature
  const getIconColor = (iconName) => {
    const colors = {
      "brain": "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30",
      "zap": "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30",
      "shield": "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",
      "cloud": "text-cyan-600 bg-cyan-100 dark:text-cyan-400 dark:bg-cyan-900/30",
      "clock": "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30",
      "mail": "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30",
      "cpu": "text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/30",
      "default": "text-primary bg-primary/10"
    };
    const key = iconName?.toLowerCase() || "default";
    return colors[key] || colors.default;
  };

  // Function to get feature category based on title
  const getFeatureCategory = (title) => {
    if (title?.toLowerCase().includes('ai') || title?.toLowerCase().includes('automation')) 
      return 'AI & Automation';
    if (title?.toLowerCase().includes('security') || title?.toLowerCase().includes('secure')) 
      return 'Security';
    if (title?.toLowerCase().includes('collaboration') || title?.toLowerCase().includes('team')) 
      return 'Collaboration';
    if (title?.toLowerCase().includes('cloud') || title?.toLowerCase().includes('sync')) 
      return 'Cloud';
    return 'Productivity';
  };

  return (
    <div className="rounded-lg border dark:border-gray-800 overflow-hidden bg-card">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="w-16">Icon</TableHead>
            <TableHead>Feature Details</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item) => {
            const IconComponent = getIconComponent(item.icon);
            const iconColor = getIconColor(item.icon);
            const category = getFeatureCategory(item.title);
            
            return (
              <TableRow  key={item._id || item.id || `${item.title}-${item._id || item.id}`} className="group hover:bg-muted/20 transition-all duration-200">
                <TableCell>
                  <div className={`w-12 h-12 rounded-xl ${iconColor} flex items-center justify-center shadow-sm`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="space-y-2">
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium">{item.icon}</span>
                      <span className="text-muted-foreground/50">•</span>
                      <span>Modern Team</span>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <Badge variant="outline" className="font-medium">
                    {category}
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
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Modern Team Features</h3>
          <p className="text-muted-foreground">Add your first modern team feature to get started.</p>
        </div>
      )}
    </div>
  );
}