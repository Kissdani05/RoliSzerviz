import React from "react";
import { useTranslation } from "../contexts/TranslationContext";

const ContactSection = React.forwardRef<HTMLElement>((props, ref) => {
  const { t } = useTranslation();
  return (
    <section ref={ref} className="contact-section" style={{ background: '#181818', color: '#fff', padding: '2.5rem 0 2.5rem 0', borderRadius: '1rem', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', margin: '0 0 4.5rem 0', maxWidth: '100vw' }}>
      <div className="container" style={{ maxWidth: 700, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '1.2rem', fontWeight: 800, letterSpacing: '-1px' }}>{t('Kapcsolat')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '1.08rem', fontWeight: 500 }}>
            <span style={{ color: '#f47b20', fontWeight: 700 }}>{t('Telefonszám')}:</span> <a href="tel:+36204068055" style={{ color: '#fff', textDecoration: 'underline' }}>+36 20 406 8055</a>
          </div>
          <div style={{ fontSize: '1.08rem', fontWeight: 500 }}>
            <span style={{ color: '#f47b20', fontWeight: 700 }}>{t('Email')}:</span> <a href="mailto:roliszervizdebrecen@gmail.com" style={{ color: '#fff', textDecoration: 'underline' }}>roliszervizdebrecen@gmail.com</a>
          </div>
          <div style={{ fontSize: '1.08rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#f47b20', fontWeight: 700 }}>{t('Messenger')}:</span>
            <a href="https://m.me/Roliszerviz.huDebrecen/" target="_blank" rel="noopener noreferrer" aria-label="Messenger üzenet küldése">
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#0084FF"/>
                <g>
                  <g transform="translate(-0.5,-1.5)">
                    <path d="M23 12c-1.5-1.5-3.5-2.5-7-2.5-5 0-8.5 3.7-8.5 8.2 0 2.5 1 4.5 2.7 6l-0.6 2.2c-0.1 0.4 0.3 0.8 0.7 0.7l2.3-0.7c1.2 0.3 2.4 0.5 3.7 0.5 5 0 8.5-3.7 8.5-8.2 0-2.1-0.8-4-2.3-5.2z" fill="#fff"/>
                    <g transform="translate(-1.2,1.2)">
                      <path d="M13.5 19.5l2.2-3.7c0.2-0.3 0.6-0.4 0.9-0.2l2.1 1.3c0.2 0.1 0.5 0.1 0.7-0.1l2.7-2.2c0.3-0.2 0.7 0.1 0.6 0.5l-2.2 3.7c-0.2 0.3-0.6 0.4-0.9 0.2l-2.1-1.3c-0.2-0.1-0.5-0.1-0.7 0.1l-2.7 2.2c-0.3 0.2-0.7-0.1-0.6-0.5z" fill="#39B1FF"/>
                    </g>
                  </g>
                </g>
              </svg>
            </a>
          </div>
          <div style={{ fontSize: '1.08rem', fontWeight: 500, marginBottom: 12 }}>
        <div style={{ marginBottom: '1.5rem', fontWeight: 700, color: '#ffb86c', fontSize: '1.08rem' }}>{t('no_walkin_notice')}</div>
            <span style={{ color: '#f47b20', fontWeight: 700 }}>{t('Helyszín')}:</span> Debrecen, Csáthy u. 44. Magyarország
          </div>
          <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}>
           <iframe
  title="RoliSzerviz helyszín - Google Térkép"
  src="https://www.google.com/maps?q=roliszerviz.hu&output=embed"
  width="100%"
  height="260"
  style={{ border: 0 }}
  allowFullScreen={true}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
          </div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";
export default ContactSection;
