import React from "react";
import { Quote, Star } from "lucide-react";
import { useTranslation } from "../contexts/TranslationContext";

const testimonials = [
  {
    nameKey: "testimonial_name_1",
    cityKey: "testimonial_city_1",
    textKey: "testimonial_text_1",
    rating: 5,
  },
  {
    nameKey: "testimonial_name_2",
    cityKey: "testimonial_city_2",
    textKey: "testimonial_text_2",
    rating: 5,
  },
  {
    nameKey: "testimonial_name_3",
    cityKey: "testimonial_city_3",
    textKey: "testimonial_text_3",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="testimonials-section" id="testimonials" style={{ background: '#181818', color: '#fff', padding: '3rem 0', borderRadius: '1rem', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', margin: '0', maxWidth: '100vw' }}>
      <div className="container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
        <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '2.2rem', textAlign: 'center', fontWeight: 800, letterSpacing: '-1px' }}>
          {t("testimonial_section_title")}
        </h2>
        <div className="testimonials-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '2.2rem', justifyContent: 'center' }}>
          {testimonials.map((item, idx) => (
            <div key={idx} className="testimonial-card" role="article" aria-label={`Vélemény: ${t(item.nameKey)}, ${t(item.cityKey)}`} style={{ background: '#23262e', borderRadius: '1.2rem', boxShadow: '0 2px 16px rgba(0,0,0,0.13)', padding: '2rem 1.5rem', minWidth: 260, maxWidth: 340, flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', transition: 'transform 0.18s, box-shadow 0.18s', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.04)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(244,123,32,0.13)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.13)'; }}>
              <div style={{ position: 'absolute', top: 18, left: 18 }}><Quote color="#f47b20" size={22} /></div>
              <div style={{ width: 54, height: 54, borderRadius: '50%', marginBottom: 14, border: '2.5px solid #f47b20', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star color="#f47b20" size={32} fill="#f47b20" />
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.08rem', marginBottom: 6, color: '#fff' }}>{t(item.nameKey)} <span style={{ color: '#ffb86c', fontWeight: 400, fontSize: '0.98rem' }}>– {t(item.cityKey)}</span></div>
              {/* Example usage for translated 'Időpontfoglalás' if needed: <span>{t('booking_button')}</span> */}
              <div style={{ fontSize: '1rem', color: '#e0e0e0', marginBottom: 10, minHeight: 60 }}>{t(item.textKey)}</div>
              <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
                {[...Array(item.rating)].map((_, i) => <Star key={i} color="#f47b20" size={18} fill="#f47b20" />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
