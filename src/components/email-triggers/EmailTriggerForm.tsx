import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventsList } from "@/ApiService";

/* ================= TIMING OPTIONS ================= */

const TIMING_OPTIONS = [
  { label: "Immediate", value: "immediate" },

  { label: "After 1 Day", value: "after_day_1" },
  { label: "After 2 Days", value: "after_day_2" },
  { label: "After 3 Days", value: "after_day_3" },

  { label: "Before 1 Day", value: "before_day_1" },
  { label: "Before 2 Days", value: "before_day_2" },

  { label: "After 1 Hour", value: "after_hour_1" },
  { label: "After 2 Hours", value: "after_hour_2" },

  { label: "Before 1 Hour", value: "before_hour_1" },
];

/* ================= PARSER ================= */

function parseTiming(value: string) {
  if (value === "immediate") {
    return {
      type: "immediate",
      unit: null,
      value: null,
    };
  }

  const [type, unit, count] = value.split("_");

  return {
    type,           // after | before
    unit,           // day | hour
    value: Number(count),
  };
}

/* ================= COMPONENT ================= */

const EmailTriggerForm = ({ form, setForm }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [timingSelectValue, setTimingSelectValue] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await eventsList();
        setEvents(res || []);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <Label className="text-sm font-medium">Trigger Details</Label>
          </div>

          {/* ================= GRID ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Trigger Name */}
            <div className="space-y-2">
              <Label>Trigger Name</Label>
              <Input
                value={form.triggerName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    triggerName: e.target.value,
                  })
                }
                placeholder="e.g. Time Check"
              />
            </div>

            {/* Event */}
            <div className="space-y-2">
              <Label>Event</Label>
              <Select
                value={form.event}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    event: value, // ✅ only event ID
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((ev) => (
                    <SelectItem key={ev._id} value={ev._id}>
                      {ev.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* ✅ TIMING (NO DUPLICATION GUARANTEED) */}
            <div className="space-y-2">
              <Label>Timing</Label>
              <Select
                value={timingSelectValue}
                onValueChange={(value) => {
                  setTimingSelectValue(value);

                  // ✅ ONLY timing object is set
                  setForm({
                    ...form,
                    timing: parseTiming(value),
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timing" />
                </SelectTrigger>
                <SelectContent>
                  {TIMING_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex items-center gap-3 h-10">
                <Switch
                  checked={form.status === "active"}
                  onCheckedChange={(v) =>
                    setForm({
                      ...form,
                      status: v ? "active" : "inactive",
                    })
                  }
                />
                <span className="text-sm">
                  {form.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTriggerForm;
