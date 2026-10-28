# Postgres for RoliSzerviz bookings.
# In Coolify: Base Directory = /db, and mount a persistent volume
# at /var/lib/postgresql/data. Do not expose it publicly.
FROM postgres:16-alpine

ENV POSTGRES_DB=roliszerviz \
    POSTGRES_USER=roliszerviz \
    PGDATA=/var/lib/postgresql/data/pgdata

# Executed only when the data directory is empty (first start)
COPY init.sql /docker-entrypoint-initdb.d/01-init.sql

HEALTHCHECK --interval=10s --timeout=5s --start-period=20s --retries=5 \
  CMD pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" || exit 1

EXPOSE 5432
