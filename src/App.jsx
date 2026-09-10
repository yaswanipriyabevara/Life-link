import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Incident from "./pages/Incident";
import Tracking from "./pages/Tracking";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/incident" element={<Incident />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;