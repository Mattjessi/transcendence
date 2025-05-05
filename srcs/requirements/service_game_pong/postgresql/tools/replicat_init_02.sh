#!/bin/sh

until pg_isready -U biaroun -d transcendence; do
	sleep 1
done

PGPASSWORD=azerty psql -U biaroun -d transcendence -c " \
CREATE PUBLICATION tournament_match_pub FOR TABLE shared_models_tournament, shared_models_match;" \
&& \
PGPASSWORD=azerty psql -U biaroun -d transcendence -c " \
DROP SUBSCRIPTION IF EXISTS game_sub_auth_user;" \
&& \
PGPASSWORD=azerty psql -U biaroun -d transcendence -c " \
CREATE SUBSCRIPTION game_sub_auth_user \
CONNECTION 'host=service_user_handler_postgresql dbname=transcendence user=replicator password=azerty' \
PUBLICATION auth_user_pub;" \
&& \
PGPASSWORD=azerty psql -U biaroun -d transcendence -c " \
DROP SUBSCRIPTION IF EXISTS game_sub_player_data;" \
&& \
PGPASSWORD=azerty psql -U biaroun -d transcendence -c " \
CREATE SUBSCRIPTION game_sub_player_data \
CONNECTION 'host=service_user_handler_postgresql dbname=transcendence user=replicator password=azerty' \
PUBLICATION shared_models_pub;"
