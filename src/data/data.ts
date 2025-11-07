// Dashboard Metrics
export const dashboardMetrics = {
  totalOrganizations: 48,
  totalUsers: 1247,
  activeSubscriptions: 38,
  monthlyRevenue: "$45,230",
  trends: {
    organizations: { value: "12%", isPositive: true },
    users: { value: "18%", isPositive: true },
    subscriptions: { value: "3", isPositive: true },
    revenue: { value: "23%", isPositive: true },
  },
};

// Organizations Growth Data
export const organizationsGrowthData = [
  { month: "Jan", organizations: 30 },
  { month: "Feb", organizations: 35 },
  { month: "Mar", organizations: 32 },
  { month: "Apr", organizations: 40 },
  { month: "May", organizations: 45 },
  { month: "Jun", organizations: 48 },
];

// User Activity Data
export const userActivityData = [
  { month: "Jan", active: 850, inactive: 150 },
  { month: "Feb", active: 920, inactive: 180 },
  { month: "Mar", active: 880, inactive: 170 },
  { month: "Apr", active: 1050, inactive: 200 },
  { month: "May", active: 1150, inactive: 180 },
  { month: "Jun", active: 1247, inactive: 165 },
];

// Organizations
export const organizations = [
  {
    id: 1,
    name: "Acme Corp",
    users: 45,
    plan: "Enterprise",
    status: "active",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "TechStart Inc",
    users: 12,
    plan: "Premium",
    status: "active",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Global Solutions",
    users: 78,
    plan: "Enterprise",
    status: "active",
    lastActive: "5 minutes ago",
  },
  {
    id: 4,
    name: "Innovation Labs",
    users: 23,
    plan: "Basic",
    status: "inactive",
    lastActive: "3 days ago",
  },
  {
    id: 5,
    name: "Digital Ventures",
    users: 56,
    plan: "Premium",
    status: "active",
    lastActive: "1 hour ago",
  },
];

// Users
export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@acmecorp.com",
    organization: "Acme Corp",
    role: "Admin",
    status: "active",
    lastLogin: "2 hours ago",
    avatar: "JD",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@techstart.com",
    organization: "TechStart Inc",
    role: "User",
    status: "active",
    lastLogin: "1 day ago",
    avatar: "SS",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@global.com",
    organization: "Global Solutions",
    role: "Admin",
    status: "active",
    lastLogin: "5 minutes ago",
    avatar: "MJ",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@innovation.com",
    organization: "Innovation Labs",
    role: "User",
    status: "inactive",
    lastLogin: "1 week ago",
    avatar: "EB",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@digital.com",
    organization: "Digital Ventures",
    role: "Manager",
    status: "active",
    lastLogin: "3 hours ago",
    avatar: "DW",
  },
];

// Subscriptions
export const subscriptions = [
  {
    id: 1,
    organization: "Acme Corp",
    plan: "Premium",
    price: "$299/mo",
    status: "active",
    nextBilling: "Jan 15, 2025",
    paymentStatus: "success",
  },
  {
    id: 2,
    organization: "TechStart Inc",
    plan: "Basic",
    price: "$99/mo",
    status: "active",
    nextBilling: "Jan 20, 2025",
    paymentStatus: "success",
  },
  {
    id: 3,
    organization: "Global Solutions",
    plan: "Enterprise",
    price: "$999/mo",
    status: "active",
    nextBilling: "Jan 18, 2025",
    paymentStatus: "success",
  },
  {
    id: 4,
    organization: "Innovation Labs",
    plan: "Premium",
    price: "$299/mo",
    status: "past_due",
    nextBilling: "Jan 10, 2025",
    paymentStatus: "failed",
  },
];

