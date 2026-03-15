import { useState, useEffect, useRef } from "react";
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

const FACILITIES = [
  {
    id: "dharmshala",
    icon: "🏠",
    images: ["/images/halls/programArea5.jpg"],
    en: {
      title: "Dharmshala & Kitchen",
      badge: "Free Stay",
      desc: "Devotees visiting the temple can stay in our clean, comfortable Dharmshala rooms. Each room is available free of cost for pilgrims. The attached kitchen is fully equipped — devotees can cook their own meals with ease.",
      features: ["Clean comfortable rooms", "Attached kitchen facility", "Free for all devotees", "Safe & secure premises"],
    },
    hi: {
      title: "धर्मशाला और रसोई",
      badge: "निःशुल्क ठहरने की सुविधा",
      desc: "मंदिर दर्शन के लिए आने वाले भक्त यहां बनी साफ और आरामदायक धर्मशाला में ठहर सकते हैं। सभी कमरे भक्तों के लिए बिल्कुल निःशुल्क हैं। पास में रसोई भी है जहां भक्त अपना खाना खुद बना सकते हैं।",
      features: ["साफ और आरामदायक कमरे", "रसोई की सुविधा", "सभी भक्तों के लिए निःशुल्क", "सुरक्षित परिसर"],
    },
    booking: false,
    color: "#7a3a00",
    lightColor: "#fff8ee",
  },
  {
    id: "marriage",
    icon: "💐",
    images: [
      "/images/halls/programArea1.jpg",
      "/images/halls/programArea2.jpg",
      "/images/halls/programArea3.jpg",
      "/images/halls/programArea4.jpg",
      "/images/halls/programArea5.jpg",
      "/images/halls/programArea6.jpg",
    ],
    en: {
      title: "Marriage Garden & Event Halls",
      badge: "Book Now",
      desc: "Our beautiful marriage garden and spacious event halls are perfect for weddings, religious ceremonies, and community programs. We have ample open space as well as covered halls — all can be arranged according to your needs and occasion.",
      features: ["Lush open marriage garden", "Covered event halls", "Flexible setup for any program", "Capacity for large gatherings"],
    },
    hi: {
      title: "विवाह गार्डन और कार्यक्रम हॉल",
      badge: "बुकिंग उपलब्ध",
      desc: "हमारा सुंदर विवाह गार्डन और बड़ा हॉल शादी, धार्मिक कार्यक्रम और अन्य समारोहों के लिए अच्छा स्थान है। यहां खुला गार्डन और ढका हुआ हॉल दोनों उपलब्ध हैं जिन्हें आपकी जरूरत के अनुसार सजाया जा सकता है।",
      features: ["खुला और सुंदर विवाह गार्डन", "ढका हुआ कार्यक्रम हॉल", "हर प्रकार के कार्यक्रम के लिए उपयुक्त", "बड़े समारोह आसानी से हो सकते हैं"],
    },
    booking: true,
    color: "#5a2d82",
    lightColor: "#f8f2ff",
  },
  {
    id: "parking",
    icon: "🚗",
    images: ["/images/nature/nature1.jpg"],
    en: {
      title: "Parking Facility",
      badge: "Free Parking",
      desc: "Ample and well-organised parking space is available for all devotees. Whether you arrive by car, bike, or bus — there is sufficient space for all vehicles within the temple premises.",
      features: ["Space for cars & two-wheelers", "Bus & large vehicle area", "Free for all visitors", "Safe & supervised"],
    },
    hi: {
      title: "पार्किंग सुविधा",
      badge: "निःशुल्क पार्किंग",
      desc: "मंदिर में आने वाले सभी भक्तों के लिए पर्याप्त पार्किंग की व्यवस्था है। चाहे आप कार, बाइक या बस से आएं — सभी वाहनों के लिए यहां जगह उपलब्ध है।",
      features: ["कार और बाइक के लिए जगह", "बस और बड़े वाहनों के लिए भी स्थान", "सभी के लिए निःशुल्क पार्किंग", "सुरक्षित व्यवस्था"],
    },
    booking: false,
    color: "#1a5c3a",
    lightColor: "#f0fbf5",
  },
];

/* Photo slideshow for each facility */

