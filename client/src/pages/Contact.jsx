import { useState } from "react";

const CONTENT = {
  en: {
    pageTitle: "Contact Us",
    pageSubtitle: "We'd love to hear from you",
    presidentTitle: "Temple President",
    presidentName: "Balusingh Ji Parihar",
    presidentRole: "Former Sarpanch ",
    callBtn: "Call Now",
    pujariTitle: "Temple Pujari",
    pujariName: "Tejulal Yogi",
    pujariRole: "Head Pujari",
    addressTitle: "Temple Address",
    addressLines: [
      "Maa Navdurga Nagdev Mandir (Matakheda)",
      "Village - Tukral",
      "Block - Makdone",
      "District Ujjain",
      "Madhya Pradesh — 456550, India",
    ],
    hoursTitle: "Darshan Timings",
    hours: [
      { label: "Morning Aarti", time: "5:30 AM – 7:00 AM" },
      { label: "Darshan",       time: "7:00 AM – 12:00 PM" },
      { label: "Evening Aarti", time: "6:00 PM – 8:00 PM" },
      { label: "Special Days",  time: "Open All Day" },
    ],
    mapTitle: "Find Us",
    langToggle: "हिंदी में देखें",
  },
  hi: {
    pageTitle: "संपर्क करें",
    pageSubtitle: "हम आपसे मिलकर प्रसन्न होंगे",
    presidentTitle: "मंदिर अध्यक्ष",
    presidentName: "बालूसिंह जी परिहार",
    presidentRole: "भूतपूर्व सरपंच ",
    callBtn: "अभी कॉल करें",
    pujariTitle: "मंदिर पुजारी",
    pujariName: "तेजूलाल योगी",
    pujariRole: "मुख्य पुजारी",
    addressTitle: "मंदिर का पता",
    addressLines: [
      "माँ नवदुर्गा नागदेव मंदिर {माताखेड़ा}",
      "ग्राम टुकराल, ",
      "तहसील-माकड़ोन, ",
      "जिला — उज्जैन",
      "मध्य प्रदेश — 456550, भारत",
    ],
    hoursTitle: "दर्शन समय",
    hours: [
      { label: "प्रातः आरती",  time: "प्रातः 5:30 – 7:00" },
      { label: "दर्शन",        time: "प्रातः 7:00 – दोपहर 12:00" },
      { label: "सायं आरती",    time: "सायं 6:00 – 8:00" },
      { label: "विशेष अवसर",   time: "पूरे दिन खुला" },
    ],
    mapTitle: "हमें खोजें",
    langToggle: "View in English",
  },
};

/* Google Maps embed link for the temple */

const MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.0!2d75.920818!3d23.4633921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396363a780366d75%3A0xfcf13bed39c8d912!2sNag%20Dev%20Mata%20Kheda%20Mandir%20Tukral%20Tarana%20Ujjain!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

