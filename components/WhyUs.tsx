import React from "react";
import { ShieldCheck, Clock, Star, Truck, Users, Award } from "lucide-react";
import { useTranslation } from "../contexts/TranslationContext";

const reasons = [
  {
    icon: <ShieldCheck color="#f47b20" size={32} />,
    titleKey: "whyus_title_1",
    descKey: "whyus_desc_1",
  },
  {
    icon: <Clock color="#f47b20" size={32} />,
    titleKey: "whyus_title_2",
    descKey: "whyus_desc_2",
  },
  {
    icon: <Star color="#f47b20" size={32} />,
    titleKey: "whyus_title_3",
    descKey: "whyus_desc_3",
  },
  {
    icon: <Truck color="#f47b20" size={32} />,
    titleKey: "whyus_title_4",
    descKey: "whyus_desc_4",
  },
  {
    icon: <Users color="#f47b20" size={32} />,
    titleKey: "whyus_title_5",
    descKey: "whyus_desc_5",
  },
  {
    icon: <Award color="#f47b20" size={32} />,
    titleKey: "whyus_title_6",
    descKey: "whyus_desc_6",
  },
];

const WhyUs: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section
      className="why-us-section"
      id="whyus"
      style={{
        background: '#181818',
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
          {t("Miért válassz minket?")}
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
                  {t(item.titleKey)}
                </div>
                <div style={{ fontSize: '1.01rem', color: '#e0e0e0', lineHeight: 1.5 }}>
                  {t(item.descKey)}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Mobile: stack rows below 600px */}
        <style>{`
          @media (max-width: 600px) {
            .whyus-grid {
              grid-template-columns: 1fr !important;
              gap: 1.1rem !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default WhyUs;