function FacilityGallery({ images }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);
  return (
    <div className="fac-gallery">
      {images.map((src, i) => (
        <img key={i} src={src} alt="" className="fac-slide"
          style={{ opacity: i === idx ? 1 : 0 }}
          onError={e => { e.target.style.background = "#e8dcc8"; e.target.src = ""; }} />
      ))}
      <div className="fac-slide-placeholder">
        <span>🏛</span>
        <span className="fac-placeholder-text">Image Coming Soon</span>
      </div>
      {images.length > 1 && (
        <>
          <button className="fac-arrow fac-arrow-l" onClick={prev}>‹</button>
          <button className="fac-arrow fac-arrow-r" onClick={next}>›</button>
          <div className="fac-dots">
            {images.map((_, i) => (
              <button key={i} className={`fac-dot ${i === idx ? "on" : ""}`} onClick={() => setIdx(i)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* One facility row with image and text */

function FacilitySection({ fac, idx, lang }) {
  const [ref, vis] = useReveal(0.1);
  const text = fac[lang];
  return (
    <div
      ref={ref}
      className={`fac-section ${idx % 2 === 1 ? "reverse" : ""}`}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <FacilityGallery images={fac.images} />
      <div className="fac-text">
        <div className="fac-badge" style={{ background: fac.lightColor, color: fac.color, border: `1px solid ${fac.color}22` }}>
          {fac.icon} {text.badge}
        </div>
        <div className="fac-title" style={{ color: fac.color }}>{text.title}</div>
        <p className="fac-desc">{text.desc}</p>
        <ul className="fac-features">
          {text.features.map((f, i) => (
            <li key={i}>
              <div className="fac-feat-dot" style={{ background: fac.color, opacity: 0.7 }} />
              {f}
            </li>
          ))}
        </ul>
        {fac.booking && (
          <Link to="/contact" className="fac-book-inline">
            📞 {lang === "en" ? "Contact to Book" : "बुकिंग हेतु संपर्क करें"} →
          </Link>
        )}
      </div>
    </div>
  );
}

/* Main Facilities page component */

export default function Facilities() {
  const [lang, setLang] = useState("en");
  const [headVis, setHeadVis] = useState(false);
  const [bannerRef, bannerVis] = useReveal(0.15);

  useEffect(() => { setTimeout(() => setHeadVis(true), 80); }, []);

  const PAGE = {
    en: {
      toggle: "हिंदी में देखें",
      heading: "Temple Facilities",
      subheading: "Everything you need for a peaceful and blessed visit",
      bookingHeading: "Booking & Enquiry",
      bookingDesc: "For marriage garden or event hall bookings, please contact our Temple President directly.",
      bookingBtn: "Contact for Booking →",
      note: "All bookings are managed personally by Balusingh Ji Parihar (Sarpanch Sahab).",
    },
    hi: {
      toggle: "View in English",
      heading: "मंदिर की सुविधाएँ",
      subheading: "आपके अच्छे और शांतिपूर्ण दर्शन के लिए उपलब्ध सुविधाएँ",
      bookingHeading: "बुकिंग और जानकारी",
      bookingDesc: "विवाह गार्डन या कार्यक्रम हॉल की बुकिंग के लिए कृपया मंदिर अध्यक्ष से संपर्क करें।",
      bookingBtn: "बुकिंग के लिए संपर्क करें →",
      note: "सभी बुकिंग बालूसिंह जी परिहार (सरपंच साहब) द्वारा की जाती हैं।",
    },
  };
  const p = PAGE[lang];

  return (
    <div className="fac-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');

        @keyframes fac-in {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fac-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fac-page {
          min-height: 100vh;
          background: #fdf8f2;
          font-family: 'Cormorant Garamond', 'Noto Sans Devanagari', Georgia, serif;
          color: #2a1400;
        }

        /* Page header */

        .fac-header {
          position: relative;
          background: linear-gradient(135deg, #7a1a00 0%, #b83200 50%, #8a2200 100%);
          padding: 56px 24px 78px;
          text-align: center;
          overflow: hidden;
        }
        .fac-header::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 48px;
          background: #fdf8f2;
          clip-path: ellipse(55% 100% at 50% 100%);
        }
        .fac-header::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(200,80,0,0.2) 0%, transparent 65%);
          pointer-events: none;
        }
        .fac-lang {
          position: absolute; top: 18px; right: 18px;
          background: rgba(255,215,0,0.12);
          border: 1px solid rgba(255,215,0,0.35);
          color: #ffd700; padding: 7px 16px; border-radius: 20px;
          font-size: 12px; cursor: pointer;
          font-family: 'Noto Sans Devanagari', sans-serif;
          transition: background 0.2s; z-index: 10;
        }
        .fac-lang:hover { background: rgba(255,215,0,0.24); }
        .fac-header-om {
          font-size: 34px; color: rgba(255,215,0,0.5); margin-bottom: 10px;
          opacity: 0;
        }
        .fac-header-om.vis { animation: fac-in 0.7s ease 0ms both; }
        .fac-header h1 {
          font-family: 'Yatra One', serif;
          font-size: clamp(30px, 6vw, 52px);
          color: #ffd700;
          filter: drop-shadow(0 2px 12px rgba(255,180,0,0.35));
          letter-spacing: 0.04em; line-height: 1.2; margin-bottom: 10px;
          opacity: 0;
        }
        .fac-header h1.vis { animation: fac-in 0.8s ease 100ms both; }
        .fac-header p {
          color: #ffd09a; font-size: clamp(13px, 2vw, 17px);
          font-style: italic; opacity: 0; max-width: 500px; margin: 0 auto;
        }
        .fac-header p.vis { animation: fac-up 0.8s ease 250ms both; }
        .fac-header-orn {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; margin-top: 18px; opacity: 0;
        }
        .fac-header-orn.vis { animation: fac-up 0.8s ease 380ms both; }
        .fac-header-ornline {
          width: 80px; height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,215,0,0.4), transparent);
        }

        /* Page body */

        .fac-body { max-width: 1060px; margin: 0 auto; padding: 52px 20px 80px; }

        .fac-section {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 40px; align-items: start;
          margin-bottom: 72px; padding-bottom: 72px;
          border-bottom: 1px solid rgba(160,80,0,0.1);
        }
        .fac-section:last-of-type { border-bottom: none; }
        .fac-section.reverse { direction: rtl; }
        .fac-section.reverse > * { direction: ltr; }
        @media (max-width: 720px) {
          .fac-section, .fac-section.reverse { grid-template-columns: 1fr; direction: ltr; }
        }

        /* Photo gallery styles */

        .fac-gallery {
          position: relative; border-radius: 18px;
          overflow: hidden; aspect-ratio: 4/3;
          background: #e8dcc8;
          box-shadow: 0 6px 28px rgba(120,60,0,0.12);
          transition: box-shadow 0.35s ease, transform 0.35s ease;
        }
        .fac-gallery:hover {
          box-shadow: 0 14px 40px rgba(120,60,0,0.2);
          transform: translateY(-4px);
        }
        .fac-slide {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; transition: opacity 0.8s ease; z-index: 1;
        }
        .fac-slide-placeholder {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: linear-gradient(135deg, #e8dcc8, #d4c4a8);
          gap: 8px; z-index: 0; pointer-events: none;
        }
        .fac-slide-placeholder span:first-child { font-size: 40px; opacity: 0.35; }
        .fac-placeholder-text { font-size: 13px; color: rgba(100,60,0,0.45); font-family: 'Noto Sans Devanagari', serif; }
        .fac-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2);
          color: white; width: 32px; height: 32px; border-radius: 50%;
          font-size: 18px; cursor: pointer; z-index: 3;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(4px); transition: background 0.2s;
        }
        .fac-arrow:hover { background: rgba(0,0,0,0.55); }
        .fac-arrow-l { left: 10px; }
        .fac-arrow-r { right: 10px; }
        .fac-dots {
          position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 6px; z-index: 3;
        }
        .fac-dot {
          width: 6px; height: 6px; border-radius: 50%; border: none; cursor: pointer;
          background: rgba(255,255,255,0.4); padding: 0; transition: background 0.2s;
        }
        .fac-dot.on { background: rgba(255,220,80,0.95); }

        /* Text content styles */

        .fac-text { padding: 4px 0; }
        .fac-badge {
          display: inline-block; font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 4px 14px; border-radius: 20px; margin-bottom: 14px;
          font-family: 'Noto Sans Devanagari', sans-serif;
        }
        .fac-title {
          font-family: 'Yatra One', serif;
          font-size: clamp(22px, 3.5vw, 32px);
          line-height: 1.2; margin-bottom: 14px; letter-spacing: 0.03em;
        }
        .fac-desc {
          font-size: clamp(14px, 1.9vw, 17px); line-height: 1.9; color: #4a2800;
          font-family: 'Noto Sans Devanagari', 'Cormorant Garamond', serif;
          margin-bottom: 20px;
        }
        .fac-features { list-style: none; padding: 0; margin: 0 0 24px; }
        .fac-features li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: clamp(13px, 1.7vw, 15px); color: #5a3010;
          padding: 6px 0; border-bottom: 1px dashed rgba(160,80,0,0.1);
          font-family: 'Noto Sans Devanagari', serif; line-height: 1.5;
          transition: color 0.2s;
        }
        .fac-features li:last-child { border-bottom: none; }
        .fac-features li:hover { color: #3a1a00; }
        .fac-feat-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
        .fac-book-inline {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #5a2d82, #7a3daa);
          color: #f8f0ff; padding: 11px 24px; border-radius: 30px;
          font-size: 14px; font-weight: 600; text-decoration: none;
          font-family: 'Noto Sans Devanagari', sans-serif;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(90,45,130,0.25);
        }
        .fac-book-inline:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(90,45,130,0.4); }

        /* Bottom booking CTA banner */

        .fac-booking-banner {
          background: linear-gradient(135deg, #1c0a2e, #2e1050, #1c0a2e);
          border-radius: 24px; padding: 48px 40px; text-align: center;
          position: relative; overflow: hidden;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .fac-booking-banner:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(60,20,100,0.3); }
        .fac-booking-banner::before {
          content: '💐'; position: absolute; top: -10px; left: 50%; transform: translateX(-50%);
          font-size: 100px; opacity: 0.05; pointer-events: none;
        }
        .fac-booking-banner h2 {
          font-family: 'Yatra One', serif;
          font-size: clamp(22px, 4vw, 34px);
          color: #e8c4ff; margin-bottom: 12px; letter-spacing: 0.04em;
        }
        .fac-booking-banner p {
          color: rgba(220,190,255,0.65);
          font-size: clamp(14px, 1.9vw, 17px);
          max-width: 520px; margin: 0 auto 28px;
          font-family: 'Noto Sans Devanagari', serif; line-height: 1.8;
        }
        .fac-booking-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #c87800, #ffd700);
          color: #2a1400; padding: 14px 36px; border-radius: 40px;
          font-size: 16px; font-weight: 700; text-decoration: none;
          font-family: 'Noto Sans Devanagari', sans-serif; letter-spacing: 0.04em;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(200,120,0,0.35);
        }
        .fac-booking-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 10px 30px rgba(200,120,0,0.5); }
        .fac-booking-note {
          margin-top: 16px; font-size: 12px; color: rgba(200,160,255,0.4);
          font-family: 'Noto Sans Devanagari', sans-serif; letter-spacing: 0.04em;
        }
      `}</style>

      {/* Page header */}
      <div className="fac-header">
        <button className="fac-lang" onClick={() => setLang(l => l === "en" ? "hi" : "en")}>
          {p.toggle}
        </button>
        <div className={`fac-header-om ${headVis ? "vis" : ""}`}>ॐ</div>
        <h1 className={headVis ? "vis" : ""}>{p.heading}</h1>
        <p className={headVis ? "vis" : ""}>{p.subheading}</p>
        <div className={`fac-header-orn ${headVis ? "vis" : ""}`}>
          <div className="fac-header-ornline" />
          <span style={{ color: "#ffd700", fontSize: 18 }}>✦</span>
          <div className="fac-header-ornline" />
        </div>
      </div>

      {/* Page content */}
      <div className="fac-body">
        {FACILITIES.map((fac, idx) => (
          <FacilitySection key={fac.id} fac={fac} idx={idx} lang={lang} />
        ))}

        <div
          ref={bannerRef}
          className="fac-booking-banner"
          style={{
            opacity: bannerVis ? 1 : 0,
            transform: bannerVis ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2>{p.bookingHeading}</h2>
          <p>{p.bookingDesc}</p>
          <Link to="/contact" className="fac-booking-btn">{p.bookingBtn}</Link>
          <p className="fac-booking-note">{p.note}</p>
        </div>
      </div>
    </div>
  );
}
