import hvac

def get_vault_secrets():
    vault_token_path = './game_pong_django/game_pong_django'
    vault_url = 'http://vault:8200'

    keys = [
        'domain_name',
        'django_secret_key',
        'postgres_password',
        'postgres_host',
        'postgres_port',
        'postgres_user',
        'postgres_database_name',
        'django_super_user_name',
        'django_super_user_password',
        'django_super_user_email'
    ]

    while True:
        try:
            print("Tentative de récupération des secrets Vault...")

            # Lire le token Vault
            with open(vault_token_path, 'r') as file:
                vault_token = file.read().strip()

            # Créer le client Vault
            client = hvac.Client(url=vault_url, token=vault_token)

            if not client.is_authenticated():
                raise Exception("Authentification échouée avec Vault")

            secrets = {}

            # Récupérer chaque secret
            for key in keys:
                response = client.secrets.kv.v1.read_secret(path=f'game_pong/django/{key}')
                secrets[key] = response['data'].get(key)
                if secrets[key] is None:
                    raise Exception(f"Clé '{key}' absente ou vide dans Vault")

            print("Secrets récupérés avec succès.")
            return secrets

        except Exception as e:
            print(f"Erreur : {e} — nouvelle tentative immédiatement.")
