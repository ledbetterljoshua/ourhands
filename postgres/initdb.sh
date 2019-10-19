#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER joshualedbetter1;
    CREATE DATABASE ourhands;
    CREATE DATABASE testing;
    GRANT ALL PRIVILEGES ON DATABASE ourhands TO joshualedbetter1;
    GRANT ALL PRIVILEGES ON DATABASE testing TO joshualedbetter1;
EOSQL