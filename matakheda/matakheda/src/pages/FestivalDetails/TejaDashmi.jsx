import { useState, useEffect, useRef } from "react";

const IMAGES = [
  "/images/tejadashami/mela1.jpg",
  "/images/tejadashami/mela3.jpg",
  "/images/stoneGod/stoneGod1.jpg",
  "/images/tejadashami/mela2.jpg",
  "/images/tejadashami/mela3_1.jpeg",
  "/images/tejadashami/mela4.jpg",
  "/images/tejadashami/mela5.jpg",
  "/images/tejadashami/mela6.jpg",
  "/images/tejadashami/mela7.jpg",
  "/images/tejadashami/mela8.jpg",
  "/images/tejadashami/mela9.jpg",
  "/images/tejadashami/mela10.jpg",
  "/images/tejadashami/mela11.jpg",
  "/images/tejadashami/mela12.jpg",
  "/images/tejadashami/mela13.jpg",
  "/images/tejadashami/mela14.jpg",
  "/images/tejadashami/mela15.jpg",
  "/images/tejadashami/mela16.jpg",
  "/images/tejadashami/mela17.jpg",
  "/images/tejadashami/mela18.jpg",
  "/images/tejadashami/mela19.jpg",
  "/images/tejadashami/mela20.jpg",
  "/images/tejadashami/mela21.jpg",
  "/images/tejadashami/mela22.jpg",
];

const WIKI = "https://en.wikipedia.org/wiki/Veer_Teja";

/* Style for the clickable Tejaji Wikipedia link */

const WikiLink = ({ children }) => (
  <a
    href={WIKI}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: "#c45000",
      fontWeight: 600,
      textDecoration: "underline",
      textDecorationStyle: "dotted",
      textUnderlineOffset: "3px",
      cursor: "pointer",
      transition: "color 0.2s",
    }}
    onMouseEnter={e => e.currentTarget.style.color = "#ff6a00"}
    onMouseLeave={e => e.currentTarget.style.color = "#c45000"}
  >
    {children}
  </a>
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
        transition: `opacity 0.6s ease ${(index % 6) * 80}ms, transform 0.6s ease ${(index % 6) * 80}ms`,
        position: "relative",
      }}
    >
      <img src={src} alt={`Teja Dashmi ${index + 1}`}
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
      padding: 20, animation: "td-lb-in 0.22s ease",
    }}>
      <style>{`@keyframes td-lb-in{from{opacity:0}to{opacity:1}}`}</style>
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

