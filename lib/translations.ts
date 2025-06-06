// Fix: Define Locale and TranslationObject types first, then use them for translations
export type Locale = 'hu' | 'en' | 'de';
export type TranslationObject = { [key: string]: string };

export const translations: Record<Locale, TranslationObject> = {
  hu: {
    // Header
    "ROLI SZERVIZ": "ROLI SZERVIZ",
    oldalcim: "RoliSzerviz - Elektromos roller és kerékpár szerviz Debrecenben",
    meta_leiras:
      "Professzionális elektromos roller és kerékpár szerviz Debrecenben. Gyors, megbízható javítás háztól házig szállítással.",
    Webshop: "Webshop",
    Szerviz: "Szerviz",
    // Hero section
    ÜDVÖZLÜNK: "ÜDVÖZLÜNK",
    "A ROLI SZERVIZNÉL!": "A ROLI SZERVIZNÉL!",
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
    "ROLI SZERVIZ": "ROLLER SERVICE",
    oldalcim: "RoliSzerviz - Electric scooter and bike repair in Debrecen",
    meta_leiras:
      "Professional electric scooter and bike service in Debrecen. Fast, reliable repairs with door-to-door delivery.",
    Webshop: "Webshop",
    Szerviz: "Service",
    // Hero section
    ÜDVÖZLÜNK: "WELCOME",
    "A ROLI SZERVIZNÉL!": "TO ROLLER SERVICE!",
    "Elektromos roller és kerékpár szerviz Debrecenben":
      "Electric scooter and bike service in Debrecen",
    "Gyors és professzionális megoldás minden típusú elektromos járműhöz, kényelmes háztól házig szállítással.":
      "Fast and professional solutions for all types of electric vehicles with convenient door-to-door delivery.",
    Árlista: "Price List",
    Időpontfoglalás: "Book Appointment",
    // Testimonials
    "Ügyfeleink véleménye": "Customer Reviews",
    testimonial1: "Fast, precise and perfect value for money.",
    author1: "Zoltán",
    date1: "March 2025",
    testimonial2: "Extremely kind and fair company. My scooter made a knocking sound, for which another service offered a 10k HUF repair. But RoliSzerviz came to my house and in 5 minutes found that a cable was hitting the frame. And they didn't even charge for this, I only had to pay half the call-out fee. I HIGHLY RECOMMEND them to every electric scooter owner in and around Debrecen!",
    author2: "József",
    date2: "April 2025",
    testimonial3: "I recommend them to everyone, they are flexible, helpful, and communication is great! On Sunday they managed to bring me the scooter so I could go to work with it on Monday!",
    author3: "Ferenc",
    date3: "October 2024",
    // Video section
    "Szerelj velunk otthon!": "Repair with us at home!",
    // Ad Container
    Ajánlatunk: "Our Offer",
    "Most 10% kedvezmény minden szervizre!":
      "10% discount on all services now!",
    Igénylem: "Claim It",
    // Price Modal
    "Gumiszerelés, defektfajítás": "Tire mounting, puncture repair",
    "(anyagdíjat nem tartalmaz)": "(material costs not included)",
    "Fék beállítás, szerelés, légtelenítés":
      "Brake adjustment, repair, bleeding",
    Karbantartás: "Maintenance",
    "(átvizsgálás, csavarok meghúzása, zsírozás, fék beállítás bovdenek ellenőrzése , stb, anyagdíjat nem tartalmaz)":
      "(inspection, bolt tightening, lubrication, brake adjustment, cable check, etc., material costs not included)",
    "Elektromos hibafeltárás, javítás": "Electrical troubleshooting, repair",
    "Csuklószerkezet javítás": "Folding mechanism repair",
    Csapágycsere: "Bearing replacement",
    "kerekenként, (anyagdíjat nem tartalmaz)":
      "per wheel, (material costs not included)",
    "Gumi defektmentesítés, defektmentesítő folyadékkal":
      "Tire puncture proofing with sealant",
    "kerekenként (8″ – 29″-os kerékig)": "per wheel (for 8″ – 29″ wheels)",
    "Alkatrész csere, egyéb javítás óradíj":
      "Part replacement, other repair hourly rate",
    Alapdíj: "Base fee",
    "Tartalmazza a háztól házig szerviz kiszállást Debrecen területén.": "Includes door-to-door service within Debrecen.",
    // Booking Modal
    Név: "Name",
    "Email cím": "Email Address",
    Telefonszám: "Phone Number",
    Irányítószám: "Postal Code",
    "Szállítási cím": "Shipping Address",
    "Számlázási cím eltér a szállítási címtől":
      "Billing address is different from shipping address",
    "Számlázási irányítószám": "Billing Postal Code",
    "Számlázási cím": "Billing Address",
    Szolgáltatások: "Services",
    "Háztól házig szerviz": "Door-to-door service",
    "Fék beállítás": "Brake adjustment",
    "Elektromos javítás": "Electrical repair",
    Egyéb: "Other",
    "Kérjük, írja le, milyen szolgáltatásra van szüksége":
      "Please describe the service you need",
    "Válassz napot": "Choose a day",
    "Időpont: -tól -ig": "Appointment: from - to",
    "Csak 9:00 és 17:00 között lehet foglalni, minimum 1 óra":
      "Booking available between 9:00 and 17:00 only, minimum 1 hour",
    "Üzenet (opcionális)": "Message (optional)",
    "Időpont lefoglalása": "Book Appointment",
    City: "City",
    // Webshop Page
    "Webshopunk hamarosan elérhető lesz": "Our webshop will be available soon",
    "Vissza a főoldalra": "Back to Homepage",
    Hamarosan: "Coming Soon",
    Termékeink: "Our Products", // Added new key
    "Termék neve": "Product Name", // Added new key
    Kosárba: "Add to Cart", // Added new key
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
    "ROLI SZERVIZ": "ROLLER SERVICE",
    oldalcim: "RoliSzerviz - Elektroroller und Fahrradreparatur in Debrecen",
    meta_leiras:
      "Professioneller Elektroroller- und Fahrradservice in Debrecen. Schnelle, zuverlässige Reparaturen mit Haustürlieferung.",
    Webshop: "Webshop",
    Szerviz: "Service",
    // Hero section
    ÜDVÖZLÜNK: "WILLKOMMEN",
    "A ROLI SZERVIZNÉL!": "BEIM ROLLER SERVICE!",
    "Elektromos roller és kerékpár szerviz Debrecenben":
      "Elektroroller és kerékpár szerviz Debrecenben",
    "Gyors és professzionális megoldás minden típusú elektromos járműhöz, kényelmes háztól házig szállítással.":
      "Schnelle és professzionális megoldás minden típusú elektromos járműhöz, kényelmes háztól házig szállítással.",
    Árlista: "Preisliste",
    Időpontfoglalás: "Termin buchen",
    // Testimonials
    "Ügyfeleink véleménye": "Kundenbewertungen",
    testimonial1: "Ich mag diesen Ort sehr, der Service ist sehr professionell",
    author1: "Mark Vasas",
    date1: "Oktober 2024",
    testimonial2: "Ich mag diesen Ort sehr, der Service ist sehr professionell. Mein BMW ist ausgefallen és ő még azt is megjavította. RoliSzerviz házhoz jött és 5 perc alatt kiderítette a problémát. Csak a kiszállási díj felét kellett fizessem. Minden debreceni és környéki elektromos roller tulajdonosnak ajánlom őket!",
    author2: "David Sutak",
    date2: "November 2024",
    testimonial3:
      "Er hat meinen Namen gestohlen, aber ich mag den Ort, gute Jungs",
    author3: "Roland Kokovics",
    date3: "Dezember 2024",
    // Video section
    "Szerelj velunk otthon!": "Reparieren Sie mit uns zu Hause!",
    // Ad Container
    Ajánlatunk: "Unser Angebot",
    "Most 10% kedvezmény minden szervizre!":
      "10% Rabatt auf alle Dienstleistungen jetzt!",
    Igénylem: "Beanspruchen",
    // Price Modal
    "Gumiszerelés, defektfajítás": "Reifenmontage, Plattenreparatur",
    "(anyagdíjat nem tartalmaz)": "(Materialkosten nicht enthalten)",
    "Fék beállítás, szerelés, légtelenítés":
      "Bremseinstellung, Reparatur, Entlüftung",
    Karbantartás: "Wartung",
    "(átvizsgálás, csavarok meghúzása, zsírozás, fék beállítás bovdenek ellenőrzése , stb, anyagdíjat nem tartalmaz)":
      "(Inspektion, Schraubenanziehen, Schmierung, Bremseinstellung, Kabelprüfung usw., Materialkosten nicht enthalten)",
    "Elektromos hibafeltárás, javítás": "Elektrische Fehlersuche, Reparatur",
    "Csuklószerkezet javítás": "Klappmechanismus Reparatur",
    Csapágycsere: "Lageraustausch",
    "kerekenként, (anyagdíjat nem tartalmaz)":
      "pro Rad, (Materialkosten nicht enthalten)",
    "Gumi defektmentesítés, defektmentesítő folyadékkal":
      "Reifenpannenschutz mit Dichtmittel",
    "kerekenként (8″ – 29″-os kerékig)": "pro Rad (für 8″ – 29″ Räder)",
    "Alkatrész csere, egyéb javítás óradíj":
      "Ersatzteilwechsel, sonstige Reparatur Stundensatz",
    Alapdíj: "Grundgebühr",
    "Tartalmazza a háztól házig szerviz kiszállást Debrecen területén.": "Beinhaltet Haustürservice innerhalb von Debrecen.",
    // Booking Modal
    Név: "Name",
    "Email cím": "E-Mail-Adresse",
    Telefonszám: "Telefonnummer",
    Irányítószám: "Postleitzahl",
    "Szállítási cím": "Lieferadresse",
    "Számlázási cím eltér a szállítási címtől":
      "Rechnungsadresse weicht von Lieferadresse ab",
    "Számlázási irányítószám": "Rechnungs-Postleitzahl",
    "Számlázási cím": "Rechnungsadresse",
    Szolgáltatások: "Dienstleistungen",
    "Háztól házig szerviz": "Service von Tür zu Tür",
    "Fék beállítás": "Bremseinstellung",
    "Elektromos javítás": "Elektrische Reparatur",
    Egyéb: "Andere",
    "Kérjük, írja le, milyen szolgáltatásra van szüksége":
      "Bitte beschreiben Sie die gewünschte Dienstleistung",
    "Válassz napot": "Wählen Sie einen Tag",
    "Időpont: -tól -ig": "Termin: von - bis",
    "Csak 9:00 és 17:00 között lehet foglalni, minimum 1 óra":
      "Buchung nur zwischen 9:00 és 17:00 Uhr möglich, mindestens 1 Stunde",
    "Üzenet (opcionális)": "Nachricht (optional)",
    "Időpont lefoglalása": "Termin buchen",
    // Webshop Page
    "Webshopunk hamarosan elérhető lesz":
      "Unser Webshop wird bald verfügbar sein",
    "Vissza a főoldalra": "Zurück zur Startseite",
    Hamarosan: "Demnächst",
    Termékeink: "Unsere Produkte", // Added new key
    "Termék neve": "Produktname", // Added new key
    Kosárba: "In den Warenkorb", // Added new key
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
