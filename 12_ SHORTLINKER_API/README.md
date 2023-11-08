# 12_SHORTLINKER_API

**Getting Started**

1. Clone the repository.
2. Create `.env` file following `.env.example`.
3. Build the Docker image by running: `docker-compose build`.
4. Run the built image by executing: `docker-compose up`

**API documentation**

1. To receive a short URL, send a POST request `http://localhost:PORT/` with a your long URL in body.
2. Body should contain data in JSON format `{"link": "http://localhost:3001/LINK"}`
3. To receive long URL from his short version, send a GET request with short URL.

<!--
create role
CREATE ROLE postgres WITH LOGIN PASSWORD 'pass' SUPERUSER;

disconnect users
SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'postgres' AND pid <> pg_backend_pid();

create base from template
CREATE DATABASE postgreslinker WITH TEMPLATE postgres OWNER postgres;
 -->