export default function TejaDashmi() {
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
        @keyframes td-head-in { from{opacity:0;transform:translateY(-18px)} to{opacity:1;transform:translateY(0)} }
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
          animation: headVis ? "td-head-in 0.7s ease both" : "none",
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
          animation: headVis ? "td-head-in 0.8s ease 80ms both" : "none",
        }}>
          {lang === "en" ? "Teja Dashmi" : "तेजा दशमी"}
        </h1>

        {/* Header subtitle */}
        <p style={{
          color: "rgba(255,255,255,0.75)",
          fontSize: "clamp(13px,2vw,16px)",
          fontStyle: "italic", margin: "6px 0 0",
          fontFamily: "'Noto Sans Devanagari',serif",
          opacity: headVis ? 1 : 0,
          animation: headVis ? "td-head-in 0.8s ease 150ms both" : "none",
        }}>
          {lang === "en" ? "Shri Matakheda Mandir • Tukral" : "श्री माताखेड़ा मंदिर • टुकराल"}
        </p>

        {/* Decorative divider line */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 10, marginTop: 18,
          opacity: headVis ? 1 : 0,
          animation: headVis ? "td-head-in 0.8s ease 250ms both" : "none",
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
              <div style={{ fontSize: "clamp(15px,2vw,17.5px)", lineHeight: 1.95, color: "#3a1a00", fontFamily: "'Noto Sans Devanagari','EB Garamond',serif" }}>
                <p style={{ margin: "0 0 16px" }}>
                  On Tejadashami, which falls on the tenth day (Dashami) of the Shukla Paksha in the month of Bhadrapada, a special religious fair is organized at the temple.
                  This fair is dedicated to Nag Devta and especially to <WikiLink>Veer Tejaji Maharaj</WikiLink>.
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  According to local folklore, on the day of Tejadashami, <WikiLink>Veer Tejaji Maharaj</WikiLink> sacrificed his life before Nag Devta while protecting cows.
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  Five days before the Tejadashami fair, a Nishan Yatra (procession carrying ceremonial cloth umbrellas called Nishan) takes place every night in the village along with traditional folk music. Villagers also showcase their physical talents and traditional performances.
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  On the day of Tejadashami, thousands of devotees come to the temple to have the divine darshan and receive blessings.
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  One of the most significant traditions of the fair is the offering of Nishan (ceremonial cloth umbrellas) by devotees.
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  Around 12 noon, a grand Shobha Yatra (religious procession) begins from the temple towards the village. Devotees join the procession carrying their Nishan umbrellas as offerings.
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  Around 4 PM, the procession returns to the temple, after which Maha Aarti is performed followed by the distribution of Mahaprasad.
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  With this, the fair concludes in the evening.
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  At night, special religious programs based on the life and bravery of <WikiLink>Veer Tejaji Maharaj</WikiLink> are organized.
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  You are also invited to visit the temple on Tejadashami and receive the divine blessings of Nag Devta and Shri <WikiLink>Veer Tejaji Maharaj</WikiLink>.
                </p>
                <p style={{ margin: 0 }}>Jai Ho Shri Matakheda Sarkar 🙏</p>
              </div>
            ) : (
              <div style={{ fontSize: "clamp(15px,2vw,17.5px)", lineHeight: 1.95, color: "#3a1a00", fontFamily: "'Noto Sans Devanagari','EB Garamond',serif" }}>
                <p style={{ margin: "0 0 16px" }}>
                  भाद्रपद मास में शुक्ल की दशमी अर्थात् तेजादशमी को विशेष मेले का आयोजन होता है। यह मेला पूर्णतः नागदेवता एवं मुख्य रूप से <WikiLink>वीर तेजाजी महाराज</WikiLink> को समर्पित है।
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  जैसा की लोक कथाओं में वर्णित है, तेजादशमी के दिन <WikiLink>वीर तेजाजी महाराज</WikiLink> ने गायों की रक्षा के लिए नागदेवता के समक्ष अपनी देह का त्याग किया था।
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  तेजादशमी के मेले से ठीक 5 दिन पहले से रात्रि में लोक संगीत के साथ निशान यात्रा प्रतिदिन गांव में निकलती है एवं गांव के लोग अपनी शारीरिक प्रतिभा का प्रदर्शन करते हैं।
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  तेजादशमी के दिन कई हजारों श्रद्धालु दर्शन को आते हैं एवं भगवान के दर्शन कर अपने जीवन को धन्य बनाते हैं।
                  मेले की प्रसिद्धि में मुख्य रूप से निशान (छतरी) चढ़ाना अपनी अहम भूमिका निभाता है।
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  लगभग 12 बजे मंदिर से शोभायात्रा गांव की ओर प्रस्थान करती है, इसके पश्चात् श्रद्धालु अपनी निशान स्वरुप छतरी लेकर शोभायात्रा में सम्मिलित होते हैं।
                  शाम 4 बजे शोभायात्रा एवं निशान पुनः मंदिर में पहुंचते हैं एवं इसके पश्चात् महाआरती होती है एवं उसके बाद महाप्रसादी का वितरण होता है।
                  इसी के साथ शाम को मेला समाप्त होता है।
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  रात्रि में विशेष रूप से <WikiLink>वीर तेजाजी महाराज</WikiLink> की जीवनी से संबंधित धार्मिक कार्यक्रम होते हैं।
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  आप भी एक बार तेजादशमी पर नागदेवता एवं श्री <WikiLink>तेजाजी महाराज</WikiLink> के दर्शन कर अपने जीवन को धन्य बनाए।
                </p>
                <p style={{ margin: 0 }}>जय हो श्री माताखेड़ा सरकार की 🙏</p>
              </div>
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
