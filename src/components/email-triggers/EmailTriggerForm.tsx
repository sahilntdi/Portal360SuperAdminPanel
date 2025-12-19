import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, MessageSquare, Clock } from "lucide-react";

const EmailTriggerForm = ({ form, setForm }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="h-4 w-4 text-primary" />
              <Label className="text-sm font-medium">Trigger Details</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="triggerName">Trigger Name</Label>
              <Input
                id="triggerName"
                value={form.triggerName}
                onChange={(e) =>
                  setForm({ ...form, triggerName: e.target.value })
                }
                placeholder="e.g., Welcome Email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event">Event</Label>
              <Input
                id="event"
                value={form.event}
                onChange={(e) => setForm({ ...form, event: e.target.value })}
                placeholder="e.g., user_signup"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timing">Timing</Label>
              <Input
                id="timing"
                value={form.timing}
                onChange={(e) => setForm({ ...form, timing: e.target.value })}
                placeholder="e.g., Immediately, After 24 hours"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <Label className="text-sm font-medium">Email Content</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                placeholder="Enter email message content..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <div className="space-y-1">
                <Label className="text-sm font-medium">Status</Label>
                <p className="text-xs text-muted-foreground">
                  Enable or disable this trigger
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.status === "active"}
                onCheckedChange={(v) =>
                  setForm({ ...form, status: v ? "active" : "inactive" })
                }
              />
              <Label>
                {form.status === "active" ? "Active" : "Inactive"}
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTriggerForm;