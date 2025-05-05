#!/bin/sh

until pg_isready -U biaroun -d transcendence; do
	sleep 1
done

PGPASSWORD=azerty psql -U biaroun -d transcendence -c " \
CREATE PUBLICATION auth_user_pub FOR TABLE auth_user; \
CREATE PUBLICATION shared_models_pub FOR TABLE shared_models_player, shared_models_block, shared_models_friendship;"
