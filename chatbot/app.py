from flask import Flask, request, jsonify
from flask_cors import CORS

import openai

app = Flask(__name__)
CORS(app)

#Configuracion de clave
openai.api_key = "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";

@app.route('/api/chat', methods=['POST'])

def chat():
    user_message = request.json['user_message']
    
    # Define el contexto del chat con el sistema y el mensaje del usuario
    chat_context = [
        {"role": "system", "content": "Eres un asistente virtual de la tienda de ciclismo llamada Cycling"},
        {"role": "user", "content": user_message}
    ]
    
    # Genera una respuesta del chatbot
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=chat_context
    )
    
    return jsonify({"assistant_message": response['choices'][0]['message']['content']})

if __name__ == '__main__':
    app.run(debug=True, port=4003)
