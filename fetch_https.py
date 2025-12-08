import ssl, urllib.request, sys
ctx = ssl._create_unverified_context()
urls = ['https://127.0.0.1:5000/', 'https://localhost:5000/', 'http://127.0.0.1:5000/']
for u in urls:
    try:
        with urllib.request.urlopen(u, context=ctx, timeout=5) as r:
            data = r.read(2000)
            print(f'OK {u} -> {r.status}, {len(data)} bytes')
            print(data.decode('utf-8', errors='replace')[:1000])
    except Exception as e:
        print(f'ERR {u} -> {type(e).__name__}: {e}')
