#!/bin/bash

ENV_FILE="./srcs/env/.env_nginx"

if [ ! -f "$ENV_FILE" ]; then
    echo "Erreur : Le fichier $ENV_FILE n'existe pas."
    exit 1
fi

NEW_DOMAIN_NAME=\'$(hostname --short)\'

if [ -z "$NEW_DOMAIN_NAME" ]; then
    echo "Erreur : Impossible de récupérer le nom d'hôte avec 'hostname --short'."
    exit 1
fi

sh -c "export DOMAIN_NAME='c4r2p5'"
export PORT_NUM='4343'

if grep -q "^DOMAIN_NAME=" "$ENV_FILE"; then
    sed -i "s/^DOMAIN_NAME=.*/DOMAIN_NAME=$NEW_DOMAIN_NAME/" "$ENV_FILE"
else
    echo "DOMAIN_NAME=$NEW_DOMAIN_NAME" >> "$ENV_FILE"
fi

if grep -q "^REACT_APP_DOMAIN_NAME=" "$ENV_FILE"; then
    sed -i "s/^REACT_APP_DOMAIN_NAME=.*/REACT_APP_DOMAIN_NAME=$NEW_DOMAIN_NAME/" "$ENV_FILE"
else
    echo "REACT_APP_DOMAIN_NAME='$NEW_DOMAIN_NAME'" >> "$ENV_FILE"
fi

if grep -q "^VITE_APP_DOMAIN_NAME=" "$ENV_FILE"; then
    sed -i "s/^VITE_APP_DOMAIN_NAME=.*/VITE_APP_DOMAIN_NAME=$NEW_DOMAIN_NAME/" "$ENV_FILE"
else
    echo "VITE_APP_DOMAIN_NAME='$NEW_DOMAIN_NAME'" >> "$ENV_FILE"
fi

echo "Mise à jour réussie : DOMAIN_NAME=$NEW_DOMAIN_NAME dans $ENV_FILE"