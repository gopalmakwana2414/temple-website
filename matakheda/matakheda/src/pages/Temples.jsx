import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

export default function Temples() {
  const [headRef, headVis] = useReveal();

  const temples = [
    {
      name: "Lal Mata Mandir",
      image: "/images/lal mata/lalMata3.jpg",
      link: "/temples/lal-mata-mandir",
    },
    {
      name: "Bhagwan Devnarayan Mandir",
      image: "/images/devnarayan mandir/devnarayan3.jpg",
      link: "/temples/devnarayan-mandir",
    },
  ];

  return (
    <div className="min-h-screen py-16" style={{
      background: "linear-gradient(160deg, #fff8ee 0%, #fdf0d8 50%, #fef6e8 100%)",
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&display=swap');

        @keyframes tpl-head-in {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tpl-card-in {
          from { opacity: 0; transform: translateY(36px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes tpl-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }

        .tpl-heading {
          font-family: 'Yatra One', serif;
          font-size: clamp(28px, 5vw, 48px);
          text-align: center;
          margin-bottom: 48px;
          background: linear-gradient(135deg, #8a2200, #c85000, #ffd700, #c85000);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: tpl-shimmer 4s linear infinite;
          letter-spacing: 0.04em;
        }
        .tpl-heading.vis {
          animation: tpl-head-in 0.8s ease both, tpl-shimmer 4s linear 0.8s infinite;
        }

        .tpl-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 6px 28px rgba(160, 80, 0, 0.1);
          border: 1px solid rgba(200, 120, 0, 0.1);
          cursor: pointer;
          opacity: 0;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.4s ease,
                      border-color 0.3s ease;
        }
        .tpl-card.vis {
          animation: tpl-card-in 0.7s ease both;
          opacity: 1;
        }
        .tpl-card:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 18px 48px rgba(160, 80, 0, 0.2);
          border-color: rgba(200, 120, 0, 0.35);
        }

        .tpl-img-wrap {
          overflow: hidden;
          height: 300px;
          position: relative;
        }
        .tpl-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(120,40,0,0.35) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .tpl-card:hover .tpl-img-wrap::after {
          opacity: 1;
        }

        .tpl-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .tpl-card:hover .tpl-img {
          transform: scale(1.07);
        }

        .tpl-name {
          font-size: 24px;
          font-weight: 600;
          padding: 20px;
          text-align: center;
          color: #7a2800;
          transition: color 0.3s ease;
        }
        .tpl-card:hover .tpl-name {
          color: #c05000;
        }
      `}</style>

      {/* Page heading */}
      <h1
        ref={headRef}
        className={`tpl-heading ${headVis ? "vis" : ""}`}
      >
        Nearby Temples
      </h1>

      {/* Temple cards */}
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto px-6">
        {temples.map((temple, index) => (
          <TempleCard key={index} temple={temple} delay={index * 150} />
        ))}
      </div>

    </div>
  );
}

function TempleCard({ temple, delay }) {
  const [ref, vis] = useReveal();
  return (
    <Link to={temple.link}>
      <div
        ref={ref}
        className={`tpl-card ${vis ? "vis" : ""}`}
        style={{ animationDelay: vis ? `${delay}ms` : "0ms" }}
      >
        <div className="tpl-img-wrap">
          <img src={temple.image} className="tpl-img" alt={temple.name} />
        </div>
        <h2 className="tpl-name">{temple.name}</h2>
      </div>
    </Link>
  );
}
