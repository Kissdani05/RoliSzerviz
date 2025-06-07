// Fix: Define Locale and TranslationObject types first, then use them for translations
export type Locale = 'hu' | 'en' | 'de';
export type TranslationObject = { [key: string]: string };

export const translations: Record<Locale, TranslationObject> = {
  hu: {
    // Header
    "ROLI SZERVIZ": "ROLISZERVIZ",
    oldalcim: "RoliSzerviz - Elektromos roller és kerékpár szerviz Debrecenben",
    meta_leiras:
      "Professzionális elektromos roller és kerékpár szerviz Debrecenben. Gyors, megbízható javítás háztól házig szállítással.",
    Webshop: "Webshop",
    Szerviz: "Szerviz",
    // Hero section
    ÜDVÖZLÜNK: "ÜDVÖZLÜNK",
    "A ROLI SZERVIZNÉL!": "A ROLISZERVIZNÉL!",
    "Elektromos roller és kerékpár szerviz Debrecenben":
      "Elektromos roller és kerékpár szerviz Debrecenben",
      "Háztól házig szerviz az alapdíjban!":"Háztól házig szerviz az alapdíjban!",
    "Gyors és professzionális megoldás minden típusú elektromos járműhöz, kényelmes háztól házig szállítással.":
      "Gyors és professzionális megoldás minden típusú elektromos járműhöz, kényelmes háztól házig szállítással.",
    Árlista: "Árlista",
    Időpontfoglalás: "Időpontfoglalás",
    // Testimonials
    // Ügyfeleink véleménye (HU)
    "Ügyfeleink véleménye": "Ügyfeleink véleménye",
    testimonial1: "Gyors precíz és érték arányban is tökéletes.",
    author1: "Zoltán",
    date1: "2025. március",
    testimonial2: "Végtelenül kedves és korrekt cég. A rollerem kopogó hangot adott, amire egy másik szerviz 10e-s javítást ajánlott fel. Viszont a RoliSzerviz házhoz jött, és 5 perc alatt kiderítette, hogy egy kábel csapódik a váznak. És ezért nem is kért pénzt, csak a kiszállási díj felét kellett fizessem. Minden debreceni és környéki elektromos roller tulajdonosnak nagybetűvel AJÁNLOM őket!",
    author2: "József",
    date2: "2025. április",
    testimonial3: "Mindenkinek ajànlom, rugalmasak, segítőkèszek, jó a kommunikàció! Vasàrnap kèpes volt elhozni nekem a rollert,hogy hètfőn azzal menjek dolgozni!",
    author3: "Ferenc",
    date3: "2024. október",
    // Video section
    "Szerelj velunk otthon!": "Szerelj velünk otthon!",
    // Ad Container
    Ajánlatunk: "Ajánlatunk",
    "Most 10% kedvezmény minden szervizre!":
      "Most 10% kedvezmény minden szervizre!",
    Igénylem: "Igénylem",
    // Price Modal
    "Gumiszerelés, defektfajítás": "Gumiszerelés, defektfajítás",
    "(anyagdíjat nem tartalmaz)": "(anyagdíjat nem tartalmaz)",
    "Fék beállítás, szerelés, légtelenítés":
      "Fék beállítás, szerelés, légtelenítés",
    Karbantartás: "Karbantartás",
    "(átvizsgálás, csavarok meghúzása, zsírozás, fék beállítás bovdenek ellenőrzése , stb, anyagdíjat nem tartalmaz)":
      "(átvizsgálás, csavarok meghúzása, zsírozás, fék beállítás bovdenek ellenőrzése , stb, anyagdíjat nem tartalmaz)",
    "Elektromos hibafeltárás, javítás": "Elektromos hibafeltárás, javítás",
    "Csuklószerkezet javítás": "Csuklószerkezet javítás",
    Csapágycsere: "Csapágycsere",
    "kerekenként, (anyagdíjat nem tartalmaz)":
      "kerekenként, (anyagdíjat nem tartalmaz)",
    "Gumi defektmentesítés, defektmentesítő folyadékkal":
      "Gumi defektmentesítés, defektmentesítő folyadékkal",
    "kerekenként (8″ – 29″-os kerékig)": "kerekenként (8″ – 29″-os kerékig)",
    "Alkatrész csere, egyéb javítás óradíj":
      "Alkatrész csere, egyéb javítás óradíj",
    Alapdíj: "Alapdíj",
    "Tartalmazza a háztól házig szerviz kiszállást Debrecen területén.": "Tartalmazza a háztól házig szerviz kiszállást Debrecen területén.",
    // Booking Modal
    Név: "Név",
    "Email cím": "Email cím",
    Telefonszám: "Telefonszám",
    Irányítószám: "Irányítószám",
    "Szállítási cím": "Szállítási cím",
    "Számlázási cím eltér a szállítási címtől":
      "Számlázási cím eltér a szállítási címtől",
    "Számlázási irányítószám": "Számlázási irányítószám",
    "Számlázási cím": "Számlázási cím",
    Szolgáltatások: "Szolgáltatások",
    "Háztól házig szerviz": "Háztól házig szerviz",
    // "Gumiszerelés, defektfajítás" already exists
    "Fék beállítás": "Fék beállítás",
    // "Karbantartás" already exists
    "Elektromos javítás": "Elektromos javítás",
    Egyéb: "Egyéb",
    "Kérjük, írja le, milyen szolgáltatásra van szüksége":
      "Kérjük, írja le, milyen szolgáltatásra van szüksége",
    "Válassz napot": "Válassz napot",
    "Időpont: -tól -ig": "Időpont: -tól -ig",
    "Csak 9:00 és 17:00 között lehet foglalni, minimum 1 óra":
      "Csak 9:00 és 17:00 között lehet foglalni, minimum 1 óra",
    "Üzenet (opcionális)": "Üzenet (opcionális)",
    "Időpont lefoglalása": "Időpont lefoglalása",
    "Város": "Város",
    // Webshop Page
    "Webshopunk hamarosan elérhető lesz": "Webshopunk hamarosan elérhető lesz",
    "Vissza a főoldalra": "Vissza a főoldalra",
    Hamarosan: "Hamarosan",
    Termékeink: "Termékeink", // Added new key
    "Termék neve": "Termék neve", // Added new key
    Kosárba: "Kosárba", // Added new key
    "Ft": "Ft",
    "ft": "Ft",
    "HUF": "HUF",
    "Forint": "Forint",
    "Ár": "Ár",
    "Árak": "Árak",
    "tól": "tól",
    "-ig": "-ig",
    "több": "több",
    "kevesebb": "kevesebb",
  },
  en: {
    // Header
    "ROLI SZERVIZ": "ROLISZERVIZ",
    oldalcim: "RoliSzerviz - Electric scooter and bicycle service in Debrecen",
    meta_leiras:
      "Professional electric scooter and bicycle service in Debrecen. Fast, reliable repair with door-to-door delivery.",
    Webshop: "Webshop",
    Szerviz: "Service",
    // Hero section
    ÜDVÖZLÜNK: "WELCOME",
    "A ROLI SZERVIZNÉL!": "AT ROLISERVICE!",
    "Elektromos roller és kerékpár szerviz Debrecenben":
      "Electric scooter and bicycle service in Debrecen",
    "Háztól házig szerviz az alapdíjban!": "Door-to-door service included in the base fee!",
    "Gyors és professzionális megoldás minden típusú elektromos járműhöz, kényelmes háztól házig szállítással.":
      "Fast and professional solution for all types of electric vehicles, with convenient door-to-door delivery.",
    Árlista: "Price List",
    Időpontfoglalás: "Book Appointment",
    // Testimonials
    "Ügyfeleink véleménye": "Customer Reviews",
    testimonial1: "Fast, precise, and perfect value for money.",
    author1: "Zoltán",
    date1: "March 2025",
    testimonial2: "Extremely kind and fair company. My scooter made a knocking sound, for which another service offered a 10,000 HUF repair. But RoliSzerviz came to my house and in 5 minutes found that a cable was hitting the frame. And they didn't even charge for this, I only had to pay half the call-out fee. I HIGHLY RECOMMEND them to every electric scooter owner in and around Debrecen!",
    author2: "József",
    date2: "April 2025",
    testimonial3: "I recommend them to everyone, they are flexible, helpful, and communication is great! On Sunday they managed to bring me the scooter so I could go to work with it on Monday!",
    author3: "Ferenc",
    date3: "October 2024",
    // Video section
    "Szerelj velunk otthon!": "Repair with us at home!",
    // Ad Container
    Ajánlatunk: "Our Offer",
    "Most 10% kedvezmény minden szervizre!": "10% discount on all services now!",
    Igénylem: "Claim It",
    // Price Modal
    "Gumiszerelés, defektfajítás": "Tire mounting, puncture repair",
    "(anyagdíjat nem tartalmaz)": "(material costs not included)",
    "Fék beállítás, szerelés, légtelenítés": "Brake adjustment, repair, bleeding",
    Karbantartás: "Maintenance",
    "(átvizsgálás, csavarok meghúzása, zsírozás, fék beállítás bovdenek ellenőrzése , stb, anyagdíjat nem tartalmaz)":
      "(inspection, bolt tightening, lubrication, brake adjustment, cable check, etc., material costs not included)",
    "Elektromos hibafeltárás, javítás": "Electrical troubleshooting, repair",
    "Csuklószerkezet javítás": "Folding mechanism repair",
    Csapágycsere: "Bearing replacement",
    "kerekenként, (anyagdíjat nem tartalmaz)": "per wheel, (material costs not included)",
    "Gumi defektmentesítés, defektmentesítő folyadékkal": "Tire puncture proofing with sealant",
    "kerekenként (8″ – 29″-os kerékig)": "per wheel (for 8″ – 29″ wheels)",
    "Alkatrész csere, egyéb javítás óradíj": "Part replacement, other repair hourly rate",
    Alapdíj: "Base fee",
    "Tartalmazza a háztól házig szerviz kiszállást Debrecen területén.": "Includes door-to-door service within Debrecen.",
    // Booking Modal
    Név: "Name",
    "Email cím": "Email address",
    Telefonszám: "Phone number",
    Irányítószám: "Postal code",
    "Szállítási cím": "Shipping address",
    "Számlázási cím eltér a szállítási címtől": "Billing address is different from shipping address",
    "Számlázási irányítószám": "Billing postal code",
    "Számlázási cím": "Billing address",
    Szolgáltatások: "Services",
    "Háztól házig szerviz": "Door-to-door service",
    "Fék beállítás": "Brake adjustment",
    "Elektromos javítás": "Electrical repair",
    Egyéb: "Other",
    "Kérjük, írja le, milyen szolgáltatásra van szüksége": "Please describe the service you need",
    "Válassz napot": "Choose a day",
    "Időpont: -tól -ig": "Appointment: from - to",
    "Csak 9:00 és 17:00 között lehet foglalni, minimum 1 óra": "Booking available between 9:00 and 17:00 only, minimum 1 hour",
    "Üzenet (opcionális)": "Message (optional)",
    "Időpont lefoglalása": "Book appointment",
    "Város": "City",
    // Webshop Page
    "Webshopunk hamarosan elérhető lesz": "Our webshop will be available soon",
    "Vissza a főoldalra": "Back to homepage",
    Hamarosan: "Coming soon",
    Termékeink: "Our products",
    "Termék neve": "Product name",
    Kosárba: "Add to cart",
    "Ft": "Ft",
    "ft": "ft",
    "HUF": "HUF",
    "Forint": "Forint",
    "Ár": "Price",
    "Árak": "Prices",
    "tól": "from",
    "-ig": "-to",
    "több": "more",
    "kevesebb": "less",
  },
  de: {
    // Header
    "ROLI SZERVIZ": "ROLISZERVIZ",
    oldalcim: "RoliSzerviz - Elektroroller und Fahrradservice in Debrecen",
    meta_leiras:
      "Professioneller Elektroroller- und Fahrradservice in Debrecen. Schnelle, zuverlässige Reparatur mit Haustürlieferung.",
    Webshop: "Webshop",
    Szerviz: "Service",
    // Hero section
    ÜDVÖZLÜNK: "WILLKOMMEN",
    "A ROLISZERVIZNÉL!": "BEI ROLISERVICE!",
    "Elektromos roller és kerékpár szerviz Debrecenben":
      "Elektroroller- und Fahrradservice in Debrecen",
    "Háztól házig szerviz az alapdíjban!": "Haustürservice in der Grundgebühr enthalten!",
    "Gyors és professzionális megoldás minden típusú elektromos járműhöz, kényelmes háztól házig szállítással.":
      "Schnelle und professionelle Lösung für alle Arten von Elektrofahrzeugen, mit bequemer Haustürlieferung.",
    Árlista: "Preisliste",
    Időpontfoglalás: "Termin buchen",
    // Testimonials
    "Ügyfeleink véleménye": "Kundenbewertungen",
    testimonial1: "Schnell, präzise und perfektes Preis-Leistungs-Verhältnis.",
    author1: "Zoltán",
    date1: "Március 2025",
    testimonial2: "Äußerst freundliches und faires Unternehmen. Mein Roller machte ein Klopfgeräusch, wofür ein anderer Service eine Reparatur für 10.000 HUF angeboten hat. Aber RoliSzerviz kam zu mir nach Hause und fand in 5 Minuten heraus, dass ein Kabel am Rahmen schlug. Und sie haben dafür nicht einmal etwas berechnet, ich musste nur die Hälfte der Anfahrtskosten zahlen. Ich EMPFEHLE sie jedem E-Roller-Besitzer in und um Debrecen!",
    author2: "József",
    date2: "Április 2025",
    testimonial3: "Ich empfehle sie jedem, sie sind flexibel, hilfsbereit und die Kommunikation ist großartig! Am Sonntag haben sie es geschafft, mir den Roller zu bringen, damit ich am Montag damit zur Arbeit fahren konnte!",
    author3: "Ferenc",
    date3: "Október 2024",
    // Video section
    "Szerelj velunk otthon!": "Reparieren Sie mit uns zu Hause!",
    // Ad Container
    Ajánlatunk: "Unser Angebot",
    "Most 10% kedvezmény minden szervizre!":
      "Jetzt 10% Rabatt auf alle Dienstleistungen!",
    Igénylem: "Anfordern",
    // Price Modal
    "Gumiszerelés, defektfajítás": "Reifenmontage, Pannenreparatur",
    "(anyagdíjat nem tartalmaz)": "(Materialkosten nicht enthalten)",
    "Fék beállítás, szerelés, légtelenítés": "Bremseneinstellung, Reparatur, Entlüftung",
    Karbantartás: "Wartung",
    "(átvizsgálás, csavarok meghúzása, zsírozás, fék beállítás bovdenek ellenőrzése , stb, anyagdíjat nem tartalmaz)":
      "(Inspektion, Schrauben nachziehen, Schmierung, Bremseneinstellung, Kabelüberprüfung usw., Materialkosten nicht enthalten)",
    "Elektromos hibafeltárás, javítás": "Elektrische Fehlersuche, Reparatur",
    "Csuklószerkezet javítás": "Faltmechanismus-Reparatur",
    Csapágycsere: "Lagerwechsel",
    "kerekenként, (anyagdíjat nem tartalmaz)": "pro Rad, (Materialkosten nicht enthalten)",
    "Gumi defektmentesítés, defektmentesítő folyadékkal": "Reifenpannenschutz mit Dichtmittel",
    "kerekenként (8″ – 29″-os kerékig)": "pro Rad (für 8″ – 29″ Räder)",
    "Alkatrész csere, egyéb javítás óradíj": "Teilewechsel, sonstige Reparatur Stundensatz",
    Alapdíj: "Grundgebühr",
    "Tartalmazza a háztól házig szerviz kiszállást Debrecen területén.": "Beinhaltet Haustürservice innerhalb von Debrecen.",
    // Booking Modal
    Név: "Name",
    "Email cím": "E-Mail-Adresse",
    Telefonszám: "Telefonnummer",
    Irányítószám: "Postleitzahl",
    "Szállítási cím": "Lieferadresse",
    "Számlázási cím eltér a szállítási címtől": "Rechnungsadresse weicht von Lieferadresse ab",
    "Számlázási irányítószám": "Rechnungs-Postleitzahl",
    "Számlázási cím": "Rechnungsadresse",
    Szolgáltatások: "Dienstleistungen",
    "Háztól házig szerviz": "Haustürservice",
    "Fék beállítás": "Bremseneinstellung",
    "Elektromos javítás": "Elektrische Reparatur",
    Egyéb: "Andere",
    "Kérjük, írja le, milyen szolgáltatásra van szüksége": "Bitte beschreiben Sie die gewünschte Dienstleistung",
    "Válassz napot": "Wählen Sie einen Tag",
    "Időpont: -tól -ig": "Termin: von - bis",
    "Csak 9:00 és 17:00 között lehet foglalni, minimum 1 óra": "Buchung nur zwischen 9:00 és 17:00 Uhr möglich, mindestens 1 Stunde",
    "Üzenet (opcionális)": "Nachricht (optional)",
    "Időpont lefoglalása": "Termin buchen",
    "Város": "Stadt",
    // Webshop Page
    "Webshopunk hamarosan elérhető lesz": "Unser Webshop ist bald verfügbar",
    "Vissza a főoldalra": "Zurück zur Startseite",
    Hamarosan: "Demnächst",
    Termékeink: "Unsere Produkte",
    "Termék neve": "Produktname",
    Kosárba: "In den Warenkorb",
    "Ft": "Ft",
    "ft": "ft",
    "HUF": "HUF",
    "Forint": "Forint",
    "Ár": "Preis",
    "Árak": "Preise",
    "tól": "ab",
    "-ig": "-bis",
    "több": "mehr",
    "kevesebb": "weniger",
  },
};

export type TranslationKey = string;
