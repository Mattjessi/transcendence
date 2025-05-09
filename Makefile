.PHONY: all clean fclean re

all:

	@sudo mkdir -p ./srcs/requirements/service_user_handler/postgresql/conf/data/pg_serial \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_stat_tmp \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_snapshots \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_twophase \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_replslot \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_wal/archive_status \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_dynshmem \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_tblspc \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_commit_ts \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_notify \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_logical/mappings \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_logical/snapshots \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_serial \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_stat_tmp \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_snapshots \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_twophase \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_replslot \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_wal/archive_status \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_dynshmem \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_tblspc \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_commit_ts \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_notify \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_logical/mappings \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_logical/snapshots \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_serial \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_stat_tmp \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_snapshots \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_twophase \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_replslot \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_wal/archive_status \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_dynshmem \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_tblspc \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_commit_ts \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_notify \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_logical/mappings \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_logical/snapshots \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_serial \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_stat_tmp \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_snapshots \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_twophase \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_replslot \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_wal/archive_status \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_dynshmem \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_tblspc \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_commit_ts \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_notify \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_logical/mappings \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_logical/snapshots

	@if [ ! -d "./volume/smart_contract" ]; then \
		sudo mkdir -p "./volume/smart_contract"; \
	fi

	@if [ ! -d "./volume/static/static_service_app" ]; then \
		sudo mkdir -p "./volume/static/static_service_app"; \
	fi

	@if [ ! -d "./volume/service_app/django" ]; then \
		sudo mkdir -p "./volume/service_app/django"; \
	fi

	@if [ ! -d "./volume/service_app/postgresql" ]; then \
		sudo mkdir -p "./volume/service_app/postgresql"; \
	fi

	@if [ ! -d "./volume/static/static_service_chat" ]; then \
		sudo mkdir -p "./volume/static/static_service_chat"; \
	fi

	@if [ ! -d "./volume/service_chat/django" ]; then \
		sudo mkdir -p "./volume/service_chat/django"; \
	fi

	@if [ ! -d "./volume/service_chat/postgresql" ]; then \
		sudo mkdir -p "./volume/service_chat/postgresql"; \
	fi

	@if [ ! -d "./volume/eventbus" ]; then \
		sudo mkdir -p "./volume/eventbus"; \
	fi

	@sudo docker compose -f ./srcs/docker-compose.yml up -d --build

	@docker cp ./srcs/requirements/hashicorp_vault_sealer/vault/conf/config $$(docker ps -q --filter "name=vault_sealer"):/vault
	@docker cp ./srcs/requirements/hashicorp_vault_sealer/vault/conf/file $$(docker ps -q --filter "name=vault_sealer"):/vault
	@docker cp ./srcs/requirements/hashicorp_vault/postgresql/conf/data $$(docker ps -q --filter "name=vault_postgresql"):/var/lib/postgresql
	@docker cp ./srcs/requirements/hashicorp_vault/vault/conf/config $$(docker ps -q --filter "name=vault_secrets"):/vault
	@docker cp ./srcs/requirements/service_chat/postgresql/conf/data $$(docker ps -q --filter "name=service_chat_postgresql"):/var/lib/postgresql
	@docker cp ./srcs/requirements/service_app/postgresql/conf/data $$(docker ps -q --filter "name=service_app_postgresql"):/var/lib/postgresql
	@docker cp ./srcs/requirements/service_live_chat/postgresql/conf/data $$(docker ps -q --filter "name=service_live_chat_postgresql"):/var/lib/postgresql
#	@docker cp ./srcs/requirements/service_live_chat/postgresql/tools/replicat_init_01.sh $$(docker ps -q --filter "name=service_live_chat_postgresql"):/docker-entrypoint-initdb.d
#	@docker cp ./srcs/requirements/service_live_chat/postgresql/tools/replicat_init_02.sh $$(docker ps -q --filter "name=service_live_chat_postgresql"):/docker-entrypoint-initdb.d
	@docker cp ./srcs/requirements/service_game_pong/postgresql/conf/data $$(docker ps -q --filter "name=service_game_pong_postgresql"):/var/lib/postgresql
