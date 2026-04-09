import React, { useState } from "react";

export default function HowToReach() {

  const [lang,setLang] = useState("en")

  return (
    <section className="relative py-28 overflow-hidden">

      {/* Page background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fff7ed,#fde68a,#fca5a5)] animate-pulse"></div>

      {/* Decorative floating icons */}

      <div className="absolute top-20 left-16 text-5xl opacity-30 animate-bounce">🚗</div>
      <div className="absolute bottom-24 right-20 text-5xl opacity-30 animate-bounce delay-200">🚌</div>
      <div className="absolute top-40 right-40 text-5xl opacity-30 animate-bounce delay-500">✈️</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* EN/Hindi toggle */}

        <div className="text-right mb-6">

          <button
          onClick={()=>setLang(lang==="en"?"hi":"en")}
          className="bg-red-600 text-white px-5 py-2 rounded-lg"
          >

          {lang==="en" ? "हिंदी में देखें" : "View in English"}

          </button>

        </div>

        {/* Page heading */}

        <div className="text-center mb-20">

          <h2 className="text-5xl md:text-6xl font-bold text-red-700 mb-6">

          {lang==="en" ? "How To Reach" : "यहाँ कैसे पहुँचे"}

          </h2>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto">

          {lang==="en"
          ?
          "Matakheda Mandir Tukral is well connected by road and can be easily reached from major cities in Madhya Pradesh and India."
          :
          "माताखेड़ा मंदिर टुकराल  सड़क मार्ग से अच्छी तरह जुड़ा हुआ है और मध्य प्रदेश तथा भारत के प्रमुख शहरों से आसानी से पहुँचा जा सकता है।"}

          </p>

        </div>

        {/* Cards showing distances from nearby cities */}

        <div className="grid md:grid-cols-4 gap-8 mb-24">

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl text-center hover:scale-105 transition">

            <h3 className="text-2xl font-bold mb-2">
            {lang==="en" ? "Ujjain" : "उज्जैन"}
            </h3>

            <p className="text-lg text-gray-700">36 km</p>

          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl text-center hover:scale-105 transition">

            <h3 className="text-2xl font-bold mb-2">
            {lang==="en" ? "Indore" : "इंदौर"}
            </h3>

            <p className="text-lg text-gray-700">95 km</p>

          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl text-center hover:scale-105 transition">

            <h3 className="text-2xl font-bold mb-2">
            {lang==="en" ? "Bhopal" : "भोपाल"}
            </h3>

            <p className="text-lg text-gray-700">175 km</p>

          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl text-center hover:scale-105 transition">

            <h3 className="text-2xl font-bold mb-2">
            {lang==="en" ? "New Delhi" : "नई दिल्ली"}
            </h3>

            <p className="text-lg text-gray-700">680 km</p>

          </div>

        </div>

        {/* How to reach by bus, train, flight */}

        <div className="grid md:grid-cols-3 gap-10">

          {/* By bus section */}

          <div className="bg-white rounded-3xl p-10 shadow-xl text-center hover:-translate-y-2 transition">

            <div className="text-6xl mb-6">🚌</div>

            <h3 className="text-2xl font-bold mb-4">

            {lang==="en" ? "Bus Service" : "बस सेवा"}

            </h3>

            <p className="text-gray-700 text-lg">

            {lang==="en"
            ?
            "Direct bus connectivity is available from Ujjain and nearby cities. Local buses and private vehicles frequently travel towards the temple."
            :
            "उज्जैन और आसपास के शहरों से सीधे बस की सुविधा उपलब्ध है। स्थानीय बसें और निजी वाहन नियमित रूप से मंदिर तक आते-जाते हैं।"}

            </p>

          </div>

          {/* By train section */}

          <div className="bg-white rounded-3xl p-10 shadow-xl text-center hover:-translate-y-2 transition">

            <div className="text-6xl mb-6">🚆</div>

            <h3 className="text-2xl font-bold mb-4">

            {lang==="en" ? "Railway Station" : "रेलवे स्टेशन"}

            </h3>

            <p className="text-gray-700 text-lg">

            {lang==="en"
            ?
            "The nearest railway station is Ujjain Junction which connects to major cities like Indore, Bhopal and Delhi."
            :
            "सबसे नज़दीकी रेलवे स्टेशन उज्जैन जंक्शन है, जो इंदौर, भोपाल और दिल्ली जैसे प्रमुख शहरों से जुड़ा हुआ है।"}

            </p>

          </div>

          {/* By flight section */}

          <div className="bg-white rounded-3xl p-10 shadow-xl text-center hover:-translate-y-2 transition">

            <div className="text-6xl mb-6">✈️</div>

            <h3 className="text-2xl font-bold mb-4">

            {lang==="en" ? "Airport" : "हवाई अड्डा"}

            </h3>

            <p className="text-gray-700 text-lg">

            {lang==="en"
            ?
            "The nearest airport is Devi Ahilya Bai Holkar Airport in Indore, about 95 km from the temple."
            :
            "सबसे नज़दीकी हवाई अड्डा इंदौर में स्थित देवी अहिल्या बाई होलकर एयरपोर्ट है, जो मंदिर से लगभग 95 किमी दूर है।"}

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
