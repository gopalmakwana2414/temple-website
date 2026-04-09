import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [hindi,    setHindi]    = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { en: "Home",         hi: "होम",          path: "/" },
    { en: "About",        hi: "मंदिर परिचय",  path: "/about" },
    { en: "Donation",     hi: "दान",           path: "/donation" },
    { en: "How To Reach", hi: "कैसे पहुँचे",  path: "/how-to-reach" },
    { en: "Contact Us",   hi: "संपर्क करें",  path: "/contact" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="w-full bg-[#efe1c3] border-b shadow-sm relative z-50">

      {/* Top navbar row */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Temple logo and name */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
          <img
            src="/images/templeLogo.png"
            alt="Temple Logo"
            className="h-12 w-12 md:h-20 md:w-20 object-contain"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#6b2b06] leading-tight">
              {hindi ? "माँ नवदुर्गा नागदेव मंदिर" : "Maa Navdurga Nagdev Mandir"}
            </h1>
            <p className="text-sm text-[#7c4a20]">
              {hindi ? "माताखेड़ा टुकराल" : "Matakheda Tukral"}
            </p>
          </div>
        </Link>

        {/* Navigation links for desktop */}
        <div className="hidden md:flex items-center gap-8 text-xl font-medium text-[#6b2b06]">
          {links.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={`hover:text-[#b45309] transition ${
                location.pathname === link.path ? "text-[#b45309] font-bold" : ""
              }`}
            >
              {hindi ? link.hi : link.en}
            </Link>
          ))}
        </div>

        {/* Language toggle and hamburger icon */}
        <div className="flex items-center gap-2">

          <button
            onClick={() => setHindi(h => !h)}
            className="px-4 py-2 border-2 border-[#8b2e1b] rounded-full text-[#8b2e1b] font-semibold hover:bg-[#8b2e1b] hover:text-white transition"
          >
            {hindi ? "English" : "हिंदी"}
          </button>

          {/* Hamburger menu for mobile */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-[#d4b88a] transition"
            aria-label="Toggle menu"
          >
            <span style={{
              display: "block", width: 22, height: 2.5,
              background: "#6b2b06", borderRadius: 2,
              transition: "transform 0.3s ease, opacity 0.3s ease",
              transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
            }}/>
            <span style={{
              display: "block", width: 22, height: 2.5,
              background: "#6b2b06", borderRadius: 2,
              margin: "4px 0",
              transition: "opacity 0.3s ease",
              opacity: menuOpen ? 0 : 1,
            }}/>
            <span style={{
              display: "block", width: 22, height: 2.5,
              background: "#6b2b06", borderRadius: 2,
              transition: "transform 0.3s ease",
              transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
            }}/>
          </button>

        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight:  menuOpen ? "360px" : "0px",
          opacity:    menuOpen ? 1 : 0,
          transition: "max-height 0.3s ease, opacity 0.3s ease",
        }}
      >
        <div className="bg-[#f5e8cc] border-t border-[#c9a06a] px-4 py-2">
          {links.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              onClick={closeMenu}
              className={`flex items-center py-3 px-3 rounded-lg text-lg font-medium text-[#6b2b06]
                hover:text-[#b45309] hover:bg-[#e8d4a8] transition
                ${location.pathname === link.path ? "text-[#b45309] font-bold bg-[#e8d4a8]" : ""}
                ${i < links.length - 1 ? "border-b border-[#d4b88a]" : ""}`}
            >
              {hindi ? link.hi : link.en}
            </Link>
          ))}
        </div>
      </div>

    </nav>
  );
}
