import React, { useEffect, useState } from "react";
import { QueryService, EmailSettingsService } from "../ApiService";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Mail,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Building,
  MessageSquare,
  Calendar,
  Send
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const WebsiteQuery = () => {
  const [queries, setQueries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Settings modal
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const { toast } = useToast();

  // -------------------------------
  // Fetch Contact Queries
  // -------------------------------
  const fetchQueries = async () => {
    try {
      setIsLoading(true);
      const res = await QueryService.getAllContacts();
      setQueries(res.data || []);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load contact queries",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------
  // Load Email Settings
  // -------------------------------
  const fetchEmailSettings = async () => {
    try {
      setLoadingEmail(true);
      const res = await EmailSettingsService.getEmailSettings();
      console.log("Email settings response:", res);
      const email = res.email || res.data?.email || "";
      console.log("Fetched email settings:", email);
      setAdminEmail(email);
      setCurrentEmail(email);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load email settings",
        variant: "destructive",
      });
    } finally {
      setLoadingEmail(false);
    }


  };


  // -------------------------------
  // Save Email Settings
  // -------------------------------
  const saveEmailSettings = async () => {
    if (!adminEmail.trim()) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      await EmailSettingsService.updateEmailSettings({ email: adminEmail });
      setCurrentEmail(adminEmail);

      toast({
        title: "Success",
        description: "Admin contact email updated successfully!",
        variant: "default",
      });

      setIsSettingsOpen(false);
    } catch {
      toast({
        title: "Error",
        description: "Failed to update email address",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // -------------------------------
  // Format Date: Today/Yesterday or 9 Dec 25
  // -------------------------------
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = d.toDateString() === now.toDateString();
    const isYesterday = d.toDateString() === yesterday.toDateString();

    let dateStr = "";
    if (isToday) {
      dateStr = "Today";
    } else if (isYesterday) {
      dateStr = "Yesterday";
    } else {
      const day = d.getDate();
      const month = d.toLocaleString("en-US", { month: "short" });
      const year = d.getFullYear().toString().slice(-2);
      dateStr = `${day} ${month} ${year}`;
    }

    const time = d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <div className="flex flex-col">
        <span className="font-medium">{dateStr}</span>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
    );
  };

  useEffect(() => {
    fetchQueries();
    fetchEmailSettings();
  }, []);

  // -------------------------------
  // Skeleton Loader
  // -------------------------------
  const QuerySkeleton = () => (
    <>
      {[...Array(5)].map((_, i) => (
        <TableRow key={i}>
          <TableCell><Skeleton className="h-4 w-24" /></TableCell>
          <TableCell><Skeleton className="h-4 w-32" /></TableCell>
          <TableCell><Skeleton className="h-4 w-40" /></TableCell>
          <TableCell><Skeleton className="h-4 w-48" /></TableCell>
          <TableCell><Skeleton className="h-4 w-28" /></TableCell>
          <TableCell><Skeleton className="h-9 w-20" /></TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <PageHeader
          title="Contact Queries"
          description="Manage and respond to website contact submissions"
        />

        {/* Email Status, Sync & Settings Button */}
        <div className="flex items-center gap-4">
          {/* Email Display */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">
                    {loadingEmail ? "Loading..." : currentEmail || "Not set"}
                  </span>
                  {currentEmail && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Current notification email</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* SYNC BUTTON */}
          <Button
            variant="outline"
            size="sm"
            onClick={fetchQueries}
            className="flex items-center gap-2"
          >
            <svg
              className="w-4 h-4 animate-spin-on-hover"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v6h6M20 20v-6h-6M5.636 18.364A9 9 0 0118.364 5.636M18.364 18.364A9 9 0 015.636 5.636"
              />
            </svg>
            Sync
          </Button>

          {/* SETTINGS BUTTON */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>


      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Queries</p>
              <p className="text-2xl font-bold">{queries.length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold">
                {queries.filter(q => {
                  const date = new Date(q.createdAt);
                  const now = new Date();
                  return date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">With Business</p>
              <p className="text-2xl font-bold">
                {queries.filter(q => q.businessName?.trim()).length}
              </p>
            </div>
            <Building className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today</p>
              <p className="text-2xl font-bold">
                {queries.filter(q => {
                  const date = new Date(q.createdAt);
                  const today = new Date();
                  return date.toDateString() === today.toDateString();
                }).length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </Card>
      </div>

      {/* MAIN TABLE CARD */}
      <Card className="p-6">
        <div className="max-h-[600px] overflow-y-auto rounded-lg border">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-50 shadow-sm">
              <TableRow>
                <TableHead className="font-semibold">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Contact
                  </div>
                </TableHead>

                <TableHead className="font-semibold">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Business
                  </div>
                </TableHead>

                <TableHead className="font-semibold">Email</TableHead>

                <TableHead className="font-semibold">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </div>
                </TableHead>

                <TableHead className="font-semibold">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date
                  </div>
                </TableHead>

                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <QuerySkeleton />
              ) : queries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <MessageSquare className="w-12 h-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium">No queries yet</h3>
                      <p className="text-gray-500 mt-1">
                        Website contact submissions will appear here
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                queries.map((q) => (
                  <TableRow key={q._id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <div className="font-medium">
                        {q.firstName} {q.lastName}
                      </div>
                    </TableCell>
                    <TableCell>
                      {q.businessName ? (
                        <Badge variant="outline" className="font-normal">
                          {q.businessName}
                        </Badge>
                      ) : (
                        <span className="text-gray-400 text-sm">Not specified</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{q.email}</div>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="line-clamp-2 text-gray-700">
                        {q.message}
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs mt-1"
                              onClick={() => {
                                toast({
                                  title: (
                                    <div className="text-center font-semibold">
                                      Full Message
                                    </div>
                                  ),
                                  description: (
                                    <div className="max-h-[300px] overflow-y-auto pr-2 text-sm leading-relaxed text-left whitespace-pre-wrap">
                                      {q.message}
                                    </div>
                                  ),
                                });
                              }}
                            >
                              View full
                            </Button>


                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{q.message}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>{formatDate(q.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2"
                              asChild
                            >
                              <a
                                href={`mailto:${q.email}?subject=Reply to your Portal360 inquiry&body=Hello ${q.firstName},%0D%0A%0D%0ARegarding your message: "${q.message}"`}
                              >
                                <Send className="w-3 h-3" />
                                Reply
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Send email reply to {q.firstName}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* SETTINGS DIALOG */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Email Settings</DialogTitle>
            <DialogDescription>
              Configure the email address that receives contact notifications
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Current Email Display */}
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <Label className="text-sm font-medium text-gray-500">
                Current Email
              </Label>
              {loadingEmail ? (
                <Skeleton className="h-6 w-full" />
              ) : (
                <div className="flex items-center justify-between">
                  <span className="font-medium">{currentEmail || "Not set"}</span>
                  {currentEmail && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
              )}
            </div>

            <Separator />

            {/* New Email Input */}
            <div className="space-y-3">
              <Label htmlFor="adminEmail">
                New Notification Email
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="adminEmail"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@company.com"
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                All new contact form submissions will be sent to this email
              </p>
            </div>

            {/* Change Preview */}
            {adminEmail && adminEmail !== currentEmail && (
              <div className="p-4 bg-blue-50 rounded-lg space-y-2 animate-in slide-in-from-bottom-2">
                <div className="flex items-center gap-2 text-blue-700">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Change Preview</span>
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">From:</span>
                    <span className="line-through">{currentEmail || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-semibold text-green-600">{adminEmail}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setAdminEmail(currentEmail);
                setIsSettingsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={saveEmailSettings}
              disabled={isSaving || adminEmail === currentEmail || !adminEmail.trim()}
              className="gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebsiteQuery;