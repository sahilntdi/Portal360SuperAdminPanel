export interface OrganizationPlan {
  _id: string;
  name: string;
  price: number;
  period: string;
  features: Array<{
    featureId: string;
    value: string;
    _id: string;
    name?: string;
  }>;
}

export interface OrganizationOnboardingData {
  clientsRange?: string;
  nature?: string[];
  structure?: {
    type?: string;
    country?: string;
    [key: string]: any;
  };
  connectedEmail?: string;
  completedAt?: string;
}

export interface OrganizationSubscription {
  status: 'trial' | 'active' | 'expired' | 'cancelled' | 'past_due';
  trialStartDate?: string;
  trialEndsAt?: string;
  billingCycle?: string;
  nextBillingDate?: string;
  planSubs?: {
    planId: string;
    name: string;
    price: number;
    period: string;
    features: any[];
  };
}

export interface OrganizationMetrics {
  totalUsers: number;
  totalClients: number;
  storageUsed: number;
  apiCallsThisMonth: number;
}

export interface Organization {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  businessName: string;
  practiceName?: string;
  dbName?: string;
  plan?: OrganizationPlan;
  planName: string;
  status: 'active' | 'suspended' | 'cancelled' | 'pending';
  onboardingData?: OrganizationOnboardingData;
  subscription?: OrganizationSubscription;
  metrics?: OrganizationMetrics;
  registeredAt: string;
  lastActive: string;
  provider?: string;
  createdAt: string;
  updatedAt: string;
  source?: string;
  isPaid?: boolean;
  stripeCustomerId?: string;
}

export interface CreateOrganizationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  businessNameChoice: string;
  businessNameOther?: string;
  practiceNameChoice: string;
  practiceNameOther?: string;
  nature: string[];
  structure: {
    partners: string;
    partnersOther?: string;
    admin: string;
    adminOther?: string;
    accountants: string;
    accountantsOther?: string;
    clients: string;
    clientsOther?: string;
  };
  plan: string;
  paymentOption: 'unpaid' | 'alreadyPaid';
  clientsRange?: string;
  connectedEmail?: string;
}

export interface UpdateOrganizationData {
  firstName?: string;
  lastName?: string;
  email?: string;
  businessName?: string;
  practiceName?: string;
  status?: string;
  plan?: string;
  planName?: string;
  onboardingData?: Partial<OrganizationOnboardingData>;
}