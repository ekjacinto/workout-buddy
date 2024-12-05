import { useEffect } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import IntroPage from "./pages/IntroPage";
import PlanPage from "./pages/PlanPage";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "Workout Buddy";
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 min-h-[90vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/plan" element={<PlanPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;