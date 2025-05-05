#!/bin/sh

until pg_isready -U biaroun -d transcendence; do
	sleep 1
done

PGPASSWORD=azerty psql -U biaroun -d transcendence -c " \
DROP SUBSCRIPTION IF EXISTS chat_sub_auth_user;" \
&& \
PGPASSWORD=azerty psql -U biaroun -d transcendence -c " \
CREATE SUBSCRIPTION chat_sub_auth_user \
CONNECTION 'host=service_user_handler_postgresql dbname=transcendence user=replicator password=azerty' \
PUBLICATION auth_user_pub;" \
&& \
PGPASSWORD=azerty psql -U biaroun -d transcendence -c " \
DROP SUBSCRIPTION IF EXISTS chat_sub_tournament_data;" \
&& \
PGPASSWORD=azerty psql -U biaroun -d transcendence -c " \
CREATE SUBSCRIPTION chat_sub_tournament_data \
CONNECTION 'host=service_game_pong_postgresql dbname=transcendence user=replicator password=azerty' \
PUBLICATION tournament_match_pub;" \
&& \
PGPASSWORD=azerty psql -U biaroun -d transcendence -c " \
DROP SUBSCRIPTION IF EXISTS chat_sub_player_data;" \
&& \
PGPASSWORD=azerty psql -U biaroun -d transcendence -c " \
CREATE SUBSCRIPTION chat_sub_player_data \
CONNECTION 'host=service_user_handler_postgresql dbname=transcendence user=replicator password=azerty' \
PUBLICATION shared_models_pub;"
