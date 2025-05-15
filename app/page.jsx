"use client";

import React, { useState } from "react";
import { questions } from "@/data/questions";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { DotBackground } from "@/components/DotBackground";
import QuestionForm from "@/components/form";
import ProsperityLogo from "@/components/icon/logo";

function Logo() {
  return (
    <span>
      <ProsperityLogo />
    </span>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);
  const [fieldError, setFieldError] = useState({});
  const [showTransition, setShowTransition] = useState(false);

  const totalQuestions = questions.length;
  const progressPercentage = totalQuestions > 0 ? (current / totalQuestions) * 100 : 0;

  return (
    <main className="flex flex-col relative min-h-screen">
      <DotBackground
        className="fixed inset-0 w-full h-full z-0"
        dotColor="#e0e7ef"
      />
      <nav className="w-full bg-slate-800 border-b border-gray-200 py-6 px-2 flex flex-col items-center gap-0 relative z-10">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="flex flex-col items-start">
            <span className="text-2xl sm:text-3xl font-extrabold colorChange1 tracking-tight leading-none">
              PROSPERITY
            </span>
            <span className="text-base sm:text-lg font-semibold colorChange1" style={{ letterSpacing: "0.06em" }}>
              BUSINESS FINANCE
            </span>
          </div>
        </div>
      </nav>

      {!showThankYou && (
        <>
          <div className="text-center text-sm text-Teal-700 py-1 relative z-10">
            Question {current + 1} of {totalQuestions}
          </div>
          <div className="w-full flex justify-center py-1 relative z-10">
            <div
              className="w-1/3 shadow-md shadow-gray-400/50 h-2 dark:bg-gray-300 rounded-full overflow-hidden"
              style={{
                background: "linear-gradient(90deg, #f3f4f6 0%, #d1d5db 100%)"
              }}
            >
              <div
                className="h-1.5 transition-all duration-500 ease-out"
                style={{
                  width: `${progressPercentage}%`,
                  background: "linear-gradient(90deg, #00c49a 0%, #067a6e 100%)"
                }}
              ></div>
            </div>
          </div>
        </>
      )}

      <div className="flex-1 flex items-center justify-center px-2 py-4 relative z-10">
        {showThankYou ? (
          <div className="bg-transparent rounded-xl shadow-lg p-10 w-full max-w-lg flex flex-col items-center justify-center text-center z-10">
            <DotLottieReact
              src="/assets/Animation complete - 1746205531229.lottie"
              loop
              autoplay
              mute
            />
            <h2 className="text-2xl font-bold text-Teal-700 mb-2">
              Your responses have been recorded
            </h2>
            <p className="text-Teal-600">We will get back to you soon.</p>
          </div>
        ) : showTransition ? (
          <div className="flex items-center justify-center">
            <DotLottieReact
              src="/assets/Animation Fill - 1747201202643.lottie"
              loop
              autoplay
              mute
              playbackSpeed={2}
              style={{ width: 200, height: 200 }}
            />
          </div>
        ) : (
          <div className="w-full max-w-4xl px-0 sm:px-4">
            <QuestionForm
              current={current}
              questions={questions}
              answers={answers}
              setAnswers={setAnswers}
              fieldError={fieldError}
              setFieldError={setFieldError}
              setShowTransition={setShowTransition}
              setCurrent={setCurrent}
              setShowThankYou={setShowThankYou}
            />
          </div>
        )}
      </div>

      <footer className="w-full bg-transparent mt-auto pt-8 pb-4 px-2 z-10">
        <div className="max-w-2xl mx-auto border-t border-gray-200 px-4 py-8 flex flex-col items-center">
          <div className="flex items-center gap-3">
            <Logo />
            <div className="flex flex-col items-start">
              <span className="text-2xl sm:text-3xl font-extrabold colorChange1 tracking-tight leading-none">
                PROSPERITY
              </span>
              <span className="text-base sm:text-lg font-semibold colorChange1" style={{ letterSpacing: "0.06em" }}>
                BUSINESS FINANCE
              </span>
            </div>
          </div>
          <div className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} ProsperityBusinessFinance . All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}