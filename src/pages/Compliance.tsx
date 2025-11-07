import { PageHeader } from "@/components/PageHeader";
import { MetricsGrid } from "@/components/MetricsGrid";
import { MetricCard } from "@/components/MetricCard";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { roleTemplates, dataResidency, complianceReports, complianceMetrics } from "@/data/data";
import { Shield, Download, FileText, Globe, Lock, CheckCircle, Calendar } from "lucide-react";

export default function Compliance() {
  const metrics = [
    { title: "Active Policies", value: complianceMetrics.activePolicies, icon: FileText, description: "Security policies" },
    { title: "2FA Enabled", value: complianceMetrics.twoFactorEnabled, icon: Lock, description: "Of all users" },
    { title: "Compliance Score", value: complianceMetrics.complianceScore, icon: CheckCircle, description: "Overall rating" },
    { title: "Last Audit", value: complianceMetrics.lastAudit, icon: Calendar, description: "Days ago" },
  ];

  const roleColumns = [
    { header: "Role Name", accessor: "name" as const },
    { header: "Permissions", accessor: "permissions" as const },
    { 
      header: "Active Users", 
      accessor: (item: typeof roleTemplates[0]) => (
        <span className="font-medium">{item.users}</span>
      )
    },
    { header: "Description", accessor: "description" as const },
    {
      header: "Actions",
      accessor: () => (
        <Button variant="outline" size="sm">Edit</Button>
      ),
    },
  ];

  const residencyColumns = [
    { header: "Region", accessor: "region" as const },
    { 
      header: "Status", 
      accessor: (item: typeof dataResidency[0]) => (
        <Badge variant="default">{item.status}</Badge>
      )
    },
    { header: "Organizations", accessor: (item: typeof dataResidency[0]) => item.organizations.toString() },
    { header: "Data Center", accessor: "dataCenter" as const },
    { header: "Compliance", accessor: "compliance" as const },
  ];

  const reportColumns = [
    { header: "Report Name", accessor: "reportName" as const },
    { header: "Generated", accessor: "generatedDate" as const },
    { header: "Period", accessor: "period" as const },
    { 
      header: "Status", 
      accessor: (item: typeof complianceReports[0]) => (
        <Badge variant="default">{item.status}</Badge>
      )
    },
    { header: "Size", accessor: "size" as const },
    {
      header: "Actions",
      accessor: () => (
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security & Compliance Controls"
        description="Manage security policies, role templates, and compliance settings"
        action={
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            Security Audit
          </Button>
        }
      />

      <MetricsGrid metrics={metrics} />

      <Card>
        <CardHeader>
          <CardTitle>Role-Based Access Templates</CardTitle>
          <CardDescription>
            Preset permission groups for different user roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={roleTemplates}
            columns={roleColumns}
            keyExtractor={(item) => item.id}
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>Configure 2FA policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enforce 2FA for Admins</p>
                <p className="text-sm text-muted-foreground">Required for all admin users</p>
              </div>
              <Badge>Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Optional 2FA for Users</p>
                <p className="text-sm text-muted-foreground">Available but not required</p>
              </div>
              <Badge>Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">2FA Grace Period</p>
                <p className="text-sm text-muted-foreground">7 days after login</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              Configure 2FA Policies
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Management</CardTitle>
            <CardDescription>Security session settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Session Timeout</span>
                <span className="font-medium">30 minutes</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Max Concurrent Sessions</span>
                <span className="font-medium">3 devices</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Password Reset Frequency</span>
                <span className="font-medium">90 days</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              Update Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <CardTitle>Data Residency Settings</CardTitle>
          </div>
          <CardDescription>
            Regional data storage and compliance by location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={dataResidency}
            columns={residencyColumns}
            keyExtractor={(item) => item.id}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <CardTitle>Compliance Reports</CardTitle>
          </div>
          <CardDescription>
            Download audit reports and compliance documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={complianceReports}
            columns={reportColumns}
            keyExtractor={(item) => item.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
