
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "Milyen típusú elektromos rollereket javít a RoliSzerviz Debrecenben?",
    answer:
      "A RoliSzerviz Debrecenben minden népszerű márkájú elektromos rollert javít, beleértve a Xiaomi, Segway-Ninebot, Kugoo, Kaabo, Joyor, és egyéb típusokat is. Forduljon hozzánk bármilyen rollerrel, szakszerű segítséget nyújtunk!",
  },
  {
    question: "Mennyi idő alatt készül el az elektromos roller szervizelése?",
    answer:
      "A legtöbb javítás 1-3 munkanapon belül elkészül, de a pontos időt a hiba és az alkatrész-ellátottság is befolyásolja. A háztól-házig szerviznek köszönhetően Önnek nem kell sorban állnia!",
  },
  {
    question: "Vállalnak gumicserét vagy defekt javítást elektromos rolleren?",
    answer:
      "Igen, a RoliSzerviz egyik leggyakoribb szolgáltatása a gumicsere és defekt javítás elektromos rollereken. Gyorsan, szakszerűen, minőségi anyagokkal dolgozunk.",
  },
  {
    question: "Hogyan tudok időpontot foglalni elektromos roller szervizre?",
    answer:
      "Időpontot online a weboldalon keresztül, vagy telefonon is foglalhat. A foglalás után kollégánk felveszi Önnel a kapcsolatot a részletek egyeztetése érdekében.",
  },
  {
    question: "Mennyibe kerül a háztól-házig szerviz Debrecenben?",
    answer:
      "A háztól-házig szerviz alapdíja Debrecen területén 3.000 Ft, amely tartalmazza a roller szállítását oda-vissza. A pontos árakért tekintse meg árlistánkat!",
  },
  {
    question: "Javítanak elektromos kerékpárt is, vagy csak rollert?",
    answer:
      "Igen, szervizünk elektromos kerékpárok javítását is vállalja Debrecenben. Kérjen ajánlatot vagy időpontot elérhetőségeinken!",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
      {faqData.map((item, idx) => (
        <div
          key={idx}
          className="faq-item"
          style={{
            background: '#23262e',
            borderRadius: '1.1rem',
            boxShadow: '0 2px 16px rgba(0,0,0,0.13)',
            padding: '0.2rem 1.2rem',
            transition: 'box-shadow 0.18s',
            border: openIndex === idx ? '1.5px solid #f47b20' : '1.5px solid transparent',
          }}
        >
          <button
            className="faq-question"
            onClick={() => toggle(idx)}
            aria-expanded={openIndex === idx}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-color)',
              fontWeight: 700,
              fontSize: '1.13rem',
              width: '100%',
              textAlign: 'left',
              padding: '1.1rem 0',
              cursor: 'pointer',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ flex: 1 }}>{item.question}</span>
            <span style={{ transition: 'transform 0.2s', transform: openIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              <ChevronDown color={openIndex === idx ? '#f47b20' : '#fff'} size={22} />
            </span>
          </button>
          <div
            className="faq-answer"
            style={{
              color: '#e0e0e0',
              padding: openIndex === idx ? '0 0 1.1rem 0' : '0',
              fontSize: '1.01rem',
              maxHeight: openIndex === idx ? 300 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.25s cubic-bezier(0.4,0,0.2,1)',
              opacity: openIndex === idx ? 1 : 0,
            }}
          >
            {openIndex === idx && (
              <div style={{ paddingTop: 2 }}>{item.answer}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
