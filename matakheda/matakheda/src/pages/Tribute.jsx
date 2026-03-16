import { useState, useEffect, useRef } from "react";

const PHOTOS = [
  // "/images/people/tejkaran.png",
  // "/images/people/tejkaran2.jpeg",
  "/images/people/tejkaran3.jpeg",
  "/images/people/tejkaran4.jpeg",
  "/images/people/tejkaran5.jpeg",
  "/images/people/tejkaran6.jpeg",
  "/images/people/tejkaran7.jpeg",
  "/images/people/tejkaran8.jpeg",
  "/images/people/tejkaran9.jpeg",
  "/images/people/tejkaran10.jpeg",
];

const VIDEO_SRC = "/images/people/tejkaran_video.mp4";
const API_BASE  = "http://localhost:5000";

const CONTENT = {
  en: {
    toggle: "हिंदी में पढ़ें",
    badge: "In Eternal Memory",
    name: "Tejkaran Ji Chaudhary",
    role: "Former Head Pujari — Maa Navdurga Nagdev Mandir",
    position: "Director & Principal, Vinay Gyan Mandir Tukral",
    bornLabel: "Born",        born:   "January 15, 1966",
    passedLabel: "Passed Away", passed: "January 23, 2025",
    ageLabel: "Age",          age:    "59 Years",
    tributeHeading: "A Life of Service and Devotion",
    tribute: [
      "Shri Tejkaran Ji Chaudhary, the former and revered priest of the temple, was born on January 15, 1966 in Tukral. He devoted his entire life to the education of children and the service of the temple.",
      "He served as the Director and Principal of Vinay Gyan Mandir School in Tukral, where hundreds of students received their education and guidance.",
      "In the later years of his life, he dedicated himself completely to serving as the main priest of the temple. He regularly performed temple aarti, daily worship, offered Bal Bhog to the deity, and maintained the cleanliness of the temple.",
      "On January 23, 2025, he bid farewell to everyone and sought eternal rest at the divine feet of Shri Matakheda Sarkar.",
      "All devotees and villagers offer their heartfelt tribute and respectful homage to him. May Shri Matakheda Sarkar grant him a place at His divine feet.",
    ],
    quote: "Om Shanti Shanti Shanti",
    galleryTitle: "Memories",
    videoTitle: "Aarti Darshan",
    videoDesc: "Watch Tejkaran Ji performing the sacred evening aarti at Maa Navdurga Nagdev Mandir.",
    homageTitle: "Light a Diya",
    homageDesc: "Offer a diya in his loving memory. Your name will be remembered.",
    namePlaceholder: "Your name",
    villagePlaceholder: "Your village / city",
    diyaBtn: "🪔 Light a Diya",
    diyaLit: "🪔 Diya Lit — Om Shanti 🙏",
    submitting: "Lighting...",
    errorMsg: "Something went wrong. Please try again.",
    countLabel: "diyas lit so far",
    fieldRequired: "Please enter your name and village.",
  },
  hi: {
    toggle: "Read in English",
    badge: "चिरस्मरणीय श्रद्धांजलि",
    name: "तेजकरण जी चौधरी",
    role: "पूर्व मुख्य पुजारी — माँ नवदुर्गा नागदेव मंदिर",
    position: "संचालक एवं प्रधानाचार्य, विनय ज्ञान मंदिर टुकराल",
    bornLabel: "जन्म",       born:   "15 जनवरी 1966",
    passedLabel: "स्वर्गवास", passed: "23 जनवरी 2025",
    ageLabel: "आयु",         age:    "59 वर्ष",
    tributeHeading: "श्रद्धा और सेवा से भरा जीवन",
    tribute: [
      "मंदिर के पूर्व एवं दिवंगत पुजारी श्री तेजकरण जी चौधरी का जन्म 15 जनवरी 1966 को टुकराल में हुआ था। उन्होंने अपना सम्पूर्ण जीवन बच्चों की शिक्षा और मंदिर की सेवा में समर्पित कर दिया।",
      "वे टुकराल के विनय ज्ञान मंदिर विद्यालय के संचालक एवं प्रधानाचार्य रहे, जहाँ से सैकड़ों विद्यार्थियों ने शिक्षा प्राप्त की।",
      "अपने जीवन के अंतिम वर्षों में उन्होंने मुख्य रूप से मंदिर के पुजारी के रूप में सेवा दी। मंदिर की आरती, पूजा, भगवान को बालभोग अर्पित करना और मंदिर की सफाई का कार्य वे करते थे।",
      "23 जनवरी 2025 को उन्होंने सबको अलविदा कहा और श्री माताखेड़ा सरकार के चरणों में विश्राम पाया।",
      "हम सभी श्रद्धालुजन और ग्रामीणजन उन्हें अपनी ओर से भावपूर्ण श्रद्धांजलि अर्पित करते हैं।",
      " श्री माताखेड़ा सरकार दिवंगत आत्मा को शांति प्रदान करें।"
    ],
    quote: "ॐ शांति शांति शांति",
    galleryTitle: "यादें",
    videoTitle: "आरती दर्शन",
    videoDesc: "माँ नवदुर्गा नागदेव मंदिर में तेजकरण जी द्वारा की जा रही पावन संध्या आरती के दर्शन करें।",
    homageTitle: "दीप जलाएं",
    homageDesc: "उनकी प्रिय स्मृति में एक दीप अर्पित करें। आपका नाम सदा स्मरण रहेगा।",
    namePlaceholder: "आपका नाम",
    villagePlaceholder: "आपका गाँव / शहर",
    diyaBtn: "🪔 दीप जलाएं",
    diyaLit: "🪔 दीप जल उठा — ॐ शांति 🙏",
    submitting: "जलाया जा रहा है...",
    errorMsg: "कुछ गड़बड़ हुई। कृपया पुनः प्रयास करें।",
    countLabel: "दीप अब तक जलाए गए",
    fieldRequired: "कृपया अपना नाम और गाँव लिखें।",
  },
};

