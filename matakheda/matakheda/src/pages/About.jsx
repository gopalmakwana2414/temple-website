import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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

const HISTORY_IMAGES = [
  "/images/detailImage.jpg",
  "/images/nature/nature11.jpg",
  "/images/nature/nature16.jpg",
];

export default function About() {
  const [lang, setLang] = useState("en");

  const [aboutRef,   aboutVis]   = useReveal(0.08);
  const [histRef,    histVis]    = useReveal(0.08);
  const [imgRef,     imgVis]     = useReveal(0.08);
  const [tribRef,    tribVis]    = useReveal(0.1);

  return (
    <section className="relative py-12 overflow-hidden">

      {/* Page background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100"></div>

      {/* Decorative glow circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-red-400/20 rounded-full blur-3xl pointer-events-none"></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap');

        @keyframes ab-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ab-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ab-slide-left {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ab-slide-right {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .ab-section-divider {
          display: flex; align-items: center; gap: 16px;
          margin: 0 0 40px;
        }
        .ab-divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(to right, transparent, rgba(180,40,0,0.25), transparent);
        }
        .ab-divider-sym { color: #b45309; font-size: 18px; }

        /* Tribute card for Tejkaran Ji */

        .trib-card {
          position: relative;
          background: linear-gradient(145deg,#1a0800,#2e1200,#1a0800);
          border-radius: 28px;
          padding: 44px 40px;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 20px 56px rgba(80,20,0,0.35);
          border: 1px solid rgba(255,180,0,0.15);
          overflow: hidden;
          text-decoration: none;
          display: block;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.3s ease;
        }
        .trib-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 28px 64px rgba(80,20,0,0.45);
          border-color: rgba(255,200,60,0.4);
        }
        .trib-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, transparent, #ffd700, #ff9400, #ffd700, transparent);
          opacity: 0.6;
          transition: opacity 0.3s;
        }
        .trib-card:hover::before { opacity: 1; }
        .trib-card::after {
          content: '🕯️';
          position: absolute; top: 18px; right: 20px;
          font-size: 22px; opacity: 0.35;
        }

        .trib-photo-ring {
          width: 112px; height: 112px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, #ffd700, #ff9400, #ffd700);
          margin: 0 auto 20px;
          box-shadow: 0 0 24px rgba(255,160,0,0.35);
        }
        .trib-photo-ring img {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: top;
          display: block;
          border: 3px solid #1a0800;
        }

        .trib-name {
          font-family: 'Yatra One', serif;
          font-size: clamp(20px,3.5vw,28px);
          color: #ffd700;
          letter-spacing: 0.04em;
          margin: 0 0 6px;
          text-shadow: 0 0 20px rgba(255,180,0,0.4);
        }
        .trib-role {
          font-size: 13px; color: rgba(255,200,100,0.6);
          letter-spacing: 0.06em; margin: 0 0 16px;
          font-family: 'Noto Sans Devanagari', sans-serif;
        }
        .trib-divline {
          width: 60px; height: 1px; margin: 0 auto 16px;
          background: linear-gradient(to right, transparent, rgba(255,200,60,0.4), transparent);
        }
        .trib-quote {
          font-size: 14px; font-style: italic;
          color: rgba(255,200,120,0.55);
          line-height: 1.7;
          font-family: 'Noto Sans Devanagari', serif;
          margin: 0 0 20px;
        }
        .trib-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg,rgba(180,60,0,0.5),rgba(120,30,0,0.5));
          border: 1px solid rgba(255,180,0,0.2);
          color: rgba(255,200,100,0.85);
          padding: 8px 22px; border-radius: 30px;
          font-size: 13px; letter-spacing: 0.06em;
          font-family: 'Noto Sans Devanagari', sans-serif;
          transition: background 0.3s, border-color 0.3s;
        }
        .trib-card:hover .trib-cta {
          background: linear-gradient(135deg,rgba(200,80,0,0.7),rgba(150,40,0,0.7));
          border-color: rgba(255,200,60,0.4);
        }

        /* History photo hover effect */

        .hist-img-wrap {
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 8px 32px rgba(120,40,0,0.15);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .hist-img-wrap:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 48px rgba(120,40,0,0.22);
        }
        .hist-img-wrap img {
          width: 100%; height: 300px; object-fit: cover; display: block;
          transition: transform 0.6s ease;
        }
        .hist-img-wrap:hover img { transform: scale(1.06); }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* EN/Hindi toggle */}
        <div className="flex justify-end mb-10">
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="px-5 py-2 bg-red-600 text-white rounded-full shadow-lg hover:scale-105 transition"
          >
            {lang === "en" ? "हिंदी" : "English"}
          </button>
        </div>

        {/* SECTION 1 — ABOUT */}
        <div ref={aboutRef} style={{
          opacity: aboutVis ? 1 : 0,
          animation: aboutVis ? "ab-fade-up 0.8s ease both" : "none",
        }}>

          {/* Page heading */}
          <div className="text-center mb-14">
            <h2 className="text-5xl md:text-6xl font-bold text-red-700 mb-6"
              style={{ fontFamily: "'Yatra One',serif" }}>
              {lang === "en" ? "About Temple" : "मन्दिर के बारे में"}
            </h2>
            <div className="ab-section-divider" style={{ maxWidth: 480, margin: "0 auto 28px" }}>
              <div className="ab-divider-line"/>
              <span className="ab-divider-sym">✦</span>
              <div className="ab-divider-line"/>
            </div>
          </div>

          {/* About text on left, image on right */}
          <div className="grid md:grid-cols-2 gap-14 items-center mb-24">

            <div style={{
              animation: aboutVis ? "ab-slide-left 0.8s ease 0.1s both" : "none",
            }}>
              <p className="text-xl text-gray-700 leading-relaxed">
                {lang === "en" ? (
                  <>
                    Matakheda Temple is a divine and ancient temple located in Tukral
                    village in the Ujjain district of Madhya Pradesh. The temple is
                    dedicated to Nag Devta and Tejaji Maharaj.
                    <br /><br />
                    The temple is famous for its natural beauty and for fulfilling
                    the wishes of devotees who visit with faith and devotion.
                    <br /><br />
                    A unique feature of this temple is that devotees can witness the
                    sacred presence of Nag Devta from Nag Panchami in the Shravan
                    month until Teja Dashami in the Bhadrapada month.
                    <br /><br />
                    The temple complex also houses idols of many major Hindu gods
                    and goddesses.
                    <br /><br />
                    On Nag Panchami special religious ceremonies are organized and
                    on Teja Dashami a grand fair is held where thousands of devotees
                    offer Nishan (umbrella-like cloth offerings) after their wishes
                    are fulfilled.
                  </>
                ) : (
                  <>
                    माताखेड़ा मंदिर मध्यप्रदेश के उज्जैन जिले के टुकराल गांव में
                    स्थित नागदेवता एवं तेजाजी महाराज को समर्पित एक दिव्य एवं
                    प्राचीन मंदिर है।
                    <br /><br />
                    मंदिर अपनी प्राकृतिक सुंदरता और श्रद्धालुओं की मनोकामना
                    पूर्ति के लिए प्रसिद्ध है।
                    <br /><br />
                    मंदिर की विशेषता है कि श्रावण कृष्ण पक्ष की नागपंचमी से
                    भाद्रपद शुक्ल पक्ष की तेजादशमी तक साक्षात नागदेवता के
                    दर्शन होते हैं।
                    <br /><br />
                    मंदिर में लगभग सभी मुख्य देवी-देवताओं की प्रतिमाएं स्थापित हैं।
                    <br /><br />
                    नागपंचमी पर विशेष धार्मिक आयोजन होते हैं और तेजादशमी के
                    दिन विशाल मेले का आयोजन होता है जहाँ हजारों श्रद्धालु
                    अपनी मनोकामना पूर्ण होने पर निशान चढ़ाते हैं।
                  </>
                )}
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl shadow-2xl group" style={{
              animation: aboutVis ? "ab-slide-right 0.8s ease 0.1s both" : "none",
            }}>
              <img
                src="images/nature/nature12.jpg"
                alt="Temple"
                className="w-full h-[460px] object-cover transform group-hover:scale-105 transition duration-700"
              />
            </div>

          </div>
        </div>

        {/* SECTION 2 — HISTORY */}
        <div ref={histRef} style={{
          opacity: histVis ? 1 : 0,
          animation: histVis ? "ab-fade-up 0.8s ease both" : "none",
        }}>

          {/* History section heading */}
          <div className="text-center mb-14">
            <h2 className="text-5xl md:text-6xl font-bold text-red-700 mb-6"
              style={{ fontFamily: "'Yatra One',serif" }}>
              {lang === "en" ? "Temple History" : "मन्दिर का इतिहास"}
            </h2>
            <div className="ab-section-divider" style={{ maxWidth: 480, margin: "0 auto 0" }}>
              <div className="ab-divider-line"/>
              <span className="ab-divider-sym">✦</span>
              <div className="ab-divider-line"/>
            </div>
          </div>

          {/* Temple history paragraphs */}
          <div className="max-w-4xl mx-auto mb-16">
            {lang === "en" ? (
              <>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  According to the elders of the village, Matakheda Temple is a
                  divine and miraculous temple that is more than 500 years old.
                </p>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  The story of the temple construction is very unique. Many
                  years ago early in the morning some stones started flying
                  from behind the temple and the temple was being constructed
                  automatically by divine power.
                </p>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  A woman from the village saw this miraculous event and ran to
                  call the villagers. When the villagers arrived, the divine
                  construction stopped and the stones remained in the same
                  position where they had stopped.
                </p>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  Even today visitors can see those stones in the same
                  condition beneath the temple. From below the temple appears
                  as if it is built on a small hill.
                </p>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  After many years the temple was rebuilt by villagers including
                  Shri Mod Singh Ji Ranawat, Shri Bhanwar Singh Ji Ranawat and
                  Shri Balu Singh Ji Parihar (current President) with the
                  support and devotion of the entire village.
                </p>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  Shri Satyanarayan Ji Sharma also planted many trees in the
                  temple premises which enhanced the beauty of the temple.
                </p>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  Around the year 2013 Nag Devta stayed in the main temple for
                  nearly two months and gave darshan to devotees. Thousands of
                  devotees visited daily to receive blessings.
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Later Nag Devta left the physical body and a sacred Samadhi
                  was created behind the temple where devotees can still visit
                  and offer prayers.
                </p>
              </>
            ) : (
              <>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  गांव के वरिष्ठ जनों के अनुसार माताखेड़ा मंदिर लगभग
                  500 वर्षों से अधिक पुराना दिव्य एवं चमत्कारिक मंदिर है।
                </p>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  कहा जाता है कि बहुत वर्षों पहले सुबह के समय मंदिर के पीछे
                  से कुछ पत्थर उड़कर आ रहे थे और स्वतः मंदिर का निर्माण हो रहा था।
                </p>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  गांव की एक महिला ने यह दृश्य देखा और गांव वालों को बुलाया।
                  जैसे ही गांव वाले वहाँ पहुंचे मंदिर का निर्माण वहीं रुक गया
                  और पत्थर भी उसी अवस्था में रुक गए।
                </p>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  आज भी मंदिर के नीचे वही पत्थर उसी अवस्था में दिखाई देते हैं।
                  मंदिर नीचे से देखने पर एक टीले पर बना हुआ प्रतीत होता है।
                </p>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  बाद में गांव के श्री मोड़सिंह जी राणावत, भंवरसिंह जी राणावत
                  और बालूसिंह जी परिहार (वर्तमान अध्यक्ष) सहित अन्य ग्रामीणों
                  ने मिलकर मंदिर का पुनर्निर्माण करवाया।
                </p>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  श्री सत्यनारायण जी शर्मा द्वारा मंदिर परिसर में वृक्षारोपण
                  और देखभाल की गई जिससे मंदिर की सुंदरता बढ़ी।
                </p>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  वर्ष 2013 के आस पास लगभग 2 महीने तक नागदेवता मुख्य मंदिर में रहे थे एवं भक्तों को दर्शन दिये थे, यह खबर सुनकर तत्कालीन समय में प्रतिदिन हजारों श्रद्धालु दर्शन करते थे इसके बाद नागदेवता ने शरीर का त्याग किया। <br/> मंदिर के पीछे उन्हें समाधि दी गई एवं ऊपर पौधारोपण किया गया।
आप जाकर दर्शन कर सकते हैं।
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  बाबा नागदेव, श्री माताखेड़ा सरकार आपकी सभी मनोकामनाएं पूर्ण करे।<br/><br/>

                जय हो श्री माताखेड़ा सरकार की 🙏
                </p>
              </>
            )}
          </div>

          {/* Three temple photos below the history */}
          <div ref={imgRef} className="grid md:grid-cols-3 gap-8 mb-28">
            {HISTORY_IMAGES.map((src, i) => (
              <div key={i} className="hist-img-wrap" style={{
                opacity: imgVis ? 1 : 0,
                animation: imgVis ? `ab-fade-up 0.7s ease ${i * 150}ms both` : "none",
              }}>
                <img src={src} alt={`Temple ${i + 1}`} />
              </div>
            ))}
          </div>

        </div>

        {/* SECTION 3 — TRIBUTE */}
        <div ref={tribRef} className="text-center" style={{
          opacity: tribVis ? 1 : 0,
          animation: tribVis ? "ab-fade-up 0.8s ease both" : "none",
        }}>

          <h3 className="text-4xl font-bold mb-3 text-gray-900"
            style={{ fontFamily: "'Yatra One',serif" }}>
            {lang === "en" ? "In Loving Memory" : "भावपूर्ण श्रद्धांजलि"}
          </h3>
          <p className="text-gray-500 text-base mb-10 italic">
            {lang === "en"
              ? "We remember those who devoted their lives to this sacred temple."
              : "हम उन्हें नमन करते हैं जिन्होंने अपना जीवन इस मंदिर को समर्पित किया।"}
          </p>

          <Link to="/tribute" className="trib-card">
            <div className="text-center">

              {/* Three candle icons */}
              <div style={{ fontSize: 20, letterSpacing: 8, marginBottom: 16, opacity: 0.6 }}>
                🕯️ 🕯️ 🕯️
              </div>

              {/* Tejkaran Ji photo */}
              <div className="trib-photo-ring">
                <img
                  src="/images/people/tejkaran5.jpeg"
                  alt="Tejkaran Ji"
                  onError={e => { e.target.style.display = "none"; }}
                />
              </div>

              {/* Donor name field */}
              <h4 className="trib-name">
                {lang === "en" ? "Tejkaran Ji Chaudhary" : "तेजकरण जी चौधरी"}
              </h4>

              {/* Person role at temple */}
              <p className="trib-role">
                {lang === "en"
                  ? "Head Pujari · Matakheda Mandir Tukral"
                  : "दिवंगत पुजारी · माताखेड़ा मंदिर टुकराल"}
              </p>

              {/* Birth and passing dates */}
              <div style={{ color: "rgba(255,200,100,0.45)", fontSize: 13, marginBottom: 16, letterSpacing: "0.06em" }}>
                15 Jan 1966 &nbsp;✦&nbsp; 23 Jan 2025
              </div>

              <div className="trib-divline"/>

              

              {/* Om Shanti text */}
              <div style={{ color: "rgba(200,140,0,0.35)", fontSize: 13, letterSpacing: "0.14em", marginBottom: 20 }}>
                ॐ शान्तिः शान्तिः शान्तिः
              </div>

              {/* View tribute button */}
              <span className="trib-cta">
                {lang === "en" ? "Read Full Tribute →" : "पूरी श्रद्धांजलि पढ़ें →"}
              </span>

            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
