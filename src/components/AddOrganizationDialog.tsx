import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OptionCard from '@/utils/OptionCard';
import { usePricingPlans } from '@/ApiService/PricingPlans';

// Helper functions
function titleCase(s) {
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

function suggestBusinessNames(email = '', nature = []) {
  if (!email || !email.includes('@')) return [];
  const domain = email.split('@')[1] || '';
  const raw = cleanDomain(domain.split(':')[0]);
  const base = titleCase(raw || email.split('@')[0]);
  const suggestions = new Set();
  if (base) suggestions.add(base);
  if (nature.includes('Accounting')) suggestions.add(`${base} Accounting`);
  if (nature.includes('Legal')) suggestions.add(`${base} Legal`);
  if (nature.includes('Consulting')) suggestions.add(`${base} Consulting`);
  const words = base.split(' ');
  if (words.length > 1) suggestions.add(words.map((w) => w[0]).join('').toUpperCase() + ' Firm');
  suggestions.add(`${base} Firm`);
  suggestions.add(`${base} Pvt Ltd`);
  return Array.from(suggestions).slice(0, 5);
}

const NATURE_OPTIONS = [
  { id: "Accounting", label: "Accounting", comingSoon: false },
  { id: "Marketing", label: "Marketing", comingSoon: true },
  { id: "Consulting", label: "Consulting", comingSoon: true },
  { id: "Legal", label: "Legal", comingSoon: true },
  { id: "Finance", label: "Finance", comingSoon: true },
  { id: "IT Services", label: "IT Services", comingSoon: true },
  { id: "Real Estate", label: "Real Estate", comingSoon: true },
  { id: "Healthcare", label: "Healthcare", comingSoon: true },
];

const BRACKETS = ["None", "1-2", "3-5", "6-10", "Other"];

export const AddOrganizationDialog = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const { plans, loading: plansLoading } = usePricingPlans();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    businessNameChoice: '',
    businessNameOther: '',
    practiceNameChoice: '',
    practiceNameOther: '',
    nature: [],
    structure: {
      partners: null,
      partnersOther: '',
      admin: null,
      adminOther: '',
      accountants: null,
      accountantsOther: '',
      clients: null,
      clientsOther: ''
    },
    plan: null,
    unpaid: false,
    alreadyPaid: false,
  });

  const update = (data) => {
    setForm(prev => ({ ...prev, ...data }));
  };

  const suggestions = useMemo(() =>
    suggestBusinessNames(form.email, form.nature),
    [form.email, form.nature]
  );

  const handleSubmit = async () => {
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      businessNameChoice: form.businessNameChoice,
      businessNameOther: form.businessNameOther || undefined,
      practiceNameChoice: form.practiceNameChoice,
      practiceNameOther: form.practiceNameOther || undefined,
      nature: form.nature.map(n => n.toLowerCase()),
      structure: form.structure,
      plan: form.plan?._id,
      alreadyPaid: form.alreadyPaid || false,
      unpaid: form.unpaid || false,
      clientsRange: form.structure.clients,
      connectedEmail: "skip",
    };

    console.log("Final Payload", payload);

    try {
      const res = await fetch('http://localhost:8181/api/V2/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Organization created successfully!');
        setOpen(false);
        setStep(1);
        setForm({ ...form, password: '', plan: null, unpaid: false, alreadyPaid: false });
      } else {
        const err = await res.json();
        alert('Error: ' + (err.message || 'Something went wrong'));
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  // NumberGroup Component
  const NumberGroup = ({ title, field }) => {
    const val = form.structure[field];

    const choose = (v) => {
      update({
        structure: {
          ...form.structure,
          [field]: v,
        },
      });
    };

    return (
      <div className="mt-4">
        <div className="font-medium text-gray-800">{title}</div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {BRACKETS.map((b) => (
            <div key={b}>
              <OptionCard
                label={b}
                selected={val === b}
                onClick={() => choose(b)}
              />
            </div>
          ))}
        </div>
        {val === "Other" && (
          <input
            type="number"
            value={form.structure[field + 'Other']}
            onChange={(e) => update({
              structure: {
                ...form.structure,
                [field + 'Other']: e.target.value,
              }
            })}
            placeholder="Type other number"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black mt-2"
          />
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Organization</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Organization - Step {step} of 7</DialogTitle>
        </DialogHeader>

        {/* Step 1: Email */}
        {step === 1 && (
          <div className="space-y-4 py-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              What is your email address?
            </h2>
            <p className="text-sm text-gray-500">
              Use your work or business email.
            </p>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => update({ email: e.target.value })}
              placeholder="you@company.com"
            />
            <Button
              className="w-full"
              disabled={!form.email || !form.email.includes("@")}
              onClick={() => setStep(2)}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: User Info */}
        {step === 2 && (
          <div className="space-y-4 py-4">
            <h2 className="text-2xl font-semibold">Admin User Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" value={form.firstName} onChange={e => update({ firstName: e.target.value })} />
              <Input placeholder="Last Name" value={form.lastName} onChange={e => update({ lastName: e.target.value })} />
            </div>
            <Input type="password" placeholder="Password" value={form.password} onChange={e => update({ password: e.target.value })} />
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1" disabled={!form.firstName || !form.lastName || !form.password} onClick={() => setStep(3)}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Business Name */}
        {step === 3 && (
          <div className="space-y-4 py-4">
            <h2 className="text-2xl font-semibold">What is your business name?</h2>
            <p className="text-sm text-gray-500">We can suggest names from your email and industry — choose or type your own.</p>

            {suggestions.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-2">Suggested</div>
                <div className="space-y-2">
                  {/* {suggestions.map(s => (
                    <OptionCard key={s} label={s} selected={form.businessNameChoice === s}
                      onClick={() => update({ businessNameChoice: s, businessNameOther: '' })} />
                  ))} */}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <OptionCard label="My personal name" selected={form.businessNameChoice === 'personal'}
                onClick={() => update({ businessNameChoice: 'personal', businessNameOther: '' })} />
              <OptionCard label="Registered company" selected={form.businessNameChoice === 'registered'}
                onClick={() => update({ businessNameChoice: 'registered', businessNameOther: '' })} />
              <OptionCard label="Other / Type my own" selected={form.businessNameChoice === 'other'}
                onClick={() => update({ businessNameChoice: 'other' })} />
              {form.businessNameChoice === 'other' && (
                <Input className="mt-2" placeholder="Enter business name"
                  value={form.businessNameOther} onChange={e => update({ businessNameOther: e.target.value })} />
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button className="flex-1"
                disabled={!form.businessNameChoice || (form.businessNameChoice === 'other' && !form.businessNameOther)}
                onClick={() => setStep(4)}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Practice Name */}
        {step === 4 && (
          <div className="space-y-4 py-4">
            <h2 className="text-2xl font-semibold">What is the name of your practice?</h2>
            <div className="space-y-2">
              <OptionCard label="Use my business name" selected={form.practiceNameChoice === 'business'}
                onClick={() => update({ practiceNameChoice: 'business', practiceNameOther: '' })} />
              <OptionCard label="Same as my email username" selected={form.practiceNameChoice === 'email'}
                onClick={() => update({ practiceNameChoice: 'email', practiceNameOther: '' })} />
              <OptionCard label="Create a new practice" selected={form.practiceNameChoice === 'new'}
                onClick={() => update({ practiceNameChoice: 'new', practiceNameOther: '' })} />
              <OptionCard label="Other" selected={form.practiceNameChoice === 'other'}
                onClick={() => update({ practiceNameChoice: 'other' })} />
              {form.practiceNameChoice === 'other' && (
                <textarea
                  value={form.practiceNameOther}
                  onChange={(e) => update({ practiceNameOther: e.target.value })}
                  className="mt-3 w-full p-3 border rounded-lg min-h-[84px] focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Tell us..."
                />
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
              <Button className="flex-1" disabled={!form.practiceNameChoice} onClick={() => setStep(5)}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Nature of Business */}
        {step === 5 && (
          <div className="space-y-4 py-4">
            <h2 className="text-2xl font-semibold">What is the nature of your business?</h2>
            <p className="text-sm text-gray-500">Select one or more.</p>
            <div className="grid grid-cols-2 gap-3">
              {NATURE_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    if (!o.comingSoon) {
                      if (form.nature.includes(o.id)) {
                        update({ nature: form.nature.filter(x => x !== o.id) });
                      } else {
                        update({ nature: [...form.nature, o.id] });
                      }
                    }
                  }}
                  disabled={o.comingSoon}
                  className={`p-4 rounded-lg border text-left relative ${form.nature.includes(o.id) ? 'border-black shadow-lg' : 'border-gray-200'
                    } ${o.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="font-medium text-sm text-gray-900">{o.label}</div>
                  {o.comingSoon && (
                    <div className="text-[10px] text-gray-500 mt-1 italic">Coming soon</div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(4)}>Back</Button>
              <Button className="flex-1" disabled={form.nature.length === 0} onClick={() => setStep(6)}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 6: Structure */}
        {step === 6 && (
          <div className="space-y-4 py-4">
            <h2 className="text-2xl font-semibold">Structure of your practice</h2>
            <p className="text-sm text-gray-500">Tell us about partners, admin staff and accountants.</p>

            <NumberGroup title="Partners" field="partners" />
            <NumberGroup title="Admin Staff" field="admin" />
            <NumberGroup title="Accountants" field="accountants" />
            <NumberGroup title="How many clients do you manage?" field="clients" />

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(5)}>Back</Button>
              <Button
                className="flex-1"
                disabled={!form.structure.partners || !form.structure.admin || !form.structure.accountants || !form.structure.clients}
                onClick={() => setStep(7)}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 7: Choose Plan */}
        {step === 7 && (
          <div className="space-y-6 py-4">
            <h2 className="text-2xl font-semibold">Choose Plan</h2>
            {plansLoading ? (
              <div className="text-center py-10">Loading plans...</div>
            ) : plans.length === 0 ? (
              <div className="text-center text-red-500">No active plans found!</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {plans.map((p) => (
                  <div
                    key={p._id}
                    onClick={() => update({ plan: p })}
                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-xl ${form.plan?._id === p._id
                      ? 'border-black bg-black/5 shadow-lg'
                      : 'border-gray-200 hover:border-gray-400'
                      } ${p.highlighted ? 'ring-4 ring-blue-200' : ''}`}
                  >
                    {p.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                        MOST POPULAR
                      </div>
                    )}
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-extrabold">${p.price}</span>
                      <span className="text-gray-500 ml-2">{p.period === 'monthly' ? '/month' : '/year'}</span>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {Array.isArray(p.features) && p.features.slice(0, 5).map((feat, i) => {
                        const text = typeof feat === 'string' ? feat : feat.name;
                        const value = typeof feat === 'string' ? '' : feat.value;
                        return (
                          <li key={i} className="flex items-start text-sm">
                            <span className="text-green-600 mr-2">Check</span>
                            <span>{text}</span>
                            {value && <span className="ml-auto text-gray-500">{value}</span>}
                          </li>
                        );
                      })}
                    </ul>

                    <Button
                      className="w-full mt-6"
                      variant={form.plan?._id === p._id ? "default" : "outline"}
                    >
                      {form.plan?._id === p._id ? 'Selected' : 'Select Plan'}
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h3 className="font-semibold text-lg mb-4">Payment Options</h3>

              <div className="space-y-4">

                {/* Pay Later Option */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.unpaid === true}
                    onChange={(e) => update({
                      unpaid: e.target.checked,
                      alreadyPaid: e.target.checked ? false : form.alreadyPaid 
                    })}
                    className="w-5 h-5 text-black rounded focus:ring-black"
                  />
                  <div>
                    <div className="font-medium">Pay Later</div>
                    <div className="text-sm text-gray-600">
                      Cannot log in without completing payment.
                    </div>
                  </div>
                </label>

                {/* Already Paid Option */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.alreadyPaid === true}
                    onChange={(e) => update({
                      alreadyPaid: e.target.checked,
                      unpaid: e.target.checked ? false : form.unpaid
                    })}
                    className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <div>
                    <div className="font-medium text-green">Already Paid</div>
                    <div className="text-sm text-gray-500">
                      For admin or partner use only, instant activation without payment
                    </div>
                  </div>
                </label>

              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(6)}>Back</Button>
              <Button
                className="flex-1"
                onClick={handleSubmit}
                disabled={!form.plan}
              >
                Create Organization
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};