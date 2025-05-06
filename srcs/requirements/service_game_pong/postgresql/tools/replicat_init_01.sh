#!/bin/sh

until pg_isready -U biaroun -d transcendence; do
	sleep 1
done

if PGPASSWORD=azerty psql -U biaroun -d transcendence -t -c "SELECT 1 FROM pg_roles WHERE rolname = 'replicator';" | grep -q 1; then
	PGPASSWORD=azerty psql -U biaroun -d transcendence -c "
		REVOKE USAGE ON SCHEMA public FROM replicator;
		ALTER DEFAULT PRIVILEGES FOR ROLE biaroun IN SCHEMA public REVOKE SELECT ON TABLES FROM replicator;
		REVOKE SELECT ON ALL TABLES IN SCHEMA public FROM replicator;"
fi

PGPASSWORD=azerty psql -U biaroun -d transcendence -c "
DROP USER IF EXISTS replicator;
CREATE USER replicator WITH PASSWORD 'azerty' REPLICATION;
GRANT USAGE ON SCHEMA public TO replicator;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO replicator;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO replicator;"
