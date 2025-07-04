import requests, os

def fetch_token(code):
    resp = requests.get(
        'https://auth.lazada.com/rest/auth/token',
        params={
            'grant_type':   'authorization_code',
            'code':         code,
            'app_key':      os.environ['LAZADA_CLIENT_ID'],
            'app_secret':   os.environ['LAZADA_CLIENT_SECRET'],
            'redirect_uri': os.environ['LAZADA_CALLBACK_URL']
        }
    )
    return resp.json()
