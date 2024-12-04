import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import PlanPage from "./pages/PlanPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 min-h-[90vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<PlanPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;