/* Animates sections when they scroll into view */

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

export default function Tribute() {
  const [lang,       setLang]       = useState("en");
  const [slide,      setSlide]      = useState(0);
  const [diyaLit,    setDiyaLit]    = useState(false);
  const [name,       setName]       = useState("");
  const [village,    setVillage]    = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState("");
  const [total,      setTotal]      = useState(null);
  const [headLoaded, setHeadLoaded] = useState(false);

  const timerRef = useRef(null);
  const t = CONTENT[lang];

  const [textRef,  textVis]  = useReveal(0.1);
  const [gallRef,  gallVis]  = useReveal(0.1);
  const [vidRef,   vidVis]   = useReveal(0.1);
  const [diyaRef,  diyaVis]  = useReveal(0.1);

  useEffect(() => {
    setTimeout(() => setHeadLoaded(true), 80);
    fetch(`${API_BASE}/api/diya`)
      .then(r => r.json())
      .then(data => setTotal(data.total))
      .catch(() => {});
  }, []);

  const resetSlide = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSlide(p => (p + 1) % PHOTOS.length), 5000);
  };

  useEffect(() => { resetSlide(); return () => clearInterval(timerRef.current); }, []);
  const goSlide = i => { setSlide(i); resetSlide(); };

  const handleDiya = async () => {
    setError("");
    if (!name.trim() || !village.trim()) { setError(t.fieldRequired); return; }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/diya`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), village: village.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setDiyaLit(true);
      setTotal(data.total);
    } catch {
      setError(t.errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="trb-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Noto+Sans+Devanagari:wght@300;400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        /* All styles are scoped to this page so they dont affect the navbar */


        @keyframes trb-head-in  { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes trb-fade-up  { from{opacity:0;transform:translateY(24px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes trb-flicker  { 0%{transform:scaleY(1) rotate(-1deg);opacity:.85} 100%{transform:scaleY(1.1) rotate(1deg);opacity:1} }

        .trb-page {
          min-height: 100vh;
          background: #f5f0e8;
          font-family: 'EB Garamond','Noto Sans Devanagari',Georgia,serif;
          color: #2a1400;
        }

        /* Top dark header with photo and dates */

        .trb-header {
          background: #1c1008;
          padding: 52px 24px 48px;
          text-align: center;
          position: relative;
          border-bottom: 1px solid rgba(200,160,60,0.1);
        }

        .trb-lang {
          position: absolute; top: 16px; right: 16px;
          background: transparent;
          border: 1px solid rgba(255,210,100,0.3);
          color: rgba(255,210,100,0.7);
          padding: 5px 14px; border-radius: 20px;
          font-size: 12px; cursor: pointer;
          font-family: 'Noto Sans Devanagari', sans-serif;
          transition: border-color 0.2s, color 0.2s;
        }
        .trb-lang:hover { border-color: rgba(255,210,100,0.7); color: rgba(255,210,100,1); }

        .trb-badge {
          display: inline-block;
          border: 1px solid rgba(200,160,60,0.25);
          color: rgba(200,160,60,0.7);
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 4px 16px; border-radius: 20px; margin-bottom: 24px;
          font-family: 'Noto Sans Devanagari', sans-serif;
          opacity: 0;
        }
        .trb-badge.vis { animation: trb-head-in 0.7s ease 0ms both; }

        /* Flickering candle animation */

        .trb-candles {
          display: flex; justify-content: center; gap: 24px;
          margin: 4px 0 18px; align-items: flex-end;
        }
        .trb-candle { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .trb-flame {
          width: 6px; height: 16px;
          background: linear-gradient(to top, #cc4400, #ffaa00, #fff8e0);
          border-radius: 50% 50% 30% 30%;
          animation: trb-flicker 2.5s ease-in-out infinite alternate;
        }
        .trb-candle-body { width: 7px; height: 24px; background: #e8d090; border-radius: 1px; }

        .trb-photo-wrap { width: 150px; height: 150px; margin: 0 auto 18px; opacity: 0; }
        .trb-photo-wrap.vis { animation: trb-head-in 0.8s ease 80ms both; }

        .trb-photo {
          width: 150px; height: 150px; border-radius: 50%;
          object-fit: cover; object-position: top; display: block;
          border: 3px solid rgba(200,160,60,0.5);
          filter: grayscale(20%) brightness(0.92);
        }
        .trb-photo-fallback {
          width: 150px; height: 150px; border-radius: 50%;
          background: #2e1a08;
          display: flex; align-items: center; justify-content: center;
          font-size: 58px; border: 3px solid rgba(200,160,60,0.4);
        }

        .trb-name {
          font-family: 'Yatra One', serif;
          font-size: clamp(24px,5vw,42px);
          color: #e8c97a; letter-spacing: 0.04em; line-height: 1.2; margin-bottom: 6px;
          opacity: 0;
        }
        .trb-name.vis { animation: trb-head-in 0.8s ease 160ms both; }

        .trb-role {
          color: rgba(220,190,120,0.65); font-size: clamp(13px,1.8vw,16px);
          font-style: italic; margin-bottom: 4px;
          opacity: 0;
        }
        .trb-role.vis { animation: trb-head-in 0.7s ease 250ms both; }

        .trb-pos {
          color: rgba(200,170,100,0.4); font-size: clamp(11px,1.5vw,13px);
          font-family: 'Noto Sans Devanagari', sans-serif; margin-bottom: 22px;
          opacity: 0;
        }
        .trb-pos.vis { animation: trb-head-in 0.7s ease 320ms both; }

        .trb-dates {
          display: flex; justify-content: center;
          gap: clamp(20px,6vw,56px); flex-wrap: wrap; margin-bottom: 24px;
          opacity: 0;
        }
        .trb-dates.vis { animation: trb-fade-up 0.7s ease 400ms both; }

        .trb-dblk { text-align: center; }
        .trb-dlbl {
          font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(200,160,60,0.4);
          font-family: 'Noto Sans Devanagari', sans-serif; margin-bottom: 3px;
        }
        .trb-dval { font-size: clamp(13px,2vw,16px); color: rgba(220,190,120,0.75); }

        .trb-divider {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          opacity: 0;
        }
        .trb-divider.vis { animation: trb-fade-up 0.7s ease 500ms both; }
        .trb-divline { width: 80px; height: 1px; background: linear-gradient(to right,transparent,rgba(200,160,60,0.3),transparent); }
        .trb-divsym  { color: rgba(200,160,60,0.35); font-size: 13px; }

        /* Main page content */

        .trb-body { max-width: 760px; margin: 0 auto; padding: 52px 24px 72px; }

        .trb-section-title {
          font-family: 'Yatra One', serif;
          font-size: clamp(18px,3vw,24px);
          color: #6b3a00; margin-bottom: 20px; letter-spacing: 0.04em;
        }

        .trb-text-section, .trb-gallery, .trb-video {
          margin-bottom: 52px; padding-bottom: 52px;
          border-bottom: 1px solid rgba(100,60,0,0.1);
        }

        .trb-para {
          font-size: clamp(15px,2vw,17.5px); line-height: 2;
          color: #3a2010;
          font-family: 'Noto Sans Devanagari','EB Garamond',serif;
          margin-bottom: 16px;
        }
        .trb-para:last-of-type { margin-bottom: 0; }

        .trb-quote {
          border-left: 2px solid rgba(160,100,0,0.3);
          padding: 12px 18px; margin-top: 24px;
          color: #7a4a00; font-style: italic;
          font-size: clamp(14px,1.8vw,17px);
          background: rgba(180,120,0,0.04);
          border-radius: 0 8px 8px 0;
        }

        /* Photo slideshow gallery */

        .trb-slideshow {
          position: relative; border-radius: 12px; overflow: hidden;
          aspect-ratio: 4/3; background: #1a0e00;
          box-shadow: 0 4px 24px rgba(0,0,0,0.15);
        }
        .trb-slide {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; transition: opacity 1.2s ease;
          filter: grayscale(15%) brightness(0.95);
          z-index: 1;
        }
        .trb-sdots {
          position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 7px; z-index: 2;
        }
        .trb-sdot {
          width: 6px; height: 6px; border-radius: 50%; border: none; cursor: pointer;
          background: rgba(255,255,255,0.3); transition: background 0.3s; padding: 0;
        }
        .trb-sdot.on { background: rgba(220,180,80,0.9); }

        /* Aarti video section */

        .trb-vwrap {
          border-radius: 12px; overflow: hidden; aspect-ratio: 16/9;
          background: #1a0e00; box-shadow: 0 4px 24px rgba(0,0,0,0.15);
        }
        .trb-vwrap video { width: 100%; height: 100%; object-fit: cover; display: block; }
        .trb-vdesc {
          margin-top: 10px; color: rgba(100,60,0,0.5); font-size: 13px;
          font-style: italic; font-family: 'Noto Sans Devanagari',serif; text-align: center;
        }

        /* Light a diya section with form */

        .trb-diya-section { text-align: center; }
        .trb-diya-desc { color: rgba(80,45,0,0.6); font-size: 15px; margin-bottom: 18px; font-family: 'Noto Sans Devanagari',serif; }
        .trb-count {
          display: inline-block;
          background: #fff8ee; border: 1px solid rgba(160,100,0,0.18);
          border-radius: 30px; padding: 8px 20px; margin-bottom: 22px;
          font-family: 'Yatra One',serif; font-size: 18px; color: #8a3a00;
        }
        .trb-form { display: flex; flex-direction: column; gap: 12px; max-width: 360px; margin: 0 auto 16px; }
        .trb-input {
          width: 100%; padding: 10px 13px;
          border: 1.5px solid rgba(160,80,0,0.18); border-radius: 9px;
          background: #fffaf3; font-size: 14px; color: #2a1400; outline: none;
          font-family: 'Noto Sans Devanagari',serif; transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .trb-input:focus { border-color: rgba(160,80,0,0.5); }
        .trb-input::placeholder { color: rgba(100,50,0,0.35); }
        .trb-error { color: #b83200; font-size: 12px; font-family: 'Noto Sans Devanagari',serif; }
        .trb-diya-btn {
          background: #7a3a00; color: #fff0d0; border: none;
          padding: 11px 30px; border-radius: 30px; font-size: 15px;
          font-family: 'Noto Sans Devanagari',serif; cursor: pointer;
          transition: background 0.25s; letter-spacing: 0.03em;
        }
        .trb-diya-btn:hover:not(:disabled) { background: #9a4a00; }
        .trb-diya-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .trb-diya-btn.lit { background: #c87800; color: #fff8e8; cursor: default; }

        /* Bottom footer */

        .trb-footer {
          background: #1c1008; text-align: center;
          padding: 28px 20px 36px;
          border-top: 1px solid rgba(200,160,60,0.1);
        }
        .trb-fom { font-family: 'Yatra One',serif; font-size: clamp(15px,2.5vw,20px); color: rgba(200,160,60,0.35); letter-spacing: 0.14em; }
        .trb-fsub { margin-top: 5px; font-size: 11px; color: rgba(200,160,60,0.2); letter-spacing: 0.1em; font-family: 'Noto Sans Devanagari',serif; }

        /* Fade-up animation when scrolling */

        .trb-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .trb-reveal.vis {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Header - photo, name, dates */}
      <div className="trb-header">
        <button className="trb-lang" onClick={() => setLang(l => l === "en" ? "hi" : "en")}>
          {t.toggle}
        </button>

        <div className={`trb-badge ${headLoaded ? "vis" : ""}`}>🪔 {t.badge}</div>

        {/* Three candles above the photo */}
        <div className="trb-candles">
          {[0, 0.6, 1.2].map((d, i) => (
            <div key={i} className="trb-candle">
              <div className="trb-flame" style={{ animationDelay: `${d}s` }} />
              <div className="trb-candle-body" />
            </div>
          ))}
        </div>

        <div className={`trb-photo-wrap ${headLoaded ? "vis" : ""}`}>
          <TributePhoto name={t.name} />
        </div>

        <h1 className={`trb-name ${headLoaded ? "vis" : ""}`}>{t.name}</h1>
        <p  className={`trb-role ${headLoaded ? "vis" : ""}`}>{t.role}</p>
        <p  className={`trb-pos  ${headLoaded ? "vis" : ""}`}>{t.position}</p>

        <div className={`trb-dates ${headLoaded ? "vis" : ""}`}>
          <div className="trb-dblk">
            <div className="trb-dlbl">{t.bornLabel}</div>
            <div className="trb-dval">{t.born}</div>
          </div>
          <div className="trb-dblk">
            <div className="trb-dlbl">{t.ageLabel}</div>
            <div className="trb-dval">{t.age}</div>
          </div>
          <div className="trb-dblk">
            <div className="trb-dlbl">{t.passedLabel}</div>
            <div className="trb-dval">{t.passed}</div>
          </div>
        </div>

        <div className={`trb-divider ${headLoaded ? "vis" : ""}`}>
          <div className="trb-divline" />
          <span className="trb-divsym">ॐ शान्ति</span>
          <div className="trb-divline" />
        </div>
      </div>

      {/* Page content */}
      <div className="trb-body">

        {/* Paragraphs about Tejkaran Ji */}
        <div ref={textRef} className={`trb-text-section trb-reveal ${textVis ? "vis" : ""}`}>
          <div className="trb-section-title">{t.tributeHeading}</div>
          {t.tribute.map((p, i) => <p key={i} className="trb-para">{p}</p>)}
          <div className="trb-quote">{t.quote}</div>
        </div>

        {/* Photo slideshow gallery */
}
        <div ref={gallRef} className={`trb-gallery trb-reveal ${gallVis ? "vis" : ""}`}>
          <div className="trb-section-title">📸 {t.galleryTitle}</div>
          <div className="trb-slideshow">
            {PHOTOS.map((src, i) => (
              <img key={i} src={src} alt={`Memory ${i + 1}`} className="trb-slide"
                style={{ opacity: i === slide ? 1 : 0 }} />
            ))}
            <div className="trb-sdots">
              {PHOTOS.map((_, i) => (
                <button key={i} className={`trb-sdot ${i === slide ? "on" : ""}`}
                  onClick={() => goSlide(i)} />
              ))}
            </div>
          </div>
        </div>

        {/* Aarti video section */
}
        <div ref={vidRef} className={`trb-video trb-reveal ${vidVis ? "vis" : ""}`}>
          <div className="trb-section-title">🎬 {t.videoTitle}</div>
          <div className="trb-vwrap">
            <video controls>
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
          </div>
          <p className="trb-vdesc">{t.videoDesc}</p>
        </div>

        {/* Light a diya section */}
        <div ref={diyaRef} className={`trb-diya-section trb-reveal ${diyaVis ? "vis" : ""}`}>
          <div className="trb-section-title">{t.homageTitle}</div>
          <p className="trb-diya-desc">{t.homageDesc}</p>

          {total !== null && (
            <div className="trb-count">🪔 {total} {t.countLabel}</div>
          )}

          {!diyaLit ? (
            <div className="trb-form">
              <input className="trb-input" placeholder={t.namePlaceholder}
                value={name} onChange={e => setName(e.target.value)} />
              <input className="trb-input" placeholder={t.villagePlaceholder}
                value={village} onChange={e => setVillage(e.target.value)} />
              {error && <p className="trb-error">{error}</p>}
              <button className="trb-diya-btn" onClick={handleDiya} disabled={submitting}>
                {submitting ? t.submitting : t.diyaBtn}
              </button>
            </div>
          ) : (
            <button className="trb-diya-btn lit" disabled>{t.diyaLit}</button>
          )}
        </div>

      </div>

      {/* Footer with Om Shanti */}
      <div className="trb-footer">
        <div className="trb-fom">ॐ शान्तिः शान्तिः शान्तिः</div>
        <div className="trb-fsub">Maa Navdurga Nagdev Mandir • Tukral</div>
      </div>
    </div>
  );
}

function TributePhoto({ name }) {
  const [err, setErr] = useState(false);
  if (err) return <div className="trb-photo-fallback">🙏</div>;
  return (
    <img src="/images/people/tejkaran.png" alt={name}
      className="trb-photo" onError={() => setErr(true)} />
  );
}
