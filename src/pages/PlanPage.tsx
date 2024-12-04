import { useState } from "react";
import { ReactTyped } from "react-typed";

const PlanPage = () => {
  const [showQuestions, setShowQuestions] = useState(false);

  const INTRODUCTION = [
    "Welcome to Workout Buddy!",
    "With a single prompt...",
    "Create your own workout routines and track your progress.",
    "",
  ];

  const QUESTIONS = [
    "What kind of physique are you aiming to get?",
    "How many days would you like to workout?",
    "What is your preferred workout intensity?",
    "What is your preferred workout duration?",
  ]

  const handleStringTyped = (arrayPos: number) => {
    if(arrayPos === INTRODUCTION.length - 1) {
      setTimeout(() => {
        setShowQuestions(true);
      }, 2000);
    }
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-[95vh] bg-[#010409] text-white overflow-hidden"
    >
      { showQuestions ? (
        <section className="flex flex-col max-w-[64rem]">
          <ReactTyped 
            className="text-5xl font-medium font-open"
            strings={QUESTIONS}
            typeSpeed={40}
            backSpeed={40}
            onStringTyped={handleStringTyped}
          />
        </section>
      ) : (
        <section className="max-w-[64rem]">
          <ReactTyped 
            className="text-5xl font-medium font-open"
            strings={INTRODUCTION}
            typeSpeed={40}
            backSpeed={40}
            onStringTyped={handleStringTyped}
          />
        </section>
      )}
    </main>
  )
}

export default PlanPage;
