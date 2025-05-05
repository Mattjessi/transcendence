#!/bin/sh

until pg_isready -U biaroun -d transcendence; do
	sleep 1
done

PGPASSWORD=azerty psql -U biaroun -d transcendence -c " \
CREATE SUBSCRIPTION user_sub_tournament_data \
CONNECTION 'host=service_game_pong_postgresql dbname=transcendence user=replicator password=azerty' \
PUBLICATION tournament_match_pub;"
