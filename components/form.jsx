"use client";
import React from "react";
import { Building2, Handshake, Landmark, Store, User } from "lucide-react";

export default function QuestionForm({
  current,
  questions,
  answers,
  setAnswers,
  fieldError,
  setFieldError,
  setShowTransition,
  setCurrent,
  setShowThankYou,
}) {
  const question = questions[current];

  // Helper for error rendering
  const getError = (key) =>
    fieldError && typeof fieldError === "object" && fieldError[key]
      ? fieldError[key]
      : "";

  // Continue handler for most questions
  const handleContinue = (validate, after) => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldError(errors);
      return;
    }
    setFieldError({});
    setShowTransition(true);
    setTimeout(() => {
      setShowTransition(false);
      after();
    }, 2000);
  };

  // Back handler
  const handleBack = () => {
    setFieldError({});
    setShowTransition(true);
    setTimeout(() => {
      setShowTransition(false);
      setCurrent((c) => c - 1);
    }, 2000);
  };

  switch (current) {
    case 0:
      return (
        <section className="text-gray-700 body-font mb-8">
          <div className="container px-5 py-6 mx-auto text-center">
            <h2 className="question-header">{question?.text || "What type of business do you own?"}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {["Sole Proprietor", "Partnership", "Limited Liability Company (LLC)", "C Corporation", "S Corporation"].map((type, index) => {
                const icons = [User, Handshake, Landmark, Building2, Store];
                const Icon = icons[index];
                return (
                  <div
                    key={index}
                    className="cursor-pointer bg-Orange-100 border-2 border-gray-300 w-64 px-6 py-4 rounded-xl text-center shadow-md transform transition duration-300 hover:scale-105 hover:bg-Teal-50 hover:border-2 hover:border-Teal-400  flex flex-col items-center gap-3"
                    onClick={() => {
                      setAnswers({ ...answers, [question.id]: type });
                      setShowTransition(true);
                      setTimeout(() => {
                        setShowTransition(false);
                        setCurrent((c) => c + 1);
                      }, 2000);
                    }}
                  >
                    {Icon && <Icon className="text-Teal-500" size={50} />}
                    <p className="text-base font-medium text-Teal-600">{type}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    case 1:
      // Set default value to 500000
      const min = 10000;
      const max = 1000000;
      const defaultValue = 500000;
      const value = answers[question.id] ?? defaultValue;
      const percent = ((value - min) / (max - min)) * 100;

      return (
        <div className="question-BG">
          <h2 className="question-header">{question?.text || "How much do you need?"}</h2>
          <div className="text-4xl font-bold text-Cyan-600 mb-4">
            ${Number(value).toLocaleString()}
          </div>
          <div className="relative w-full flex items-center justify-center" style={{ height: 56 }}>
            <input
              type="range"
              min={min}
              max={max}
              step="10000"
              value={value}
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  [question.id]: parseInt(e.target.value),
                })
              }
              className="w-full h-3 appearance-none rounded-lg cursor-pointer"
              style={{
                background: `linear-gradient(
              to right,
              #067a6e 0%, 
              #067a6e ${percent}%,
              #5bcdc0 ${percent}%,
              #5bcdc0 100%
            )`,
              }}
              id="money-slider"
            />
            <span
              style={{
                position: "absolute",
                left: `calc(${percent}% - 14px)`,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                pointerEvents: "none",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.5rem",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#00a79d",
                borderRadius: "50%",
                boxShadow: "0 0 2px rgba(0,0,0,0.1)",
              }}
            >
              $
            </span>
          </div>
          <div className="flex justify-between text-sm mt-2" style={{ color: "#2186a0" }}>
            <span>$10,000</span>
            <span>$1,000,000+</span>
          </div>
          <button
            onClick={() => handleContinue(() => ({}), () => setCurrent((c) => c + 1))}
            className="btn-glosmophobic"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="btn-back group"
          >
            <span className="colorChange1">Back</span>
          </button>
        </div>
      );
    case 2:
      return (
        <div className="question-BG">
          <h2 className="question-header">{question?.text || "What are you getting finance for?"}</h2>
          <select
            value={answers[question.id] || ""}
            onChange={(e) =>
              setAnswers({
                ...answers,
                [question.id]: e.target.value,
              })
            }
            className="input-field mb-3"
          >
            <option value="" disabled>Select one</option>
            {(question.options || []).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {getError(question.id) && (
            <div className="text-red-600 mb-2">{getError(question.id)}</div>
          )}
          <button
            onClick={() => {
              if (!answers[question.id]) {
                setFieldError({ [question.id]: "Please select an industry." });
                return;
              }
              setFieldError({});
              setShowTransition(true);
              setTimeout(() => {
                setShowTransition(false);
                setCurrent((c) => c + 1);
              }, 2000);
            }}
            className="btn-glosmophobic"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="btn-back group"
          >
            <span className="colorChange1">Back</span>
          </button>
        </div>
      );
    case 3:
      return (
        <div className="question-BG">
          <h2 className="question-header">{question?.text || "How quickly do you need the money?"}</h2>
          <div className="flex flex-col gap-3">
            {(question.options || []).map((option) => (
              <div
                key={option}
                className={`cursor-pointer border-2 border-gray-300 px-6 py-4 rounded-xl text-center shadow-sm transform transition-transform duration-300 hover:scale-105 hover:bg-Teal-50 hover:border-2 hover:border-Teal-400
                  ${answers[question.id] === option ? "bg-Teal-50" : "bg-Orange-100"}`}
                onClick={() => {
                  setAnswers({ ...answers, [question.id]: option });
                  setShowTransition(true);
                  setTimeout(() => {
                    setShowTransition(false);
                    setCurrent((c) => c + 1);
                  }, 2000);
                }}
              >
                <p className="text-lg font-medium text-Teal-700">{option}</p>
              </div>
            ))}
          </div>
          {getError(question.id) && (
            <div className="text-red-600 mt-3">{getError(question.id)}</div>
          )}
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="btn-back group"
          >
            <span className="colorChange1">Back</span>
          </button>
        </div>
      );
    case 4:
      return (
        <div className="question-BG">
          <h2 className="question-header">{question?.text || "What's your average monthly revenue?"}</h2>
          <div className="mb-4">
            <input
              type="text"
              value={answers[question.id] ? `$${answers[question.id]}` : ""}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                if (value === "" || parseInt(value) < 10000000) {
                  setAnswers({ ...answers, [question.id]: value });
                  setFieldError({});
                } else {
                  setFieldError({ [question.id]: "Please enter a value less than $10 million." });
                }
              }}
              className={`input-field
                ${getError(question.id) ? "bg-red-200" : "border-gray-200"}`}
              placeholder="Enter amount"
            />
          </div>
          {getError(question.id) && (
            <div className="text-red-600 mt-3">{getError(question.id)}</div>
          )}
          <button
            onClick={() => {
              if (!answers[question.id] || parseInt(answers[question.id]) >= 10000000) {
                setFieldError({ [question.id]: "Please enter a value less than $10 million." });
                return;
              }
              setFieldError({});
              setShowTransition(true);
              setTimeout(() => {
                setShowTransition(false);
                setCurrent((c) => c + 1);
              }, 2000);
            }}
            className="btn-glosmophobic"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="btn-back group"
          >
            <span className="colorChange1">Back</span>
          </button>
        </div>
      );
    case 5:
      return (
        <div className="question-BG">
          <h2 className="question-header">{question?.text || "What is your personal credit score?"}</h2>
          <div className="flex flex-col gap-3">
            {(question.options || []).map((option) => (
              <div
                key={option}
                className={`cursor-pointer border-2 border-gray-300 px-6 py-4 rounded-xl text-center shadow-sm transform transition-transform duration-300 hover:scale-105 hover:bg-Teal-50 hover:border-2 hover:border-Teal-400
                  ${answers[question.id] === option ? "bg-Teal-50" : "bg-Orange-100"}`}
                onClick={() => {
                  setAnswers({ ...answers, [question.id]: option });
                  setShowTransition(true);
                  setTimeout(() => {
                    setShowTransition(false);
                    setCurrent((c) => c + 1);
                  }, 2000);
                }}
              >
                <p className="text-lg font-medium text-Teal-700">{option}</p>
              </div>
            ))}
          </div>
          {getError(question.id) && (
            <div className="text-red-600 mt-3">{getError(question.id)}</div>
          )}
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="btn-back group"
          >
            <span className="colorChange1">Back</span>
          </button>
        </div>
      );
    case 6:
      return (
        <div className="question-BG">
          <h2 className="question-header">{question?.text || "Tell us about your business"}</h2>
          <div className="mb-4 text-left">
            <label className="block mb-1 font-medium text-Teal-700">Business Name</label>
            <input
              type="text"
              value={answers.businessName || ""}
              onChange={(e) => setAnswers({ ...answers, businessName: e.target.value })}
              className={`input-field
                ${getError("businessName") ? "bg-red-200" : "border-gray-200"}`}
              placeholder="Enter your business name"
            />
            {getError("businessName") && (
              <div className="text-red-600 mt-1">{getError("businessName")}</div>
            )}
          </div>
          <div className="mb-4 text-left">
            <label className="block mb-1 font-medium text-Teal-700">Business ZIP Code</label>
            <input
              type="text"
              value={answers.businessZip || ""}
              maxLength={5}
              onChange={(e) => {
                const zip = e.target.value.replace(/\D/g, "").slice(0, 5);
                setAnswers({ ...answers, businessZip: zip });
                if (zip.length === 5 && !/^\d{5}$/.test(zip)) {
                  setFieldError({
                    ...fieldError,
                    businessZip: "Please enter a valid 5-digit US ZIP code.",
                  });
                } else if (zip.length > 0 && zip.length < 5) {
                  setFieldError({
                    ...fieldError,
                    businessZip: "ZIP code must be 5 digits.",
                  });
                } else {
                  setFieldError({ ...fieldError, businessZip: "" });
                }
              }}
              className={`input-field
                ${getError("businessZip") ? "bg-red-200" : "border-gray-200"}`}
              placeholder="Enter 5-digit ZIP code"
            />
            {getError("businessZip") && (
              <div className="text-red-600 mt-1">{getError("businessZip")}</div>
            )}
          </div>
          <button
            onClick={() =>
              handleContinue(() => {
                const errors = {};
                if (!answers.businessName || answers.businessName.trim() === "")
                  errors.businessName = "Please enter your business name.";
                if (!answers.businessZip || !/^\d{5}$/.test(answers.businessZip))
                  errors.businessZip = "Please enter a valid 5-digit US ZIP code.";
                return errors;
              }, () => setCurrent((c) => c + 1))
            }
            className="btn-glosmophobic"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="btn-back group"
          >
            <span className="colorChange1">Back</span>
          </button>
        </div>
      );
    case 7:
      return (
        <div className="question-BG">
          <h2 className="question-header">{question?.text || "When did you start your business?"}</h2>
          <div className="mb-4 text-left">
            <label className="block mb-1 font-medium text-Teal-700">Start Month</label>
            <select
              value={answers.startMonth || ''}
              onChange={(e) => setAnswers({ ...answers, startMonth: e.target.value })}
              className={`input-field
                ${getError("startMonth") ? "bg-red-200" : "border-gray-200"}`}
            >
              <option value="">Select month</option>
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map((month, index) => (
                <option key={index} value={index + 1}>{month}</option>
              ))}
            </select>
            {getError("startMonth") && (
              <div className="text-red-600 mt-1">{getError("startMonth")}</div>
            )}
          </div>
          <div className="mb-4 text-left">
            <label className="block mb-1 font-medium text-Teal-700">Start Year</label>
            <select
              value={answers.startYear || ''}
              onChange={(e) => setAnswers({ ...answers, startYear: e.target.value })}
              className={`input-field
                ${getError("startYear") ? "bg-red-200" : "border-gray-200"}`}
            >
              <option value="">Select year</option>
              {Array.from({ length: new Date().getFullYear() - 1800 + 1 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
            {getError("startYear") && (
              <div className="text-red-600 mt-1">{getError("startYear")}</div>
            )}
          </div>
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
              }, 2000);
            }}
            className="btn-glosmophobic"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="btn-back group"
          >
            <span className="colorChange1">Back</span>
          </button>
        </div>
      );
    case 8:
      return (
        <div className="question-BG">
          <h2 className="question-header">{question?.text || "What industry are you in?"}</h2>
          <div className="mb-4 text-left">
            <label className="block mb-1 font-medium text-Teal-700">Industry</label>
            <select
              value={answers.industry || ''}
              onChange={(e) => setAnswers({ ...answers, industry: e.target.value })}
              className={`input-field
                ${getError("industry") ? "bg-red-200" : "border-gray-200"}`}
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
            {getError("industry") && (
              <div className="text-red-600 mt-1">{getError("industry")}</div>
            )}
          </div>
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
              }, 2000);
            }}
            className="btn-glosmophobic"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="btn-back group"
          >
            <span className="colorChange1">Back</span>
          </button>
        </div>
      );
    case 9:
      return (
        <div className="question-BG">
          <h2 className="question-header">{question?.text || "Tell us about yourself"}</h2>
          <div className="mb-4 text-left">
            <label className="block mb-1 font-medium text-Teal-700">First Name</label>
            <input
              type="text"
              value={answers.firstName || ''}
              onChange={(e) => setAnswers({ ...answers, firstName: e.target.value })}
              className={`input-field
                ${getError("firstName") ? "bg-red-200" : "border-gray-200"}`}
              placeholder="Enter your first name"
            />
            {getError("firstName") && (
              <div className="text-red-600 mt-1">{getError("firstName")}</div>
            )}
          </div>
          <div className="mb-4 text-left">
            <label className="block mb-1 font-medium text-Teal-700">Last Name</label>
            <input
              type="text"
              value={answers.lastName || ''}
              onChange={(e) => setAnswers({ ...answers, lastName: e.target.value })}
              className={`input-field
                ${getError("lastName") ? "bg-red-200" : "border-gray-200"}`}
              placeholder="Enter your last name"
            />
            {getError("lastName") && (
              <div className="text-red-600 mt-1">{getError("lastName")}</div>
            )}
          </div>
          <div className="mb-4 text-left">
            <label className="block mb-1 font-medium text-Teal-700">Phone Number</label>
            <input
              type="text"
              value={answers.phoneNumber || ''}
              onChange={(e) => {
                let digits = e.target.value.replace(/\D/g, '');
                if (digits.length === 11 && digits.startsWith('1')) {
                  digits = digits.slice(1);
                }
                digits = digits.slice(0, 10);
                let formatted = digits;
                if (digits.length > 6) {
                  formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
                } else if (digits.length > 3) {
                  formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
                } else if (digits.length > 0) {
                  formatted = `(${digits}`;
                }
                setAnswers({ ...answers, phoneNumber: formatted });
              }}
              placeholder="(814) 222-2222"
              className={`input-field
                ${getError("phoneNumber") ? "bg-red-200" : "border-gray-200"}`}
            />
            {getError("phoneNumber") && (
              <div className="text-red-600 mt-1">{getError("phoneNumber")}</div>
            )}
          </div>
          <button
            onClick={() => {
              const rawPhone = answers.phoneNumber?.replace(/\D/g, '');
              const errors = {};
              if (!answers.firstName || answers.firstName.trim() === "") {
                errors.firstName = "Please enter your first name.";
              }
              if (!answers.lastName || answers.lastName.trim() === "") {
                errors.lastName = "Please enter your last name.";
              }
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
              }, 2000);
            }}
            className="btn-glosmophobic"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="btn-back group"
          >
            <span className="colorChange1">Back</span>
          </button>
        </div>
      );
    case 10:
      return (
        <div className="question-BG">
          <h2 className="question-header">{question?.text || "What is your email address?"}</h2>
          <div className="mb-4 text-left">
            <label className="block mb-1 font-medium text-Teal-700">Email Address</label>
            <input
              type="email"
              value={answers.email || ''}
              onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
              className={`input-field
                ${getError("email") ? "bg-red-200" : "border-gray-200"}`}
              placeholder="Enter your email"
            />
            {getError("email") && (
              <div className="text-red-600 mt-1">{getError("email")}</div>
            )}
          </div>
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
              }, 2000);
            }}
            className="btn-glosmophobic"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="btn-back group"
          >
            <span className="colorChange1">Back</span>
          </button>
        </div>
      );
    default:
      return null;
  }
}