// Pricing Plans
export const pricingPlans = [
  {
    id: 1,
    name: "Basic",
    price: "$99",
    interval: "monthly",
    features: ["5 Users", "10 Projects", "Basic Support"],
    status: "active",
    subscribers: 45,
  },
  {
    id: 2,
    name: "Premium",
    price: "$299",
    interval: "monthly",
    features: ["25 Users", "Unlimited Projects", "Priority Support", "Advanced Analytics"],
    status: "active",
    subscribers: 28,
  },
  {
    id: 3,
    name: "Enterprise",
    price: "$999",
    interval: "monthly",
    features: ["Unlimited Users", "Unlimited Projects", "Dedicated Support", "Custom Integrations"],
    status: "active",
    subscribers: 12,
  },
];

// Coupons
export const coupons = [
  {
    id: 1,
    code: "WELCOME20",
    discount: "20%",
    type: "percentage",
    status: "active",
    uses: 156,
    maxUses: 500,
    expiresAt: "Mar 31, 2025",
  },
  {
    id: 2,
    code: "ANNUAL50",
    discount: "$50",
    type: "fixed",
    status: "active",
    uses: 89,
    maxUses: 200,
    expiresAt: "Dec 31, 2025",
  },
  {
    id: 3,
    code: "FLASH30",
    discount: "30%",
    type: "percentage",
    status: "expired",
    uses: 234,
    maxUses: 250,
    expiresAt: "Jan 15, 2025",
  },
];

// Feature Modules
export const featureModules = [
  {
    id: 1,
    name: "Conversations",
    description: "Real-time messaging and collaboration",
    status: "enabled",
    adoption: 85,
    enabledFor: 42,
  },
  {
    id: 2,
    name: "Gantt Charts",
    description: "Project timeline visualization",
    status: "enabled",
    adoption: 67,
    enabledFor: 38,
  },
  {
    id: 3,
    name: "Advanced Analytics",
    description: "Detailed insights and reporting",
    status: "enabled",
    adoption: 72,
    enabledFor: 35,
  },
  {
    id: 4,
    name: "Custom Workflows",
    description: "Automated process management",
    status: "beta",
    adoption: 45,
    enabledFor: 22,
  },
];

// Onboarding Templates
export const onboardingTemplates = [
  {
    id: 1,
    name: "Standard Onboarding",
    questions: 8,
    usedBy: 32,
    status: "active",
  },
  {
    id: 2,
    name: "Enterprise Setup",
    questions: 15,
    usedBy: 12,
    status: "active",
  },
  {
    id: 3,
    name: "Quick Start",
    questions: 5,
    usedBy: 28,
    status: "active",
  },
];

// FAQs
export const faqs = [
  {
    id: 1,
    question: "How do I reset my password?",
    category: "Account",
    views: 1234,
    helpful: 892,
    status: "published",
  },
  {
    id: 2,
    question: "How to upgrade my subscription plan?",
    category: "Billing",
    views: 856,
    helpful: 734,
    status: "published",
  },
  {
    id: 3,
    question: "What are the system requirements?",
    category: "Technical",
    views: 645,
    helpful: 521,
    status: "published",
  },
  {
    id: 4,
    question: "How to add new team members?",
    category: "Account",
    views: 923,
    helpful: 812,
    status: "published",
  },
];

// Tutorials
export const tutorials = [
  {
    id: 1,
    title: "Getting Started Guide",
    duration: "15 min",
    category: "Basics",
    completions: 456,
  },
  {
    id: 2,
    title: "Advanced Features Overview",
    duration: "25 min",
    category: "Advanced",
    completions: 234,
  },
  {
    id: 3,
    title: "Integration Setup",
    duration: "20 min",
    category: "Technical",
    completions: 189,
  },
];

// Analytics - Revenue Data
export const revenueData = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 35000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 42000 },
  { month: "May", revenue: 41000 },
  { month: "Jun", revenue: 45230 },
];

// Analytics - Usage Stats
export const usageStats = [
  { metric: "Tasks Created", value: 12458, change: "+12%" },
  { metric: "Active Users", value: 1247, change: "+8%" },
  { metric: "Messages Sent", value: 45678, change: "+23%" },
  { metric: "Storage Used", value: "234 GB", change: "+15%" },
];

