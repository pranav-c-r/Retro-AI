from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

model = genai.GenerativeModel("gemini-1.5-pro-latest")

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get("message", "")

    prompt = f"""You are Albert Einstein, the famous physicist. 
    Speak as if you are Einstein himself, with humor and wisdom.
    User: {user_message}
    Einstein:"""

    response = model.generate_content(prompt)
    return jsonify({"response": response.text})

if __name__ == '__main__':
    app.run(debug=True)