export default function Contact() {
  const [lang, setLang] = useState("en");
  const t = CONTENT[lang];

  return (
    <div className="contact-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');

        * { box-sizing: border-box; }

        .contact-page {
          min-height: 100vh;
          background: #fdf6ec;
          font-family: 'Cormorant Garamond', 'Noto Sans Devanagari', Georgia, serif;
          position: relative;
          overflow-x: hidden;
        }

        .contact-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(circle at 15% 25%, rgba(210,80,0,0.06) 0%, transparent 50%),
            radial-gradient(circle at 85% 70%, rgba(210,150,0,0.07) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .contact-header {
          position: relative;
          background: linear-gradient(135deg, #7a1a00 0%, #b83200 50%, #8a2200 100%);
          padding: 56px 24px 80px;
          text-align: center;
          overflow: hidden;
          z-index: 1;
        }

        .contact-header::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 48px;
          background: #fdf6ec;
          clip-path: ellipse(55% 100% at 50% 100%);
        }

        .contact-header-om {
          font-size: 38px;
          opacity: 0.5;
          margin-bottom: 10px;
          color: #ffd700;
        }

        .contact-header h1 {
          font-family: 'Yatra One', serif;
          font-size: clamp(32px, 6vw, 56px);
          color: #ffd700;
          letter-spacing: 0.04em;
          filter: drop-shadow(0 2px 12px rgba(255,180,0,0.4));
          line-height: 1.2;
        }

        .contact-header p {
          color: #ffd09a;
          font-size: clamp(14px, 2vw, 18px);
          margin-top: 8px;
          font-style: italic;
          opacity: 0.9;
        }

        .header-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 14px 0 0;
        }
        .header-ornament-line {
          width: 80px; height: 1px;
          background: linear-gradient(to right, transparent, #ffd700, transparent);
        }

        .lang-toggle {
          position: absolute;
          top: 20px; right: 20px;
          background: rgba(255,215,0,0.15);
          border: 1px solid rgba(255,215,0,0.4);
          color: #ffd700;
          padding: 7px 16px;
          border-radius: 20px;
          font-size: 13px;
          cursor: pointer;
          font-family: 'Noto Sans Devanagari', sans-serif;
          transition: all 0.25s;
          backdrop-filter: blur(6px);
          z-index: 10;
        }
        .lang-toggle:hover { background: rgba(255,215,0,0.28); }

        .contact-body {
          position: relative;
          z-index: 1;
          max-width: 1000px;
          margin: -24px auto 0;
          padding: 0 20px 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        @media (max-width: 700px) {
          .contact-body { grid-template-columns: 1fr; }
        }

        .contact-card {
          background: #fff;
          border-radius: 20px;
          padding: 32px 28px;
          box-shadow: 0 4px 24px rgba(120,40,0,0.08), 0 1px 3px rgba(0,0,0,0.04);
          border: 1px solid rgba(210,100,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(120,40,0,0.13);
        }

        .card-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: linear-gradient(135deg, #7a1a00, #b83200);
          color: #ffd700;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 20px;
          font-family: 'Noto Sans Devanagari', sans-serif;
        }

        /* Person card layout (photo + info side by side) */

        .person-inner {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        @media (max-width: 500px) {
          .person-inner { flex-direction: column; text-align: center; }
        }

        .person-photo-wrap { flex-shrink: 0; position: relative; }

        .person-photo {
          width: 110px; height: 110px;
          border-radius: 50%;
          object-fit: cover;
          object-position: top;
          box-shadow: 0 0 0 3px #ffd700, 0 0 0 6px rgba(180,60,0,0.2), 0 8px 24px rgba(0,0,0,0.2);
        }

        .person-photo-badge {
          position: absolute;
          bottom: 2px; right: 2px;
          background: linear-gradient(135deg, #ffd700, #ff9500);
          border-radius: 50%;
          width: 26px; height: 26px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .person-info h2 {
          font-family: 'Yatra One', serif;
          font-size: clamp(18px, 2.8vw, 24px);
          color: #7a1a00;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .person-role {
          display: inline-block;
          background: linear-gradient(135deg, #fff3e0, #ffe0b2);
          color: #b83200;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          padding: 3px 12px;
          border-radius: 20px;
          margin-bottom: 14px;
          font-family: 'Noto Sans Devanagari', sans-serif;
          border: 1px solid rgba(180,80,0,0.15);
        }

        .call-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #28a745, #1e8e3e);
          color: white;
          padding: 10px 22px;
          border-radius: 30px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          font-family: 'Noto Sans Devanagari', sans-serif;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 4px 14px rgba(40,167,69,0.35);
        }
        .call-btn:hover {
          transform: scale(1.06);
          box-shadow: 0 8px 22px rgba(40,167,69,0.5);
        }

        .phone-number {
          color: #777;
          font-size: 14px;
          margin-top: 8px;
          font-family: 'Noto Sans Devanagari', sans-serif;
          letter-spacing: 0.04em;
        }

        .address-list { list-style: none; padding: 0; margin: 0; }

        .address-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 9px 0;
          border-bottom: 1px dashed rgba(210,100,0,0.15);
          font-size: clamp(14px, 2vw, 17px);
          color: #3a1a00;
          font-family: 'Noto Sans Devanagari', 'Cormorant Garamond', serif;
          line-height: 1.5;
        }
        .address-list li:last-child { border-bottom: none; }

        .address-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffd700, #ff9500);
          flex-shrink: 0;
          margin-top: 7px;
          box-shadow: 0 0 6px rgba(255,150,0,0.5);
        }

        .hours-table { width: 100%; border-collapse: collapse; }
        .hours-table tr { border-bottom: 1px dashed rgba(210,100,0,0.12); }
        .hours-table tr:last-child { border-bottom: none; }
        .hours-table td {
          padding: 10px 6px;
          font-family: 'Noto Sans Devanagari', 'Cormorant Garamond', serif;
          font-size: clamp(13px, 1.8vw, 16px);
          color: #3a1a00;
        }
        .hours-table td:first-child { color: #7a1a00; font-weight: 600; }
        .hours-table td:last-child  { text-align: right; color: #555; }

        .map-frame {
          width: 100%; height: 220px;
          border-radius: 14px;
          border: none;
          margin-top: 4px;
          filter: saturate(0.85) contrast(1.05);
        }

        /* Link to open location in Google Maps */

        .map-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          font-size: 13px;
          color: #b83200;
          font-family: 'Noto Sans Devanagari', sans-serif;
          text-decoration: none;
          font-weight: 600;
          letter-spacing: 0.03em;
          transition: opacity 0.2s;
        }
        .map-link:hover { opacity: 0.75; }

        .person-avatar-fallback {
          width: 110px; height: 110px;
          border-radius: 50%;
          background: linear-gradient(135deg, #b83200, #ffd700);
          display: flex; align-items: center; justify-content: center;
          font-size: 42px;
          box-shadow: 0 0 0 3px #ffd700, 0 0 0 6px rgba(180,60,0,0.2);
        }
      `}</style>

      {/* Page header */}
      <div className="contact-header">
        <button className="lang-toggle" onClick={() => setLang(l => l === "en" ? "hi" : "en")}>
          {t.langToggle}
        </button>
        <div className="contact-header-om">ॐ</div>
        <h1>{t.pageTitle}</h1>
        <p>{t.pageSubtitle}</p>
        <div className="header-ornament">
          <div className="header-ornament-line" />
          <span style={{ color: "#ffd700", fontSize: 18 }}>✦</span>
          <div className="header-ornament-line" />
        </div>
      </div>

      {/* Page content */}
      <div className="contact-body">

        {/* Balusingh Ji Parihar card */}
        <div className="contact-card">
          <div className="card-label">🏵️ {t.presidentTitle}</div>
          <div className="person-inner">
            <div className="person-photo-wrap">
              <PersonPhoto src="/images/people/balusingh.jpg" name={t.presidentName} />
              <div className="person-photo-badge">✦</div>
            </div>
            <div className="person-info">
              <h2>{t.presidentName}</h2>
              <div className="person-role">{t.presidentRole}</div>
              <a href="tel:+919630489809" className="call-btn">
                📞 {t.callBtn}
              </a>
              <p className="phone-number">+91 96304 89809</p>
            </div>
          </div>
        </div>

        {/* Tejulal Yogi card */}
        <div className="contact-card">
          <div className="card-label">🪔 {t.pujariTitle}</div>
          <div className="person-inner">
            <div className="person-photo-wrap">
              <PersonPhoto src="/images/people/tejulal.jpg" name={t.pujariName} />
              <div className="person-photo-badge">🕉️</div>
            </div>
            <div className="person-info">
              <h2>{t.pujariName}</h2>
              <div className="person-role">{t.pujariRole}</div>
            </div>
          </div>
        </div>

        {/* Temple address */}
        <div className="contact-card">
          <div className="card-label">📍 {t.addressTitle}</div>
          <ul className="address-list">
            {t.addressLines.map((line, i) => (
              <li key={i}>
                <div className="address-dot" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Darshan timings */}
        <div className="contact-card">
          <div className="card-label">🕐 {t.hoursTitle}</div>
          <table className="hours-table">
            <tbody>
              {t.hours.map((h, i) => (
                <tr key={i}>
                  <td>{h.label}</td>
                  <td>{h.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Google Maps embed */}
        <div className="contact-card" style={{ gridColumn: "1 / -1" }}>
          <div className="card-label">🗺️ {t.mapTitle}</div>
          <iframe
            className="map-frame"
            style={{ height: 300 }}
            title="Temple Location"
            src={MAP_EMBED}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href="https://www.google.com/maps/place/Nag+Dev+Mata+Kheda+Mandir+Tukral+Tarana+Ujjain/@23.4633921,75.920818,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            📌 {lang === "en" ? "Open in Google Maps →" : "गूगल मैप में खोलें →"}
          </a>
        </div>

      </div>
    </div>
  );
}

/* Shows person photo, falls back to emoji if image missing */

function PersonPhoto({ src, name }) {
  const [err, setErr] = useState(false);
  if (err) {
    return <div className="person-avatar-fallback">🙏</div>;
  }
  return (
    <img
      src={src}
      alt={name}
      className="person-photo"
      onError={() => setErr(true)}
    />
  );
}
