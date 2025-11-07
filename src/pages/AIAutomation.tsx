import { PageHeader } from "@/components/PageHeader";
import { MetricsGrid } from "@/components/MetricsGrid";
import { MetricCard } from "@/components/MetricCard";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { aiFeatures, aiAutomationMetrics } from "@/data/data";
import { Settings, Sliders, Bot, Lightbulb, Target, Activity } from "lucide-react";

export default function AIAutomation() {
  const metrics = [
    { title: "Active AI Features", value: aiAutomationMetrics.activeFeatures, icon: Bot, description: "Currently enabled" },
    { title: "Suggestions Generated", value: aiAutomationMetrics.suggestionsGenerated, icon: Lightbulb, description: "This month" },
    { title: "Detection Accuracy", value: aiAutomationMetrics.detectionAccuracy, icon: Target, description: "Average confidence" },
    { title: "API Calls", value: aiAutomationMetrics.apiCalls, icon: Activity, description: "This month" },
  ];

  const columns = [
    { header: "Feature Name", accessor: "name" as const },
    { 
      header: "Status", 
      accessor: (item: typeof aiFeatures[0]) => (
        <Badge variant={item.status === "Active" ? "default" : "secondary"}>
          {item.status}
        </Badge>
      )
    },
    { header: "Threshold", accessor: "threshold" as const },
    { header: "Data Access", accessor: "dataAccess" as const },
    { header: "Last Updated", accessor: "lastUpdated" as const },
    {
      header: "Actions",
      accessor: () => (
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-1" />
          Configure
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI & Automation Settings"
        description="Manage AI-based features and automation thresholds"
        action={
          <Button>
            <Sliders className="h-4 w-4 mr-2" />
            Global Settings
          </Button>
        }
      />

      <MetricsGrid metrics={metrics} />

      <Card>
        <CardHeader>
          <CardTitle>AI Features Configuration</CardTitle>
          <CardDescription>
            Manage individual AI features, adjust thresholds, and control data access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={aiFeatures}
            columns={columns}
            keyExtractor={(item) => item.id}
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Detection Thresholds</CardTitle>
            <CardDescription>Configure AI confidence levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Minimum Confidence</span>
                <span className="font-medium">70%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '70%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Auto-Approve Threshold</span>
                <span className="font-medium">90%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '90%' }} />
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              Adjust Thresholds
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Access Control</CardTitle>
            <CardDescription>Manage AI data permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">User Data Access</p>
                <p className="text-sm text-muted-foreground">Allow AI to analyze user profiles</p>
              </div>
              <Badge>Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Organization Data</p>
                <p className="text-sm text-muted-foreground">Access to organization metrics</p>
              </div>
              <Badge>Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Financial Data</p>
                <p className="text-sm text-muted-foreground">Payment and billing information</p>
              </div>
              <Badge variant="secondary">Restricted</Badge>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              Manage Permissions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
