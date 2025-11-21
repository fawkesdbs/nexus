from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app) # Enable CORS for local development

# Initialize OpenAI with your specific configuration
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message')

        if not message:
            return jsonify({"error": "Message is required"}), 400

        # Construct the input with the persona
        prompt = f"You are Nexus, a helpful AI productivity assistant for employees. User: {message}"

        # Using the Responses API with GPT-5.1 as requested
        response = client.responses.create(
            model="gpt-5.1",
            input=prompt
        )

        # Accessing output_text based on your test.py example
        reply = response.output_text
        return jsonify({"reply": reply})

    except Exception as e:
        print(f"Error details: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run on port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)