import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { Shield, Lock, AlertTriangle, Users, Activity } from "lucide-react";
import { securityAlerts, adminRoles, auditLogs } from "@/data/data";

export default function Security() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Security & Audit"
        description="Monitor system security, audit logs, and manage admin access"
      />

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Admins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">3 online now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Audit Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-success">+23 today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Security Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-warning">2 require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Failed Logins</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Security Alerts
              </CardTitle>
              <CardDescription>Recent security events requiring attention</CardDescription>
            </div>
            <Button variant="outline">View All Alerts</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Count</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {securityAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <Badge variant={alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "secondary" : "outline"}>
                      {alert.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{alert.type}</TableCell>
                  <TableCell>{alert.organization}</TableCell>
                  <TableCell>
                    <Badge variant={alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "secondary" : "outline"}>
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{alert.time}</TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">{alert.count}x</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Investigate</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Admin Role Management
              </CardTitle>
              <CardDescription>Manage superadmin and sub-admin permissions</CardDescription>
            </div>
            <Button>Add Admin</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminRoles.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell className="text-muted-foreground">{admin.email}</TableCell>
                  <TableCell>
                    <Badge variant="default">{admin.role}</Badge>
                  </TableCell>
                  <TableCell>{admin.permissions}</TableCell>
                  <TableCell>
                    <Badge variant={admin.status === "active" ? "default" : "secondary"}>
                      {admin.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{admin.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Audit Log</CardTitle>
              <CardDescription>Complete history of administrative actions</CardDescription>
            </div>
            <Button variant="outline">Export Logs</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Performed By</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell className="text-muted-foreground">{log.admin}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{log.timestamp}</TableCell>
                  <TableCell className="text-muted-foreground">{log.ipAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
