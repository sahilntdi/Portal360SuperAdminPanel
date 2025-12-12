import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Check, 
  Star, 
  Calendar, 
  Users, 
  Building, 
  CreditCard, 
  CheckCircle, 
  XCircle,
  DollarSign,
  Copy,
  ExternalLink
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface PricingDetailDialogProps {
  open: boolean;
  item: any;
  onClose: () => void;
}

export default function PricingDetailDialog({ open, item, onClose }: PricingDetailDialogProps) {
  const { toast } = useToast();

  if (!item) return null;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy HH:mm');
    } catch {
      return dateString;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            Plan Details: {item.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{item.name}</h2>
                  {item.highlighted && (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{item.description}</p>
                
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    {item.isActive ? (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Inactive
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline">Order #{item.order || 1}</Badge>
                  {item.recommendedFor && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Recommended for up to {item.recommendedFor} users</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-4xl font-bold">
                  ${item.price}
                </div>
                <div className="text-lg text-muted-foreground capitalize">
                  per {item.period}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Features Card */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  Plan Features
                </h3>
                
                <div className="space-y-3">
                  {item.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                          <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-medium">{feature.name}</span>
                      </div>
                      <span className="font-semibold">
                        {typeof feature.value === 'number' ? 
                          `${feature.value} ${feature.name === 'Workspace' ? 'workspace(s)' : 'client(s)'}` : 
                          feature.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Payment & Info */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-500" />
                  Payment & Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Stripe Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 rounded bg-muted">
                        <span className="text-sm">Plan ID:</span>
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono truncate max-w-[120px]">
                            {item.planId || 'N/A'}
                          </code>
                          {item.planId && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(item.planId)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-muted">
                        <span className="text-sm">Price ID:</span>
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono truncate max-w-[120px]">
                            {item.stripePriceId || 'N/A'}
                          </code>
                          {item.stripePriceId && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(item.stripePriceId)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Timestamps</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Created:</span>
                        <span className="font-medium">{formatDate(item.createdAt)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Last Updated:</span>
                        <span className="font-medium">{formatDate(item.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {item.planId && (
              <Button variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                View in Stripe
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}