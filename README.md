# RoliSzerviz

Next.js 15 oldal + Postgres (foglalások). Coolify-on fut, két Dockerfile alapú szolgáltatással.

## Fejlesztés

```bash
cp .env.example .env.local   # majd töltsd ki
npm install
npm run dev
```

## Telepítés Coolify-ra

### 1. Adatbázis (`db/Dockerfile`)

- New Resource → Public/Private Git repo → ez a repo, Build Pack: **Dockerfile**
- Base Directory: `/db`
- Név / hostname: `roliszerviz-db` (ezt használja a `DATABASE_URL`)
- Environment: `POSTGRES_PASSWORD=<erős jelszó>`
- Storages: persistent volume → `/var/lib/postgresql/data`
- Ne legyen domain és ne publikáld a portot.

Az `init.sql` csak az első induláskor, üres volume-on fut le, és létrehozza a `bookings` táblát.

### 2. Weboldal (`Dockerfile` a gyökérben)

- New Resource → ugyanez a repo, Build Pack: **Dockerfile**, Base Directory: `/`
- Ports Exposes: `3000`
- Domain: `https://roliszerviz.hu` (és `https://www.roliszerviz.hu`)
- Environment: lásd `.env.example`
  - `DATABASE_URL=postgres://roliszerviz:<jelszó>@roliszerviz-db:5432/roliszerviz`
  - `SITE_URL=https://roliszerviz.hu`
  - `BOOKING_EMAIL_USER`, `BOOKING_EMAIL_PASS`
  - `GOOGLE_CALENDAR_ID`, `GOOGLE_SERVICE_ACCOUNT_JSON` (a JSON egy sorban)

A két szolgáltatás legyen ugyanabban a Coolify projektben / environmentben, hogy a belső hálózaton elérjék egymást.

### 3. Meglévő adatok átvitele Supabase-ből

Supabase → Project Settings → Database → connection string (session pooler), majd:

```bash
pg_dump "$SUPABASE_DB_URL" --data-only --table=public.bookings --no-owner --no-privileges > bookings.sql
psql "$COOLIFY_DATABASE_URL" -f bookings.sql
```

(A Coolify DB-t ehhez ideiglenesen elérhetővé teheted, vagy a `bookings.sql`-t a konténerbe másolva `psql`-lel töltheted be.)

### 4. DNS

Az `A` rekordot (`roliszerviz.hu`, `www`) irányítsd a Coolify szerver IP-jére, és vedd le a domaint a Vercelről.
