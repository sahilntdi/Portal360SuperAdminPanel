import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/PageHeader";
import { AlertCircle, Save, Eye } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface WebsiteContentData {
  discountHeader: {
    enabled: boolean;
    message: string;
    link: string;
    linkText: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    ctaText: string;
  };
  features: {
    title: string;
    subtitle: string;
    feature1Title: string;
    feature1Description: string;
    feature2Title: string;
    feature2Description: string;
    feature3Title: string;
    feature3Description: string;
  };
  pricing: {
    title: string;
    subtitle: string;
  };
  howItWorks: {
    title: string;
    step1Title: string;
    step1Description: string;
    step2Title: string;
    step2Description: string;
    step3Title: string;
    step3Description: string;
  };
  blog: {
    post1Title: string;
    post1Excerpt: string;
    post2Title: string;
    post2Excerpt: string;
  };
  faq: {
    question1: string;
    answer1: string;
    question2: string;
    answer2: string;
    question3: string;
    answer3: string;
  };
}

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

export default function WebsiteContent() {
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

      <Tabs defaultValue="discount" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="discount">Alert</TabsTrigger>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="howitworks">How It Works</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="discount">
          <Card>
            <CardHeader>
              <CardTitle>Discount Header Alert</CardTitle>
              <CardDescription>
                Manage the promotional banner that appears at the top of your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="discount-enabled"
                  checked={content.discountHeader.enabled}
                  onCheckedChange={(checked) =>
                    updateContent("discountHeader", "enabled", checked)
                  }
                />
                <Label htmlFor="discount-enabled">Enable discount header</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount-message">Alert Message</Label>
                <Input
                  id="discount-message"
                  value={content.discountHeader.message}
                  onChange={(e) => updateContent("discountHeader", "message", e.target.value)}
                  placeholder="Enter your promotional message"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount-link">Link URL</Label>
                  <Input
                    id="discount-link"
                    value={content.discountHeader.link}
                    onChange={(e) => updateContent("discountHeader", "link", e.target.value)}
                    placeholder="/pricing"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount-link-text">Link Text</Label>
                  <Input
                    id="discount-link-text"
                    value={content.discountHeader.linkText}
                    onChange={(e) => updateContent("discountHeader", "linkText", e.target.value)}
                    placeholder="View Plans"
                  />
                </div>
              </div>

              {content.discountHeader.enabled && (
                <Alert>
                  <Eye className="h-4 w-4" />
                  <AlertDescription>
                    Preview: {content.discountHeader.message} -{" "}
                    <span className="underline">{content.discountHeader.linkText}</span>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="home">
          <Card>
            <CardHeader>
              <CardTitle>Home Page Content</CardTitle>
              <CardDescription>Edit your homepage hero section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Hero Title</Label>
                <Input
                  id="hero-title"
                  value={content.home.heroTitle}
                  onChange={(e) => updateContent("home", "heroTitle", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                <Textarea
                  id="hero-subtitle"
                  value={content.home.heroSubtitle}
                  onChange={(e) => updateContent("home", "heroSubtitle", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta-text">Call to Action Button Text</Label>
                <Input
                  id="cta-text"
                  value={content.home.ctaText}
                  onChange={(e) => updateContent("home", "ctaText", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Features Page Content</CardTitle>
              <CardDescription>Edit your features section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="features-title">Section Title</Label>
                  <Input
                    id="features-title"
                    value={content.features.title}
                    onChange={(e) => updateContent("features", "title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="features-subtitle">Section Subtitle</Label>
                  <Input
                    id="features-subtitle"
                    value={content.features.subtitle}
                    onChange={(e) => updateContent("features", "subtitle", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Feature 1</h4>
                <div className="space-y-2">
                  <Label htmlFor="feature1-title">Title</Label>
                  <Input
                    id="feature1-title"
                    value={content.features.feature1Title}
                    onChange={(e) => updateContent("features", "feature1Title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feature1-desc">Description</Label>
                  <Textarea
                    id="feature1-desc"
                    value={content.features.feature1Description}
                    onChange={(e) =>
                      updateContent("features", "feature1Description", e.target.value)
                    }
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Feature 2</h4>
                <div className="space-y-2">
                  <Label htmlFor="feature2-title">Title</Label>
                  <Input
                    id="feature2-title"
                    value={content.features.feature2Title}
                    onChange={(e) => updateContent("features", "feature2Title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feature2-desc">Description</Label>
                  <Textarea
                    id="feature2-desc"
                    value={content.features.feature2Description}
                    onChange={(e) =>
                      updateContent("features", "feature2Description", e.target.value)
                    }
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Feature 3</h4>
                <div className="space-y-2">
                  <Label htmlFor="feature3-title">Title</Label>
                  <Input
                    id="feature3-title"
                    value={content.features.feature3Title}
                    onChange={(e) => updateContent("features", "feature3Title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feature3-desc">Description</Label>
                  <Textarea
                    id="feature3-desc"
                    value={content.features.feature3Description}
                    onChange={(e) =>
                      updateContent("features", "feature3Description", e.target.value)
                    }
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Page Content</CardTitle>
              <CardDescription>Edit your pricing page header</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pricing-title">Section Title</Label>
                <Input
                  id="pricing-title"
                  value={content.pricing.title}
                  onChange={(e) => updateContent("pricing", "title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pricing-subtitle">Section Subtitle</Label>
                <Input
                  id="pricing-subtitle"
                  value={content.pricing.subtitle}
                  onChange={(e) => updateContent("pricing", "subtitle", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="howitworks">
          <Card>
            <CardHeader>
              <CardTitle>How It Works Section</CardTitle>
              <CardDescription>Edit the step-by-step guide</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="howitworks-title">Section Title</Label>
                <Input
                  id="howitworks-title"
                  value={content.howItWorks.title}
                  onChange={(e) => updateContent("howItWorks", "title", e.target.value)}
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Step 1</h4>
                <div className="space-y-2">
                  <Label htmlFor="step1-title">Title</Label>
                  <Input
                    id="step1-title"
                    value={content.howItWorks.step1Title}
                    onChange={(e) => updateContent("howItWorks", "step1Title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="step1-desc">Description</Label>
                  <Textarea
                    id="step1-desc"
                    value={content.howItWorks.step1Description}
                    onChange={(e) =>
                      updateContent("howItWorks", "step1Description", e.target.value)
                    }
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Step 2</h4>
                <div className="space-y-2">
                  <Label htmlFor="step2-title">Title</Label>
                  <Input
                    id="step2-title"
                    value={content.howItWorks.step2Title}
                    onChange={(e) => updateContent("howItWorks", "step2Title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="step2-desc">Description</Label>
                  <Textarea
                    id="step2-desc"
                    value={content.howItWorks.step2Description}
                    onChange={(e) =>
                      updateContent("howItWorks", "step2Description", e.target.value)
                    }
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Step 3</h4>
                <div className="space-y-2">
                  <Label htmlFor="step3-title">Title</Label>
                  <Input
                    id="step3-title"
                    value={content.howItWorks.step3Title}
                    onChange={(e) => updateContent("howItWorks", "step3Title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="step3-desc">Description</Label>
                  <Textarea
                    id="step3-desc"
                    value={content.howItWorks.step3Description}
                    onChange={(e) =>
                      updateContent("howItWorks", "step3Description", e.target.value)
                    }
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>Manage your blog post previews</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Post 1</h4>
                <div className="space-y-2">
                  <Label htmlFor="post1-title">Title</Label>
                  <Input
                    id="post1-title"
                    value={content.blog.post1Title}
                    onChange={(e) => updateContent("blog", "post1Title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post1-excerpt">Excerpt</Label>
                  <Textarea
                    id="post1-excerpt"
                    value={content.blog.post1Excerpt}
                    onChange={(e) => updateContent("blog", "post1Excerpt", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Post 2</h4>
                <div className="space-y-2">
                  <Label htmlFor="post2-title">Title</Label>
                  <Input
                    id="post2-title"
                    value={content.blog.post2Title}
                    onChange={(e) => updateContent("blog", "post2Title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post2-excerpt">Excerpt</Label>
                  <Textarea
                    id="post2-excerpt"
                    value={content.blog.post2Excerpt}
                    onChange={(e) => updateContent("blog", "post2Excerpt", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Manage your FAQ content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Question 1</h4>
                <div className="space-y-2">
                  <Label htmlFor="q1">Question</Label>
                  <Input
                    id="q1"
                    value={content.faq.question1}
                    onChange={(e) => updateContent("faq", "question1", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="a1">Answer</Label>
                  <Textarea
                    id="a1"
                    value={content.faq.answer1}
                    onChange={(e) => updateContent("faq", "answer1", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Question 2</h4>
                <div className="space-y-2">
                  <Label htmlFor="q2">Question</Label>
                  <Input
                    id="q2"
                    value={content.faq.question2}
                    onChange={(e) => updateContent("faq", "question2", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="a2">Answer</Label>
                  <Textarea
                    id="a2"
                    value={content.faq.answer2}
                    onChange={(e) => updateContent("faq", "answer2", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Question 3</h4>
                <div className="space-y-2">
                  <Label htmlFor="q3">Question</Label>
                  <Input
                    id="q3"
                    value={content.faq.question3}
                    onChange={(e) => updateContent("faq", "question3", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="a3">Answer</Label>
                  <Textarea
                    id="a3"
                    value={content.faq.answer3}
                    onChange={(e) => updateContent("faq", "answer3", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