// Analytics - Top Organizations
export const topOrganizations = [
  { name: "Global Solutions", tasks: 2345, users: 78, revenue: "$999/mo" },
  { name: "Digital Ventures", tasks: 1890, users: 56, revenue: "$299/mo" },
  { name: "Acme Corp", tasks: 1567, users: 45, revenue: "$299/mo" },
];

// Analytics - System Logs
export const systemLogs = [
  {
    id: 1,
    timestamp: "2025-01-10 14:23:15",
    type: "error",
    message: "Payment processing failed for org #145",
    severity: "high",
  },
  {
    id: 2,
    timestamp: "2025-01-10 14:15:42",
    type: "warning",
    message: "High API usage detected for org #89",
    severity: "medium",
  },
  {
    id: 3,
    timestamp: "2025-01-10 13:58:30",
    type: "info",
    message: "System backup completed successfully",
    severity: "low",
  },
];

// Security - Alerts
export const securityAlerts = [
  {
    id: 1,
    type: "Failed Login Attempts",
    count: 5,
    organization: "Acme Corp",
    severity: "high",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "Unusual API Activity",
    count: 12,
    organization: "TechStart Inc",
    severity: "medium",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "Password Reset Request",
    count: 1,
    organization: "Global Solutions",
    severity: "low",
    time: "1 day ago",
  },
];

// Security - Admin Roles
export const adminRoles = [
  {
    id: 1,
    name: "John Admin",
    email: "john@portal360.com",
    role: "Super Admin",
    permissions: "Full Access",
    status: "active",
    lastActive: "5 minutes ago",
  },
  {
    id: 2,
    name: "Sarah Manager",
    email: "sarah@portal360.com",
    role: "Support Admin",
    permissions: "Support & Users",
    status: "active",
    lastActive: "2 hours ago",
  },
  {
    id: 3,
    name: "Mike Analyst",
    email: "mike@portal360.com",
    role: "Analytics Admin",
    permissions: "Read Only",
    status: "active",
    lastActive: "1 day ago",
  },
];

// Security - Audit Logs
export const auditLogs = [
  {
    id: 1,
    admin: "John Admin",
    action: "Updated subscription for Acme Corp",
    timestamp: "2025-01-10 14:30:22",
    ipAddress: "192.168.1.1",
  },
  {
    id: 2,
    admin: "Sarah Manager",
    action: "Reset password for user@techstart.com",
    timestamp: "2025-01-10 13:45:18",
    ipAddress: "192.168.1.5",
  },
  {
    id: 3,
    admin: "John Admin",
    action: "Deactivated organization Innovation Labs",
    timestamp: "2025-01-10 12:15:33",
    ipAddress: "192.168.1.1",
  },
];

// Email Triggers
export const emailTriggers = [
  {
    id: 1,
    name: "Trial Expiry Warning",
    event: "Trial expiring in 3 days",
    status: "active",
    timing: "3 days before expiry",
    lastSent: "2024-01-14",
    sentCount: 45,
  },
  {
    id: 2,
    name: "Payment Failed",
    event: "Payment unsuccessful",
    status: "active",
    timing: "Immediate",
    lastSent: "2024-01-15",
    sentCount: 12,
  },
  {
    id: 3,
    name: "Subscription Renewal",
    event: "Subscription renewed successfully",
    status: "active",
    timing: "Immediate",
    lastSent: "2024-01-15",
    sentCount: 89,
  },
  {
    id: 4,
    name: "Task Overdue",
    event: "Task past due date",
    status: "inactive",
    timing: "1 day after due date",
    lastSent: "2024-01-10",
    sentCount: 23,
  },
  {
    id: 5,
    name: "Welcome Email",
    event: "New user signup",
    status: "active",
    timing: "Immediate",
    lastSent: "2024-01-15",
    sentCount: 156,
  },
];

