import React from "react";
import { AlertTriangle, BatteryCharging, Zap, Disc, Lock, Wrench } from "lucide-react";

const issues = [
  {
    icon: <AlertTriangle color="#f47b20" size={32} />, // narancssárga
    title: "A roller nem indul el",
    desc: "A vezérlő, akkumulátor vagy kábelezés hibája is okozhatja. Szervizünk gyorsan feltárja és javítja a problémát!",
  },
  {
    icon: <BatteryCharging color="#f47b20" size={32} />,
    title: "Gyorsan lemerül az akkumulátor",
    desc: "Az akkumulátor elöregedése, cellahiba vagy töltési gond is lehet az ok. Cserét és diagnosztikát is vállalunk!",
  },
  {
    icon: <Lock color="#f47b20" size={32} />,
    title: "Gyenge fékhatás vagy hibás fék",
    desc: "A fékbetét, fékkar vagy bowden hibája veszélyes lehet. Fékjavítás, fékcsere, beállítás a helyszínen!",
  },
  {
    icon: <Disc color="#f47b20" size={32} />,
    title: "Defektet kapott a kerék",
    desc: "A defekt a leggyakoribb hiba. Gyors gumicsere, tömlőcsere, defektjavítás Debrecenben, háztól-házig!",
  },
  {
    icon: <Zap color="#f47b20" size={32} />,
    title: "Furcsa zajok menet közben",
    desc: "Csapágy, motor vagy mechanikai hiba is okozhatja. Szakértő szerelőink gyorsan beazonosítják és javítják!",
  },
  {
    icon: <Wrench color="#f47b20" size={32} />,
    title: "Egyéb hibák, karbantartás",
    desc: "Bármilyen elektromos vagy mechanikus hibát vállalunk, legyen szó karbantartásról, szoftverfrissítésről vagy alkatrészcseréről.",
  },
];

const CommonIssues: React.FC = () => (
  <section className="common-issues-section" id="common-issues" style={{ background: '#181818', color: '#fff', padding: '2.5rem 0', margin: '0', borderRadius: '0.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', maxWidth: '100vw' }}>
    <div className="container" style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem' }}>
      <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 700 }}>Gyakori hibák elektromos rollereknél</h2>
      <div className="issues-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        {issues.map((item, idx) => (
          <div key={idx} className="issue-card" style={{ background: '#23262e', borderRadius: '0.7rem', padding: '1.2rem 1.3rem', flex: '1 1 260px', minWidth: 220, maxWidth: 300, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'transform 0.2s', cursor: 'default' }}>
            <div style={{ marginBottom: 12 }}>{item.icon}</div>
            <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 8 }}>{item.title}</div>
            <div style={{ fontSize: '1rem', color: '#e0e0e0' }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CommonIssues;
