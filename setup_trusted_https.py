"""
Create a local Certificate Authority (CA) and a server certificate,
then import the CA into Windows trusted root store so browsers trust HTTPS.
"""
import os
import subprocess
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
import datetime
import ipaddress

def create_ca():
    """Create a local root CA certificate."""
    print("Creating local CA...")
    
    ca_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
        backend=default_backend()
    )
    
    ca_subject = ca_issuer = x509.Name([
        x509.NameAttribute(NameOID.COUNTRY_NAME, u"US"),
        x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, u"Dev"),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, u"Local Dev"),
        x509.NameAttribute(NameOID.COMMON_NAME, u"Local Dev Root CA"),
    ])
    
    now = datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None)
    
    ca_cert = x509.CertificateBuilder().subject_name(
        ca_subject
    ).issuer_name(
        ca_issuer
    ).public_key(
        ca_key.public_key()
    ).serial_number(
        x509.random_serial_number()
    ).not_valid_before(
        now
    ).not_valid_after(
        now + datetime.timedelta(days=3650)
    ).add_extension(
        x509.BasicConstraints(ca=True, path_length=None),
        critical=True,
    ).add_extension(
        x509.KeyUsage(
            digital_signature=True,
            key_cert_sign=True,
            crl_sign=True,
            key_encipherment=False,
            content_commitment=False,
            data_encipherment=False,
            key_agreement=False,
            encipher_only=False,
            decipher_only=False,
        ),
        critical=True,
    ).add_extension(
        x509.SubjectKeyIdentifier.from_public_key(ca_key.public_key()),
        critical=False,
    ).sign(
        ca_key,
        hashes.SHA256(),
        default_backend()
    )
    
    with open("rootCA.pem", "wb") as f:
        f.write(ca_cert.public_bytes(serialization.Encoding.PEM))
    
    with open("rootCA.key", "wb") as f:
        f.write(ca_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.TraditionalOpenSSL,
            encryption_algorithm=serialization.NoEncryption()
        ))
    
    print("[OK] Created rootCA.pem")
    return ca_cert, ca_key

def create_server_cert(ca_cert, ca_key):
    """Create a server certificate signed by the local CA."""
    print("Creating server certificate...")
    
    server_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
        backend=default_backend()
    )
    
    server_subject = x509.Name([
        x509.NameAttribute(NameOID.COUNTRY_NAME, u"US"),
        x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, u"Dev"),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, u"Local Dev"),
        x509.NameAttribute(NameOID.COMMON_NAME, u"127.0.0.1"),
    ])
    
    now = datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None)
    
    server_cert = x509.CertificateBuilder().subject_name(
        server_subject
    ).issuer_name(
        ca_cert.issuer
    ).public_key(
        server_key.public_key()
    ).serial_number(
        x509.random_serial_number()
    ).not_valid_before(
        now
    ).not_valid_after(
        now + datetime.timedelta(days=365)
    ).add_extension(
        x509.SubjectAlternativeName([
            x509.IPAddress(ipaddress.IPv4Address("127.0.0.1")),
            x509.DNSName(u"localhost"),
            x509.DNSName(u"127.0.0.1"),
            x509.IPAddress(ipaddress.IPv6Address("::1")),
        ]),
        critical=False,
    ).add_extension(
        x509.BasicConstraints(ca=False, path_length=None),
        critical=True,
    ).add_extension(
        x509.KeyUsage(
            digital_signature=True,
            key_encipherment=True,
            key_cert_sign=False,
            crl_sign=False,
            content_commitment=False,
            data_encipherment=False,
            key_agreement=False,
            encipher_only=False,
            decipher_only=False,
        ),
        critical=True,
    ).add_extension(
        x509.SubjectKeyIdentifier.from_public_key(server_key.public_key()),
        critical=False,
    ).add_extension(
        x509.AuthorityKeyIdentifier.from_issuer_public_key(ca_key.public_key()),
        critical=False,
    ).add_extension(
        x509.ExtendedKeyUsage([x509.oid.ExtendedKeyUsageOID.SERVER_AUTH]),
        critical=True,
    ).sign(
        ca_key,
        hashes.SHA256(),
        default_backend()
    )
    
    with open("cert.pem", "wb") as f:
        f.write(server_cert.public_bytes(serialization.Encoding.PEM))
    
    with open("key.pem", "wb") as f:
        f.write(server_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.TraditionalOpenSSL,
            encryption_algorithm=serialization.NoEncryption()
        ))
    
    print("[OK] Created cert.pem and key.pem")

def import_ca():
    """Import CA to Windows trust store."""
    print("Importing CA to Windows trust store...")
    ca_path = os.path.abspath("rootCA.pem")
    
    try:
        cmd = f'powershell -Command "Import-Certificate -FilePath \'{ca_path}\' -CertStoreLocation Cert:\\CurrentUser\\Root" 2>$null'
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print("[OK] CA imported to CurrentUser\\Root")
            return
    except:
        pass
    
    print("Attempting LocalMachine import (requires admin)...")
    cmd = f'powershell -NoProfile -Command "Start-Process powershell -ArgumentList \'-NoProfile\',\'-ExecutionPolicy\',\'Bypass\',\'-Command\',\'Import-Certificate -FilePath \\\\\"{ca_path}\\\\\" -CertStoreLocation Cert:\\\\LocalMachine\\\\Root\' -Verb RunAs -Wait" 2>$null'
    subprocess.run(cmd, shell=True, capture_output=True)
    print("[OK] Admin import completed")

def main():
    print("="*60)
    print("Local HTTPS CA & Certificate Setup")
    print("="*60)
    
    ca_cert, ca_key = create_ca()
    create_server_cert(ca_cert, ca_key)
    import_ca()
    
    print()
    print("="*60)
    print("[OK] Setup complete!")
    print("="*60)
    print("Files created:")
    print("  - rootCA.pem (CA certificate)")
    print("  - rootCA.key (CA private key)")
    print("  - cert.pem (server certificate)")
    print("  - key.pem (server private key)")
    print()
    print("Next:")
    print("  1. Close Chrome completely")
    print("  2. Clear cache: Ctrl+Shift+Delete > ALL TIME > Clear data")
    print("  3. Restart Chrome")
    print("  4. Open https://127.0.0.1:5000/")
    print("="*60)

if __name__ == '__main__':
    main()
