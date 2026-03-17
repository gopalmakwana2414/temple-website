import { useState, useEffect, useRef } from "react";

const API_BASE = "https://temple-website-production.up.railway.app";

const LOCATIONS_EN = ["Tukral", "Ghonsla", "Ujjain", "Other"];
const LOCATIONS_HI = ["टुकराल", "घोंसला", "उज्जैन", "अन्य"];

export default function VisitorPopup() {
  const [visible,    setVisible]    = useState(false);
  const [closed,     setClosed]     = useState(false);
  const [lang,       setLang]       = useState("en");
  const [name,       setName]       = useState("");
  const [location,   setLocation]   = useState("");
  const [customLoc,  setCustomLoc]  = useState("");
  const [mobile,     setMobile]     = useState("");
  const [visit,      setVisit]      = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState("");
  const [success,    setSuccess]    = useState(false);
  const timerRef = useRef(null);

  const T = {
    en: {
      toggle: "हिंदी में भरें",
      heading: "Welcome, Devotee",
      subheading: "Please register your visit",
      name: "Your full name *",
      loc: "Select your village / city *",
      customLoc: "Enter your village / city *",
      mob: "Mobile number (optional)",
      visitLbl: "Your visit status *",
      opts: [
        { v: "",         l: "— Select —" },
        { v: "visited",  l: "Already visited the temple" },
        { v: "planning", l: "Planning to visit" },
        { v: "online",   l: "Visiting online only" },
      ],
      submit: "Submit & Continue",
      saving: "Saving...",
      skip: "Skip for now",
      okMsg: "Thank you!",
      okMsg2: "Jay ho Shree Matakheda Sarkar🙏",
      okSub: "Your registration has been saved.",
      okBtn: "Continue to Website",
      reqErr: "Please fill name, location and visit status.",
      netErr: "Could not save. Please try again.",
    },
    hi: {
      toggle: "Fill in English",
      heading: "माताखेड़ा मंदिर टुकराल आपका हार्दिक स्वागत करता है।",
      subheading: "कृपया अपनी यात्रा पंजीकृत करें",
      name: "आपका पूरा नाम *",
      loc: "अपना गाँव/शहर चुनें *",
      customLoc: "अपना गाँव/शहर लिखिए *",
      mob: "मोबाइल नंबर (वैकल्पिक)",
      visitLbl: "आपकी यात्रा स्थिति *",
      opts: [
        { v: "",         l: "— चुनें —" },
        { v: "visited",  l: "मंदिर जा चुका/चुकी हूँ" },
        { v: "planning", l: "जाने की योजना है" },
        { v: "online",   l: "केवल ऑनलाइन दर्शन" },
      ],
      submit: "जमा करें",
      saving: "सहेजा जा रहा है...",
      skip: "अभी छोड़ें",
      okMsg: "धन्यवाद!",
      okMsg2: "जय हो श्री माताखेड़ा सरकार की 🙏",
      okSub: "आपका पंजीकरण सहेज लिया गया।",
      okBtn: "वेबसाइट पर जाएं",
      reqErr: "कृपया नाम, स्थान और स्थिति भरें।",
      netErr: "कुछ गड़बड़ हुई। पुनः प्रयास करें।",
    },
  };
  const t = T[lang];
  const locationOptions = lang === "en" ? LOCATIONS_EN : LOCATIONS_HI;
  const isOther = location === "Other" || location === "अन्य";
  const finalLocation = isOther ? customLoc.trim() : location;

  useEffect(() => {
    if (localStorage.getItem("vp_registered") === "1") return;
    const DELAY = 5000;
    const arrivedAt = localStorage.getItem("vp_arrived");
    if (!arrivedAt) {
      localStorage.setItem("vp_arrived", Date.now().toString());
      timerRef.current = setTimeout(() => setVisible(true), DELAY);
    } else {
      const elapsed = Date.now() - parseInt(arrivedAt, 10);
      if (elapsed >= DELAY) {
        setVisible(true);
      } else {
        timerRef.current = setTimeout(() => setVisible(true), DELAY - elapsed);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, []);

  if (!visible || closed) return null;

  const handleSubmit = async () => {
    setError("");
    if (!name.trim() || !finalLocation || !visit) {
      setError(t.reqErr);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/visitor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          location: finalLocation,
          mobile: mobile.trim() || null,
          visit,
          lang,
        }),
      });
      if (!res.ok) throw new Error();
      localStorage.setItem("vp_registered", "1");
      localStorage.removeItem("vp_arrived");
      setSuccess(true);
    } catch {
      setError(t.netErr);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    localStorage.removeItem("vp_arrived");
    setClosed(true);
  };

  const handleContinue = () => setClosed(true);

  const S = {
    overlay: {
      position: "fixed", inset: 0, zIndex: 99999,
      background: "rgba(8,3,0,0.78)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
    },
    box: {
      background: "#fff", borderRadius: "20px",
      width: "100%", maxWidth: "420px",
      maxHeight: "92vh", overflowY: "auto",
      boxShadow: "0 20px 56px rgba(0,0,0,0.5)",
      fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif",
    },
    head: {
      background: "linear-gradient(135deg,#7a1a00,#b83200)",
      padding: "24px 22px 20px", textAlign: "center",
      position: "relative", borderRadius: "20px 20px 0 0",
    },
    langBtn: {
      position: "absolute", top: "12px", right: "12px",
      background: "rgba(255,215,0,0.14)",
      border: "1px solid rgba(255,215,0,0.38)",
      color: "#ffd700", padding: "4px 11px", borderRadius: "13px",
      fontSize: "11px", cursor: "pointer",
    },
    om:  { fontSize: "24px", color: "#ffd700", opacity: 0.4, marginBottom: "6px" },
    h2:  { fontFamily: "'Yatra One',serif", fontSize: "22px", color: "#ffd700", margin: "0 0 4px", letterSpacing: "0.03em" },
    sub: { color: "rgba(255,210,120,0.7)", fontSize: "13px", margin: 0, fontStyle: "italic" },
    body: { padding: "22px 22px 18px" },
    input: {
      width: "100%", padding: "10px 12px",
      border: "1.5px solid rgba(150,70,0,0.2)", borderRadius: "9px",
      background: "#fffaf3", fontSize: "14px", color: "#2a1000",
      outline: "none", boxSizing: "border-box",
      fontFamily: "'Segoe UI','Noto Sans Devanagari',sans-serif",
      marginBottom: "11px", display: "block",
    },
    label: {
      display: "block", fontSize: "12px", fontWeight: 600,
      color: "rgba(100,45,0,0.55)", marginBottom: "5px",
    },
    select: {
      width: "100%", padding: "10px 12px",
      border: "1.5px solid rgba(150,70,0,0.2)", borderRadius: "9px",
      background: "#fffaf3", fontSize: "14px", color: "#2a1000",
      outline: "none", boxSizing: "border-box", appearance: "none",
      fontFamily: "'Segoe UI','Noto Sans Devanagari',sans-serif",
      marginBottom: "11px", cursor: "pointer",
    },
    error: { color: "#b83200", fontSize: "12px", textAlign: "center", margin: "2px 0 8px" },
    submitBtn: {
      width: "100%", padding: "12px",
      background: "linear-gradient(135deg,#8a2200,#c03800)",
      color: "#fff8e8", border: "none", borderRadius: "10px",
      fontSize: "15px", fontWeight: 600, cursor: "pointer",
      marginTop: "4px", fontFamily: "'Segoe UI','Noto Sans Devanagari',sans-serif",
    },
    skipBtn: {
      display: "block", width: "100%", marginTop: "8px",
      background: "none", border: "none",
      color: "rgba(100,45,0,0.38)", fontSize: "12px",
      cursor: "pointer", padding: "5px", textAlign: "center",
      fontFamily: "'Segoe UI','Noto Sans Devanagari',sans-serif",
    },
    successWrap: { padding: "44px 22px", textAlign: "center" },
    successIcon: { fontSize: "46px", marginBottom: "12px" },
    successH3: { fontFamily: "'Yatra One',serif", fontSize: "21px", color: "#7a1a00", margin: "0 0 8px" },
    successP:  { color: "rgba(100,45,0,0.5)", fontSize: "14px", margin: "0 0 20px", lineHeight: 1.6 },
    continueBtn: {
      background: "linear-gradient(135deg,#8a2200,#c03800)",
      color: "#fff8e8", border: "none",
      padding: "11px 28px", borderRadius: "26px",
      fontSize: "14px", fontWeight: 600, cursor: "pointer",
    },
  };

  return (
    <div style={S.overlay}>
      <div style={S.box}>
        {success ? (
          <div style={S.successWrap}>
            <div style={S.successIcon}>🪔</div>
            <h3 style={S.successH3}>🙏 {t.okMsg}</h3>
            <h3 style={S.successH3}>{t.okMsg2}</h3>
            <p  style={S.successP}>{t.okSub}</p>
            <button style={S.continueBtn} onClick={handleContinue}>{t.okBtn}</button>
          </div>
        ) : (
          <>
            <div style={S.head}>
              <button style={S.langBtn}
                onClick={() => { setLang(l => l === "en" ? "hi" : "en"); setLocation(""); setCustomLoc(""); }}>
                {t.toggle}
              </button>
              <div style={S.om}>ॐ</div>
              <h2 style={S.h2}>{t.heading} 🙏</h2>
              <p  style={S.sub}>{t.subheading}</p>
            </div>

            <div style={S.body}>
              <input style={S.input} placeholder={t.name}
                value={name} onChange={e => setName(e.target.value)} maxLength={80} />

              <label style={S.label}>{t.loc}</label>
              <select style={S.select} value={location}
                onChange={e => { setLocation(e.target.value); setCustomLoc(""); }}>
                <option value="">— {lang === "en" ? "Select" : "चुनें"} —</option>
                {locationOptions.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>

              {isOther && (
                <input style={S.input} placeholder={t.customLoc}
                  value={customLoc} onChange={e => setCustomLoc(e.target.value)} maxLength={80} />
              )}

              <input style={S.input} placeholder={t.mob} type="tel"
                value={mobile} onChange={e => setMobile(e.target.value)} maxLength={15} />

              <label style={S.label}>{t.visitLbl}</label>
              <select style={S.select} value={visit}
                onChange={e => setVisit(e.target.value)}>
                {t.opts.map(o => (
                  <option key={o.v} value={o.v}>{o.l}</option>
                ))}
              </select>

              {error && <p style={S.error}>{error}</p>}

              <button style={{ ...S.submitBtn, opacity: submitting ? 0.55 : 1 }}
                onClick={handleSubmit} disabled={submitting}>
                {submitting ? t.saving : t.submit}
              </button>

              <button style={S.skipBtn} onClick={handleSkip}>{t.skip}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

