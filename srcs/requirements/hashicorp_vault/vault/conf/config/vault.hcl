ui = false
api_addr = "http://172.20.0.9:8200"
disable_mlock = false

storage "postgresql" {
  connection_url = "postgresql://vault_postgresql:postgrespw@vault_postgresql:5432/vault"
}

listener "tcp" {
  address = "172.20.0.9:8200"
  tls_disable = 1
}

#seal "transit" {
#  address = "http://172.20.0.11:8100"
#  disable_renewal = "false"
#  key_name = "autounseal"
#  mount_path = "transit/"
#  tls_skip_verify = "true"
#}
