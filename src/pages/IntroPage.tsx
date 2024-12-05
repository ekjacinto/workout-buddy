import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typed } from "react-typed";
import TextDisplay from "../components/TextDisplay";
import CardContainer from "../components/CardContainer";
import DayChecklist from "../components/DayChecklist";

type GenerativeInputType = string | { question: string; answer: string[] };

const IntroPage = () => {
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [currentArrayPos, setCurrentArrayPos] = useState<number>(0);
  const [fadeInCards, setFadeInCards] = useState<boolean>(false);
  const [fadeOutCards, setFadeOutCards] = useState<boolean>(false);
  const [isTypingPaused, setIsTypingPaused] = useState<boolean>(true);
  const [showChecklist, setShowChecklist] = useState<boolean>(false);
  const [generativeInput, setGenerativeInput] = useState<GenerativeInputType[]>(
    []
  );
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const typedRef = useRef<Typed | null>(null);

  const navigate = useNavigate();

  const INTRODUCTION = [
    "Welcome to Workout Buddy!",
    "With a single prompt...",
    "Create your own workout routines here.",
    "",
  ];

  const QUESTIONS = [
    "What kind of workout discipline would you like to explore?",
    "Select the days you would like to workout?",
    "",
  ];

  const handleStringTyped = (arrayPos: number) => {
    setCurrentArrayPos(arrayPos);

    if (!showQuestions) {
      if (arrayPos === INTRODUCTION.length - 1) {
        setTimeout(() => {
          setShowQuestions(true);
          setFadeInCards(true);
          setIsTypingPaused(false);
        }, 2000);
      }
    } else {
      if (arrayPos === 0) {
        setIsTypingPaused(true);
      } else if (arrayPos === 1) {
        setIsTypingPaused(true);
        setShowChecklist(true);
      } else if (arrayPos === QUESTIONS.length - 1) {
        if (generativeInput.length >= QUESTIONS.length - 1) {
          setIsTypingPaused(true);
          setIsGeneratingPlan(true);
        }
      }
    }
  };

  const handleCardClick = (cardName: string) => {
    setGenerativeInput((prev) => [...prev, cardName]);
    console.log("Selected Cards:", generativeInput);

    setFadeOutCards(true);
    setTimeout(() => {
      setCurrentArrayPos((prev) => {
        const nextPos = prev + 1;
        if (nextPos < QUESTIONS.length) {
          setTimeout(() => {
            setIsTypingPaused(false);
          }, 100);
        }
        return nextPos;
      });
      setFadeOutCards(false);
      setFadeInCards(true);
    }, 500);
  };

  const handleDaysSelected = (selectedDays: string[]) => {
    setGenerativeInput((prev) => [
      ...prev,
      { question: QUESTIONS[1], answer: selectedDays },
    ]);
    console.log("Selected Days:", selectedDays);

    setShowChecklist(false);
    setFadeOutCards(true);

    setTimeout(() => {
      setCurrentArrayPos((prev) => {
        const nextPos = prev + 1;

        if (nextPos >= QUESTIONS.length || QUESTIONS[nextPos] === "") {
          setIsGeneratingPlan(true);
        } else {
          setTimeout(() => {
            setIsTypingPaused(false);
          }, 100);
        }

        return nextPos;
      });

      setFadeOutCards(false);
      setFadeInCards(true);
    }, 500);
  };

  const resumeTyping = () => {
    typedRef.current?.start();
  };

  useEffect(() => {
    if (isGeneratingPlan) {
      setTimeout(() => {
        navigate("/plan", {
          state: { generativeInput },
        });
      }, 3500);
    }
  }, [isGeneratingPlan, navigate, generativeInput]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        resumeTyping();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="flex flex-col justify-center items-center min-h-[95vh] bg-[#010409] text-white overflow-hidden gap-4">
      {isGeneratingPlan ? (
        <section className="flex flex-col items-center">
          <TextDisplay
            strings={["Generating a workout plan for you..."]}
            onStringTyped={handleStringTyped}
            typedRef={typedRef}
            isTypingPaused={isTypingPaused}
          />
        </section>
      ) : showQuestions ? (
        <section className="flex flex-col max-w-[64rem] gap-8">
          <TextDisplay
            strings={QUESTIONS}
            onStringTyped={handleStringTyped}
            typedRef={typedRef}
            isTypingPaused={isTypingPaused}
          />
          {currentArrayPos === 0 && (
            <CardContainer
              fadeInCards={fadeInCards}
              fadeOutCards={fadeOutCards}
              onCardClick={handleCardClick}
            />
          )}
          {currentArrayPos === 1 && showChecklist && (
            <DayChecklist onDaysSelected={handleDaysSelected} />
          )}
        </section>
      ) : (
        <section className="max-w-[64rem]">
          <TextDisplay
            strings={INTRODUCTION}
            onStringTyped={handleStringTyped}
            typedRef={typedRef}
            isTypingPaused={false}
          />
        </section>
      )}
    </main>
  );
};

export default IntroPage;