// AI Features
export const aiFeatures = [
  {
    id: "1",
    name: "Client Detection AI",
    status: "Active",
    threshold: "85% confidence",
    dataAccess: "Full",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    name: "Auto Task Suggestions",
    status: "Active",
    threshold: "75% relevance",
    dataAccess: "Limited",
    lastUpdated: "2024-01-14",
  },
  {
    id: "3",
    name: "Smart Categorization",
    status: "Active",
    threshold: "80% accuracy",
    dataAccess: "Full",
    lastUpdated: "2024-01-13",
  },
  {
    id: "4",
    name: "Predictive Analytics",
    status: "Paused",
    threshold: "90% confidence",
    dataAccess: "Limited",
    lastUpdated: "2024-01-10",
  },
  {
    id: "5",
    name: "Sentiment Analysis",
    status: "Active",
    threshold: "70% accuracy",
    dataAccess: "Full",
    lastUpdated: "2024-01-15",
  },
];

// Role Templates
export const roleTemplates = [
  {
    id: "1",
    name: "Super Admin",
    permissions: "All Access",
    users: 3,
    description: "Full system access and control",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Organization Admin",
    permissions: "Organization Management",
    users: 12,
    description: "Manage organization settings and users",
    createdAt: "2024-01-05",
  },
  {
    id: "3",
    name: "Support Team",
    permissions: "Read + Support Actions",
    users: 8,
    description: "View data and provide customer support",
    createdAt: "2024-01-08",
  },
  {
    id: "4",
    name: "Billing Manager",
    permissions: "Billing + Subscriptions",
    users: 5,
    description: "Manage payments and subscriptions",
    createdAt: "2024-01-10",
  },
  {
    id: "5",
    name: "Auditor",
    permissions: "Read Only",
    users: 2,
    description: "View-only access for compliance",
    createdAt: "2024-01-12",
  },
];

// Data Residency
export const dataResidency = [
  {
    id: "1",
    region: "European Union",
    status: "Active",
    organizations: 145,
    dataCenter: "Frankfurt, Germany",
    compliance: "GDPR Compliant",
  },
  {
    id: "2",
    region: "United States",
    status: "Active",
    organizations: 312,
    dataCenter: "Oregon, USA",
    compliance: "SOC 2 Type II",
  },
  {
    id: "3",
    region: "Asia Pacific",
    status: "Active",
    organizations: 89,
    dataCenter: "Singapore",
    compliance: "ISO 27001",
  },
  {
    id: "4",
    region: "United Kingdom",
    status: "Active",
    organizations: 67,
    dataCenter: "London, UK",
    compliance: "UK GDPR",
  },
];

// Compliance Reports
export const complianceReports = [
  {
    id: "1",
    reportName: "GDPR Compliance Report",
    generatedDate: "2024-01-15",
    period: "Q4 2023",
    status: "Available",
    size: "2.4 MB",
  },
  {
    id: "2",
    reportName: "SOC 2 Audit Report",
    generatedDate: "2024-01-10",
    period: "2023 Annual",
    status: "Available",
    size: "5.8 MB",
  },
  {
    id: "3",
    reportName: "Security Assessment",
    generatedDate: "2024-01-05",
    period: "Q4 2023",
    status: "Available",
    size: "1.9 MB",
  },
  {
    id: "4",
    reportName: "Data Processing Report",
    generatedDate: "2023-12-20",
    period: "Q4 2023",
    status: "Available",
    size: "3.2 MB",
  },
];

// Email Triggers Metrics
export const emailTriggersMetrics = {
  activeTriggers: "4",
  emailsSentToday: "234",
  pendingTriggers: "18",
  failedDeliveries: "3",
};

// AI Automation Metrics
export const aiAutomationMetrics = {
  activeFeatures: "5",
  suggestionsGenerated: "12.4K",
  detectionAccuracy: "94.2%",
  apiCalls: "245K",
};

// Compliance Metrics
export const complianceMetrics = {
  activePolicies: "12",
  twoFactorEnabled: "89%",
  complianceScore: "98.5%",
  lastAudit: "15 days",
};
