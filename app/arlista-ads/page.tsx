"use client";

import Link from "next/link";

export default function ArlistaAdsPage() {
  return (
    <main className="page-light">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>Roliszerviz – Gyors és megbízható szerviz Debrecenben</h1>
          <p className="subtitle">
            Helyszíni javítás, karbantartás és teljes körű szerviz – azonnali
            időpontfoglalással.
          </p>

          <div className="cta-links">
            <a href="tel:+36204068055" className="cta-link">
              📞 +36 20 406 8055
            </a>
            <a href="#kapcsolat" className="cta-link">
              ✉ Kapcsolatfelvétel
            </a>
            <a href="#foglalas" className="cta-link">
              → Időpontfoglalás
            </a>
          </div>

          <Link href="/" className="back-link">
            ← Vissza a főoldalra
          </Link>
        </div>
      </section>

      {/* Árlista */}
      <section className="pricing-section">
        <div className="container">
          <h2>Árlista</h2>

          <ul className="price-list">
            <li>
              <strong>Háztól házig szerviz alapdíj:</strong>
              <span>3 000 Ft</span>
            </li>

            <li>
              <strong>Gumiszerelés, defektjavítás munkadíj:</strong>
              <span>7 500 Ft -tól</span>
              <small>(anyagdíjat nem tartalmaz)</small>
            </li>

            <li>
              <strong>Fék beállítás munkadíj:</strong>
              <span>5 000 Ft -tól</span>
              <small>(anyagdíjat nem tartalmaz)</small>
            </li>

            <li>
              <strong>Teljes karbantartás, új roller beüzemelés:</strong>
              <span>12 000 Ft</span>
              <small>
                (átvizsgálás, csavarok meghúzása, zsírozás, fék ellenőrzés,
                beállítás, bovdenek ellenőrzése – anyagdíj nélkül)
              </small>
            </li>

            <li>
              <strong>Átvizsgálás, állapotellenőrzés:</strong>
              <span>8 000 Ft</span>
              <small>
                (átvizsgálás, csavarok meghúzása, fék ellenőrzés – anyagdíj
                nélkül)
              </small>
            </li>

            <li>
              <strong>Elektromos hibafeltárás munkadíj (óradíj):</strong>
              <span>8 000 Ft -tól</span>
              <small>(anyagdíjat nem tartalmaz)</small>
            </li>

            <li>
              <strong>Csuklószerkezet beállítás:</strong>
              <span>5 000 Ft -tól</span>
              <small>(anyagdíjat nem tartalmaz)</small>
            </li>

            <li>
              <strong>Csapágycsere munkadíj:</strong>
              <span>8 000 Ft -tól / kerék</span>
              <br />
              <span>Motorkerék: 10 000 Ft -tól</span>
              <small>(anyagdíjat nem tartalmaz)</small>
            </li>

            <li>
              <strong>Gumi defektmentesítés (folyadékkal):</strong>
              <span>3 000 – 6 000 Ft</span>
            </li>

            <li>
              <strong>Alkatrész csere, egyéb javítás (óradíj):</strong>
              <span>8 000 Ft</span>
              <small>(anyagdíjat nem tartalmaz)</small>
            </li>
          </ul>

          <p className="price-note">
            *Az itt feltüntetett árak irányadóak, és nem tartalmazzák az
            esetleg szükséges alkatrészek díját. A javítás megkezdése előtt
            részletes tájékoztatást adunk a várható munkadíjról és
            anyagköltségről. Ha a javítás során újabb hibák merülnek fel,
            azokról minden esetben előzetesen egyeztetünk.
          </p>
        </div>
      </section>

      {/* Időpontfoglalás */}
      <section id="foglalas" className="booking-section">
        <div className="container">
          <h2>Időpontfoglalás</h2>

          <p>
            Kérjük, töltsd ki az alábbi űrlapot – kollégáink rövid időn belül
            felveszik veled a kapcsolatot.
          </p>

          {/* Itt javasolt a BookingModal teljes kódjának áthozása
              inline komponensként, hogy 1/1-ben ugyanaz legyen.
              Mivel ez több száz sor és már megvan a komponensben,
              legegyszerűbb, ha a BookingModal-t külön oldalon is
              megjeleníted, vagy egy új, nem-modalos BookingForm
              komponenst hozol létre ugyanazzal a tartalommal. */}
        </div>
      </section>

      {/* Kapcsolat */}
      <section id="kapcsolat" className="contact-section">
        <div className="container">
          <h2>Kapcsolat</h2>

          <ul className="contact-list">
            <li>
              <strong>Telefon:</strong> +36 20 406 8055
            </li>
            <li>
              <strong>Email:</strong> roliszervizdebrecen@gmail.com
            </li>
            <li>
              <strong>Nyitvatartás:</strong> H–P 9:00–17:00
            </li>
          </ul>

          <div className="maps-box">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.4367093768324!2d21.660250576739827!3d47.534541671183355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8d916d45b73feacf%3A0x1c0ba8522b7e14ad!2sRoliszerviz.hu!5e1!3m2!1shu!2shu!4v1763637537264!5m2!1shu!2shu"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Mini footer */}
      <footer className="mini-footer">
        <a href="/adatkezeles">Adatkezelés</a>
        <a href="/impresszum">Impresszum</a>
        <p>© Roliszerviz</p>
      </footer>
    </main>
  );
}
