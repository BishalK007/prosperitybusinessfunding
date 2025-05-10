export const questions = [
  // Basic Info Part of the Navbar
  {
    id: "q0",
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
    id: "q1",
    title: "How much do you need?",
    inputType: "slider",
    min: 10000,
    max: 1000000,
    step: 10000,
    nextButton: true,
  },
  {
    id: "q2",
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
    id: "q3",
    text: "How quickly do you need the money?",
    options: [
      "Within 1 week",
      "Within 2 weeks",
      "Within 1 month",
      "Unsure",
    ],
  },
  {
    id: "q4",
    title: "What's your average monthly revenue?",
    // inputType: "number",
    // validation: "positiveNumber",
    // nextButton: true,
  },
  {
    id: "q5",
    title: "What is your personal credit score?",
    options: [
      "Excellent (720+)",
      "Good (680 - 719)",
      "Fair (640 - 679)",
      "Poor (639 or less)",
    ],
  },
  {
    id: "q6",
    title: "Tell us about your business",
  },
  {
    id: 'q7',
    text: 'When did you start your business?'
  },
  {
    id: 'q8',
    text: 'What industry are you in?'
  },
  {
    id: "q9",
    text: "Tell us about yourself"
  },
  {
    id: "email",
    title: "What is your email address?",
    inputType: "email",
    validation: "usEmail",
    placeholder: "example@gmail.com",
    nextButton: true,
  },





  // Your Business Part of the Navbar
  // {
  //   id: "industryName",
  //   title: "What industry are you in?",
  //   options: [
  //     "Construction",
  //     "Transportation and Warehousing",
  //     "Retail Trade",
  //     "Healthcare",
  //     "Accommodation and Food Services",
  //     "Other",
  //   ],
  // },
  // {
  //   id: "ZipCode",
  //   title: "What is your business zip code?",
  //   inputType: "number",
  //   validation: "usZipCode",
  //   placeholder: "29402",
  //   nextButton: true,
  // },
  // {
  //   id: "BusinessName",
  //   title: "What is your business name?",
  //   inputType: "text",
  //   placeholder: "Example Corp",
  //   nextButton: true,
  // },

  // // Your Info Part of the Navbar
  // {
  //   id: "fullName",
  //   title: "What is your name?",
  //   p: "Please enter both your first and last name.",
  //   inputType: "fullName",
  //   nextButton: true,
  // },
  // {
  //   id: "phoneNumber",
  //   title: "What is the best phone number to reach you?",
  //   inputType: "tel",
  //   validation: "usPhoneNumber",
  //   placeholder: "(222) 222-2222",
  //   nextButton: true,
  // },
  // {
  //   id: "email",
  //   title: "What is your email address?",
  //   inputType: "email",
  //   validation: "usEmail",
  //   placeholder: "example@gmail.com",
  //   nextButton: true,
  // },
];
