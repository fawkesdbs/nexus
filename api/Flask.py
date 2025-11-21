from openai import OpenAI
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load environment variables
load_dotenv() 

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def ask_gpt(question: str) -> str:
    try:
      
        response = client.chat.completions.create(
            model="gpt-5.1",  
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant."},
                {"role": "user", "content": question}
            ],
            max_tokens=500,
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"

# Define routes
@app.route('/ask', methods=['POST'])
def ask():
    try:
        data = request.get_json()
        question = data.get('question', '')
        
        if not question:
            return jsonify({'error': 'No question provided'}), 400
        
        answer = ask_gpt(question)
        return jsonify({'answer': answer})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'OpenAI GPT API'})

# add routes here


if __name__ == '__main__':
    app.run(debug=True, port=5000)