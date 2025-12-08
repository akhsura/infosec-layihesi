"""
Generate a self-signed certificate for localhost development.
Run once: python gen_cert.py
Produces: cert.pem and key.pem in the project folder.
"""
from cryptography import x509
from cryptography.x509.oid import NameOID, ExtensionOID
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
import datetime
import ipaddress

# Generate private key
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
    backend=default_backend()
)

# Build certificate subject and issuer (self-signed)
subject = issuer = x509.Name([
    x509.NameAttribute(NameOID.COMMON_NAME, u"127.0.0.1"),
])

# Build certificate with SANs
cert = x509.CertificateBuilder().subject_name(
    subject
).issuer_name(
    issuer
).public_key(
    private_key.public_key()
).serial_number(
    x509.random_serial_number()
).not_valid_before(
    datetime.datetime.utcnow()
).not_valid_after(
    datetime.datetime.utcnow() + datetime.timedelta(days=365)
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
).sign(
    private_key,
    hashes.SHA256(),
    default_backend()
)

# Write certificate to file
with open("cert.pem", "wb") as f:
    f.write(cert.public_bytes(serialization.Encoding.PEM))

# Write private key to file
with open("key.pem", "wb") as f:
    f.write(private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=serialization.NoEncryption()
    ))

print("✅ Generated cert.pem and key.pem (self-signed, 365 days valid)")
print("Now run: python main.py")
