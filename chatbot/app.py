from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Carga las variables de entorno desde el archivo .env
load_dotenv()

# Obtén la clave de API de OpenAI desde las variables de entorno
openai_api_key = os.getenv("OPENAI_API_KEY")

# Verifica si la clave de API se cargó correctamente
if not openai_api_key:
    raise ValueError("No se ha configurado una clave de API de OpenAI en el archivo .env")

# Configura la clave de API en OpenAI
openai.api_key = openai_api_key

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json['user_message']
    
    # Define el contexto del chat con el sistema y el mensaje del usuario
    chat_context = [
        {"role": "system", "content": 'Eres un asistente virtual de una tienda online de ciclismo llamada Cycling.'},
        {"role": "system", "content": 'Cycling no tiene tienda fisica.'},
        {"role": "system", "content": 'La tienda Cycling no tiene APP por el momento.'},
        {"role": "system", "content": 'Estoy aquí para ayudarte con preguntas sobre bicicletas, accesorios, ropa de ciclismo y para guiarte en el proceso de compra o seleccion de productos para ti.'},
        {"role": "system", "content": 'Si tienes alguna pregunta sobre nuestras bicicletas, simplemente escríbela y con gusto te ayudaré'},
        {"role": "system", "content": 'Cycling aun no cuenta con una opcion para elegir tallas, pero en un futuro lo hara.'},
        {"role": "system", "content": 'Cycling aun no maneja cupones de descuentas, pero en un futuro lo hara.'},
        {"role": "system", "content": 'Para comprar cierta cantidad de un mismo producto, se hara desde el carrito de compras'},
        {"role": "system", "content": 'Cycling aún no tenga una pasarela de pago, puedes guiar a los usuarios sobre cómo agregar productos al carrito de compras y explicar el proceso de compra.'},
        {"role": "system", "content": 'Cycling aun no cuenta con envios, asi que no intruyas sobre dar información como direccion de envios, pero en un futuro lo tendra.'},
        {"role": "system", "content": 'Para comprar productos en Cycling debes estar logueado. Pero por el momento este es un Prototipo y aun no cuentas con pasarela de pago, aun asi dale intrucciones de los pasos para comprar hasta llegar al punto de pagar.'},
        {"role": "system", "content": 'Puedes añadir productos al carrito de compras sin estar logueado.'},
        {"role": "system", "content": 'Si tienes alguna pregunta sobre nuestras bicicletas, simplemente escríbela y con gusto te ayudaré'},
        {"role": "user", "content": user_message}
    ]
    
    # Genera una respuesta del chatbot
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=chat_context,
        #max_tokens=150  # Limita la respuesta a 50 tokens
    )
    
    return jsonify({"assistant_message": response['choices'][0]['message']['content']})

if __name__ == '__main__':
    app.run(debug=True, port=4003)
