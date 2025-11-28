import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PageHeader } from "@/components/PageHeader";
import { WebsiteContent } from "@/components/website-content/WebsiteContent";
import { AlertCircle, Save } from "lucide-react";
import { toast } from "sonner";
import { WebsiteContentData } from "@/components/website-content/types";

const defaultContent: WebsiteContentData = {
  discountHeader: {
    enabled: false,
    message: "🎉 Special Offer! Get 20% off all plans this month",
    link: "/pricing",
    linkText: "View Plans",
  },
  home: {
    heroTitle: "Welcome to Portal 360",
    heroSubtitle: "The ultimate admin dashboard for managing your business",
    ctaText: "Get Started",
  },
  features: {
    title: "Powerful Features",
    subtitle: "Everything you need to manage your business effectively",
    feature1Title: "Analytics Dashboard",
    feature1Description: "Track your metrics in real-time with comprehensive analytics",
    feature2Title: "User Management",
    feature2Description: "Manage users and permissions with ease",
    feature3Title: "Secure & Reliable",
    feature3Description: "Enterprise-grade security for your peace of mind",
  },
  pricing: {
    title: "Simple, Transparent Pricing",
    subtitle: "Choose the plan that works best for you",
  },
  howItWorks: {
    title: "How It Works",
    step1Title: "Sign Up",
    step1Description: "Create your account in less than 2 minutes",
    step2Title: "Customize",
    step2Description: "Set up your workspace and invite your team",
    step3Title: "Launch",
    step3Description: "Start managing your business effectively",
  },
  blog: {
    post1Title: "Getting Started with Portal 360",
    post1Excerpt: "Learn how to set up your account and get the most out of our platform",
    post2Title: "10 Tips for Better Team Management",
    post2Excerpt: "Discover best practices for managing your team effectively",
  },
  faq: {
    question1: "What is Portal 360?",
    answer1: "Portal 360 is a comprehensive admin dashboard that helps you manage all aspects of your business in one place.",
    question2: "How much does it cost?",
    answer2: "We offer flexible pricing plans starting from free for small teams. Check our pricing page for more details.",
    question3: "Is there a free trial?",
    answer3: "Yes! All plans come with a 14-day free trial, no credit card required.",
  },
};

export default function WebsiteContentPage() {
  const [content, setContent] = useState<WebsiteContentData>(defaultContent);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("website-content");
    if (saved) {
      setContent(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem("website-content", JSON.stringify(content));
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Content saved successfully!");
    }, 500);
  };

  const updateContent = (section: keyof WebsiteContentData, field: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Website Content Management"
        description="Edit website content, manage discount alerts, and update landing pages"
        action={
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save All Changes"}
          </Button>
        }
      />

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          All changes are stored locally. Make sure to save before leaving this page.
        </AlertDescription>
      </Alert>

      <WebsiteContent content={content} onUpdateContent={updateContent} />
    </div>
  );
}