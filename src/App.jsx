import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Solutions from "./pages/Solutions";
import SolarCalculator from "./components/SolarCalculator";
import Blog from "./pages/Blog";
// in your router
import Contact from "./pages/Contact";



import Home from "./pages/Home";


export default function App() {
  return (
    <BrowserRouter>
      <Header heroId="home-hero" />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/solar-calculator" element={<SolarCalculator />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />

    </BrowserRouter>
  );
}
