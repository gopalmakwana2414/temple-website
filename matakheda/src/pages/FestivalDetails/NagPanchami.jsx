import { useState, useEffect, useRef } from "react";

const IMAGES = Array.from(
  { length: 10 },
  (_, i) => `/images/nagpanchami/nagpanchami${i + 1}.jpg`
);

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function GalleryCard({ src, index, onClick }) {
  const [ref, vis] = useReveal(0.08);
  return (
    <div
      ref={ref}
      onClick={() => onClick(index)}
      style={{
        borderRadius: 14, overflow: "hidden", cursor: "pointer",
        aspectRatio: "4/3", background: "#e8dcc8",
        boxShadow: "0 4px 20px rgba(120,60,0,0.12)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms`,
        position: "relative",
      }}
    >
      <img src={src} alt={`Nag Panchami ${index + 1}`}
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transition: "transform 0.55s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.07)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top,rgba(80,30,0,0.45),transparent)",
        opacity: 0, transition: "opacity 0.3s ease",
        display: "flex", alignItems: "flex-end", padding: "10px",
      }}
        onMouseEnter={e => e.currentTarget.style.opacity = "1"}
        onMouseLeave={e => e.currentTarget.style.opacity = "0"}
      >
        <span style={{ color: "#ffd700", fontSize: 11, letterSpacing: "0.1em", fontFamily: "serif" }}>🔍 View</span>
      </div>
    </div>
  );
}

function Lightbox({ images, index, onClose }) {
  const [current, setCurrent] = useState(index);
  useEffect(() => {
    const h = e => {
      if (e.key === "ArrowRight") setCurrent(c => (c + 1) % images.length);
      if (e.key === "ArrowLeft")  setCurrent(c => (c - 1 + images.length) % images.length);
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  const btnStyle = (extra = {}) => ({
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,215,0,0.25)",
    color: "#ffd700", width: 44, height: 44, borderRadius: "50%",
    fontSize: 22, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", ...extra,
  });
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "rgba(5,2,0,0.93)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, animation: "np-lb-in 0.22s ease",
    }}>
      <style>{`@keyframes np-lb-in{from{opacity:0}to{opacity:1}}`}</style>
      <button onClick={e => { e.stopPropagation(); setCurrent(c => (c - 1 + images.length) % images.length); }} style={btnStyle({ left: 16 })}>‹</button>
      <img src={images[current]} onClick={e => e.stopPropagation()}
        style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 12, boxShadow: "0 8px 48px rgba(0,0,0,0.7)" }} alt="" />
      <button onClick={e => { e.stopPropagation(); setCurrent(c => (c + 1) % images.length); }} style={btnStyle({ right: 16 })}>›</button>
      <button onClick={onClose} style={{
        position: "absolute", top: 16, right: 16,
        background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
        color: "#fff", width: 36, height: 36, borderRadius: "50%", fontSize: 18,
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
      }}>×</button>
      <div style={{
        position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
        color: "rgba(255,215,0,0.55)", fontSize: 13, letterSpacing: "0.1em",
      }}>{current + 1} / {images.length}</div>
    </div>
  );
}

