import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";
import catBG from "../assets/GymCat.jpg";

const Home = () => {
  const footerItems = [
    { label: "Health", value: "Maximize" },
    { label: "Exercises", value: "Unlimited" },
    { label: "Accordingly", value: "Plan" },
  ];

  return (
    <main className="flex flex-col justify-center items-center min-h-[95vh] bg-black text-white overflow-hidden gap-24 bg-cover"
      style={{ backgroundImage: `url(${catBG})` }}
    >
      <section className="flex flex-col items-center w-full text-center gap-6 p-8">
        <h1 className="text-7xl font-encode font-thin">Workout Buddy</h1>
        <div className="text-4xl font-bold font-open italic">
          Exercise{" "}
          <ReactTyped
            className="font-sans font-light"
            strings={["Freely", "Efficiently", "Safely", "Consistently"]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="text-xl font-thin font-sans">
          Create your own workout routines and track your progress,
          <br />
          <span className="italic">
            With a single prompt.
          </span>
        </p>
        <Link to="/intro">
          <button className="w-48 h-12 bg-blue-500 text-xl font-bold rounded-md transition-transform hover:bg-indigo-500 hover:scale-110">
            Get Started
          </button>
        </Link>
      </section>

      <footer className="flex justify-between items-center w-[40rem] h-20 bg-[#090909] rounded-2xl border-2 border-white text-center px-4">
        {footerItems.map((item, index) => (
          <div
            key={index}
            className={`w-[12rem] ${
              index < footerItems.length - 1 && "border-r-2 border-[#bfb9b8]"
            }`}
          >
            <span className="block text-2xl font-bold">{item.value}</span>
            {item.label}
          </div>
        ))}
      </footer>
    </main>
  );
};

export default Home;
