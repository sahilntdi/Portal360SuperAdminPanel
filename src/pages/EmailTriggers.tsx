import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/PageHeader";
import { MetricsGrid } from "@/components/MetricsGrid";
import { Mail, Send, Clock, AlertCircle, Plus, RefreshCw } from "lucide-react";

import { EmailTriggerTable } from "@/components/email-triggers/EmailTriggerTable";
import EmailTriggerAddDialog from "@/components/email-triggers/EmailTriggerAddDialog";
import EmailTriggerEditDialog from "@/components/email-triggers/EmailTriggerEditDialog";
import EmailTriggerDeleteDialog from "@/components/email-triggers/EmailTriggerDeleteDialog";

import { getEmailTriggers } from "@/ApiService";

const EmailTriggers = () => {
  const [triggers, setTriggers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [deleteItem, setDeleteItem] = useState<any | null>(null);

  // 🔄 Fetch triggers
  const fetchTriggers = async () => {
    try {
      setLoading(true);
      const res = await getEmailTriggers();
      setTriggers(res || []);
    } catch (err) {
      console.error("Failed to fetch email triggers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTriggers();
  }, []);

  // 📊 Metrics (same as before)
  const metrics = [
    {
      title: "Active Triggers",
      value: triggers.filter((t) => t.status === "active").length,
      icon: Mail,
      description: "Currently active",
    },
    {
      title: "Total Triggers",
      value: triggers.length,
      icon: Send,
      description: "Configured triggers",
    },
    {
      title: "Pending Triggers",
      value: triggers.filter((t) => t.status !== "active").length,
      icon: Clock,
      description: "Inactive / paused",
    },
    {
      title: "Total Emails Sent",
      value: triggers.reduce((sum, t) => sum + (t.sentCount || 0), 0),
      icon: AlertCircle,
      description: "Overall delivery count",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 🔝 Header */}
      <PageHeader
        title="Email Trigger Management"
        description="Configure automated emails for key events"
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchTriggers}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Trigger
            </Button>
          </div>
        }
      />

      {/* 📊 Metrics */}
      <MetricsGrid metrics={metrics} columns={4} />

      {/* 📋 Table Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Configured Email Triggers</CardTitle>
            <Badge variant="outline">
              {triggers.length} total
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <EmailTriggerTable
            data={triggers}
            loading={loading}
            onEdit={(row) => setEditItem(row)}
            onDelete={(row) => setDeleteItem(row)}
          />
        </CardContent>
      </Card>

      {/* ➕ Add */}
      <EmailTriggerAddDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={fetchTriggers}
      />

      {/* ✏️ Edit */}
      {editItem && (
        <EmailTriggerEditDialog
          open={!!editItem}
          data={editItem}
          onClose={() => setEditItem(null)}
          onSuccess={fetchTriggers}
        />
      )}

      {/* 🗑 Delete */}
      {deleteItem && (
        <EmailTriggerDeleteDialog
          open={!!deleteItem}
          id={deleteItem._id}
          onClose={() => setDeleteItem(null)}
          onSuccess={fetchTriggers}
        />
      )}
    </div>
  );
};

export default EmailTriggers;