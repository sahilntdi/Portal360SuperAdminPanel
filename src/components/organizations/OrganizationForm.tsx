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
  Lock,
  AlertCircle
} from "lucide-react";
import OptionCard from "@/utils/OptionCard";
import { usePricingPlans } from "@/ApiService/PricingPlans";
import type { CreateOrganizationData, Organization, UpdateOrganizationData } from "@/types/organizations";

// Enhanced Form Schema with better validation
const organizationSchema = z.object({
  // Step 1
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),

  // Step 2
  firstName: z.string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),

  lastName: z.string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),

  password: z.union([
    z.string().min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
      .max(50, "Password cannot exceed 50 characters"),
    z.literal('').optional()
  ]),

  // Step 3
  businessName: z.string()
    .min(1, "Business name is required")
    .min(3, "Business name must be at least 3 characters")
    .max(100, "Business name cannot exceed 100 characters")
    .regex(/^[a-zA-Z0-9\s\-'&.,]+$/, "Business name contains invalid characters"),

  // Step 4
  practiceName: z.string()
    .min(1, "Practice name is required")
    .min(2, "Practice name must be at least 2 characters")
    .max(100, "Practice name cannot exceed 100 characters")
    .regex(/^[a-zA-Z0-9\s\-'&.,]+$/, "Practice name contains invalid characters"),

  // Step 5
  nature: z.array(z.string())
    .min(1, "Please select at least one business nature")
    .max(5, "You can select up to 5 business natures"),

  // Step 6
  structure: z.object({
    partners: z.string()
      .min(1, "Please select number of partners")
      .refine(val => val === "Other" || BRACKETS.includes(val), {
        message: "Invalid selection for partners"
      }),
    partnersOther: z.string()
      .optional()
      .refine(val => !val || (parseInt(val) >= 0 && parseInt(val) <= 1000), {
        message: "Partners must be between 0 and 1000"
      }),
    admin: z.string()
      .min(1, "Please select number of admin staff")
      .refine(val => val === "Other" || BRACKETS.includes(val), {
        message: "Invalid selection for admin staff"
      }),
    adminOther: z.string()
      .optional()
      .refine(val => !val || (parseInt(val) >= 0 && parseInt(val) <= 1000), {
        message: "Admin staff must be between 0 and 1000"
      }),
    accountants: z.string()
      .min(1, "Please select number of accountants")
      .refine(val => val === "Other" || BRACKETS.includes(val), {
        message: "Invalid selection for accountants"
      }),
    accountantsOther: z.string()
      .optional()
      .refine(val => !val || (parseInt(val) >= 0 && parseInt(val) <= 1000), {
        message: "Accountants must be between 0 and 1000"
      }),
    clients: z.string()
      .min(1, "Please select number of clients")
      .refine(val => val === "Other" || BRACKETS.includes(val), {
        message: "Invalid selection for clients"
      }),
    clientsOther: z.string()
      .optional()
      .refine(val => !val || (parseInt(val) >= 0 && parseInt(val) <= 10000), {
        message: "Clients must be between 0 and 10,000"
      }),
  }).refine(data => {
    // Validate that if "Other" is selected, the other field must be filled
    if (data.partners === "Other" && (!data.partnersOther || data.partnersOther.trim() === "")) {
      return false;
    }
    if (data.admin === "Other" && (!data.adminOther || data.adminOther.trim() === "")) {
      return false;
    }
    if (data.accountants === "Other" && (!data.accountantsOther || data.accountantsOther.trim() === "")) {
      return false;
    }
    if (data.clients === "Other" && (!data.clientsOther || data.clientsOther.trim() === "")) {
      return false;
    }
    return true;
  }, {
    message: "Please provide a number when selecting 'Other'",
    path: ["structure"]
  }),

  // Step 7
  plan: z.string()
    .min(1, "Please select a plan")
    .regex(/^[a-fA-F0-9]{24}$/, "Invalid plan ID format"), // Assuming MongoDB ObjectId

  paymentOption: z.enum(["unpaid", "alreadyPaid"], {
    required_error: "Please select a payment option",
    invalid_type_error: "Invalid payment option"
  }),

  clientsRange: z.string()
    .optional()
    .refine(val => !val || (parseInt(val) >= 0 && parseInt(val) <= 10000), {
      message: "Clients range must be between 0 and 10,000"
    }),
}).superRefine((data, ctx) => {
  // Cross-field validation
  if (data.paymentOption === "alreadyPaid" && data.plan === "") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "You must select a plan if you have pay by invoice",
      path: ["plan"]
    });
  }

  // Validate that password is provided in add mode
  // (This will be handled in the component logic)
});

