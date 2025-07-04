from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

@app.route('/auth/lazada/callback')
def callback():
    code = request.args.get('code')
    if not code:
        return 'Missing code', 400

    token_res = requests.get(
        'https://auth.lazada.com/rest/auth/token',
        params={
            'grant_type': 'authorization_code',
            'code': code,
            'app_key': os.environ['LAZADA_CLIENT_ID'],
            'app_secret': os.environ['LAZADA_CLIENT_SECRET'],
            'redirect_uri': os.environ['LAZADA_CALLBACK_URL']
        }
    )
    return jsonify(token_res.json())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
