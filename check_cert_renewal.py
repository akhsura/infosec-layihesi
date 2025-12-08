"""
Automatic HTTPS certificate renewal checker.
Regenerates certificates if they're expiring within 30 days.
Can be scheduled to run daily via Windows Task Scheduler.
"""
import os
import subprocess
from datetime import datetime, timedelta
from cryptography import x509
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization

def check_cert_expiry(cert_path='cert.pem'):
    """Check if certificate exists and when it expires."""
    if not os.path.exists(cert_path):
        print(f"[ERROR] Certificate not found: {cert_path}")
        return None
    
    with open(cert_path, 'rb') as f:
        cert_data = f.read()
    
    cert = x509.load_pem_x509_certificate(cert_data, default_backend())
    expiry_date = cert.not_valid_after
    
    print(f"Certificate expires: {expiry_date}")
    print(f"Current time: {datetime.utcnow()}")
    
    return expiry_date

def should_renew(expiry_date, days_before=30):
    """Check if certificate should be renewed (expiring within N days)."""
    if expiry_date is None:
        return True
    
    renewal_date = datetime.utcnow() + timedelta(days=days_before)
    
    if expiry_date.replace(tzinfo=None) <= renewal_date:
        days_remaining = (expiry_date.replace(tzinfo=None) - datetime.utcnow()).days
        print(f"[WARNING] Certificate expires in {days_remaining} days - RENEWING NOW")
        return True
    else:
        days_remaining = (expiry_date.replace(tzinfo=None) - datetime.utcnow()).days
        print(f"[OK] Certificate valid for {days_remaining} more days")
        return False

def renew_certificates():
    """Run the certificate generation script."""
    print("\n[*] Regenerating certificates...")
    result = subprocess.run(['python', 'setup_trusted_https.py'], 
                          capture_output=True, text=True)
    
    if result.returncode == 0:
        print("[OK] Certificates renewed successfully!")
        return True
    else:
        print(f"[ERROR] Certificate renewal failed: {result.stderr}")
        return False

def main():
    print("="*60)
    print("HTTPS Certificate Renewal Checker")
    print("="*60)
    
    # Check current certificate
    expiry_date = check_cert_expiry()
    
    # Decide if renewal is needed
    if should_renew(expiry_date, days_before=30):
        renew_certificates()
    
    print("="*60)

if __name__ == '__main__':
    main()
