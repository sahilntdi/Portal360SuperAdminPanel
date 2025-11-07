import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricsGrid } from "@/components/MetricsGrid";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { Mail, Send, Clock, AlertCircle, Plus } from "lucide-react";
import { emailTriggers, emailTriggersMetrics } from "@/data/data";

const EmailTriggers = () => {
  const metrics = [
    {
      title: "Active Triggers",
      value: emailTriggersMetrics.activeTriggers,
      icon: Mail,
      trend: { value: "1", isPositive: true },
      description: "1 new this month",
    },
    {
      title: "Emails Sent Today",
      value: emailTriggersMetrics.emailsSentToday,
      icon: Send,
      trend: { value: "12%", isPositive: true },
      description: "+28 from yesterday",
    },
    {
      title: "Pending Triggers",
      value: emailTriggersMetrics.pendingTriggers,
      icon: Clock,
      description: "Scheduled for next 24h",
    },
    {
      title: "Failed Deliveries",
      value: emailTriggersMetrics.failedDeliveries,
      icon: AlertCircle,
      description: "Requires attention",
    },
  ];

  const columns = [
    {
      header: "Trigger Name",
      accessor: "name" as const,
      className: "font-medium",
    },
    {
      header: "Event",
      accessor: "event" as const,
    },
    {
      header: "Status",
      accessor: (item: typeof emailTriggers[0]) => (
        <Badge variant={item.status === "active" ? "default" : "secondary"}>
          {item.status}
        </Badge>
      ),
    },
    {
      header: "Timing",
      accessor: (item: typeof emailTriggers[0]) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{item.timing}</span>
        </div>
      ),
    },
    {
      header: "Last Sent",
      accessor: "lastSent" as const,
      className: "text-muted-foreground",
    },
    {
      header: "Sent Count",
      accessor: (item: typeof emailTriggers[0]) => (
        <Badge variant="outline">{item.sentCount}</Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Email Trigger Management"
        description="Configure automated emails for key events"
        action={
          <Button>
            <Plus className="h-4 w-4" />
            Add Trigger
          </Button>
        }
      />

      <MetricsGrid metrics={metrics} columns={4} />

      <Card>
        <CardHeader>
          <CardTitle>Configured Email Triggers</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={emailTriggers}
            columns={columns}
            keyExtractor={(item) => item.id}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTriggers;
