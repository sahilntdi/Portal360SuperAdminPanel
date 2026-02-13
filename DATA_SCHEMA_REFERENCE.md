# Website Content - Data Structure Reference

## Table of Contents
1. [How It Works Data Schema](#how-it-works-data-schema)
2. [FAQ Data Schema](#faq-data-schema)
3. [Testimonials Data Schema](#testimonials-data-schema)
4. [Blogs Data Schema](#blogs-data-schema)
5. [Modern Teams Data Schema](#modern-teams-data-schema)
6. [Superadmin Controls Data Schema](#superadmin-controls-data-schema)
7. [Integrations Data Schema](#integrations-data-schema)
8. [API Response Format](#api-response-format)

---

## How It Works Data Schema

### Object Structure
```typescript
{
  _id: string,                    // Auto-generated ID
  stepNumber: number,             // 1, 2, 3... (must be unique)
  title: string,                  // "Create Account"
  description: string,            // Long description text
  icon: string,                   // "UserCheck", "Brain", "Zap"
  createdAt: ISO8601,            // Auto-generated timestamp
  updatedAt: ISO8601             // Auto-generated timestamp
}
```

### API Endpoint
```
GET    /api/how-it-works              // Get all steps
POST   /api/how-it-works              // Add new step
PUT    /api/how-it-works/:id          // Update step
DELETE /api/how-it-works/:id          // Delete step
```

### Valid Icon Examples
```
Recommended: UserCheck, Brain, Zap, Rocket, Shield, Lock, Database, 
Settings, CheckCircle, Link, Eye, Plus, Code, Smartphone, Monitor,
BarChart3, Palette, Globe, Compass, Map, Target
```

---

## FAQ Data Schema

### Object Structure
```typescript
{
  _id: string,                    // Auto-generated ID
  question: string,               // "What is the pricing?"
  answer: string,                 // "Our pricing plans start at..."
  category: string,               // "general", "technical", "billing"
  order: number,                  // Display order (1, 2, 3...)
  createdAt: ISO8601,            // Auto-generated timestamp
  updatedAt: ISO8601             // Auto-generated timestamp
}
```

### API Endpoint
```
GET    /api/faqs                       // Get all FAQs
POST   /api/faqs                       // Add new FAQ
PUT    /api/faqs/:id                   // Update FAQ
DELETE /api/faqs/:id                   // Delete FAQ
```

### Valid Categories
```
- "general"     → General questions about the product
- "technical"   → Technical/How-to questions
- "billing"     → Pricing and payment questions
- "features"    → Questions about specific features
- "support"     → Support and troubleshooting
- "account"     → Account management questions
```

---

## Testimonials Data Schema

### Object Structure
```typescript
{
  _id: string,                    // Auto-generated ID
  name: string,                   // "John Johnson"
  designation: string,            // "CEO", "Manager", "VP Engineering"
  company: string,                // "TechCorp Inc."
  message: string,                // "This product helped us increase..."
  rating: number,                 // 1, 2, 3, 4, or 5
  order: number,                  // Display order (1, 2, 3...)
  createdAt: ISO8601,            // Auto-generated timestamp
  updatedAt: ISO8601             // Auto-generated timestamp
}
```

### API Endpoint
```
GET    /api/testimonials                // Get all testimonials
POST   /api/testimonials                // Add new testimonial
PUT    /api/testimonials/:id            // Update testimonial
DELETE /api/testimonials/:id            // Delete testimonial
```

### Rating Scale
```
1 = ⭐ Poor
2 = ⭐⭐ Fair
3 = ⭐⭐⭐ Good
4 = ⭐⭐⭐⭐ Very Good
5 = ⭐⭐⭐⭐⭐ Excellent
```

---

## Blogs Data Schema

### Object Structure
```typescript
{
  _id: string,                    // Auto-generated ID
  title: string,                  // "10 Tips for Better Management"
  excerpt: string,                // Short summary (2-3 sentences)
  content: string,                // Full blog post content
  date: ISO8601,                  // Publication date (e.g., 2024-02-15)
  readTime: string,               // "5 min read", "10 mins", "15 min"
  category: string,               // "tips", "news", "tutorials", etc.
  slug: string,                   // "10-tips-better-management" (auto URL)
  image: string,                  // Image URL or path
  imageFile?: File,               // File object during upload
  author?: string,                // Optional: Author name
  tags?: string[],                // Optional: Array of tags
  createdAt: ISO8601,            // Auto-generated timestamp
  updatedAt: ISO8601             // Auto-generated timestamp
}
```

### API Endpoint
```
GET    /api/blogs                       // Get all blogs
POST   /api/blogs                       // Add new blog (FormData with image)
PUT    /api/blogs/:id                   // Update blog (FormData with image)
DELETE /api/blogs/:id                   // Delete blog
```

### Image Details
```
- Accepted formats: PNG, JPG, WebP
- Max size: 2MB
- Recommended dimensions: 800x600px
- Aspect ratio: 4:3 (landscape)
```

### Valid Categories
```
- "tips"        → Tips and tricks
- "news"        → Company/industry news
- "tutorials"   → How-to guides and tutorials
- "updates"     → Product updates and releases
- "case-study"  → Success stories and case studies
- "announcement" → Important announcements
- "insights"    → Industry insights
```

### Slug Generation
```
Input:  "My Amazing Blog Post"
Output: "my-amazing-blog-post"

Rules:
- Convert to lowercase
- Replace spaces with hyphens
- Remove special characters
- Remove accents
```

---

## Modern Teams Data Schema

### Object Structure
```typescript
{
  _id: string,                    // Auto-generated ID
  title: string,                  // "Full-Stack Development"
  description: string,            // "Our team of expert developers..."
  icon: string,                   // "Code", "Users", "Palette", "Brain"
  image?: string,                 // Image URL or path (optional)
  imageFile?: File,               // File object during upload
  createdAt: ISO8601,            // Auto-generated timestamp
  updatedAt: ISO8601             // Auto-generated timestamp
}
```

### API Endpoint
```
GET    /api/modern-teams                // Get all teams
POST   /api/modern-teams                // Add new team (FormData with image)
PUT    /api/modern-teams/:id            // Update team (FormData with image)
DELETE /api/modern-teams/:id            // Delete team
```

### Image Details
```
- Accepted formats: PNG, JPG, WebP
- Max size: 2MB
- Recommended dimensions: 600x400px
- Aspect ratio: 3:2 (landscape)
```

### Popular Icons for Teams
```
"Code"          → Development/Engineering
"Users"         → People/HR/Team
"Brain"         → Strategy/Innovation/Thinking
"Zap"           → Product/Energy/Speed
"BarChart3"     → Analytics/Data/Metrics
"Palette"       → Design/Creativity
"Smartphone"    → Mobile/App Development
"Monitor"       → Desktop/Web Development
"Globe"         → Global/Remote/International
"Shield"        → Security/Safety
"Database"      → Data/Backend
"Settings"      → Infrastructure/DevOps
```

---

## Superadmin Controls Data Schema

### Object Structure
```typescript
{
  _id: string,                    // Auto-generated ID
  icon: string,                   // "Lock", "BarChart3", "Shield"
  title: string,                  // "User Management"
  description: string,            // "Manage user accounts and permissions..."
  createdAt: ISO8601,            // Auto-generated timestamp
  updatedAt: ISO8601             // Auto-generated timestamp
}
```

### API Endpoint
```
GET    /api/superadmin-controls             // Get all controls
POST   /api/superadmin-controls             // Add new control
PUT    /api/superadmin-controls/:id         // Update control
DELETE /api/superadmin-controls/:id         // Delete control
```

### Recommended Control Icons
```
"Lock"              → Permissions & Access Control
"BarChart3"         → Analytics & Dashboard
"Shield"            → Security & Protection
"Settings"          → Configuration & Settings
"Users"             → User Management
"Bell"              → Notifications & Alerts
"Database"          → Data Management
"Eye"               → Monitoring & Visibility
"Trash2"            → Delete & Cleanup
"Key"               → API Keys & Authentication
"Sliders"           → Adjustable Settings
"Server"            → Server Management
"AlertCircle"       → System Alerts
"FileText"          → Documentation & Logs
"Activity"          → Activity Monitoring
```

---

## Integrations Data Schema

### Object Structure
```typescript
{
  _id: string,                    // Auto-generated ID
  name: string,                   // "Slack", "Salesforce", "Zapier"
  order: number,                  // Display order (1, 2, 3...)
  logo: string,                   // Logo URL or path
  logoFile?: File,                // File object during upload
  logoUrl?: string,               // Direct URL if using URL mode
  createdAt: ISO8601,            // Auto-generated timestamp
  updatedAt: ISO8601             // Auto-generated timestamp
}
```

### API Endpoint
```
GET    /api/integrations                  // Get all integrations
POST   /api/integrations                  // Add new integration (FormData or JSON)
PUT    /api/integrations/:id              // Update integration
DELETE /api/integrations/:id              // Delete integration
```

### Image Details
```
- Accepted formats: PNG, JPG, SVG, WebP
- Max size: 2MB
- Recommended dimensions: 200x200px (square)
- Background: Transparent or solid color
```

### Logo Input Methods
```
Method 1: File Upload
- Click "Upload File"
- Select logo from computer
- Max 2MB

Method 2: URL
- Click "Use URL"
- Paste logo URL
- No file needed
```

### Common Integration Names
```
Slack
Salesforce
Zapier
Stripe
HubSpot
Mailchimp
Asana
Jira
GitHub
Bitbucket
Azure
AWS
Google Cloud
Twilio
SendGrid
```

---

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Your data object(s)
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Error message for field"
    }
  ]
}
```

### List Response
```json
{
  "success": true,
  "data": {
    "steps": [],      // or "faqs", "testimonials", "blogs", etc.
    "total": 10,
    "page": 1,
    "limit": 50
  }
}
```

---

## Field Validation Rules

### General Rules
```
- Title/Name: Max 255 characters
- Slug: Must be URL-safe (lowercase, hyphens)
- Description/Message: Max 5000 characters
- Email: Valid email format
- URL: Valid HTTP/HTTPS URL
- Date: ISO 8601 format (YYYY-MM-DD)
```

### Specific Field Rules
```
Step Number (How It Works):
  - Type: Integer
  - Min: 1
  - Unique: Yes (no duplicates)
  - Required: Yes

Rating (Testimonials):
  - Type: Integer
  - Min: 1
  - Max: 5
  - Required: No (default: 5)

Order (FAQ, Testimonials, Integrations):
  - Type: Integer
  - Min: 1
  - Required: No (default: 1)

Read Time (Blogs):
  - Format: "X min", "X min read", "X mins"
  - Required: Yes

Slug (Blogs):
  - Format: URL-safe (lowercase-with-hyphens)
  - Auto-generated from title
  - Editable before submission
```

---

## Common Field Combinations

### How It Works Item
```
Required:
  ✓ stepNumber
  ✓ title
  ✓ description

Optional:
  - icon
```

### FAQ Item
```
Required:
  ✓ question
  ✓ answer

Optional:
  - category
  - order
```

### Testimonial Item
```
Required:
  ✓ name
  ✓ designation
  ✓ company
  ✓ message

Optional:
  - rating
  - order
```

### Blog Item
```
Required:
  ✓ title
  ✓ excerpt
  ✓ content
  ✓ date
  ✓ readTime
  ✓ category
  ✓ image

Optional:
  - author
  - tags
```

### Modern Team Item
```
Required:
  ✓ title
  ✓ description
  ✓ icon

Optional:
  - image
```

### Superadmin Control Item
```
Required:
  ✓ icon
  ✓ title
  ✓ description
```

### Integration Item
```
Required:
  ✓ name
  ✓ order
  ✓ logo

Optional: None
```

---

## TypeScript Interfaces

```typescript
// How It Works
interface Step {
  _id?: string;
  stepNumber: number;
  title: string;
  description: string;
  icon?: string;
}

// FAQ
interface FAQ {
  _id?: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

// Testimonial
interface Testimonial {
  _id?: string;
  name: string;
  designation: string;
  company: string;
  message: string;
  rating?: number;
  order?: number;
}

// Blog
interface Blog {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  image?: string;
  imageFile?: File;
}

// Modern Team
interface ModernTeam {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  imageFile?: File;
}

// Superadmin Control
interface SuperadminControl {
  _id?: string;
  icon: string;
  title: string;
  description: string;
}

// Integration
interface Integration {
  _id?: string;
  name: string;
  order: number;
  logo?: string;
  logoFile?: File;
  logoUrl?: string;
}
```

---

## Version Info
- **Last Updated**: February 6, 2026
- **API Version**: v1
- **Frontend Framework**: React + TypeScript
- **UI Library**: Shadcn/ui
- **Icons**: Lucide React
