"use client";

import { useEffect, useMemo, useState } from "react";

/* ---------------- UI ---------------- */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/PageHeader";
import { Switch } from "@/components/ui/switch";

/* ---------------- Icons ---------------- */
import {
  HelpCircle,
  FileText,
  Video,
  Upload,
  Search,
  Edit2,
} from "lucide-react";

/* ---------------- API ---------------- */
import {
  getSupportFaqs,
  createSupportFaq,
  updateSupportFaq,
  deleteSupportFaq,
  getFeedbacks,
  updateFeedbackStatus,
} from "@/ApiService/helpandSupportFaq";

/* ---------------- Components ---------------- */
import { SupportFaqDialog } from "@/components/helpSupport/SupportFaqDialog";
import { DeleteFaqButton } from "@/components/helpSupport/DeleteFaqButton";

/* ---------------- Types ---------------- */
type FAQ = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  views?: number;
  helpful?: number;
  isActive: boolean;
};

type Feedback = {
  _id: string;
  type: string;
  message: string;
  status: "new" | "reviewed" | "resolved";
};

export default function HelpSupport() {
  /* ================= FAQ STATE ================= */
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [faqLoading, setFaqLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [faqDialogOpen, setFaqDialogOpen] = useState(false);
  const [editFaq, setEditFaq] = useState<FAQ | null>(null);

  /* ================= FEEDBACK STATE ================= */
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  /* ================= LOADERS ================= */
  const loadFaqs = async () => {
    setFaqLoading(true);
    try {
      const res = await getSupportFaqs();
      setFaqs(res?.data || []);
    } finally {
      setFaqLoading(false);
    }
  };

  const loadFeedbacks = async () => {
    setFeedbackLoading(true);
    try {
      const res = await getFeedbacks();
      setFeedbacks(res?.data || []);
    } finally {
      setFeedbackLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
    loadFeedbacks();
  }, []);

  /* ================= FAQ HANDLERS ================= */
  const handleSaveFaq = async (data: any) => {
    if (editFaq) {
      await updateSupportFaq(editFaq._id, data);
    } else {
      await createSupportFaq(data);
    }
    setFaqDialogOpen(false);
    setEditFaq(null);
    loadFaqs();
  };

  const handleDeleteFaq = async (id: string) => {
    await deleteSupportFaq(id);
    loadFaqs();
  };

  /* ================= FEEDBACK HANDLERS ================= */
  const toggleFeedbackStatus = async (fb: Feedback) => {
    const nextStatus =
      fb.status === "new"
        ? "reviewed"
        : fb.status === "reviewed"
        ? "resolved"
        : "new";

    await updateFeedbackStatus(fb._id, nextStatus);
    loadFeedbacks();
  };

  /* ================= FILTER ================= */
  const filteredFaqs = useMemo(() => {
    return faqs.filter((f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [faqs, searchQuery]);

  /* ================= STATS ================= */
  const totalFaqs = faqs.length;
  const activeFaqs = faqs.filter((f) => f.isActive).length;
  const totalViews = faqs.reduce((s, f) => s + (f.views || 0), 0);

  const getFeedbackBadge = (status: string) => {
    if (status === "new") return <Badge variant="secondary">New</Badge>;
    if (status === "reviewed")
      return <Badge className="bg-yellow-100 text-yellow-800">Reviewed</Badge>;
    return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Help & Support"
        description="Manage FAQs and bug reports"
      />

      {/* ================= STATS ================= */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total FAQs
            </CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFaqs}</div>
            <p className="text-xs text-muted-foreground">
              {activeFaqs} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total Views
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalViews.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Tutorials
            </CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
          </CardContent>
        </Card>
      </div>

      {/* ================= FAQ MANAGEMENT ================= */}
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>FAQ Management</CardTitle>
              <CardDescription>
                Add, edit or delete FAQs
              </CardDescription>
            </div>
            <Button onClick={() => setFaqDialogOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {!faqLoading && filteredFaqs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      No FAQs found
                    </TableCell>
                  </TableRow>
                )}

                {filteredFaqs.map((faq) => (
                  <TableRow key={faq._id}>
                    <TableCell className="font-medium max-w-md truncate">
                      {faq.question}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {faq.category || "—"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={faq.isActive ? "default" : "secondary"}>
                        {faq.isActive ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditFaq(faq);
                          setFaqDialogOpen(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <DeleteFaqButton
                        onDelete={() => handleDeleteFaq(faq._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ================= BUGS REPORTED ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Bugs reported</CardTitle>
          <CardDescription>
            Toggle status to review or resolve
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Toggle</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {!feedbackLoading && feedbacks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      No bugs reported
                    </TableCell>
                  </TableRow>
                )}

                {feedbacks.map((fb) => (
                  <TableRow key={fb._id}>
                    <TableCell className="capitalize">
                      {fb.type}
                    </TableCell>
                    <TableCell className="max-w-md truncate">
                      {fb.message}
                    </TableCell>
                    <TableCell>{getFeedbackBadge(fb.status)}</TableCell>
                    <TableCell className="text-right">
                      <Switch
                        checked={fb.status === "resolved"}
                        onCheckedChange={() => toggleFeedbackStatus(fb)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ================= FAQ DIALOG ================= */}
      <SupportFaqDialog
        open={faqDialogOpen}
        initialData={editFaq}
        onClose={() => {
          setFaqDialogOpen(false);
          setEditFaq(null);
        }}
        onSubmit={handleSaveFaq}
      />
    </div>
  );
}
