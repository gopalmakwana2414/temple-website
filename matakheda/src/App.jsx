import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import VisitorPopup from "./components/VisitorPopup";
import Footer from "./components/Footer";

import Hero from "./pages/Hero";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Donation from "./pages/Donation";
import HowToReach from "./pages/HowToReach";
import Festivals from "./pages/Festivals";
import Facilities from "./pages/Facilities";
import Contact from "./pages/Contact";

import NagPanchami from "./pages/FestivalDetails/NagPanchami";
import TejaDashmi from "./pages/FestivalDetails/TejaDashmi";
import KartikPurnimaa from "./pages/FestivalDetails/KartikPurnima";

import Temples from "./pages/Temples";
import LalMataMandir from "./pages/templeDetails/LalMataMandir";
import DevnarayanMandir from "./pages/templeDetails/DevnarayanMandir";

import Tribute from "./pages/Tribute";

function App() {
  return (
    <BrowserRouter>

      <ScrollToTop />
      <VisitorPopup />

      <Navbar />

      <Routes>

        <Route path="/" element={<Hero />} />

        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/how-to-reach" element={<HowToReach />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/festivals/nag-panchami" element={<NagPanchami />} />
        <Route path="/festivals/teja-dashmi" element={<TejaDashmi />} />
        <Route path="/festivals/kartik-purnima" element={<KartikPurnimaa />} />

        <Route path="/temples" element={<Temples />} />
        <Route path="/temples/lal-mata-mandir" element={<LalMataMandir />} />
        <Route path="/temples/devnarayan-mandir" element={<DevnarayanMandir />} />

        <Route path="/tribute" element={<Tribute />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;
