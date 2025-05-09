ui = false
api_addr = "http://172.20.0.11:8100"
disable_mlock = false

storage "file" {
	path = "/vault/file"
}

listener "tcp" {
	address = "172.20.0.11:8100"
	tls_disable = 1
}
