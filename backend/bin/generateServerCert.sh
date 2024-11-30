#!/bin/bash

pwd

echo "[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
C = KP
ST = FO
L = Pjöngjang
O = Kims Friendly Robot Company
OU = Funny People
CN = localhost

[v3_req]
keyUsage = critical, digitalSignature, keyAgreement
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS.1       = localhost
DNS.2       = localhost.localdomain
IP.1        = 127.0.0.1
IP.2        = ::1
" > "${PWD}/secrets/req.cnf"

ls -al ./secrets
echo "$PWD"

openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
 -keyout "${PWD}/secrets/server.key" -out "${PWD}/secrets/server.crt" -config "${PWD}/secrets/req.cnf" -sha256
