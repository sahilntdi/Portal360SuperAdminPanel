import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/PageHeader";
import { Puzzle, Settings, Send } from "lucide-react";
import { featureModules, onboardingTemplates } from "@/data/data";

export default function Features() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Feature Management"
        description="Manage module availability and onboarding templates across all organizations"
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Puzzle className="h-5 w-5" />
                Features & Modules
              </CardTitle>
              <CardDescription>Control feature availability per organization</CardDescription>
            </div>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Configure All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Adoption</TableHead>
                <TableHead className="text-right">Global Toggle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureModules.map((feature) => (
                <TableRow key={feature.id}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  <TableCell className="text-muted-foreground">{feature.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="text-sm">
                        {feature.enabledFor} orgs
                      </div>
                      <Badge variant="secondary">
                        {feature.adoption}%
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Switch defaultChecked={feature.status === "enabled"} />
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
              <CardTitle>Onboarding Templates</CardTitle>
              <CardDescription>Manage question series and setup workflows</CardDescription>
            </div>
            <Button>Create Template</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Organizations</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {onboardingTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>{template.questions} questions</TableCell>
                  <TableCell>{template.usedBy} using</TableCell>
                  <TableCell>
                    <Badge variant={template.status === "active" ? "default" : "secondary"}>
                      {template.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Send className="h-4 w-4 mr-1" />
                      Push
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
