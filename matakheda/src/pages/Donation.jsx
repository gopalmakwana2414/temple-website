import { useState, useRef } from "react";

const TEMPLE_NAME    = "Matakheda Mandir Tukral";
const TEMPLE_NAME_HI = "माँ नवदुर्गा नागदेव मंदिर माताखेड़ा टुकराल";
const UPI_ID         = "gopalmakwana98765-1@okicici";
const API_BASE       = "https://temple-website-production.up.railway.app"; // update this URL when the site goes live

function generateDonationID() {
  return "DON" + Math.floor(100000 + Math.random() * 900000);
}

function formatDate(d) {
  return d.toLocaleString("hi-IN", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

async function buildReceiptDataURL({ donationID, name, address, mobile, amount, txnID, date }) {
  const W = 600, H = 460;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#fff8f0");
  grad.addColorStop(1, "#fff3e0");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "#e65100";
  ctx.lineWidth = 6;
  ctx.strokeRect(12, 12, W - 24, H - 24);
  ctx.strokeStyle = "#ff9800";
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, W - 40, H - 40);

  ctx.fillStyle = "#e65100";
  ctx.fillRect(12, 12, W - 24, 48);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 18px serif";
  ctx.textAlign = "center";
  ctx.fillText("॥ माँ नवदुर्गा नागदेव मंदिर माताखेड़ा टुकराल ॥", W / 2, 44);

  ctx.fillStyle = "#bf360c";
  ctx.font = "bold 15px serif";
  ctx.fillText("दान रसीद — Donation Receipt", W / 2, 90);

  ctx.strokeStyle = "#ff9800";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(40, 100); ctx.lineTo(W - 40, 100); ctx.stroke();

  const rows = [
    ["दान आईडी",       donationID],
    ["नाम",            name],
    ["पता / Address",  address],
    ["मोबाइल",         mobile],
    ["दान राशि",       `₹ ${Number(amount).toLocaleString("en-IN")}`],
    ["Transaction ID", txnID],
    ["दिनांक / Date",  date],
  ];

  ctx.textAlign = "left";
  rows.forEach(([label, value], i) => {
    const y = 128 + i * 36;
    ctx.fillStyle = "#e65100";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText(label + " :", 50, y);
    ctx.fillStyle = "#1a1a1a";
    ctx.font = "13px sans-serif";
    ctx.fillText(value, 210, y);
    ctx.strokeStyle = "#ffe0b2";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(50, y + 6); ctx.lineTo(W - 50, y + 6); ctx.stroke();
  });

  ctx.fillStyle = "#e65100";
  ctx.font = "bold 14px serif";
  ctx.textAlign = "center";
  ctx.fillText("🙏  जय हो श्री माताखेड़ा सरकार की 🙏", W / 2, H - 40);
  ctx.fillStyle = "#888";
  ctx.font = "11px sans-serif";
  ctx.fillText("दान को लेकर आप निश्चिंत रहें, आपके द्वारा दी गई सेवा राशि सीधे मंदिर तक पहुंच जाएगी।", W / 2, H - 22);

  return canvas.toDataURL("image/png");
}

function downloadImage(dataURL, filename) {
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = filename;
  a.click();
}

export default function Donation() {
  const [name,      setName]      = useState("");
  const [address,   setAddress]   = useState("");
  const [mobile,    setMobile]    = useState("");
  const [amount,    setAmount]    = useState("");
  const [txnID,     setTxnID]     = useState("");
  const [donationID]              = useState(generateDonationID);
  const [date]                    = useState(() => formatDate(new Date()));
  const [step,      setStep]      = useState(1);
  const [errors,    setErrors]    = useState({});
  const [receiptImg, setReceiptImg] = useState(null);
  const [saving,    setSaving]    = useState(false);
  const [saveError, setSaveError] = useState("");
  const receiptRef = useRef(null);

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(TEMPLE_NAME)}&am=${amount}&cu=INR`;
  const qrURL   = amount
    ? `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiLink)}&margin=10&color=8B2500&bgcolor=FFF8F0`
    : null;

  const presets = [51, 101, 251, 501, 1001, 2101, 5101, 11111];

  /* Form validation before moving to next step */

  function validateStep1() {
    const e = {};
    if (!name.trim())                       e.name    = "कृपया अपना नाम लिखें";
    if (!address.trim())                    e.address = "कृपया पता लिखें";
    if (!/^[6-9]\d{9}$/.test(mobile.trim())) e.mobile  = "कृपया सही मोबाइल नंबर लिखें";
    if (!amount || Number(amount) < 1)      e.amount  = "कृपया सही राशि लिखें";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e = {};
    if (!txnID.trim()) e.txnID = "Transaction ID जरूरी है";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  /* Save donation to database then show receipt */

  async function handleGenerateReceipt() {
    if (!validateStep2()) return;
    setSaving(true);
    setSaveError("");
    try {
      /* Save to database first */

      const res = await fetch(`${API_BASE}/api/donation`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donationID, name, address, mobile, amount, txnID }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Server error");
      }

      /* Generate the receipt image */

      const dataURL = await buildReceiptDataURL({ donationID, name, address, mobile, amount, txnID, date });
      setReceiptImg(dataURL);
      setStep(3);
      setTimeout(() => receiptRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

    } catch (err) {
      setSaveError("डेटा सहेजने में समस्या हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setSaving(false);
    }
  }

  function handleDownload() {
    if (receiptImg) downloadImage(receiptImg, `daan-receipt-${donationID}.png`);
  }

  const inputClass = (field) =>
    `w-full border-2 ${errors[field] ? "border-red-400" : "border-orange-200"} rounded-xl px-4 py-3 text-base focus:outline-none focus:border-orange-500 bg-orange-50 transition`;

  return (
    <div style={{ fontFamily: "'Noto Sans Devanagari', 'Segoe UI', sans-serif" }}
      className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">

      {/* Page header */}
      <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-amber-600 text-white py-8 px-4 text-center shadow-lg">
        <div className="text-4xl mb-2">🕉️</div>
        <h1 className="text-3xl font-bold tracking-wide">{TEMPLE_NAME_HI}</h1>
        <p className="text-orange-200 mt-1 text-sm">ग्राम टुकराल • ऑनलाइन दान सेवा</p>
        <div className="flex justify-center gap-6 mt-4 text-orange-100 text-xs">
          <span className={`px-3 py-1 rounded-full ${step >= 1 ? "bg-white text-orange-700 font-bold" : "bg-orange-500"}`}>① विवरण</span>
          <span className={`px-3 py-1 rounded-full ${step >= 2 ? "bg-white text-orange-700 font-bold" : "bg-orange-500"}`}>② भुगतान</span>
          <span className={`px-3 py-1 rounded-full ${step >= 3 ? "bg-white text-orange-700 font-bold" : "bg-orange-500"}`}>③ रसीद</span>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8 space-y-6">

        {/* Step 1 - Donor fills name, address, mobile, amount */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-orange-100">
            <h2 className="text-xl font-bold text-orange-700 mb-5 text-center">दान विवरण भरें</h2>

            {/* Donor name field */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">आपका नाम *</label>
              <input className={inputClass("name")} placeholder="अपना नाम लिखें"
                value={name} onChange={e => setName(e.target.value)} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Donor address field */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">पता (गाँव / शहर) *</label>
              <input className={inputClass("address")} placeholder="अपना पता लिखें"
                value={address} onChange={e => setAddress(e.target.value)} />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            {/* Donor mobile number */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">मोबाइल नंबर *</label>
              <input className={inputClass("mobile")} placeholder="10 अंकों का मोबाइल नंबर"
                value={mobile} onChange={e => /^[0-9]*$/.test(e.target.value) && mobile.length <= 9
                  ? setMobile(e.target.value)
                  : setMobile(e.target.value.slice(0, 10))}
                maxLength={10} type="tel" />
              {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
            </div>

            {/* Donation amount */}
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">दान राशि (₹) *</label>
              <input className={inputClass("amount")} placeholder="राशि लिखें"
                value={amount} onChange={e => /^[0-9]*$/.test(e.target.value) && setAmount(e.target.value)} />
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
            </div>

            {/* Quick amount buttons like 51, 101, 501 */}
            <div className="flex flex-wrap gap-2 mb-5 mt-3">
              {presets.map(p => (
                <button key={p} onClick={() => setAmount(String(p))}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold border-2 transition
                    ${amount === String(p)
                      ? "bg-orange-600 text-white border-orange-600"
                      : "bg-orange-50 text-orange-700 border-orange-300 hover:bg-orange-100"}`}>
                  ₹{p}
                </button>
              ))}
            </div>

            <button onClick={() => validateStep1() && setStep(2)}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-3.5 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition">
              आगे बढ़ें →
            </button>
          </div>
        )}

        {/* Step 2 - QR code and UPI payment */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-orange-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-orange-700">भुगतान करें</h2>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                  ₹{Number(amount).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex flex-col items-center mb-5">
                <p className="text-sm text-gray-500 mb-3">📷 QR कोड स्कैन करें</p>
                {qrURL && (
                  <div className="p-3 border-4 border-orange-200 rounded-xl bg-orange-50">
                    <img src={qrURL} alt="UPI QR Code" className="w-48 h-48" />
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-2">UPI ID: {UPI_ID}</p>
              </div>

              <a href={upiLink}
                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold text-base shadow transition mb-3">
                <span>📱</span> UPI App से Pay करें
              </a>
              <p className="text-center text-xs text-gray-400 mb-1">(PhonePe / GPay / Paytm / BHIM)</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-orange-100">
              <h3 className="font-bold text-gray-800 mb-3">✅ भुगतान के बाद</h3>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Transaction ID *</label>
              <input className={inputClass("txnID")} placeholder="जैसे: T2506121234567890"
                value={txnID} onChange={e => setTxnID(e.target.value)} />
              {errors.txnID && <p className="text-red-500 text-xs mt-1">{errors.txnID}</p>}
              <p className="text-xs text-gray-400 mt-1 mb-4">पेमेंट के बाद UPI ऐप में Transaction ID / UTR मिलती है</p>

              {saveError && (
                <p className="text-red-500 text-sm text-center mb-3">{saveError}</p>
              )}

              <button
                onClick={handleGenerateReceipt}
                disabled={saving}
                className={`w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-3.5 rounded-xl font-bold text-lg shadow-md transition
                  ${saving ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg"}`}>
                {saving ? "⏳ सहेजा जा रहा है..." : "🧾 रसीद बनाएं"}
              </button>

              <button onClick={() => setStep(1)}
                className="w-full mt-3 text-orange-600 text-sm font-semibold underline">
                ← वापस जाएं
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Show and download receipt */}
        {step === 3 && receiptImg && (
          <div ref={receiptRef} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 py-4 px-6 text-white text-center">
              <div className="text-2xl mb-1">✅</div>
              <h2 className="text-xl font-bold">दान सफलतापूर्वक हुआ!</h2>
              <p className="text-green-100 text-sm">आपकी रसीद तैयार है</p>
            </div>

            <div className="p-4">
              <img src={receiptImg} alt="Receipt" className="w-full rounded-xl border border-orange-100 shadow" />
            </div>

            <div className="px-6 pb-6 space-y-3">
              <button onClick={handleDownload}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 rounded-xl font-bold text-base shadow hover:shadow-lg transition">
                ⬇️ रसीद डाउनलोड करें (PNG)
              </button>
              <button onClick={() => {
                setStep(1); setName(""); setAddress(""); setMobile("");
                setAmount(""); setTxnID(""); setReceiptImg(null); setErrors({});
              }}
                className="w-full border-2 border-orange-400 text-orange-600 py-3 rounded-xl font-semibold text-base hover:bg-orange-50 transition">
                🔄 नया दान करें
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 pb-4">
          🙏 जय हो श्री माताखेड़ा सरकार की 🙏
        </p>
      </div>
    </div>
  );
}