type OrganizationFormValues = z.infer<typeof organizationSchema>;

const NATURE_OPTIONS = [
  { id: "accounting", label: "Accounting", comingSoon: false },
  { id: "tax", label: "Tax", comingSoon: true },
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
  const [stepErrors, setStepErrors] = useState<{ [key: number]: string[] }>({});
  const { plans, loading: plansLoading } = usePricingPlans();

  const isEditMode = mode === "edit";
  const showPasswordField = mode === "add";

  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
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
  const watchPassword = form.watch("password");
  const watchBusinessName = form.watch("businessName");
  const watchPracticeName = form.watch("practiceName");

  const suggestions = useMemo(() =>
    suggestBusinessNames(watchEmail, watchNature),
    [watchEmail, watchNature]
  );

  const validateStep = async (stepNumber: number): Promise<boolean> => {
    const fieldsToValidate: { [key: number]: (keyof OrganizationFormValues)[] } = {
      1: ['email'],
      2: ['firstName', 'lastName', ...(showPasswordField ? ['password'] : [])],
      3: ['businessName'],
      4: ['practiceName'],
      5: ['nature'],
      6: ['structure'],
      7: ['plan', 'paymentOption'],
    };

    const fields = fieldsToValidate[stepNumber];
    const result = await form.trigger(fields as any);

    // Collect errors for this step
    const errors: string[] = [];
    fields.forEach(field => {
      const error = form.getFieldState(field as any).error?.message;
      if (error) errors.push(error);
    });

    setStepErrors(prev => ({ ...prev, [stepNumber]: errors }));

    return result;
  };

  const handleNextStep = async () => {
    const isValid = await validateStep(step);
    if (isValid) {
      setStep(step + 1);
      // Clear errors for current step when moving forward
      setStepErrors(prev => ({ ...prev, [step]: [] }));
    } else {
      // Scroll to first error
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    // Clear errors for the step we're leaving
    setStepErrors(prev => ({ ...prev, [step]: [] }));
  };

  const NumberGroup = ({ title, field }: { title: string; field: keyof OrganizationFormValues['structure'] }) => {
    const value = watchStructure[field];
    const error = form.formState.errors.structure?.[field];
    const otherField = `${field}Other` as keyof OrganizationFormValues['structure'];
    const otherError = form.formState.errors.structure?.[otherField];

    return (
      <div className="mt-4">
        <div className="font-medium text-gray-800 mb-2 flex items-center justify-between">
          <span>{title}</span>
          {error && (
            <span className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {error.message}
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {BRACKETS.map((b) => (
            <div key={b}>
              <button
                type="button"
                onClick={() => {
                  form.setValue(`structure.${field}`, b, { shouldValidate: true });
                  // Clear other field if not selecting "Other"
                  if (b !== "Other") {
                    form.setValue(`structure.${otherField}`, "", { shouldValidate: true });
                  }
                }}
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
          <div className="mt-2" data-error={!!otherError}>
            <Input
              type="number"
              min="0"
              max={field === 'clients' ? "10000" : "1000"}
              placeholder={`Enter number of ${title.toLowerCase()}`}
              className={`w-full ${otherError ? 'border-destructive' : ''}`}
              {...form.register(`structure.${otherField}`)}
              onChange={(e) => {
                const value = e.target.value;
                form.setValue(`structure.${otherField}`, value, { shouldValidate: true });
              }}
            />
            {otherError && (
              <p className="text-sm text-destructive mt-1">{otherError.message}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  const handleSubmitForm = async (e: React.FormEvent, data: OrganizationFormValues) => {
      e.preventDefault(); 
    // Final validation before submission
    const isValid = await form.trigger();
    if (!isValid) {
      // Scroll to first error
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const submitData: CreateOrganizationData | UpdateOrganizationData = {
      ...data,
      ...(data.paymentOption === "alreadyPaid" && { alreadyPaid: true }),
      ...(data.paymentOption === "unpaid" && { unpaid: true }),
      paymentOption: undefined,
      businessNameChoice: data.businessName,
      practiceNameChoice: data.practiceName,
      clientsRange: data.clientsRange || data.structure.clients,
    };

    await onSubmit(submitData);
  };

  const canProceedToStep2 = form.watch("email") && !form.getFieldState("email").error;
  const canProceedToStep3 = form.watch("firstName") && form.watch("lastName") &&
    (showPasswordField ? form.watch("password") && !form.getFieldState("password").error : true) &&
    !form.getFieldState("firstName").error && !form.getFieldState("lastName").error;
  const canProceedToStep4 = form.watch("businessName") && !form.getFieldState("businessName").error;
  const canProceedToStep5 = form.watch("practiceName") && !form.getFieldState("practiceName").error;
  const canProceedToStep6 = form.watch("nature").length > 0 && !form.getFieldState("nature").error;
  const canProceedToStep7 = form.watch("structure.partners") &&
    form.watch("structure.admin") &&
    form.watch("structure.accountants") &&
    form.watch("structure.clients") &&
    !form.getFieldState("structure").error;
  const canSubmit = form.watch("plan") && form.watch("paymentOption") &&
    !form.getFieldState("plan").error && !form.getFieldState("paymentOption").error;

  // Validation status for each step
  const stepValidationStatus = {
    1: canProceedToStep2,
    2: canProceedToStep3,
    3: canProceedToStep4,
    4: canProceedToStep5,
    5: canProceedToStep6,
    6: canProceedToStep7,
    7: canSubmit,
  };

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
            <CardContent data-error={!!form.formState.errors.email}>
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
                        onChange={(e) => {
                          field.onChange(e);
                          form.trigger("email");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {stepErrors[1]?.length > 0 && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <ul className="text-sm text-destructive space-y-1">
                    {stepErrors[1].map((error, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertCircle className="h-3 w-3" />
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                        <Input
                          placeholder="John"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            form.trigger("firstName");
                          }}
                        />
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
                        <Input
                          placeholder="Doe"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            form.trigger("lastName");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {showPasswordField && (
                <div data-error={!!form.formState.errors.password}>
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
                            onChange={(e) => {
                              field.onChange(e);
                              form.trigger("password");
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                        {field.value && (
                          <div className="mt-2 space-y-1">
                            <div className="text-xs text-muted-foreground">Password must contain:</div>
                            <ul className="text-xs space-y-1">
                              <li className={`flex items-center gap-1 ${/[A-Z]/.test(field.value) ? 'text-green-600' : 'text-muted-foreground'}`}>
                                <Check className="h-3 w-3" /> At least one uppercase letter
                              </li>
                              <li className={`flex items-center gap-1 ${/[a-z]/.test(field.value) ? 'text-green-600' : 'text-muted-foreground'}`}>
                                <Check className="h-3 w-3" /> At least one lowercase letter
                              </li>
                              <li className={`flex items-center gap-1 ${/[0-9]/.test(field.value) ? 'text-green-600' : 'text-muted-foreground'}`}>
                                <Check className="h-3 w-3" /> At least one number
                              </li>
                              <li className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(field.value) ? 'text-green-600' : 'text-muted-foreground'}`}>
                                <Check className="h-3 w-3" /> At least one special character
                              </li>
                              <li className={`flex items-center gap-1 ${field.value.length >= 8 ? 'text-green-600' : 'text-muted-foreground'}`}>
                                <Check className="h-3 w-3" /> At least 8 characters
                              </li>
                            </ul>
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {stepErrors[2]?.length > 0 && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <ul className="text-sm text-destructive space-y-1">
                    {stepErrors[2].map((error, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertCircle className="h-3 w-3" />
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
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
            <CardContent className="space-y-4" data-error={!!form.formState.errors.businessName}>
              {suggestions.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-2 text-foreground">
                    Suggested Names
                  </div>

                  <div className="space-y-2">
                    {suggestions.map((s) => (
                      <div
                        key={s}
                        className="text-foreground [&_*]:text-foreground"
                      >
                        <OptionCard
                          label={s}
                          selected={watchBusinessName === s}
                          onClick={() => {
                            form.setValue("businessName", s);
                            form.trigger("businessName");
                          }}
                        />
                      </div>
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
                        onChange={(e) => {
                          field.onChange(e);
                          form.trigger("businessName");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {stepErrors[3]?.length > 0 && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <ul className="text-sm text-destructive space-y-1">
                    {stepErrors[3].map((error, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertCircle className="h-3 w-3" />
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
            <CardContent data-error={!!form.formState.errors.practiceName}>
              <FormField
                control={form.control}
                name="practiceName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter practice name"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.trigger("practiceName");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {stepErrors[4]?.length > 0 && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <ul className="text-sm text-destructive space-y-1">
                    {stepErrors[4].map((error, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertCircle className="h-3 w-3" />
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
              <CardDescription>Select one or more (up to 5).</CardDescription>
            </CardHeader>
            <CardContent data-error={!!form.formState.errors.nature}>
              <div className="grid grid-cols-2 gap-3">
                {NATURE_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => {
                      if (!o.comingSoon) {
                        const currentNature = watchNature;
                        let newNature;
                        if (currentNature.includes(o.id)) {
                          newNature = currentNature.filter(x => x !== o.id);
                        } else {
                          if (currentNature.length >= 5) {
                            // Show error if trying to select more than 5
                            form.setError("nature", {
                              type: "max",
                              message: "You can select up to 5 business natures"
                            });
                            return;
                          }
                          newNature = [...currentNature, o.id];
                        }
                        form.setValue("nature", newNature, { shouldValidate: true });
                      }
                    }}
                    disabled={o.comingSoon}
                    className={`p-4 rounded-lg border text-left relative transition-all ${watchNature.includes(o.id)
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-border hover:border-primary/50'
                      } ${o.comingSoon ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="font-medium text-sm">{o.label}</div>
                    {watchNature.includes(o.id) && (
                      <div className="absolute top-2 right-2">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                    )}
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
              <div className="mt-2 text-sm text-muted-foreground">
                Selected: {watchNature.length} of 5
              </div>
              {stepErrors[5]?.length > 0 && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <ul className="text-sm text-destructive space-y-1">
                    {stepErrors[5].map((error, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertCircle className="h-3 w-3" />
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
            <CardContent className="space-y-6" data-error={!!form.formState.errors.structure}>
              <NumberGroup title="Partners" field="partners" />
              <NumberGroup title="Admin Staff" field="admin" />
              <NumberGroup title="Accountants" field="accountants" />
              <NumberGroup title="How many clients do you manage?" field="clients" />

              {stepErrors[6]?.length > 0 && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <ul className="text-sm text-destructive space-y-1">
                    {stepErrors[6].map((error, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertCircle className="h-3 w-3" />
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                      onClick={() => {
                        form.setValue("plan", p._id);
                        form.trigger("plan");
                      }}
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

              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("plan") && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Payment Options</h3>
                    <FormField
                      control={form.control}
                      name="paymentOption"
                      render={({ field }) => (
                        <FormItem data-error={!!form.formState.errors.paymentOption}>
                          <FormControl>
                            <RadioGroup
                              value={field.value}
                              onValueChange={(value) => {
                                field.onChange(value);
                                form.trigger("paymentOption");
                              }}
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
                                  <div className="font-medium text-green-600">Pay by Invoice</div>
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

              {stepErrors[7]?.length > 0 && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <ul className="text-sm text-destructive space-y-1">
                    {stepErrors[7].map((error, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertCircle className="h-3 w-3" />
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
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
        {/* Progress Indicator with validation status */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`relative w-8 h-8 rounded-full flex items-center justify-center ${step === s ? 'bg-primary text-primary-foreground' :
                step > s ? 'bg-green-500 text-white' :
                  'bg-muted text-muted-foreground'
                }`}>
                {step > s ? <Check className="h-4 w-4" /> : s}
                {s < step && stepValidationStatus[s] === false && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full border-2 border-white"></span>
                )}
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
            <Button variant="outline" type="button" onClick={handlePreviousStep}>
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
              onClick={handleNextStep}
              disabled={!stepValidationStatus[step]}
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!canSubmit || loading || !stepValidationStatus[7]}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditMode ? "Update Organization" : "Create Organization"}
            </Button>
          )}
        </div>

        {/* Overall form validation summary */}
        {Object.keys(form.formState.errors).length > 0 && step === 7 && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center gap-2 text-destructive font-medium mb-2">
              <AlertCircle className="h-4 w-4" />
              Please fix the following errors before submitting:
            </div>
            <ul className="text-sm text-destructive space-y-1">
              {Object.entries(form.formState.errors).map(([field, error]) => (
                <li key={field} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-destructive rounded-full"></span>
                  {error.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </Form>
  );
}