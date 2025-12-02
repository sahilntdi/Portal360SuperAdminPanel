// MobileSuperadminCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Mail, Shield, Activity, Settings, Lock, Eye, Bell, Database, Users } from "lucide-react";

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
  "default": Settings
};

export function MobileSuperadminCard({ item, onEdit, onDelete }) {
  const getIconComponent = (iconName) => {
    const key = iconName?.toLowerCase() || "default";
    return SUPERADMIN_ICONS[key] || SUPERADMIN_ICONS.default;
  };

  const IconComponent = getIconComponent(item.icon);
  
  const getControlType = (title, description) => {
    const text = (title + description).toLowerCase();
    if (text.includes('email') || text.includes('mail')) return 'Email';
    if (text.includes('security') || text.includes('access') || text.includes('lock')) return 'Security';
    if (text.includes('monitor') || text.includes('activity') || text.includes('log')) return 'Monitoring';
    return 'General';
  };

  const type = getControlType(item.title, item.description);
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <IconComponent className="h-6 w-6 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <Badge variant="outline" className="text-xs">
                {type}
              </Badge>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onEdit}
                  className="h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onDelete}
                  className="h-8 w-8 text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}