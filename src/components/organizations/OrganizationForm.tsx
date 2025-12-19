"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Mail,
  User,
  Building2,
  CreditCard,
  Users,
  Lock
} from "lucide-react";
import OptionCard from "@/utils/OptionCard";
import { usePricingPlans } from "@/ApiService/PricingPlans";
import type { CreateOrganizationData, Organization, UpdateOrganizationData } from "@/types/organizations";

// Form Schema
const organizationSchema = z.object({
  // Step 1
  email: z.string().email("Valid email required"),

  // Step 2
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal('')),

  // Step 3
  businessName: z.string().min(3, "Business name required"),

  // Step 4
  practiceName: z.string().min(1, "Practice name required"),

  // Step 5
  nature: z.array(z.string()).min(1, "Select at least one business nature"),

  // Step 6
  structure: z.object({
    partners: z.string().min(1, "Required"),
    partnersOther: z.string().optional(),
    admin: z.string().min(1, "Required"),
    adminOther: z.string().optional(),
    accountants: z.string().min(1, "Required"),
    accountantsOther: z.string().optional(),
    clients: z.string().min(1, "Required"),
    clientsOther: z.string().optional(),
  }),

  // Step 7
  plan: z.string().min(1, "Select a plan"),
  paymentOption: z.enum(["unpaid", "alreadyPaid"], {
    required_error: "Select a payment option",
  }),
  clientsRange: z.string().optional(),
});

type OrganizationFormValues = z.infer<typeof organizationSchema>;

const NATURE_OPTIONS = [
  { id: "accounting", label: "Accounting", comingSoon: false },
  { id: "tax", label: "Tax", comingSoon: false },
  { id: "marketing", label: "Marketing", comingSoon: true },
  { id: "consulting", label: "Consulting", comingSoon: true },
  { id: "legal", label: "Legal", comingSoon: true },
  { id: "finance", label: "Finance", comingSoon: true },
  { id: "it-services", label: "IT Services", comingSoon: true },
  { id: "real-estate", label: "Real Estate", comingSoon: true },
  { id: "healthcare", label: "Healthcare", comingSoon: true },
];

const BRACKETS = ["None", "1-2", "3-5", "6-10", "Other"];

interface OrganizationFormProps {
  initialData?: Organization | null;
  onSubmit: (data: CreateOrganizationData | UpdateOrganizationData) => Promise<void>;
  loading?: boolean;
  mode?: "add" | "edit";
  onCancel?: () => void;
}

// Helper functions
function titleCase(s: string) {
  return s
    .split(/\s|-|_/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function cleanDomain(domain = '') {
  return domain
    .replace(/^www\./, '')
    .replace(/\.(com|co|in|net|org|io|ai|biz|co\.in|app)$/, '')
    .replace(/[0-9]+/g, '')
    .replace(/[^a-zA-Z\-\s_]/g, '')
    .trim();
}

function suggestBusinessNames(email = '', nature: string[] = []) {
  if (!email || !email.includes('@')) return [];
  const domain = email.split('@')[1] || '';
  const raw = cleanDomain(domain.split(':')[0]);
  const base = titleCase(raw || email.split('@')[0]);
  const suggestions = new Set<string>();
  if (base) suggestions.add(base);
  if (nature.includes('accounting')) suggestions.add(`${base} Accounting`);
  if (nature.includes('legal')) suggestions.add(`${base} Legal`);
  if (nature.includes('consulting')) suggestions.add(`${base} Consulting`);
  const words = base.split(' ');
  if (words.length > 1) suggestions.add(words.map((w) => w[0]).join('').toUpperCase() + ' Firm');
  suggestions.add(`${base} Firm`);
  suggestions.add(`${base} Pvt Ltd`);
  return Array.from(suggestions).slice(0, 5);
}

export function OrganizationForm({
  initialData,
  onSubmit,
  loading = false,
  mode = "add",
  onCancel
}: OrganizationFormProps) {
  const [step, setStep] = useState(1);
  const { plans, loading: plansLoading } = usePricingPlans();

  const isEditMode = mode === "edit";
  const showPasswordField = mode === "add";

  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      email: initialData?.email || "",
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      password: "",
      businessName: initialData?.businessName || "",
      practiceName: initialData?.practiceName || "",
      nature: initialData?.onboardingData?.nature || [],
      structure: initialData?.onboardingData?.structure || {
        partners: "",
        partnersOther: "",
        admin: "",
        adminOther: "",
        accountants: "",
        accountantsOther: "",
        clients: initialData?.onboardingData?.clientsRange || "",
        clientsOther: "",
      },
      plan: initialData?.plan?._id || "",
      paymentOption: initialData?.isPaid ? "alreadyPaid" : "unpaid",
      clientsRange: initialData?.onboardingData?.clientsRange || "",
    },
  });

  const watchEmail = form.watch("email");
  const watchNature = form.watch("nature");
  const watchStructure = form.watch("structure");

  const suggestions = useMemo(() =>
    suggestBusinessNames(watchEmail, watchNature),
    [watchEmail, watchNature]
  );

  const NumberGroup = ({ title, field }: { title: string; field: keyof OrganizationFormValues['structure'] }) => {
    const value = watchStructure[field];

    return (
      <div className="mt-4">
        <div className="font-medium text-gray-800 mb-2">{title}</div>
        <div className="grid grid-cols-3 gap-2">
          {BRACKETS.map((b) => (
            <div key={b}>
              <button
                type="button"
                onClick={() => form.setValue(`structure.${field}`, b, { shouldValidate: true })}
                className={`w-full p-3 rounded-lg border text-center transition-all ${value === b
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                  }`}
              >
                {b}
              </button>
            </div>
          ))}
        </div>
        {value === "Other" && (
          <Input
            type="number"
            placeholder="Type other number"
            className="w-full mt-2"
            {...form.register(`structure.${field}Other`)}
          />
        )}
      </div>
    );
  };

