"use client";

import React, { useState } from "react";
import QuestionCard from "@/components/form";
import { questions } from "@/data/questions";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Building2, Handshake, Landmark, Store, User } from "lucide-react";
import BackIcon from "@/components/icons/back-icon";


const NAV_STEPS = [
  { label: "Basic Info", range: [0, 4] },
  { label: "Your Business", range: [5, 8] },
  { label: "Your Info", range: [9, 12] },
  { label: "Offers and Final Details", range: [questions.length, questions.length] },
];

function getStep(current) {
  for (let i = 0; i < NAV_STEPS.length; i++) {
    const [start, end] = NAV_STEPS[i].range;
    if (current >= start && current <= end) return i;
  }
  return 0;
}

function IgniteLogo() {
  return (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-900 to-blue-400 text-white font-extrabold text-3xl select-none">
      P {/* TODO: Add logo text or icon here  */}
    </span>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const [showTransition, setShowTransition] = useState(false);


  const totalQuestions = questions.length;
  const progressPercentage = totalQuestions > 0 ? (current / totalQuestions) * 100 : 0;

  const handleSelect = (option, errorMsg) => {
    if (errorMsg) {
      setFieldError(errorMsg);
      return;
    }
    setFieldError("");
    setAnswers({ ...answers, [questions[current].id]: option });

    if (current < totalQuestions - 1) {
      setShowTransition(true);
      setTimeout(() => {
        setShowTransition(false);
        setCurrent(current + 1);
      }, 600);
    } else {
      console.log("Form submitted!", answers);
      setShowThankYou(true);
    }
  };

  const step = getStep(current);

  return (
    <main className="flex flex-col bg-ignite-animated relative min-h-screen">
      <nav className="w-full bg-gray-50 border-b border-gray-200 py-3 px-2 flex justify-center items-center gap-2 relative z-10">
        <div className="flex items-center gap-2 md:gap-4">
          <IgniteLogo />
          <span className="ml-2 text-xl font-bold text-blue-900 hidden sm:inline">
            ProsperityBusinessFinance
          </span>
        </div>
      </nav>

      {!showThankYou && (
        <>
          <div className="text-center text-sm text-gray-600 py-1 relative z-10">
            Question {current + 1} of {totalQuestions}
          </div>
          <div className="w-full flex justify-center py-1 relative z-10">
            <div className="w-1/3 bg-gray-100 h-1.5 dark:bg-gray-300 rounded-full overflow-hidden">
              <div
                className="bg-green-600 h-1.5 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </>
      )}

      <div className="flex-1 flex items-center justify-center px-2 py-4 relative z-10">
        {showThankYou ? (
          <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-lg flex flex-col items-center justify-center text-center z-10">
            <DotLottieReact
              src="https://lottie.host/a0285ded-f43b-4af6-9edd-ec684f80071f/t5RejRJf3j.lottie"
              loop
              autoplay
              mute
            />
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              Your responses have been recorded
            </h2>
            <p className="text-gray-700">We will get back to you soon.</p>
          </div>
        ) : showTransition ? (
          <div className="flex items-center justify-center">
            <DotLottieReact
              src="https://lottie.host/b2288875-3cdf-4548-ae1d-cb2c069fc101/DxxhmKZQtP.lottie"
              loop
              autoplay
              mute
              playbackSpeed={1.5}
              style={{ width: 200, height: 200 }}
            />
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            {current === 0 && (
              <section className="text-gray-700 body-font mb-8">
                <div className="container px-5 py-6 mx-auto text-center">
                  <h2 className="text-2xl font-bold text-green-800 mb-6">What type of business do you own?</h2>
                  <div className="flex flex-wrap justify-center gap-4">
                    {["Sole Proprietor", "Partnership", "Limited Liability Company (LLC)", "C Corporation", "S Corporation"].map((type, index) => {
                      const Icon = [User, Handshake, Landmark, Building2, Store][index];
                      return (
                        <div
                          key={index}
                          className="cursor-pointer border-2 border-green-600 w-64 px-6 py-4 rounded-xl text-center shadow-md transform transition duration-300 hover:scale-105 hover:bg-green-100 flex flex-col items-center gap-3"
                          onClick={() => handleSelect(type)}
                        >
                          <Icon className="text-green-700" size={32} />
                          <p className="text-lg font-medium text-green-800">{type}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {current === 1 && (
              <div className="p-6 bg-white rounded-xl shadow-md text-center max-w-xl mx-auto">
                <p className="text-lg text-blue-900 font-semibold mb-2 uppercase">How much money do you need?</p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{questions[current].text}</h2>

                <div className="text-4xl font-bold text-green-600 mb-4">
                  ${Number(answers[questions[current].id] || 640000).toLocaleString()}
                </div>

                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="10000"
                  value={answers[questions[current].id] || 640000}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [questions[current].id]: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-1 appearance-none bg-gray-200 rounded-lg cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6cf5be ${((answers[questions[current].id] || 640000) - 10000) / (1000000 - 10000) * 100
                      }%, #e5e7eb 0%)`,
                  }}
                />

                <div className="flex justify-between text-sm mt-2" style={{ color: "#33336a" }}>
                  <span>$10,000</span>
                  <span>$1,000,000+</span>
                </div>

                <button
                  onClick={() => {
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c + 1);
                    }, 600);
                  }}
                  className="btn-glosmophobic"
                >
                  Continue
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c - 1);
                    }, 600);
                  }}
                  aria-label="Go back"
                  className="btn-back group"
                >
                  <BackIcon className="w-8 h-9.5" />
                  <span>Back</span>
                </button>
              </div>
            )}

            {/* DROPDOWN QUESTION */}
            {current === 2 && (
              <div className="p-6 bg-white rounded-xl shadow-md text-center max-w-xl mx-auto">
                <p className="text-lg text-blue-900 font-semibold mb-2">What are you getting financing for?</p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{questions[current].text}</h2>

                <select
                  value={answers[questions[current].id] || ""}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [questions[current].id]: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md mb-4"
                >
                  <option value="" disabled>Select one</option>
                  <option value="Expansion">Expansion</option>
                  <option value="Equipment purchase">Equipment purchase</option>
                  <option value="Purchase a Vehicle">Purchase a Vehicle</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Payroll">Payroll</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Commercial Real Estate">Commercial Real Estate</option>
                  <option value="Remodel my Location">Remodel my Location</option>
                  <option value="Refinance Debt">Refinance Debt</option>
                  <option value="Finance Accounts Receivable">Finance Accounts Receivable</option>
                  <option value="Buy a Business/Franchise">Buy a Business/Franchise</option>
                  <option value="Start a Business">Start a Business</option>
                  <option value="Other">Other</option>
                </select>

                {fieldError && <div className="text-red-600 mb-2">{fieldError}</div>}

                <button
                  onClick={() => {
                    if (!answers[questions[current].id]) {
                      setFieldError("Please select an industry.");
                      return;
                    }
                    setFieldError("");
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c + 1);
                    }, 600);
                  }}
                  className="btn-glosmophobic"
                >
                  Continue
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c - 1);
                    }, 600);
                  }}
                  aria-label="Go back"
                  className="btn-back group"
                >
                  <BackIcon className="w-8 h-9.5" />
                  <span>Back</span>
                </button>
              </div>
            )}

            {/* Urgency */}
            {current === 3 && (
              <div className="p-6 bg-white rounded-xl shadow-md text-center max-w-xl mx-auto">
                <p className="text-lg text-blue-900 font-semibold mb-2">How quickly do you need the money?</p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{questions[current].text}</h2>

                <div className="flex flex-col gap-3">
                  {["Within a week", "Within 2 weeks", "Within 1 month", "Unsure"].map((option) => (
                    <div
                      key={option}
                      className={`cursor-pointer border-2 border-green-600 px-6 py-4 rounded-xl text-center shadow-sm transform transition-transform duration-300 hover:scale-105 hover:bg-green-100
            ${answers[questions[current].id] === option ? "bg-green-100" : "bg-white"}`}
                      onClick={() => {
                        setAnswers({ ...answers, [questions[current].id]: option });
                        setShowTransition(true);
                        setTimeout(() => {
                          setShowTransition(false);
                          setCurrent((c) => c + 1); // Move to next question
                        }, 600);
                      }}
                    >
                      <p className="text-lg font-medium text-green-800">{option}</p>
                    </div>
                  ))}
                </div>

                {fieldError && <div className="text-red-600 mt-3">{fieldError}</div>}

                <button
                  type="button"
                  onClick={() => {
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c - 1);
                    }, 600);
                  }}
                  aria-label="Go back"
                  className="btn-back group"
                >
                  <BackIcon className="w-8 h-9.5" />
                  <span>Back</span>
                </button>
              </div>
            )}

            {/* What's your average monthly revenue? */}
            {current === 4 && (
              <div className="p-6 bg-white rounded-xl shadow-md text-center max-w-xl mx-auto">
                <p className="text-lg text-blue-900 font-semibold mb-2">What's your average monthly revenue?</p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{questions[current].text}</h2>

                {/* ShadCN Input Field */}
                <div className="mb-4">
                  <input
                    type="text" // Use text type to allow dollar sign input
                    value={answers[questions[current].id] ? `$${answers[questions[current].id]}` : ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
                      if (value === "" || parseInt(value) < 10000000) {
                        setAnswers({ ...answers, [questions[current].id]: value });
                        setFieldError(""); // Clear error if valid
                      } else {
                        setFieldError("Please enter a value less than $10 million.");
                      }
                    }}
                    className={`w-full p-4 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 
          ${fieldError ? "bg-red-200" : "border-green-600"}`}
                    placeholder="Enter amount"
                  />
                </div>

                {fieldError && <div className="text-red-600 mt-3">{fieldError}</div>}

                {/* Continue button */}
                <button
                  onClick={() => {
                    if (!answers[questions[current].id] || parseInt(answers[questions[current].id]) >= 10000000) {
                      setFieldError("Please enter a value less than $10 million.");
                      return;
                    }
                    setFieldError(""); // Clear any error
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c + 1); // Move to next question
                    }, 600);
                  }}
                  className="btn-glosmophobic"
                >
                  Continue
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c - 1);
                    }, 600);
                  }}
                  aria-label="Go back"
                  className="btn-back group"
                >
                  <BackIcon className="w-8 h-9.5" />
                  <span>Back</span>
                </button>
              </div>
            )}

            {/* Credit Score */}
            {current === 5 && (
              <div className="p-6 bg-white rounded-xl shadow-md text-center max-w-xl mx-auto">
                <p className="text-lg text-blue-900 font-semibold mb-2">What's your credit score?</p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{questions[current].text}</h2>

                <div className="flex flex-col gap-3">
                  {["Excellent (720+)", "Good (680 - 719)", "Fair (640 - 679)", "Poor (639 or less)"].map((option) => (
                    <div
                      key={option}
                      className={`cursor-pointer border-2 border-green-600 px-6 py-4 rounded-xl text-center shadow-sm transform transition-transform duration-300 hover:scale-105 hover:bg-green-100
            ${answers[questions[current].id] === option ? "bg-green-100" : "bg-white"}`}
                      onClick={() => {
                        setAnswers({ ...answers, [questions[current].id]: option });
                        setShowTransition(true);
                        setTimeout(() => {
                          setShowTransition(false);
                          setCurrent((c) => c + 1); // Move to next question
                        }, 600);
                      }}
                    >
                      <p className="text-lg font-medium text-green-800">{option}</p>
                    </div>
                  ))}
                </div>

                {fieldError && <div className="text-red-600 mt-3">{fieldError}</div>}

                <button
                  type="button"
                  onClick={() => {
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c - 1);
                    }, 600);
                  }}
                  aria-label="Go back"
                  className="btn-back group"
                >
                  <BackIcon className="w-8 h-9.5" />
                  <span>Back</span>
                </button>
              </div>
            )}


            {/* Business Name and ZIP Code */}
            {current === 6 && (
              <div className="p-6 bg-white rounded-xl shadow-md text-center max-w-xl mx-auto">
                <p className="text-lg text-blue-900 font-semibold mb-2">Tell us about your business</p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {questions[current]?.text || ''}
                </h2>

                {/* Business Name Field */}
                <div className="mb-4 text-left">
                  <label className="block mb-1 font-medium text-gray-700">Business Name</label>
                  <input
                    type="text"
                    value={answers.businessName || ''}
                    onChange={(e) => setAnswers({ ...answers, businessName: e.target.value })}
                    className={`w-full p-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 
          ${fieldError.businessName ? "bg-red-200" : "border-green-600"}`}
                    placeholder="Enter your business name"
                  />
                  {fieldError.businessName && (
                    <div className="text-red-600 mt-1">{fieldError.businessName}</div>
                  )}
                </div>

                {/* Zip Code Field */}
                <div className="mb-4 text-left">
                  <label className="block mb-1 font-medium text-gray-700">Business ZIP Code</label>
                  <input
                    type="text"
                    value={answers.businessZip || ''}
                    onChange={(e) => setAnswers({ ...answers, businessZip: e.target.value })}
                    className={`w-full p-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 
          ${fieldError.businessZip ? "bg-red-200" : "border-green-600"}`}
                    placeholder="Enter 5-digit ZIP code"
                  />
                  {fieldError.businessZip && (
                    <div className="text-red-600 mt-1">{fieldError.businessZip}</div>
                  )}
                </div>

                {/* Continue button */}
                <button
                  onClick={() => {
                    const errors = {};
                    if (!answers.businessName || answers.businessName.trim() === "") {
                      errors.businessName = "Please enter your business name.";
                    }
                    if (!answers.businessZip || !/^\d{5}$/.test(answers.businessZip)) {
                      errors.businessZip = "Please enter a valid 5-digit US ZIP code.";
                    }

                    if (Object.keys(errors).length > 0) {
                      setFieldError(errors);
                      return;
                    }

                    setFieldError({});
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c + 1);
                    }, 600);
                  }}
                  className="btn-glosmophobic"
                >
                  Continue
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c - 1);
                    }, 600);
                  }}
                  aria-label="Go back"
                  className="btn-back group"
                >
                  <BackIcon className="w-8 h-9.5" />
                  <span>Back</span>
                </button>
              </div>
            )}


            {/* Business Start Date */}
            {current === 7 && (
              <div className="p-6 bg-white rounded-xl shadow-md text-center max-w-xl mx-auto">
                {/* <p className="text-lg text-blue-900 font-semibold mb-2">When did you start your business?</p> */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{questions[current]?.text || ""}</h2>

                {/* Month and Year Dropdowns */}
                <div className="mb-4 text-left">
                  <label className="block mb-1 font-medium text-gray-700">Start Month</label>
                  <select
                    value={answers.startMonth || ''}
                    onChange={(e) => setAnswers({ ...answers, startMonth: e.target.value })}
                    className={`w-full p-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 
        ${fieldError.startMonth ? "bg-red-200" : "border-green-600"}`}
                  >
                    <option value="">Select month</option>
                    {[
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ].map((month, index) => (
                      <option key={index} value={index + 1}>{month}</option>
                    ))}
                  </select>
                  {fieldError.startMonth && (
                    <div className="text-red-600 mt-1">{fieldError.startMonth}</div>
                  )}
                </div>

                <div className="mb-4 text-left">
                  <label className="block mb-1 font-medium text-gray-700">Start Year</label>
                  <select
                    value={answers.startYear || ''}
                    onChange={(e) => setAnswers({ ...answers, startYear: e.target.value })}
                    className={`w-full p-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 
        ${fieldError.startYear ? "bg-red-200" : "border-green-600"}`}
                  >
                    <option value="">Select year</option>
                    {Array.from({ length: 30 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                  {fieldError.startYear && (
                    <div className="text-red-600 mt-1">{fieldError.startYear}</div>
                  )}
                </div>

                {/* Continue Button */}
                <button
                  onClick={() => {
                    const errors = {};
                    if (!answers.startMonth) errors.startMonth = "Please select a month.";
                    if (!answers.startYear) errors.startYear = "Please select a year.";

                    if (Object.keys(errors).length > 0) {
                      setFieldError(errors);
                      return;
                    }

                    setFieldError({});
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c + 1);
                    }, 600);
                  }}
                  className="btn-glosmophobic"
                >
                  Continue
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => {
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c - 1);
                    }, 600);
                  }}
                  aria-label="Go back"
                  className="btn-back group"
                >
                  <BackIcon className="w-8 h-9.5" />
                  <span>Back</span>
                </button>
              </div>
            )}

            {/* Industry Dropdown */}
            {current === 8 && (
              <div className="p-6 bg-white rounded-xl shadow-md text-center max-w-xl mx-auto">
                <p className="text-lg text-blue-900 font-semibold mb-2">What industry are you in?</p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{questions[current]?.text || ""}</h2>

                {/* Industry Dropdown */}
                <div className="mb-4 text-left">
                  <label className="block mb-1 font-medium text-gray-700">Industry</label>
                  <select
                    value={answers.industry || ''}
                    onChange={(e) => setAnswers({ ...answers, industry: e.target.value })}
                    className={`w-full p-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 
        ${fieldError.industry ? "bg-red-200" : "border-green-600"}`}
                  >
                    <option value="">Select an industry</option>
                    <option>Accommodation and Food Services</option>
                    <option>Administrative & Support and Waste Management & Remediation Services</option>
                    <option>Agriculture, Forestry, Fishing and Hunting</option>
                    <option>Arts, Entertainment, and Recreation</option>
                    <option>Construction</option>
                    <option>Educational Services</option>
                    <option>Finance and Insurance</option>
                    <option>Health Care and Social Assistance</option>
                    <option>Information</option>
                    <option>Management of Companies and Enterprises</option>
                    <option>Manufacturing</option>
                    <option>Other Services (except Public Administration)</option>
                    <option>Professional, Scientific and Technical Services</option>
                    <option>Public Administration</option>
                    <option>Real Estate Rental and Leasing</option>
                    <option>Retail Trade</option>
                    <option>Transportation and warehousing</option>
                    <option>Utilities</option>
                    <option>Wholesale Trade</option>
                  </select>
                  {fieldError.industry && (
                    <div className="text-red-600 mt-1">{fieldError.industry}</div>
                  )}
                </div>

                {/* Continue Button */}
                <button
                  onClick={() => {
                    const errors = {};
                    if (!answers.industry) errors.industry = "Please select an industry.";

                    if (Object.keys(errors).length > 0) {
                      setFieldError(errors);
                      return;
                    }

                    setFieldError({});
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c + 1);
                    }, 600);
                  }}
                  className="btn-glosmophobic"
                >
                  Continue
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => {
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c - 1);
                    }, 600);
                  }}
                  aria-label="Go back"
                  className="btn-back group"
                >
                  <BackIcon className="w-8 h-9.5" />
                  <span>Back</span>
                </button>
              </div>
            )}


            {/* Personal Info */}
            {current === 9 && (
              <div className="p-6 bg-white rounded-xl shadow-md text-center max-w-xl mx-auto">
                <p className="text-lg text-blue-900 font-semibold mb-2">Tell us about yourself</p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{questions[current]?.text || ""}</h2>

                {/* First Name Field */}
                <div className="mb-4 text-left">
                  <label className="block mb-1 font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={answers.firstName || ''}
                    onChange={(e) => setAnswers({ ...answers, firstName: e.target.value })}
                    className={`w-full p-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 
        ${fieldError.firstName ? "bg-red-200" : "border-green-600"}`}
                    placeholder="Enter your first name"
                  />
                  {fieldError.firstName && (
                    <div className="text-red-600 mt-1">{fieldError.firstName}</div>
                  )}
                </div>

                {/* Last Name Field */}
                <div className="mb-4 text-left">
                  <label className="block mb-1 font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={answers.lastName || ''}
                    onChange={(e) => setAnswers({ ...answers, lastName: e.target.value })}
                    className={`w-full p-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 
        ${fieldError.lastName ? "bg-red-200" : "border-green-600"}`}
                    placeholder="Enter your last name"
                  />
                  {fieldError.lastName && (
                    <div className="text-red-600 mt-1">{fieldError.lastName}</div>
                  )}
                </div>

                {/* Phone Number Field */}
                <div className="mb-4 text-left">
                  <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    value={answers.phoneNumber || ''}
                    onChange={(e) => {
                      // Only allow digits
                      let digits = e.target.value.replace(/\D/g, '');

                      // Remove leading '1' if it's there and total digits exceed 10
                      if (digits.length === 11 && digits.startsWith('1')) {
                        digits = digits.slice(1);
                      }

                      // Limit to 10 digits
                      digits = digits.slice(0, 10);

                      // Format the number into (XXX) XXX-XXXX
                      let formatted = digits;
                      if (digits.length > 6) {
                        formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
                      } else if (digits.length > 3) {
                        formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
                      } else if (digits.length > 0) {
                        formatted = `(${digits}`;
                      }

                      // Update the phone number
                      setAnswers({ ...answers, phoneNumber: formatted });
                    }}
                    placeholder="(814) 222-2222"
                    className={`w-full p-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 
        ${fieldError.phoneNumber ? "bg-red-200" : "border-green-600"}`}
                  />
                  {fieldError.phoneNumber && (
                    <div className="text-red-600 mt-1">{fieldError.phoneNumber}</div>
                  )}
                </div>

                {/* Continue Button */}
                <button
                  onClick={() => {
                    const rawPhone = answers.phoneNumber?.replace(/\D/g, ''); // Strip all non-digits

                    const errors = {};
                    if (!answers.firstName || answers.firstName.trim() === "") {
                      errors.firstName = "Please enter your first name.";
                    }
                    if (!answers.lastName || answers.lastName.trim() === "") {
                      errors.lastName = "Please enter your last name.";
                    }

                    // Validate phone number - US phone number should be exactly 10 digits
                    if (!rawPhone || rawPhone.length !== 10) {
                      errors.phoneNumber = "Please enter a valid 10-digit US phone number.";
                    }

                    if (Object.keys(errors).length > 0) {
                      setFieldError(errors);
                      return;
                    }

                    setFieldError({});
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c + 1);
                    }, 600);
                  }}
                  className="btn-glosmophobic"
                >
                  Continue
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => {
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c - 1);
                    }, 600);
                  }}
                  aria-label="Go back"
                  className="btn-back group"
                >
                  <BackIcon className="w-8 h-9.5" />
                  <span>Back</span>
                </button>
              </div>
            )}

            {/* Contact Details */}
            {current === 10 && (
              <div className="p-6 bg-white rounded-xl shadow-md text-center max-w-xl mx-auto">
                <p className="text-lg text-blue-900 font-semibold mb-2">Your Contact Details</p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{questions[current]?.text || "What is your email address?"}</h2>

                {/* Email Address Field */}
                <div className="mb-4 text-left">
                  <label className="block mb-1 font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={answers.email || ''}
                    onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                    className={`w-full p-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 
        ${fieldError.email ? "bg-red-200" : "border-green-600"}`}
                    placeholder="Enter your email"
                  />
                  {fieldError.email && (
                    <div className="text-red-600 mt-1">{fieldError.email}</div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={() => {
                    const errors = {};
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!answers.email || !emailPattern.test(answers.email)) {
                      errors.email = "Please enter a valid email address.";
                    }

                    if (Object.keys(errors).length > 0) {
                      setFieldError(errors);
                      return;
                    }

                    setFieldError({});
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setShowThankYou(true);
                    }, 600);
                  }}
                  className="btn-glosmophobic"
                >
                  Submit
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => {
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c - 1);
                    }, 600);
                  }}
                  aria-label="Go back"
                  className="btn-back group"
                >
                  <BackIcon className="w-8 h-9.5" />
                  <span>Back</span>
                </button>
              </div>
            )}




            {/* FALLBACK */}
            {current !== 0 && current !== 1 && current !== 2 && current !== 3 && current !== 4 && current !== 5 && current !== 6 && current !== 7 && current !== 8 && current !== 9 && current !== 10 && (
              <QuestionCard
                question={questions[current]}
                selected={answers[questions[current].id]}
                onSelect={handleSelect}
                fieldError={fieldError}
                setFieldError={setFieldError}
                onBack={() => {
                  if (current > 0) {
                    setShowTransition(true);
                    setTimeout(() => {
                      setShowTransition(false);
                      setCurrent((c) => c - 1);
                    }, 600);
                  }
                }}
                showBackButton={current > 0}
              />
            )}
          </div>
        )}
      </div>

      <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-blue-900 to-blue-400 text-white font-extrabold text-4xl select-none mb-2">
              P {/*TODO: Add logo here */}
            </span>
            <span className="text-2xl font-bold text-blue-900">
              ProsperityBusinessFinance
            </span>
          </div>
          <div className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} ProsperityBusinessFinance . All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
