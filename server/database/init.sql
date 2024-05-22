CREATE DATABASE climagroDB;
CREATE USER 'user123' WITH ENCRYPTED PASSWORD 'senha123';
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
ALTER ROLE 'user123' SET client_encoding TO 'utf8';
ALTER ROLE 'user123' SET default_transaction_isolation TO 'read committed';
ALTER ROLE 'user123' SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE climagroDB TO 'user123';