#	@docker cp ./srcs/requirements/service_game_pong/postgresql/tools/replicat_init_01.sh $$(docker ps -q --filter "name=service_game_pong_postgresql"):/docker-entrypoint-initdb.d
#	@docker cp ./srcs/requirements/service_game_pong/postgresql/tools/replicat_init_02.sh $$(docker ps -q --filter "name=service_game_pong_postgresql"):/docker-entrypoint-initdb.d
	@docker cp ./srcs/requirements/service_user_handler/postgresql/conf/data $$(docker ps -q --filter "name=service_user_handler_postgresql"):/var/lib/postgresql
#	@docker cp ./srcs/requirements/service_user_handler/postgresql/tools/replicat_init_01.sh $$(docker ps -q --filter "name=service_user_handler_postgresql"):/docker-entrypoint-initdb.d
#	@docker cp ./srcs/requirements/service_user_handler/postgresql/tools/replicat_init_02.sh $$(docker ps -q --filter "name=service_user_handler_postgresql"):/docker-entrypoint-initdb.d
#	@docker cp ./srcs/requirements/service_user_handler/postgresql/tools/replicat_init_03.sh $$(docker ps -q --filter "name=service_user_handler_postgresql"):/docker-entrypoint-initdb.d
	@docker cp ./srcs/requirements/frontend/conf/index.html $$(docker ps -q --filter "name=frontend"):/home/frontend
	@docker cp ./srcs/requirements/frontend/conf/package-lock.json $$(docker ps -q --filter "name=frontend"):/home/frontend
	@docker cp ./srcs/requirements/frontend/conf/package.json $$(docker ps -q --filter "name=frontend"):/home/frontend
	@docker cp ./srcs/requirements/frontend/conf/public $$(docker ps -q --filter "name=frontend"):/home/frontend
	@docker cp ./srcs/requirements/frontend/conf/src $$(docker ps -q --filter "name=frontend"):/home/frontend
	@docker cp ./srcs/requirements/frontend/conf/vite.config.js $$(docker ps -q --filter "name=frontend"):/home/frontend

	@while ! docker cp $$(docker ps -q --filter "name=service_chat_django"):/static ./srcs/requirements/service_chat/django/conf; do \
		sleep 1; \
	done

	@while ! docker cp $$(docker ps -q --filter "name=service_app_django"):/static ./srcs/requirements/service_app/django/conf; do \
		sleep 1; \
	done

	@while ! docker cp $$(docker ps -q --filter "name=service_live_chat_django"):/django_web_app/staticfiles ./srcs/requirements/service_live_chat/django/conf; do \
		sleep 1; \
	done

	@while ! docker cp $$(docker ps -q --filter "name=service_game_pong_django"):/django_web_app/staticfiles ./srcs/requirements/service_game_pong/django/conf; do \
		sleep 1; \
	done

	@while ! docker cp $$(docker ps -q --filter "name=service_user_handler_django"):/django_web_app/staticfiles ./srcs/requirements/service_user_handler/django/conf; do \
		sleep 1; \
	done

	@docker cp ./srcs/requirements/service_user_handler/django/conf/media $$(docker ps -q --filter "name=nginx"):/static
	@docker cp ./srcs/requirements/service_chat/django/conf/static/admin $$(docker ps -q --filter "name=nginx"):/static/chat
	@docker cp ./srcs/requirements/service_chat/django/conf/static/rest_framework $$(docker ps -q --filter "name=nginx"):/static/chat
	@docker cp ./srcs/requirements/service_app/django/conf/static/admin $$(docker ps -q --filter "name=nginx"):/static/api
	@docker cp ./srcs/requirements/service_app/django/conf/static/rest_framework $$(docker ps -q --filter "name=nginx"):/static/api
	@docker cp ./srcs/requirements/service_live_chat/django/conf/staticfiles/admin $$(docker ps -q --filter "name=nginx"):/static/live_chat
	@docker cp ./srcs/requirements/service_live_chat/django/conf/staticfiles/rest_framework $$(docker ps -q --filter "name=nginx"):/static/live_chat
	@docker cp ./srcs/requirements/service_game_pong/django/conf/staticfiles/admin $$(docker ps -q --filter "name=nginx"):/static/pong
	@docker cp ./srcs/requirements/service_game_pong/django/conf/staticfiles/rest_framework $$(docker ps -q --filter "name=nginx"):/static/pong
	@docker cp ./srcs/requirements/service_user_handler/django/conf/staticfiles/admin $$(docker ps -q --filter "name=nginx"):/static/users
	@docker cp ./srcs/requirements/service_user_handler/django/conf/staticfiles/rest_framework $$(docker ps -q --filter "name=nginx"):/static/users

