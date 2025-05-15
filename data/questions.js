export const questions = [
  // Basic Info Part of the Navbar
  {
    id: "businessType",
    title: "What type of business do you own?",
    options: [
      "C Corporation",
      "Partnership",
      "Limited Liability Company | LLC",
      "S Corporation",
      "Sole Proprietorship",
    ],
  },
  {
    id: "funding",
    title: "How much do you need?",
    inputType: "slider",
    min: 10000,
    max: 1000000,
    step: 10000,
    nextButton: true,
  },
  {
    id: "fundingPurpose",
    title: "What are you getting finance for?",
    options: [
      "Select One",
      "Expansion",
      "Equipment purchase",
      "Purchase a Vehicle",
      "Inventory",
      "Payroll",
      "Marketing",
      "Commercial Real Estate",
      "Remodel my Location",
      "Refinance Debt",
      "Finance Accounts Receivable",
      "Buy a Business/Franchise",
      "Start a Business",
      "Other",
    ],
  },
  {
    id: "fundingTimeline",
    text: "How quickly do you need the money?",
    options: [
      "Within 1 week",
      "Within 2 weeks",
      "Within 1 month",
      "Unsure",
    ],
  },
  {
    id: "averageRevenue",
    title: "What's your average monthly revenue?",
    // inputType: "number",
    // validation: "positiveNumber",
    // nextButton: true,
  },
  {
    id: "creditScore",
    title: "What is your personal credit score?",
    options: [
      "Excellent (720+)",
      "Good (680 - 719)",
      "Fair (640 - 679)",
      "Poor (639 or less)",
    ],
  },
  {
    id: "businessDescription",
    title: "Tell us about your business",
  },
  {
    id: 'businessStartDate',
    text: 'When did you start your business?'
  },
  {
    id: 'industry',
    text: 'What industry are you in?'
  },
  {
    id: "personalInfo",
    text: "Tell us about yourself",
  },
  {
    id: "email",
    title: "What is your email address?",
    inputType: "email",
    validation: "usEmail",
    placeholder: "example@gmail.com",
    nextButton: true,
  },
];
