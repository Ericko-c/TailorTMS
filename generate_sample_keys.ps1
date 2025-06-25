# PowerShell script to generate a sample RSA key pair for TailorTMS
# Requires OpenSSL to be installed and available in PATH

# Generate a 2048-bit RSA private key
openssl genrsa -out BACKEND/private_key_sample.pem 2048

# Extract the public key in PEM format
openssl rsa -in BACKEND/private_key_sample.pem -pubout -out BACKEND/public_key_sample.pem

Write-Host "Sample RSA key pair generated:"
Write-Host "  - BACKEND/private_key_sample.pem (private)"
Write-Host "  - BACKEND/public_key_sample.pem (public)"