#	@sudo docker compose -f ./srcs/docker-compose.yml exec vault_sealer vault operator unseal XSlqgv8XRbzSyytnbzck3V2nQHWdB/1/o4IIzJhdvVzQ
#	@sudo docker compose -f ./srcs/docker-compose.yml exec vault_sealer vault operator unseal x9Pcd9kSLALh4i7PgEW/6Kke2Swd8Ambyo/z12OgQIrA
#	@sudo docker compose -f ./srcs/docker-compose.yml exec vault_sealer vault operator unseal +CveHjrkub3mRvRItUMni2zhx5Z3zuuUk+ccUypr+kDX

clean:

	@sudo docker compose -f ./srcs/docker-compose.yml down

fclean: clean

	@if [ $$(sudo docker images -qa | wc -l) -ne 0 ]; then \
		sudo docker rmi -f $(shell sudo docker images -qa); \
	fi

	@if [ $$(sudo docker network ls -q | wc -l) -ne 0 ]; then \
		sudo docker network prune -f; \
	fi

#	@if [ $$(sudo docker volume ls -q | wc -l) -ne 0 ]; then \
#		sudo docker volume rm -f $(shell sudo docker volume ls -q); \
#	fi

re: fclean all

reset_base:
	@sudo rm -rf ./srcs/requirements/service_user_handler/postgresql/conf/data/ \
					./srcs/requirements/service_live_chat/postgresql/conf/data/ \
					./srcs/requirements/service_game_pong/postgresql/conf/data/ \
	&& \
	sudo mkdir ./srcs/requirements/service_user_handler/postgresql/conf/data/ \
					./srcs/requirements/service_live_chat/postgresql/conf/data/ \
					./srcs/requirements/service_game_pong/postgresql/conf/data/ \
	&& \
	sudo chown 70:root ./srcs/requirements/service_user_handler/postgresql/conf/data/ \
						./srcs/requirements/service_live_chat/postgresql/conf/data/ \
						./srcs/requirements/service_game_pong/postgresql/conf/data/ \
	&& \
	docker restart service_user_handler_postgresql \
	&& \
	docker restart service_live_chat_postgresql \
	&& \
	docker restart service_game_pong_postgresql \
	&& \
	sleep 25 \
	&& \
	docker restart service_user_handler_django \
	&& \
	docker restart service_live_chat_django \
	&& \
	docker restart service_game_pong_django \
	&& \
	sleep 25 \
	&& \
	sudo docker compose -f ./srcs/docker-compose.yml exec service_user_handler_postgresql sh /docker-entrypoint-initdb.d/replicat_init_01.sh \
	&& \
	sudo docker compose -f ./srcs/docker-compose.yml exec service_game_pong_postgresql sh /docker-entrypoint-initdb.d/replicat_init_01.sh \
	&& \
	sudo docker compose -f ./srcs/docker-compose.yml exec service_live_chat_postgresql sh /docker-entrypoint-initdb.d/replicat_init_01.sh \
	&& \
	sudo docker compose -f ./srcs/docker-compose.yml exec service_user_handler_postgresql sh /docker-entrypoint-initdb.d/replicat_init_02.sh \
	&& \
	sudo docker compose -f ./srcs/docker-compose.yml exec service_game_pong_postgresql sh /docker-entrypoint-initdb.d/replicat_init_02.sh \
	&& \
	sudo docker compose -f ./srcs/docker-compose.yml exec service_live_chat_postgresql sh /docker-entrypoint-initdb.d/replicat_init_02.sh \
	&& \
	sudo docker compose -f ./srcs/docker-compose.yml exec service_user_handler_postgresql sh /docker-entrypoint-initdb.d/replicat_init_03.sh
