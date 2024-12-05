import { useState } from "react";

type DayChecklistProps = {
  onDaysSelected: (selectedDays: string[]) => void; // Callback to pass selected days
};

const DayChecklist = ({ onDaysSelected }: DayChecklistProps) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = () => {
    onDaysSelected(selectedDays);
  };

  return (
    <div className="flex flex-col items-center gap-4 text-3xl">
      <ul className="list-none">
        {daysOfWeek.map((day) => (
          <li key={day} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={day}
              checked={selectedDays.includes(day)}
              onChange={() => toggleDay(day)}
            />
            <label htmlFor={day}>{day}</label>
          </li>
        ))}
      </ul>
      <button
        className="w-[10rem] mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default DayChecklist