import os
from flask import Flask, request
from flask_cors import CORS
import openai

# Load your API key from an environment variable or secret management service
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize your Flask app
app = Flask(__name__)
CORS(app)

@app.route('/completion', methods=['POST'])
def completion():
    # Get the request body
    request_json = request.get_json()

    # Assembling the prompt by combining conversation, memories, and program fields
    prompt = request_json['program'] + "\n\n"
    prompt += request_json['memories'] + "\n\n"
    prompt += request_json['conversation']

    print(prompt)

    # Run the request
    response = openai.Completion.create(model="text-davinci-003", 
        prompt=prompt, 
        temperature=0, 
        max_tokens=128)

    # Return the completion text in the response
    return {'data': response['choices'][0]['text']}