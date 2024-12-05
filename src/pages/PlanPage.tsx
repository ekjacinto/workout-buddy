import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface Exercise {
  exercise: string;
  sets: number;
  reps: string;
}

interface WorkoutDay {
  day: string;
  workoutType: string;
  exercises: Exercise[];
}

const PlanPage = () => {
  const location = useLocation();
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { generativeInput } = location.state || {};

  useEffect(() => {
    if (!generativeInput) {
      setWorkoutPlan(null);
      setIsLoading(false);
      return;
    }

    const fetchWorkoutPlan = async () => {
      setIsLoading(true);
      console.log("Generative Input:", generativeInput);

      try {
        const response = await fetch("http://localhost:5000/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ generativeInput }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch workout plan.");
        }

        const data = await response.json();
        console.log(data);
        const parsedPlan = cleanResponse(data.plan);
        setWorkoutPlan(parsedPlan);
      } catch (error) {
        console.error("Error fetching workout plan:", error);
        setWorkoutPlan(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkoutPlan();
  }, [generativeInput]);

  const cleanResponse = (response: string): WorkoutDay[] => {
    const parsedPlan: WorkoutDay[] = [];
    const days = response.split(
      /(?=\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b)/
    );

    days.forEach((daySection) => {
      if (daySection.trim()) {
        const dayMatch = daySection.match(/^(\w+)\s-\s([\w\s&]+):/);
        if (dayMatch) {
          const day = dayMatch[1];
          const workoutType = dayMatch[2];

          const exercises: Exercise[] = [];
          const exerciseRegex =
            /\d+\.\s([\w\s]+)\s-\s(\d+)\ssets,\s([\d]+|\w+\s\w+)/g;
          let match: RegExpExecArray | null;

          while ((match = exerciseRegex.exec(daySection)) !== null) {
            exercises.push({
              exercise: match[1].trim(),
              sets: parseInt(match[2], 10),
              reps: match[3].trim(),
            });
          }

          parsedPlan.push({
            day: day.trim(),
            workoutType: workoutType.trim(),
            exercises: exercises,
          });
        }
      }
    });
    return parsedPlan;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#010409] text-white font-open">
      <h1 className="text-5xl font-bold mb-4">Your Workout Plan:</h1>
      <div className="w-[48rem] max-h-[70vh] p-4 bg-[#131414] rounded-lg shadow-md overflow-y-auto">
        {isLoading ? (
          <pre className="text-4xl whitespace-pre-wrap">
            Generating your workout plan...
          </pre>
        ) : workoutPlan && workoutPlan.length > 0 ? (
          <div className="flex flex-col justify-between space-y-6">
            {workoutPlan.map((day, index) => (
              <div
                key={index}
                className="flex flex-col p-4 bg-[#28282a] rounded-lg shadow-sm"
              >
                <h2 className="text-xl font-sans italic font-semibold">
                  {`${day.day}: ${day.workoutType}`}
                </h2>
                <div className="flex flex-col pl-5">
                  {day.exercises.map((exercise, idx) => (
                    <p className="font-open font-thin" key={idx}>
                      {`${exercise.exercise}: ${exercise.sets} sets, ${exercise.reps} reps`}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <pre className="whitespace-pre-wrap">
            No input provided or failed to fetch the workout plan.
          </pre>
        )}
      </div>
    </div>
  );
};

export default PlanPage;