export default function NagPanchami() {
  const [lang, setLang]         = useState("en");
  const [lightbox, setLightbox] = useState(null);
  const [headVis, setHeadVis]   = useState(false);
  const [textRef, textVis]      = useReveal(0.1);
  const [gridRef, gridVis]      = useReveal(0.05);

  useEffect(() => { setTimeout(() => setHeadVis(true), 80); }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg,#fdf6ec 0%,#fef9f3 100%)",
      fontFamily: "'EB Garamond','Noto Sans Devanagari',Georgia,serif",
      color: "#2a1400", overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Noto+Sans+Devanagari:wght@300;400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        @keyframes np-head-in { from{opacity:0;transform:translateY(-18px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Page header banner */}
      <div style={{
        background: "linear-gradient(135deg,#7a2e00 0%,#c45000 50%,#7a2e00 100%)",
        padding: "56px 24px 72px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        {/* Curved bottom of the header */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 48,
          background: "#fdf6ec",
          clipPath: "ellipse(55% 100% at 50% 100%)",
        }}/>

        {/* EN/Hindi toggle button */}
        <button onClick={() => setLang(l => l === "en" ? "hi" : "en")} style={{
          position: "absolute", top: 16, right: 16,
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.35)",
          color: "#fff", padding: "6px 15px", borderRadius: 18,
          fontSize: 12, cursor: "pointer",
          fontFamily: "'Noto Sans Devanagari',sans-serif", zIndex: 2,
        }}>
          {lang === "en" ? "हिंदी में पढ़ें" : "Read in English"}
        </button>

        {/* OM symbol at the top */}
        <div style={{
          fontSize: "clamp(36px,7vw,60px)",
          color: "rgba(255,255,255,0.25)",
          marginBottom: 8,
          opacity: headVis ? 1 : 0,
          animation: headVis ? "np-head-in 0.7s ease both" : "none",
        }}>ॐ</div>

        {/* Temple name */}
        <h1 style={{
          fontFamily: "'Yatra One',serif",
          fontSize: "clamp(26px,5vw,50px)",
          background: "linear-gradient(135deg,#fff0d0 0%,#ffd700 45%,#ff9400 75%,#fff0d0 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 2px 14px rgba(255,140,0,0.4))",
          letterSpacing: "0.04em", lineHeight: 1.2, margin: "0 0 8px",
          opacity: headVis ? 1 : 0,
          animation: headVis ? "np-head-in 0.8s ease 80ms both" : "none",
        }}>
          {lang === "en" ? "Nag Panchami" : "नाग पंचमी"}
        </h1>

        {/* Header subtitle */}
        <p style={{
          color: "rgba(255,255,255,0.75)",
          fontSize: "clamp(13px,2vw,16px)",
          fontStyle: "italic", margin: "6px 0 0",
          fontFamily: "'Noto Sans Devanagari',serif",
          opacity: headVis ? 1 : 0,
          animation: headVis ? "np-head-in 0.8s ease 150ms both" : "none",
        }}>
          {lang === "en" ? "Shri Matakheda Mandir • Tukral" : "श्री माताखेड़ा मंदिर • टुकराल"}
        </p>

        {/* Decorative divider line */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 10, marginTop: 18,
          opacity: headVis ? 1 : 0,
          animation: headVis ? "np-head-in 0.8s ease 250ms both" : "none",
        }}>
          <div style={{ width: 70, height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.4),transparent)" }}/>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "serif", letterSpacing: "0.1em" }}>
            🙏 जय हो श्री माताखेड़ा सरकार की
          </span>
          <div style={{ width: 70, height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.4),transparent)" }}/>
        </div>
      </div>

      {/* Page content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "52px 24px 80px" }}>

        {/* Festival description */}
        <div ref={textRef} style={{
          marginBottom: 60,
          opacity: textVis ? 1 : 0,
          transform: textVis ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
            <div style={{ width: 4, height: 30, background: "linear-gradient(to bottom,#ffd700,#c45000)", borderRadius: 2, flexShrink: 0 }}/>
            <h2 style={{
              fontFamily: "'Yatra One',serif",
              fontSize: "clamp(18px,2.5vw,24px)",
              color: "#c45000", margin: 0, letterSpacing: "0.03em",
            }}>
              {lang === "en" ? "About the Festival" : "उत्सव के बारे में"}
            </h2>
          </div>

          <div style={{
            background: "#fff",
            border: "1px solid rgba(180,80,0,0.1)",
            borderRadius: 18, padding: "32px 30px",
            boxShadow: "0 4px 24px rgba(120,50,0,0.07)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -8, left: 14,
              fontSize: 110, color: "rgba(180,60,0,0.04)",
              fontFamily: "Georgia,serif", lineHeight: 1, pointerEvents: "none",
            }}>❝</div>

            {lang === "en" ? (
              <p style={{ fontSize: "clamp(15px,2vw,17.5px)", lineHeight: 1.95, color: "#3a1a00", fontFamily: "'Noto Sans Devanagari','EB Garamond',serif", margin: 0 }}>
                Nag Panchami, which falls on the fifth day (Panchami) of the Shukla Paksha during the holy month of Shravan, is one of the main festivals celebrated at the temple.
                <br/><br/>
                On this sacred day, special worship is performed, and thousands of devotees visit the temple to have the divine darshan of the deity and feel blessed.
                <br/><br/>
                From Nag Panchami until Bhadrapada Shukla Tejadashami, the divine presence of Nag Devta is believed to appear in the sacred stone, giving devotees a rare and holy darshan.
                <br/><br/>
                A grand Bhajan Sandhya (devotional music evening) is organized by the Temple Committee and Sundarkand Committee, where many devotional singers from nearby areas voluntarily offer their service.
                <br/><br/>
                Special prasadi (light refreshments) is distributed to all devotees who visit the temple.
                <br/><br/>
                In the evening, a grand Maha Aarti is performed followed by the distribution of Mahaprasad.
                <br/><br/>
                You are also warmly invited to visit the temple on Nag Panchami and receive the divine blessings of Shri Nagdevta.
                <br/><br/>
                Jai Ho Shri Matakheda Sarkar 🙏
              </p>
            ) : (
              <p style={{ fontSize: "clamp(15px,2vw,17.5px)", lineHeight: 1.95, color: "#3a1a00", fontFamily: "'Noto Sans Devanagari','EB Garamond',serif", margin: 0 }}>
                श्रावण मास में शुक्ल पक्ष की पंचमी तिथि अर्थात् नागपंचमी मन्दिर के प्रमुख त्योहारों में से एक त्योहार है।
                यहां नागपंचमी पर विशेष पूजन होता है एवं हजारों श्रद्धालु भगवान के दर्शन कर अपने जीवन को धन्य बनाते हैं।
                नागपंचमी से भादवा सुदी तेजादशमी तक साक्षात् नागदेवता पत्थर में दर्शन देते हैं।
                <br/><br/>
                मंदिर समिति एवं सुंदरकांड समिति द्वारा विशाल भजन संध्या का आयोजन होता है, जहां क्षेत्र के कई भजन प्रवाहक स्वयं की इच्छा से अपनी सेवा देते हैं।
                मंदिर में आने वाले भक्तों के लिए विशेष प्रसादी अर्थात् अल्पाहार का वितरण होता है।
                शाम को महाआरती एवं महाप्रसादी का वितरण होता है।
                <br/><br/>
                आप भी नागपंचमी पर आकर भगवान श्री नागदेवता के दर्शन कर अपने जीवन को धन्य बनाए।
                <br/><br/>
                जय हो श्री माताखेड़ा सरकार की 🙏
              </p>
            )}
          </div>
        </div>

        {/* Festival photo gallery */}
        <div ref={gridRef}>
          <div style={{
            textAlign: "center", marginBottom: 24,
            opacity: gridVis ? 1 : 0,
            transform: gridVis ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
            <h2 style={{
              fontFamily: "'Yatra One',serif",
              fontSize: "clamp(18px,2.8vw,26px)",
              color: "#c45000", margin: "0 0 6px", letterSpacing: "0.03em",
            }}>
              📸 {lang === "en" ? "Gallery" : "गैलरी"}
            </h2>
            <p style={{ color: "rgba(100,40,0,0.4)", fontSize: 13, fontStyle: "italic", margin: 0, fontFamily: "'Noto Sans Devanagari',serif" }}>
              {lang === "en" ? "Click any photo to view" : "देखने के लिए फ़ोटो पर क्लिक करें"}
            </p>
            <div style={{ width: 56, height: 2, margin: "10px auto 0", background: "linear-gradient(to right,#ffd700,#c45000,#ffd700)", borderRadius: 2 }}/>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
            {IMAGES.map((src, i) => (
              <GalleryCard key={i} src={src} index={i} onClick={setLightbox} />
            ))}
          </div>
        </div>

      </div>

      {lightbox !== null && (
        <Lightbox images={IMAGES} index={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
