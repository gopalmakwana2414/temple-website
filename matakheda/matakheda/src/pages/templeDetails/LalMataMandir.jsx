import { useState, useEffect, useRef } from "react";

const IMAGES = [
   "/images/lal mata/lalMata6.jpg",
  "/images/lal mata/lalMata2.jpg",
  "/images/lal mata/lalMata4.jpg",
  "/images/lal mata/lalMata5.jpg",
  
  "/images/lal mata/lalMata7.jpg",
];

/* Animates elements when scrolled into view */

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* One photo card with hover and click to enlarge */

function GalleryCard({ src, index, onClick }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      onClick={() => onClick(index)}
      style={{
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: "4/3",
        background: "#e8d8c0",
        boxShadow: "0 4px 20px rgba(120,40,0,0.12)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms`,
        position: "relative",
      }}
    >
      <img
        src={src}
        alt={`Lal Mata Mandir ${index + 1}`}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", display: "block",
          transition: "transform 0.5s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.07)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      />
      {/* Overlay shown when hovering a photo */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(100,20,0,0.5), transparent)",
        opacity: 0, transition: "opacity 0.3s ease",
        display: "flex", alignItems: "flex-end",
        padding: "12px",
      }}
        onMouseEnter={e => e.currentTarget.style.opacity = "1"}
        onMouseLeave={e => e.currentTarget.style.opacity = "0"}
      >
        <span style={{ color: "#ffd700", fontSize: 12, fontFamily: "serif", letterSpacing: "0.1em" }}>
          🔍 View
        </span>
      </div>
    </div>
  );
}

/* Full screen image viewer */

function Lightbox({ images, index, onClose }) {
  const [current, setCurrent] = useState(index);
  useEffect(() => {
    const handler = e => {
      if (e.key === "ArrowRight") setCurrent(c => (c + 1) % images.length);
      if (e.key === "ArrowLeft")  setCurrent(c => (c - 1 + images.length) % images.length);
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "rgba(5,2,0,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: "lbFadeIn 0.25s ease",
      }}
    >
      <style>{`@keyframes lbFadeIn { from{opacity:0} to{opacity:1} }`}</style>

      {/* Previous photo button */}
      <button
        onClick={e => { e.stopPropagation(); setCurrent(c => (c - 1 + images.length) % images.length); }}
        style={{
          position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,215,0,0.25)",
          color: "#ffd700", width: 44, height: 44, borderRadius: "50%",
          fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >‹</button>

      {/* Full size photo */}
      <img
        src={images[current]}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: "90vw", maxHeight: "85vh",
          objectFit: "contain", borderRadius: 12,
          boxShadow: "0 8px 48px rgba(0,0,0,0.7)",
        }}
      />

      {/* Next photo button */}
      <button
        onClick={e => { e.stopPropagation(); setCurrent(c => (c + 1) % images.length); }}
        style={{
          position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,215,0,0.25)",
          color: "#ffd700", width: 44, height: 44, borderRadius: "50%",
          fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >›</button>

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 16, right: 16,
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff", width: 36, height: 36, borderRadius: "50%",
          fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >×</button>

      {/* Shows current photo number like 3/10 */}
      <div style={{
        position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
        color: "rgba(255,215,0,0.6)", fontSize: 13,
        fontFamily: "serif", letterSpacing: "0.1em",
      }}>
        {current + 1} / {images.length}
      </div>
    </div>
  );
}

/* Main page component */

