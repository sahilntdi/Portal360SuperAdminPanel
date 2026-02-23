
const z = require("zod");

// Copying necessary parts from OrganizationForm.tsx
const PARTNER_BRACKETS = ["None", "1-5", "6-11", "12-20", "21-30", "Other"];
const ADMIN_BRACKETS = ["None", "1-5", "6-11", "12-20", "21-30", "Other"];
const ACCOUNTANT_BRACKETS = ["None", "1-5", "6-11", "12-20", "21-30", "Other"];
const CLIENT_BRACKETS = ["None", "1-10", "11-50", "51-100", "101-500", "Other"];

const organizationSchema = z.object({
    structure: z.object({
        partners: z.string().min(1).refine(val => val === "Other" || PARTNER_BRACKETS.includes(val)),
        partnersOther: z.string().optional(),
        admin: z.string().min(1).refine(val => val === "Other" || ADMIN_BRACKETS.includes(val)),
        adminOther: z.string().optional(),
        accountants: z.string().min(1).refine(val => val === "Other" || ACCOUNTANT_BRACKETS.includes(val)),
        accountantsOther: z.string().optional(),
        clients: z.string().min(1).refine(val => val === "Other" || CLIENT_BRACKETS.includes(val)),
        clientsOther: z.string().optional().refine(val => !val || (parseInt(val) >= 0 && parseInt(val) <= 10000)),
    }),
    clientsRange: z.string()
        .optional(),
});

// Test Cases
const testCases = [
    {
        name: "Reproduction: 101-500 in clientsRange",
        data: {
            structure: {
                partners: "1-5",
                partnersOther: "",
                admin: "1-5",
                adminOther: "",
                accountants: "1-5",
                accountantsOther: "",
                clients: "101-500",
                clientsOther: ""
            },
            clientsRange: "101-500" // This causes the error because parseInt("101-500") is 101, which is fine, BUT "None" or "Other" might fail or be 0.
            // Wait, "101-500" parsed is 101. 101 <= 10000. So why did it fail?
            // Maybe "Other" fails if it's not a number? parseInt("Other") is NaN. NaN >= 0 is false.
        },
        expectValid: true // We WANT this to be valid, but expect it might fail if logic is flawed.
    },
    {
        name: "Reproduction: 'Other' in clientsRange",
        data: {
            structure: {
                partners: "1-5", partnersOther: "", admin: "1-5", adminOther: "", accountants: "1-5", accountantsOther: "",
                clients: "Other", clientsOther: "500"
            },
            clientsRange: "Other" // parseInt("Other") -> NaN. NaN >= 0 -> False.
        },
        expectValid: true // This SHOULD be valid in the UI flow but fails schema
    },
    {
        name: "Valid Data - Standard Options",
        data: {
            structure: {
                partners: "1-5",
                partnersOther: "",
                admin: "6-11",
                adminOther: "",
                accountants: "None",
                accountantsOther: "",
                clients: "11-50",
                clientsOther: ""
            }
        },
        expectValid: true
    },
    {
        name: "Valid Data - Other Options",
        data: {
            structure: {
                partners: "Other",
                partnersOther: "50",
                admin: "Other",
                adminOther: "100",
                accountants: "Other",
                accountantsOther: "20",
                clients: "Other",
                clientsOther: "5000" // Should be valid (<= 10000)
            }
        },
        expectValid: true
    },
    {
        name: "Invalid Data - Clients > 10000",
        data: {
            structure: {
                partners: "1-5",
                partnersOther: "",
                admin: "1-5",
                adminOther: "",
                accountants: "1-5",
                accountantsOther: "",
                clients: "Other",
                clientsOther: "10001" // Should be invalid
            }
        },
        expectValid: false
    },
    {
        name: "Invalid Data - Wrong Option for Staff",
        data: {
            structure: {
                partners: "1-100", // Invalid option
                partnersOther: "",
                admin: "1-5",
                adminOther: "",
                accountants: "1-5",
                accountantsOther: "",
                clients: "1-10",
                clientsOther: ""
            }
        },
        expectValid: false
    }
];

testCases.forEach((tc, index) => {
    console.log(`Test Case ${index + 1}: ${tc.name}`);
    try {
        organizationSchema.parse(tc.data);
        if (tc.expectValid) {
            console.log("  PASS: Validation Success");
        } else {
            console.log("  FAIL: Expected Validation Failure but got Success");
        }
    } catch (e) {
        if (!tc.expectValid) {
            console.log("  PASS: Validation Failed as expected");
            // console.log(JSON.stringify(e.errors, null, 2));
        } else {
            console.log("  FAIL: Unexpected Validation Failure");
            console.log(JSON.stringify(e.errors, null, 2));
        }
    }
    console.log("-----------------------------------");
});
