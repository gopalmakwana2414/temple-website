import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const images = [
  "/images/mandir/templeFront1.jpg",
  "/images/mandir/temple1.jpg",
  "/images/nagdevta/nagdevta1.jpg",
  "/images/yagyashala/2.png",
  "/images/stoneGod/stoneGod1.jpg",
  "/images/mandir/templeFront5.jpg",
];

const NAV_LINKS = [
  { to: "/gallery",    icon: "📸", label: "Gallery",   labelHi: "गैलरी"            },
  { to: "/temples",    icon: "🛕", label: "Temples",   labelHi: "मंदिर"            },
  { to: "/facilities", icon: "🏠", label: "Facilities",labelHi: "सुविधाएं"         },
  { to: "/festivals",  icon: "🎉", label: "Festivals", labelHi: "प्रमुख त्योहार"   },
];

export default function Hero() {
  const [current,   setCurrent]   = useState(0);
  const [showMenu,  setShowMenu]  = useState(false);
  const [loaded,    setLoaded]    = useState(false);
  const [particles, setParticles] = useState([]);
  const timerRef = useRef(null);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setCurrent(p => (p + 1) % images.length),
      5000
    );
  };

  useEffect(() => {
    resetTimer();
    setTimeout(() => setLoaded(true), 100);
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        dur: 6 + Math.random() * 6,
        size: 4 + Math.random() * 8,
        opacity: 0.15 + Math.random() * 0.3,
      }))
    );
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = idx => { setCurrent(idx); resetTimer(); };

  return (
    <div className="w-full">

      {/* News ticker at the top */}
      <div className="ticker-bar">
        <div className="ticker-label">
          <span>🔔</span>
          <span className="ticker-label-text">जय हो श्री माताखेड़ा सरकार की🙏</span>
        </div>
        <div className="ticker-track-wrapper">
          <div className="ticker-track">
            <span className="ticker-item">🙏 माँ नवदुर्गा नागदेव मंदिर माताखेड़ा टुकराल आपका हार्दिक स्वागत करता है ।&nbsp;•&nbsp;</span>
            <span className="ticker-item">📿प्रत्येक नागपंचमी से भादवा सुदी तेजादशमी तक साक्षात् नागदेवता के दर्शन लाभ लें।&nbsp;•&nbsp;</span>
            <span className="ticker-item">🎉वर्ष 1994 से यहां शुभ विवाह की लगन पाति / पत्रिका लिखी जाती है।&nbsp;•&nbsp;</span>
            <span className="ticker-item">🪔 वर्ष 2012 से शुद्ध घी की अखण्ड ज्योत प्रज्ज्वलित है । &nbsp;•&nbsp;</span>
            <span className="ticker-item">🌸मंदिर के विकास हेतु तन-मन-धन से सहयोग करें।&nbsp;•&nbsp;</span>
            <span className="ticker-item">🛕 ग्राम-टुकराल, तहसील-माकड़ोन, जिला-उज्जैन मध्यप्रदेश. . . . &nbsp;•&nbsp;</span>
            {/* repeat items so the scroll loops smoothly */}
            <span className="ticker-item">🙏 माँ नवदुर्गा नागदेव मंदिर माताखेड़ा टुकराल आपका हार्दिक स्वागत करता है।&nbsp;&nbsp;</span>
            <span className="ticker-item">📿प्रत्येक नागपंचमी से भादवा सुदी तेजादशमी तक साक्षात् नागदेवता के दर्शन लाभ लें।&nbsp;•&nbsp;</span>
            <span className="ticker-item">🎉वर्ष 1994 से यहां शुभ विवाह की लगन पाति / पत्रिका लिखी जाती है।&nbsp;•&nbsp;</span>
            <span className="ticker-item">🪔 वर्ष 2012 से शुद्ध घी की अखण्ड ज्योत प्रज्ज्वलित हे। &nbsp;•&nbsp;</span>
            <span className="ticker-item">🌸मंदिर के विकास हेतु तन-मन-धन से सहयोग करें।&nbsp;•&nbsp;</span>
            <span className="ticker-item">🛕 ग्राम-टुकराल, तहसील-माकड़ोन, जिला-उज्जैन मध्यप्रदेश &nbsp;•&nbsp;</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-screen overflow-hidden">

        {/* Slideshow images */}
        {images.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            <img
              src={img}
              alt="Temple"
              className="w-full h-full object-cover"
              style={{
                transform: i === current ? "scale(1.04)" : "scale(1)",
                transition: "transform 6s ease-out",
              }}
            />
          </div>
        ))}

        {/* Dark overlay on the image */}
        <div className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(10,5,0,0.55) 60%, rgba(0,0,0,0.75) 100%)" }} />
        <div className="absolute inset-0 z-10"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(80,20,0,0.45) 100%)" }} />

        {/* Small glowing dots floating up */}
        {particles.map(p => (
          <div key={p.id} className="absolute z-20 pointer-events-none"
            style={{
              left: `${p.left}%`, bottom: "-20px",
              width: p.size, height: p.size,
              borderRadius: "50%",
              background: "radial-gradient(circle, #ffd700, #ff9500)",
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 2}px #ffd700`,
              animation: `riseUp ${p.dur}s ${p.delay}s ease-in infinite`,
            }}
          />
        ))}

        {/* Gold line at the top */}
        <div className="absolute top-0 left-0 right-0 z-20 h-1"
          style={{ background: "linear-gradient(to right, transparent, #ffd700, #ff9933, #ffd700, transparent)" }} />

        {/* Corner decorations */}
        <svg className="absolute top-4 left-4 z-20 opacity-40" width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="35" fill="none" stroke="#ffd700" strokeWidth="1" strokeDasharray="4 3"/>
          <circle cx="40" cy="40" r="24" fill="none" stroke="#ff9933" strokeWidth="1"/>
          <circle cx="40" cy="40" r="12" fill="none" stroke="#ffd700" strokeWidth="1.5"/>
          {[0,45,90,135,180,225,270,315].map(a => (
            <line key={a} x1="40" y1="16" x2="40" y2="6"
              stroke="#ffd700" strokeWidth="1"
              transform={`rotate(${a} 40 40)`} />
          ))}
        </svg>
        <svg className="absolute top-4 right-4 z-20 opacity-40" width="80" height="80" viewBox="0 0 80 80"
          style={{ transform: "scaleX(-1)" }}>
          <circle cx="40" cy="40" r="35" fill="none" stroke="#ffd700" strokeWidth="1" strokeDasharray="4 3"/>
          <circle cx="40" cy="40" r="24" fill="none" stroke="#ff9933" strokeWidth="1"/>
          <circle cx="40" cy="40" r="12" fill="none" stroke="#ffd700" strokeWidth="1.5"/>
          {[0,45,90,135,180,225,270,315].map(a => (
            <line key={a} x1="40" y1="16" x2="40" y2="6"
              stroke="#ffd700" strokeWidth="1"
              transform={`rotate(${a} 40 40)`} />
          ))}
        </svg>

        {/* Main text and buttons in the center */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4">

          {/* OM symbol at the top */}
          <div className="om-symbol" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.8)",
            transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1)",
          }}>ॐ</div>

          {/* Temple name */}
          <h1 className="hero-title" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s ease 0.2s",
          }}>
            Maa Navdurga<br />Nagdev Mandir
          </h1>

          {/* Divider line */}
          <div className="flex items-center gap-3 my-3" style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.8s ease 0.4s",
          }}>
            <div className="ornament-line" />
            <span style={{ color: "#ffd700", fontSize: 20 }}>✦</span>
            <span style={{ fontFamily: "'Yatra One', cursive", fontSize: "clamp(13px, 2.2vw, 22px)", color: "#ffd09a", letterSpacing: "0.08em" }}>
              Matakheda Tukral
            </span>
            <span style={{ color: "#ffd700", fontSize: 20 }}>✦</span>
            <div className="ornament-line" />
          </div>

          {/* Sanskrit shloka */}
          <p className="sanskrit-text" style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}>
            या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता
          </p>

          {/* Explore button */}
          <button
            onClick={() => setShowMenu(v => !v)}
            className="explore-btn"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.6s",
            }}
          >
            <span>{showMenu ? "✕ Close" : "🛕 Explore Temple"}</span>
          </button>

          {/* Navigation cards shown on button click */}
          <div className={`menu-grid ${showMenu ? "show" : ""}`}>
            {NAV_LINKS.map((item, i) => (
              <Link
                to={item.to}
                key={item.to}
                className="menu-card"
                style={{ transitionDelay: showMenu ? `${i * 70}ms` : "0ms" }}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
                <span className="menu-label-hi">{item.labelHi}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Slide indicator dots */}
        <div className="absolute bottom-8 left-1/2 z-30 flex gap-3"
          style={{ transform: "translateX(-50%)" }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className="dot-btn"
              style={{
                width: i === current ? 28 : 10,
                opacity: i === current ? 1 : 0.5,
              }}
            />
          ))}
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 right-8 z-30 flex flex-col items-center gap-1 opacity-50">
          <span style={{ color: "#ffd09a", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, #ffd700, transparent)" }} />
        </div>
      </div>

      {/* Page styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Yatra+One&family=Noto+Sans+Devanagari:wght@400;600&display=swap');

        .om-symbol {
          font-size: clamp(36px, 8vw, 72px);
          background: linear-gradient(135deg, #ffd700, #ff9500, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(255,180,0,0.6));
          margin-bottom: 6px;
          animation: omPulse 3s ease-in-out infinite;
        }

        @keyframes omPulse {
          0%, 100% { filter: drop-shadow(0 0 18px rgba(255,180,0,0.5)); }
          50%       { filter: drop-shadow(0 0 32px rgba(255,200,0,0.9)); }
        }

        .hero-title {
          font-family: 'Yatra One', 'Noto Sans Devanagari', Georgia, serif;
          font-size: clamp(28px, 6vw, 72px);
          font-weight: 400;
          line-height: 1.15;
          background: linear-gradient(135deg, #fff5d6 0%, #ffd700 40%, #ff9933 70%, #fff5d6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 4px 24px rgba(255,150,0,0.5));
          letter-spacing: 0.06em;
          margin-bottom: 4px;
        }

        .ornament-line {
          width: clamp(30px, 8vw, 80px);
          height: 1px;
          background: linear-gradient(to right, transparent, #ffd700, transparent);
        }

        .sanskrit-text {
          font-family: 'Noto Sans Devanagari', serif;
          color: #ffd09a;
          font-size: clamp(10px, 1.6vw, 15px);
          letter-spacing: 0.06em;
          opacity: 0.85;
          margin-bottom: 20px;
          font-style: italic;
        }

        /* Explore temple button */

        .explore-btn {
          background: linear-gradient(135deg, #8b0000, #d62828, #f77f00);
          color: #fff8e8;
          padding: 12px 28px;
          border-radius: 50px;
          font-family: 'Cinzel', serif;
          font-size: clamp(13px, 1.8vw, 17px);
          font-weight: 700;
          letter-spacing: 0.05em;
          box-shadow: 0 0 0 2px rgba(255,180,0,0.2), 0 8px 30px rgba(200,100,0,0.5);
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }
        .explore-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          pointer-events: none;
        }
        .explore-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 0 0 3px rgba(255,200,0,0.35), 0 16px 40px rgba(200,100,0,0.6);
        }

        /* Navigation cards grid */

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-top: 20px;
          width: 100%;
          max-width: 520px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.4s ease, transform 0.4s ease;
          pointer-events: none;
        }

        @media (max-width: 600px) {
          .menu-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            max-width: 320px;
          }
        }

        .menu-grid.show {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .menu-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 12px 8px;
          border-radius: 14px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,215,100,0.25);
          color: white;
          text-decoration: none;
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
          opacity: 0;
          transform: translateY(14px) scale(0.92);
        }

        .menu-grid.show .menu-card {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .menu-card:hover {
          background: rgba(255,180,50,0.18);
          border-color: rgba(255,215,100,0.6);
          transform: translateY(-6px) scale(1.06);
          box-shadow: 0 12px 30px rgba(200,100,0,0.35);
        }

        .menu-icon {
          font-size: clamp(20px, 4vw, 26px);
          filter: drop-shadow(0 2px 6px rgba(255,200,0,0.5));
        }

        .menu-label {
          font-family: 'Cinzel', serif;
          font-size: clamp(10px, 1.8vw, 13px);
          font-weight: 700;
          color: #fff8e8;
          letter-spacing: 0.04em;
          text-align: center;
        }

        .menu-label-hi {
          font-family: 'Noto Sans Devanagari', serif;
          font-size: clamp(9px, 1.5vw, 11px);
          color: #ffd09a;
          opacity: 0.8;
          text-align: center;
        }

        /* Slideshow dots */

        .dot-btn {
          height: 4px;
          border-radius: 2px;
          background: #ffd700;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        /* News ticker bar */

        .ticker-bar {
          position: relative;
          z-index: 50;
          display: flex;
          align-items: stretch;
          width: 100%;
          height: 40px;
          background: linear-gradient(90deg, #7a1a00, #b22200, #7a1a00);
          border-bottom: 2px solid #ffd700;
          overflow: hidden;
          box-shadow: 0 3px 12px rgba(0,0,0,0.5);
        }

        .ticker-label {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 18px;
          background: linear-gradient(135deg, #ffd700, #ff9500);
          color: #3a0a00;
          font-family: 'Noto Sans Devanagari', sans-serif;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          letter-spacing: 0.03em;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%);
          padding-right: 26px;
          z-index: 2;
        }

        @media (max-width: 480px) {
          .ticker-label {
            padding: 0 10px;
            padding-right: 16px;
          }
          .ticker-label-text {
            display: none;
          }
          .ticker-item {
            font-size: 12px;
          }
        }

        .ticker-track-wrapper {
          flex: 1;
          overflow: hidden;
          display: flex;
          align-items: center;
          mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
        }

        .ticker-track {
          display: flex;
          white-space: nowrap;
          animation: tickerScroll 35s linear infinite;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        .ticker-item {
          font-family: 'Noto Sans Devanagari', sans-serif;
          font-size: 13.5px;
          color: #fff8e8;
          padding: 0 8px;
          letter-spacing: 0.02em;
        }

        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Floating particles animation */

        @keyframes riseUp {
          0%   { transform: translateY(0) scale(1);   opacity: var(--op, 0.25); }
          80%  { opacity: var(--op, 0.15); }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
