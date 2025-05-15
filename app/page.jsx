"use client";

import React, { useState } from "react";
import { questions } from "@/data/questions";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { DotBackground } from "@/components/DotBackground";
import QuestionForm from "@/components/form";

function ProsperityLogo() {
  return (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-Cyan-600 to-Teal-600 text-white font-extrabold text-3xl select-none">
      P {/* TODO: Add logo text or icon here  */}
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
      <nav className="w-full bg-zinc-900/20 border-b border-gray-200 py-3 px-2 flex justify-center items-center gap-2 relative z-10">
        <div className="flex items-center gap-2 md:gap-4">
          <ProsperityLogo />
          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-Cyan-600 to-Teal-600 bg-clip-text text-transparent hidden sm:inline">
            ProsperityBusinessFinance
          </span>
        </div>
      </nav>

      {!showThankYou && (
        <>
          <div className="text-center text-sm text-Teal-700 py-1 relative z-10">
            Question {current + 1} of {totalQuestions}
          </div>
          <div className="w-full flex justify-center py-1 relative z-10">
            <div className="w-1/3 bg-gray-100 shadow-md shadow-gray-400/50 border-2 border-teal-200/50  h-2.5 dark:bg-gray-300 rounded-full overflow-hidden">
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
          <div className="bg-transparent rounded-xl shadow-lg p-10 w-full max-w-lg flex flex-col items-center justify-center text-center z-10">
            <DotLottieReact
              src="https://lottie.host/a0285ded-f43b-4af6-9edd-ec684f80071f/t5RejRJf3j.lottie"
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

      <footer className="w-full bg-neutral-500/10 mt-auto relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
            <ProsperityLogo />
            <span className="text-2xl font-bold bg-gradient-to-r from-Cyan-600 to-Teal-600 bg-clip-text text-transparent inline-block">
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