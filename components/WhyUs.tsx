import React from "react";
import { ShieldCheck, Clock, Star, Truck, Users, Award } from "lucide-react";

const reasons = [
  {
    icon: <ShieldCheck color="#f47b20" size={32} />,
    title: "Biztonság és garancia",
    desc: "Minden javításra garanciát vállalunk, és kizárólag minőségi alkatrészekkel dolgozunk.",
  },
  {
    icon: <Clock color="#f47b20" size={32} />,
    title: "Gyors szerviz, háztól-házig",
    desc: "A rollert otthonodban vesszük át, javítás után vissza is szállítjuk. Időt spórolsz, nincs sorban állás!",
  },
  {
    icon: <Star color="#f47b20" size={32} />,
    title: "Több száz elégedett ügyfél",
    desc: "Debrecen első számú elektromos roller szervize, 500+ sikeres javítás tapasztalattal.",
  },
  {
    icon: <Truck color="#f47b20" size={32} />,
    title: "Kényelmes szállítás, rugalmas időpontok",
    desc: "A szervizautóval Debrecenben és környékén is házhoz megyünk, akár hétvégén is!",
  },
  {
    icon: <Users color="#f47b20" size={32} />,
    title: "Szakértő csapat, barátságos ügyfélszolgálat",
    desc: "Minden kérdésedre segítőkészen válaszolunk, és tanácsot is adunk a karbantartáshoz.",
  },
  {
    icon: <Award color="#f47b20" size={32} />,
    title: "Szinte minden márkát javítunk",
    desc: "Xiaomi, Ninebot, Kugoo, Kaabo, Joyor, és sok más márka – tapasztalat minden típusnál!",
  },
];


const WhyUs: React.FC = () => (
  <section
    className="why-us-section"
    id="whyus"
    style={{
      background: '#181818', // visszaállítva az eredeti sötét háttérre
      color: '#fff',
      padding: '3rem 0',
      margin: '0',
      borderRadius: '1rem',
      boxShadow: '0 6px 32px rgba(0,0,0,0.13)',
      maxWidth: '100vw',
    }}
  >
    <div
      className="container"
      style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}
    >
      <h2
        style={{
          color: 'var(--primary-color)',
          fontSize: '2.2rem',
          marginBottom: '2.2rem',
          textAlign: 'center',
          fontWeight: 800,
          letterSpacing: '-1px',
        }}
      >
        Miért válassz minket?
      </h2>
      <div
        className="whyus-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2.2rem',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        {reasons.map((item, idx) => (
          <div
            key={idx}
            className="whyus-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#23262e',
              borderRadius: '1.2rem',
              boxShadow: '0 2px 16px rgba(0,0,0,0.13)',
              padding: '1.3rem 2rem',
              margin: 0,
              minHeight: 110,
              transition: 'transform 0.18s, box-shadow 0.18s',
              cursor: 'default',
              gap: '1.5rem',
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px) scale(1.025)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(244,123,32,0.13)';
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLDivElement).style.transform = '';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.13)';
            }}
          >
            <div
              style={{
                minWidth: 56,
                minHeight: 56,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f47b20 60%, #ffb86c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 0,
                boxShadow: '0 2px 8px rgba(244,123,32,0.10)',
                transition: 'background 0.18s',
              }}
            >
              {/* Ikon fehér színnel a narancssárga körben */}
              {React.cloneElement(item.icon, { color: '#fff', size: 28 })}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '1.18rem',
                  marginBottom: 6,
                  color: '#fff',
                  letterSpacing: '-0.5px',
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: '1.01rem', color: '#e0e0e0', lineHeight: 1.5 }}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Mobile: stack rows */}
      <style>{`
        @media (max-width: 800px) {
          .whyus-grid {
            grid-template-columns: 1fr;
            gap: 1.3rem;
          }
        }
      `}</style>
    </div>
  </section>
);

export default WhyUs;