export default function LalMataMandir() {
  const [lang, setLang]         = useState("en");
  const [lightbox, setLightbox] = useState(null); // which photo is open in lightbox, null means closed
  const [heroLoaded, setHeroLoaded] = useState(false);

  const [textRef, textVis] = useReveal(0.1);
  const [gridRef, gridVis] = useReveal(0.05);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const content = {
    en: {
      toggle: "हिंदी में पढ़ें",
      title: "Lal Mata Mandir",
      subtitle: "The Divine Abode Below the Main Temple",
      storyTitle: "The Story Behind the Temple",
      story: [
        "According to local villagers, there was once a disagreement between Maa Navdurga and Lal Mata within the temple. Feeling aggrieved, Lal Mata left the main temple and moved to a place below it.",
        "Moved by devotion, the villagers built a small temple at that very spot — which is today known as Lal Mata Mandir. To this day, devotees who visit Matakheda Mandir always make their way to Lal Mata Mandir to offer prayers and receive her blessings.",
      ],
      galleryTitle: "Gallery",
      gallerySubtitle: "Click any photo to view",
    },
    hi: {
      toggle: "Read in English",
      title: "लाल माता मंदिर",
      subtitle: "मुख्य मंदिर के नीचे का दिव्य धाम",
      storyTitle: "मंदिर की कथा",
      story: [
        "स्थानीय मान्यता के अनुसार एक समय मंदिर में माँ नवदुर्गा और लाल माता के बीच विवाद हो गया। इससे नाराज़ होकर लाल माता मुख्य मंदिर से नीचे की ओर चली गईं।",
        "भक्तों ने उसी स्थान पर एक मंदिर बनवाया जिसे आज लाल माता मंदिर के नाम से जाना जाता है। आज भी माताखेड़ा मंदिर आने वाले श्रद्धालु लाल माता के दर्शन अवश्य करते हैं और उनका आशीर्वाद प्राप्त करते हैं।",
      ],
      galleryTitle: "गैलरी",
      gallerySubtitle: "देखने के लिए कोई भी फ़ोटो पर क्लिक करें",
    },
  };
  const c = content[lang];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #fdf6ec 0%, #fef9f3 100%)",
      fontFamily: "'EB Garamond','Noto Sans Devanagari',Georgia,serif",
      color: "#2a1400",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Noto+Sans+Devanagari:wght@300;400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        @keyframes lmHeroIn {
          from { opacity: 0; transform: translateY(-18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lmFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lmOrnPulse {
          0%,100% { opacity: 0.4; }
          50%     { opacity: 0.8; }
        }
      `}</style>

      {/* Page header */}
      <div style={{
        background: "linear-gradient(135deg,#1e0a00 0%,#3a1200 50%,#1e0a00 100%)",
        padding: "56px 24px 72px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Curved bottom of the header */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 48,
          background: "linear-gradient(180deg,#fdf6ec 0%,#fef9f3 100%)",
          clipPath: "ellipse(55% 100% at 50% 100%)",
        }}/>

        {/* Language toggle button */}
        <button
          onClick={() => setLang(l => l === "en" ? "hi" : "en")}
          style={{
            position: "absolute", top: 16, right: 16,
            background: "rgba(255,215,0,0.12)",
            border: "1px solid rgba(255,215,0,0.35)",
            color: "#ffd700", padding: "6px 15px", borderRadius: 18,
            fontSize: 12, cursor: "pointer",
            fontFamily: "'Noto Sans Devanagari',sans-serif",
            zIndex: 2,
          }}
        >{c.toggle}</button>

        <h1 style={{
          fontFamily: "'Yatra One',serif",
          fontSize: "clamp(28px,6vw,52px)",
          background: "linear-gradient(135deg,#fff0d0 0%,#ffd700 45%,#ff9400 75%,#fff0d0 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 2px 14px rgba(255,140,0,0.4))",
          letterSpacing: "0.04em", lineHeight: 1.2, margin: "0 0 8px",
          animation: heroLoaded ? "lmHeroIn 0.8s ease both" : "none",
          animationDelay: "0ms",
        }}>{c.title}</h1>

        <p style={{
          color: "rgba(255,210,130,0.7)",
          fontSize: "clamp(13px,2vw,17px)",
          fontStyle: "italic", margin: 0,
          fontFamily: "'Noto Sans Devanagari',serif",
          animation: heroLoaded ? "lmHeroIn 0.8s ease both" : "none",
          animationDelay: "120ms",
        }}>{c.subtitle}</p>

        {/* Decorative line divider */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 10, marginTop: 18,
          animation: heroLoaded ? "lmHeroIn 0.8s ease both" : "none",
          animationDelay: "240ms",
        }}>
          <div style={{ width: 80, height: 1, background: "linear-gradient(to right,transparent,rgba(255,215,0,0.4),transparent)" }}/>
          <span style={{ color: "rgba(255,215,0,0.5)", fontSize: 16 }}>✦</span>
          <span style={{ color: "rgba(255,200,80,0.4)", fontSize: 12, letterSpacing: "0.12em", fontFamily: "serif" }}>जय लाल माता</span>
          <span style={{ color: "rgba(255,215,0,0.5)", fontSize: 16 }}>✦</span>
          <div style={{ width: 80, height: 1, background: "linear-gradient(to right,transparent,rgba(255,215,0,0.4),transparent)" }}/>
        </div>
      </div>

      {/* Page content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "52px 24px 80px" }}>

        {/* Story of Lal Mata Mandir */}
        <div ref={textRef} style={{
          marginBottom: 60,
          opacity: textVis ? 1 : 0,
          transform: textVis ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          {/* Section title with orange bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 4, height: 32, background: "linear-gradient(to bottom,#ffd700,#8a3a00)", borderRadius: 2, flexShrink: 0 }}/>
            <h2 style={{
              fontFamily: "'Yatra One',serif",
              fontSize: "clamp(20px,3vw,28px)",
              color: "#7a3a00", margin: 0, letterSpacing: "0.03em",
            }}>{c.storyTitle}</h2>
          </div>

          {/* White card for the story text */}
          <div style={{
            background: "#fff",
            border: "1px solid rgba(180,60,0,0.1)",
            borderRadius: 18, padding: "32px 30px",
            boxShadow: "0 4px 24px rgba(120,40,0,0.07)",
            position: "relative", overflow: "hidden",
          }}>
            {/* Faded quote mark in background */}
            <div style={{
              position: "absolute", top: -8, left: 14,
              fontSize: 110, color: "rgba(180,60,0,0.05)",
              fontFamily: "Georgia,serif", lineHeight: 1, pointerEvents: "none",
            }}>❝</div>

            {c.story.map((para, i) => (
              <p key={i} style={{
                fontSize: "clamp(15px,2vw,18px)",
                lineHeight: 1.95, color: "#3a1a00",
                fontFamily: "'Noto Sans Devanagari','EB Garamond',serif",
                margin: i < c.story.length - 1 ? "0 0 16px" : 0,
                opacity: textVis ? 1 : 0,
                transform: textVis ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.7s ease ${200 + i * 150}ms, transform 0.7s ease ${200 + i * 150}ms`,
              }}>{para}</p>
            ))}
          </div>
        </div>

        {/* Photo gallery */}
        <div ref={gridRef}>
          {/* Gallery title */}
          <div style={{
            textAlign: "center", marginBottom: 28,
            opacity: gridVis ? 1 : 0,
            transform: gridVis ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
            <h2 style={{
              fontFamily: "'Yatra One',serif",
              fontSize: "clamp(20px,3vw,28px)",
              color: "#8a1a00", margin: "0 0 6px", letterSpacing: "0.03em",
            }}>📸 {c.galleryTitle}</h2>
            <p style={{
              color: "rgba(100,40,0,0.45)", fontSize: 13,
              fontStyle: "italic", margin: 0,
              fontFamily: "'Noto Sans Devanagari',serif",
            }}>{c.gallerySubtitle}</p>
            
            {/* Decorative underline below heading */}
            <div style={{
              width: 60, height: 2, margin: "12px auto 0",
              background: "linear-gradient(to right,#ffd700,#8a3a00,#ffd700)",
              borderRadius: 2,
            }}/>
          </div>

          {/* Grid of temple photos */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 16,
          }}>
            {IMAGES.map((src, i) => (
              <GalleryCard key={i} src={src} index={i} onClick={setLightbox} />
            ))}
          </div>
        </div>

      </div>

      {/* Full screen photo viewer */}
      {lightbox !== null && (
        <Lightbox
          images={IMAGES}
          index={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
