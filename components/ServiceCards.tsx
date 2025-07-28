import React from "react";
import { Disc, Lock, BatteryCharging, Zap, Wrench, Settings2 } from "lucide-react";

const services = [
  {
    icon: <Disc color="#f47b20" size={32} />,
    title: "Gumicsere, defektjavítás",
    desc: "Gyors gumicsere, tömlőcsere, defektjavítás Debrecenben, háztól-házig szervizszolgáltatással. Minden típusú elektromos rollerhez!",
  },
  {
    icon: <Lock color="#f47b20" size={32} />,
    title: "Fékjavítás, fékcsere",
    desc: "Fékbetét, fékkar, bowden javítás és csere, fékbeállítás. Biztonságos fékhatás, rövid határidővel!",
  },
  {
    icon: <BatteryCharging color="#f47b20" size={32} />,
    title: "Akkumulátor csere, diagnosztika",
    desc: "Gyorsan merülő vagy hibás akkumulátor cseréje, cellateszt, töltési problémák feltárása. Minőségi akkumulátorok beszerelése!",
  },
  {
    icon: <Zap color="#f47b20" size={32} />,
    title: "Elektromos hibák javítása",
    desc: "Vezérlő, kábelezés, világítás, kijelző, szoftveres hibák diagnosztikája és javítása. Minden márkához!",
  },
  {
    icon: <Wrench color="#f47b20" size={32} />,
    title: "Alkatrész csere, szerelés",
    desc: "Törött, kopott vagy hiányzó alkatrészek pótlása, szerelése. Eredeti és utángyártott alkatrészek beszerzése, beépítése.",
  },
  {
    icon: <Settings2 color="#f47b20" size={32} />,
    title: "Karbantartás, átvizsgálás",
    desc: "Teljes körű karbantartás, szezonális átvizsgálás, csapágyak, csavarok ellenőrzése, szoftverfrissítés. Hosszabb élettartam!",
  },
];

const ServiceCards: React.FC = () => (
  <section className="services-section" id="services" style={{ background: '#181818', color: '#fff', padding: '2.5rem 0', margin: '0', borderRadius: '0.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', maxWidth: '100vw' }}>
    <div className="container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
      <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 700 }}>Szolgáltatásaink részletesen</h2>
      <div className="services-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        {services.map((item, idx) => (
          <div key={idx} className="service-card" style={{ background: '#23262e', borderRadius: '0.7rem', padding: '1.2rem 1.3rem', flex: '1 1 260px', minWidth: 220, maxWidth: 300, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'transform 0.2s', cursor: 'default' }}>
            <div style={{ marginBottom: 12 }}>{item.icon}</div>
            <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 8 }}>{item.title}</div>
            <div style={{ fontSize: '1rem', color: '#e0e0e0' }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServiceCards;
