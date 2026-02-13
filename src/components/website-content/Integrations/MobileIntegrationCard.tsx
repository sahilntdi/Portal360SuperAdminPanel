import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Trash2, ExternalLink, Globe, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export function MobileIntegrationCard({ item, onEdit, onDelete, onToggleStatus }) {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'beta': return 'bg-yellow-500';
      case 'coming_soon': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'beta': return 'Beta';
      case 'coming_soon': return 'Coming Soon';
      default: return status;
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'accounting': 'bg-blue-100 text-blue-800',
      'payment_gateway': 'bg-green-100 text-green-800',
      'crm': 'bg-purple-100 text-purple-800',
      'marketing_automation': 'bg-pink-100 text-pink-800',
      'e-commerce': 'bg-orange-100 text-orange-800',
      'communication': 'bg-cyan-100 text-cyan-800',
      'analytics': 'bg-indigo-100 text-indigo-800',
      'productivity': 'bg-emerald-100 text-emerald-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="overflow-hidden border-l-4" style={{ borderLeftColor: getStatusColor(item.status) }}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="relative">
              <Avatar className="h-14 w-14 border-2 border-background shadow-lg bg-white">
                <AvatarImage src={item.image} alt={item.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-bold text-lg">
                  {item.name?.charAt(0) || "I"}
                </AvatarFallback>
              </Avatar>
              {item.api_enabled && (
                <div className="absolute -top-1 -right-1">
                  <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <Zap className="h-3 w-3 text-white" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-foreground">{item.name}</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="outline" className={`text-xs ${getTypeColor(item.type)}`}>
                      {item.type?.replace(/_/g, ' ').toUpperCase()}
                    </Badge>
                    <Badge variant={item.status === 'active' ? 'default' : 'outline'} 
                           className={`text-xs ${item.status === 'active' ? 'bg-green-100 text-green-800' : ''}`}>
                      {getStatusText(item.status)}
                    </Badge>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs font-bold">
                  #{item.order}
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-2">
            {item.website_url && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs flex-1"
                onClick={() => window.open(item.website_url, '_blank')}
              >
                <Globe className="h-3 w-3 mr-1" />
                Website
              </Button>
            )}
            {item.docs_url && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs flex-1"
                onClick={() => window.open(item.docs_url, '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Docs
              </Button>
            )}
          </div>

          {/* Status Toggle */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${getStatusColor(item.status)}`}></div>
              <span className="text-sm font-medium">
                {getStatusText(item.status)}
              </span>
            </div>
            <Switch
              checked={item.status === 'active'}
              onCheckedChange={() => onToggleStatus(item)}
              className="data-[state=checked]:bg-green-500"
            />
          </div>

          {/* Expand Button */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between text-muted-foreground"
            onClick={() => setExpanded(!expanded)}
          >
            <span>View Details</span>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {/* Expanded Details */}
          {expanded && (
            <div className="space-y-3 pt-3 border-t">
              {item.description && (
                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground mb-1">Description</h5>
                  <p className="text-sm">{item.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <h5 className="text-xs font-semibold text-muted-foreground">Type</h5>
                  <p className="text-sm font-medium">{item.type?.replace(/_/g, ' ').toUpperCase()}</p>
                </div>
                <div className="space-y-1">
                  <h5 className="text-xs font-semibold text-muted-foreground">Priority</h5>
                  <p className="text-sm font-medium">#{item.order}</p>
                </div>
              </div>

              {item.api_enabled && (
                <div className="space-y-2">
                  <h5 className="text-xs font-semibold text-muted-foreground">API Configuration</h5>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>API Key:</span>
                      <Badge variant="outline">
                        {item.api_key ? "Configured" : "Not Set"}
                      </Badge>
                    </div>
                    {item.base_url && (
                      <div>
                        <span className="block mb-1">Base URL:</span>
                        <code className="text-xs bg-muted p-1 rounded block truncate">
                          {item.base_url}
                        </code>
                      </div>
                    )}
                    {item.webhook_url && (
                      <div>
                        <span className="block mb-1">Webhook URL:</span>
                        <code className="text-xs bg-muted p-1 rounded block truncate">
                          {item.webhook_url}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Links in Expanded View */}
              <div className="flex flex-col gap-2">
                {item.website_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => window.open(item.website_url, '_blank')}
                  >
                    <Globe className="h-3 w-3 mr-2" />
                    Visit Website
                  </Button>
                )}
                {item.docs_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => window.open(item.docs_url, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    View Documentation
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="text-xs text-muted-foreground">
              ID: {item._id?.substring(0, 8)}...
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(item)}
                className="h-9 w-9 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                title="Edit"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(item)}
                className="h-9 w-9 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}