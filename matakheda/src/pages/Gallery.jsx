import React, { useState } from "react";

export default function Gallery() {

  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    "/images/nature/nature12.jpg",
    "/images/nature/nature13.jpg",
    "/images/tejadashami/mela1.jpg",
    "/images/stoneGod/stoneGod1.jpg",
    "/images/nagdevta/nagdevta2.jpg",
    "/images/chhapan bhog matakheda/chppan_bhog3.jpg",
    "/images/events/event1.jpg",
    "/images/events/event2.jpg",
    "/images/events/event3.jpg",
    "/images/nature/nature10.jpg",
    "/images/yagyashala/yagyaShala3.jpg",
    "/images/nagpanchami/nagpanchami2.jpg",
    "/images/events/event5.jpg",
    "/images/tejadashami/mela10.jpg",
    "/images/events/event6.jpg",
    "/images/events/event7.jpg",
    "images/stoneGod/stoneGod2.jpg",
    "/images/tejadashami/mela7.jpg",
    "/images/nature/nature6.jpg",
    "/images/events/event8.jpg",
    "/images/mandir/templeFront2.jpg",
    "/images/nature/nature11.jpg",
    "/images/mandir/temple3.jpg",
    "/images/events/event9.jpg",
    "/images/tejadashami/mela6.jpg",
    "/images/events/event10.jpg",
    "/images/yagyashala/2.png",
    "/images/mandir/temple13.jpg",
    
    
  ];

  const visibleImages = showAll ? images : images.slice(0,7);

  return (
    <section className="relative py-24 overflow-hidden">

      {/* Page background */}

      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 animate-gradient"></div>

      {/* Glow effects */}

      <div className="absolute top-20 left-20 w-72 h-72 bg-orange-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-red-400/30 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Page heading */}

        <div className="text-center mb-16">

          <h2 className="text-5xl md:text-6xl font-bold text-red-700 mb-6">
            Temple Gallery
          </h2>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore photos of Matakheda Mandir Tukral.
          </p>

        </div>

        {/* Grid of photos */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {visibleImages.map((img,index)=>(
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group"
              onClick={()=>setSelectedImage(img)}
            >

              <img
                src={img}
                alt="Temple"
                className="w-full h-60 object-cover transform group-hover:scale-110 transition duration-700"
              />

              {/* Overlay shown when hovering a photo */}

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>

            </div>
          ))}

          {/* Card showing total image count */}

          {!showAll && images.length > 7 && (

            <div
              onClick={()=>setShowAll(true)}
              className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 text-white text-3xl font-bold cursor-pointer shadow-xl hover:scale-105 transition"
            >

              +{images.length - 7}

            </div>

          )}

        </div>

      </div>

      {/* Fullscreen photo preview */}

      {selectedImage && (

        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={()=>setSelectedImage(null)}
        >

          <img
            src={selectedImage}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
          />

        </div>

      )}

    </section>
  );
}