const handleSubmitForm = async (data: OrganizationFormValues) => {
  const submitData: CreateOrganizationData | UpdateOrganizationData = {
    ...data,

    // ✅ sirf selected option true jayega
    ...(data.paymentOption === "alreadyPaid" && { alreadyPaid: true }),
    ...(data.paymentOption === "unpaid" && { unpaid: true }),

    // ❌ string field bilkul nahi bhejna
    paymentOption: undefined,

    businessNameChoice: data.businessName,
    practiceNameChoice: data.practiceName,
    clientsRange: data.clientsRange || data.structure.clients,
  };

  await onSubmit(submitData);
};




  const canProceedToStep2 = form.watch("email") && form.watch("email").includes("@");
  const canProceedToStep3 = form.watch("firstName") && form.watch("lastName") &&
    (showPasswordField ? form.watch("password") : true);
  const canProceedToStep4 = form.watch("businessName");
  const canProceedToStep5 = form.watch("practiceName");
  const canProceedToStep6 = form.watch("nature").length > 0;
  const canProceedToStep7 = form.watch("structure.partners") &&
    form.watch("structure.admin") &&
    form.watch("structure.accountants") &&
    form.watch("structure.clients");
  const canSubmit = form.watch("plan") && form.watch("paymentOption");

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                {isEditMode ? "Update Email Address" : "What is your email address?"}
              </CardTitle>
              <CardDescription>
                {isEditMode
                  ? `Current email: ${initialData?.email}`
                  : "Use your work or business email."
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@company.com"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {isEditMode ? "Update Admin Details" : "Admin User Details"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {showPasswordField && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Create a secure password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {isEditMode ? "Update Business Name" : "What is your business name?"}
              </CardTitle>
              <CardDescription>
                {isEditMode
                  ? `Current: ${initialData?.businessName}`
                  : "We can suggest names from your email and industry — choose or type your own."
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestions.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-2">Suggested Names</div>
                  <div className="space-y-2">
                    {suggestions.map(s => (
                      <OptionCard
                        key={s}
                        label={s}
                        selected={form.watch("businessName") === s}
                        onClick={() => form.setValue("businessName", s)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter business name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {isEditMode ? "Update Practice Name" : "What is the name of your practice?"}
              </CardTitle>
              <CardDescription>
                {isEditMode && `Current: ${initialData?.practiceName || "Not set"}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="practiceName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter practice name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                What is the nature of your business?
              </CardTitle>
              <CardDescription>Select one or more.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {NATURE_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => {
                      if (!o.comingSoon) {
                        const currentNature = form.watch("nature");
                        if (currentNature.includes(o.id)) {
                          form.setValue(
                            "nature",
                            currentNature.filter(x => x !== o.id)
                          );
                        } else {
                          form.setValue("nature", [...currentNature, o.id]);
                        }
                      }
                    }}
                    disabled={o.comingSoon}
                    className={`p-4 rounded-lg border text-left relative transition-all ${form.watch("nature").includes(o.id)
                        ? 'border-primary bg-primary/10 shadow-sm'
                        : 'border-border hover:border-primary/50'
                      } ${o.comingSoon ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="font-medium text-sm">{o.label}</div>
                    {o.comingSoon && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        Coming soon
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
              <FormField
                control={form.control}
                name="nature"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Structure of your practice
              </CardTitle>
              <CardDescription>
                Tell us about partners, admin staff and accountants.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <NumberGroup title="Partners" field="partners" />
              <NumberGroup title="Admin Staff" field="admin" />
              <NumberGroup title="Accountants" field="accountants" />
              <NumberGroup title="How many clients do you manage?" field="clients" />
            </CardContent>
          </Card>
        );

      case 7:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {isEditMode ? "Update Subscription Plan" : "Choose Plan"}
              </CardTitle>
              <CardDescription>
                {isEditMode && `Current plan: ${initialData?.plan?.name || 'Not set'}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {plansLoading ? (
                <div className="text-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p>Loading plans...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plans.map((p) => (
                    <Card
                      key={p._id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${form.watch("plan") === p._id
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-border'
                        }`}
                      onClick={() => form.setValue("plan", p._id)}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">{p.name}</CardTitle>
                        {p.highlighted && (
                          <Badge className="w-fit bg-gradient-to-r from-blue-600 to-purple-600">
                            MOST POPULAR
                          </Badge>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="text-3xl font-bold">
                            ${p.price}
                            <span className="text-sm text-muted-foreground font-normal ml-1">
                              /{p.period === 'monthly' ? 'month' : 'year'}
                            </span>
                          </div>
                        </div>
                        <ul className="space-y-2 text-sm">
                          {Array.isArray(p.features) && p.features.slice(0, 4).map((feat, i) => {
                            const text = typeof feat === 'string' ? feat : feat.name;
                            const value = typeof feat === 'string' ? '' : feat.value;
                            return (
                              <li key={i} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="flex-1">{text}</span>
                                {value && (
                                  <span className="text-muted-foreground">{value}</span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {form.watch("plan") && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Payment Options</h3>
                    <FormField
                      control={form.control}
                      name="paymentOption"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-3 rounded-lg border p-4">
                                <RadioGroupItem value="unpaid" id="unpaid" />
                                <Label htmlFor="unpaid" className="flex-1 cursor-pointer">
                                  <div className="font-medium">Pay Later</div>
                                  <div className="text-sm text-muted-foreground">
                                    Cannot log in without completing payment.
                                  </div>
                                </Label>
                              </div>

                              <div className="flex items-center space-x-3 rounded-lg border p-4">
                                <RadioGroupItem value="alreadyPaid" id="alreadyPaid" />
                                <Label htmlFor="alreadyPaid" className="flex-1 cursor-pointer">
                                  <div className="font-medium text-green-600">Already Paid</div>
                                  <div className="text-sm text-muted-foreground">
                                    Instant activation without payment
                                  </div>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === s ? 'bg-primary text-primary-foreground' :
                  step > s ? 'bg-green-500 text-white' :
                    'bg-muted text-muted-foreground'
                }`}>
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 7 && (
                <div className={`w-12 h-1 mx-2 ${step > s ? 'bg-green-500' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>

        {renderStep()}

        <div className="flex justify-between pt-4">
          {step > 1 ? (
            <Button variant="outline" type="button" onClick={() => setStep(step - 1)}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : onCancel ? (
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
          ) : (
            <div />
          )}

          {step < 7 ? (
            <Button
              type="button"
              onClick={() => {
                const validations = [
                  () => canProceedToStep2,
                  () => canProceedToStep3,
                  () => canProceedToStep4,
                  () => canProceedToStep5,
                  () => canProceedToStep6,
                  () => canProceedToStep7,
                ][step - 1];

                if (validations()) {
                  setStep(step + 1);
                }
              }}
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={!canSubmit || loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditMode ? "Update Organization" : "Create Organization"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}