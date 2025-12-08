import time, urllib.request

url = 'http://127.0.0.1:5000/'
for i in range(12):
    try:
        with urllib.request.urlopen(url, timeout=3) as r:
            print('STATUS', r.status)
            body = r.read(1000)
            print('BODY_PREVIEW:\n', body.decode('utf-8', errors='replace')[:500])
            break
    except Exception as e:
        print('TRY', i, 'FAILED:', e)
        time.sleep(0.5)
else:
    print('FAILED: server did not respond')
