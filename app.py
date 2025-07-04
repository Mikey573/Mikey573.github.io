from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route("/")
def home():
    return "✅ Flask app is running on Render!"

@app.route("/callback")
def callback():
    code = request.args.get("code")
    if not code:
        return "❌ No code received", 400

    # 🔧 Replace with your real credentials
    data = {
        "app_key": "YOUR_APP_KEY",
        "app_secret": "YOUR_APP_SECRET",
        "code": code
    }

    res = requests.post("https://auth.lazada.com/rest", data=data)
    return jsonify(res.json())
