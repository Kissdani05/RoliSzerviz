import React from "react";
import { Disc, Lock, BatteryCharging, Zap, Wrench, Settings2 } from "lucide-react";
import { useTranslation } from "../contexts/TranslationContext";

const services = [
  {
    icon: <Disc color="#f47b20" size={32} />,
    titleKey: "service_title_1",
    descKey: "service_desc_1",
  },
  {
    icon: <Lock color="#f47b20" size={32} />,
    titleKey: "service_title_2",
    descKey: "service_desc_2",
  },
  {
    icon: <BatteryCharging color="#f47b20" size={32} />,
    titleKey: "service_title_3",
    descKey: "service_desc_3",
  },
  {
    icon: <Zap color="#f47b20" size={32} />,
    titleKey: "service_title_4",
    descKey: "service_desc_4",
  },
  {
    icon: <Wrench color="#f47b20" size={32} />,
    titleKey: "service_title_5",
    descKey: "service_desc_5",
  },
  {
    icon: <Settings2 color="#f47b20" size={32} />,
    titleKey: "service_title_6",
    descKey: "service_desc_6",
  },
];

const ServiceCards: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="services-section" id="services" style={{ background: '#181818', color: '#fff', padding: '2.5rem 0', margin: '0', borderRadius: '0.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', maxWidth: '100vw' }}>
      <div className="container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
        <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 700 }}>{t("Szolgáltatásaink részletesen")}</h2>
        <div className="services-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          {services.map((item, idx) => (
            <div key={idx} className="service-card" style={{ background: '#23262e', borderRadius: '0.7rem', padding: '1.2rem 1.3rem', flex: '1 1 260px', minWidth: 220, maxWidth: 300, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'transform 0.2s', cursor: 'default' }}>
              <div style={{ marginBottom: 12 }}>{item.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 8 }}>{t(item.titleKey)}</div>
              <div style={{ fontSize: '1rem', color: '#e0e0e0' }}>{t(item.descKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
