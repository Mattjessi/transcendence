.PHONY: all clean fclean re

all:

	@COMPOSE_BAKE=true docker compose -f ./srcs/docker-compose.yml up -d --build vault_postgresql > /dev/null

	@COMPOSE_BAKE=true docker compose -f ./srcs/docker-compose.yml up -d --build vault > /dev/null

	@until docker exec vault_secrets curl --silent --fail http://172.20.0.9:8200/v1/sys/seal-status > /dev/null; do \
		sleep 1; \
	done

	@docker exec vault_secrets vault operator init | grep -e "Unseal Key [0-9]:" -e "Initial Root Token:" \
		| sed -e "s/Unseal\ Key\ /UNSEAL_KEY_/" -e "s/: /='/" -e "s/Initial Root Token/INITIAL_ROOT_TOKEN/" -e "s/[^[:print:]\t]//g" \
		| sed -r "s/\x1B\[[0-9;]*[mK]//g" | sed -e "s/^\[0m//" -e "s/\[0m\$$//" \
		| sed -e "s/\'\$$/\'/" > ./srcs/env/.env_vault_secrets_key;

#   Les lignes ci-dessous ne servent a rien mais je les garde pour le parsing des unseal key et token
#	@docker exec vault_secrets vault operator unseal $$(cat ./srcs/env/.env_vault_secrets_key | grep UNSEAL_KEY_1 | sed -e "s/'/ /g" | cut -d ' ' -f 2) > /dev/null
#	@docker exec vault_secrets vault operator unseal $$(cat ./srcs/env/.env_vault_secrets_key | grep UNSEAL_KEY_2 | sed -e "s/'/ /g" | cut -d ' ' -f 2) > /dev/null
#	@docker exec vault_secrets vault operator unseal $$(cat ./srcs/env/.env_vault_secrets_key | grep UNSEAL_KEY_3 | sed -e "s/'/ /g" | cut -d ' ' -f 2) > /dev/null
#	@docker exec vault_secrets vault login $$(cat ./srcs/env/.env_vault_secrets_key | grep INITIAL_ROOT_TOKEN | sed -e "s/'/ /g" | cut -d ' ' -f 2) > /dev/null

	@COMPOSE_BAKE=true docker compose -f ./srcs/docker-compose.yml up -d --build service_user_handler_postgresql > /dev/null
	@COMPOSE_BAKE=true docker compose -f ./srcs/docker-compose.yml up -d --build service_game_pong_postgresql > /dev/null
	@COMPOSE_BAKE=true docker compose -f ./srcs/docker-compose.yml up -d --build service_live_chat_postgresql > /dev/null
	@COMPOSE_BAKE=true docker compose -f ./srcs/docker-compose.yml up -d --build service_user_handler_django > /dev/null
	@COMPOSE_BAKE=true docker compose -f ./srcs/docker-compose.yml up -d --build service_game_pong_django > /dev/null
	@COMPOSE_BAKE=true docker compose -f ./srcs/docker-compose.yml up -d --build service_live_chat_django > /dev/null

	@docker exec service_user_handler_postgresql sh /home/init/02_replicat_init.sh > /dev/null
	@docker exec service_game_pong_postgresql sh /home/init/02_replicat_init.sh > /dev/null
	@docker exec service_live_chat_postgresql sh /home/init/02_replicat_init.sh > /dev/null
	@docker exec service_user_handler_postgresql sh /home/init/03_replicat_init.sh > /dev/null

	@COMPOSE_BAKE=true docker compose -f ./srcs/docker-compose.yml up -d --build > /dev/null

clean:

	@COMPOSE_BAKE=true docker compose -f ./srcs/docker-compose.yml down > /dev/null

fclean: clean

	@if [ $$(docker images -qa | wc -l) -ne 0 ]; then \
		docker rmi -f $(shell docker images -qa) > /dev/null; \
	fi

	@if [ $$(docker network ls -q | wc -l) -ne 0 ]; then \
		docker network prune -f > /dev/null; \
	fi

	@if [ $$(docker volume ls -q | wc -l) -ne 0 ]; then \
		docker volume rm -f $(shell docker volume ls -q) > /dev/null; \
	fi

re: fclean all
