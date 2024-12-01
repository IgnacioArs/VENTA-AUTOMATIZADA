from fastapi import APIRouter
from dotenv import load_dotenv
import tensorflow as tf
import numpy as np
import nltk
import json
import random
from nltk.stem import LancasterStemmer

# Asegurarse de descargar los recursos necesarios de NLTK
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('punkt_tab')

# Inicializar variables y utilidades
stemmer = LancasterStemmer()
load_dotenv()

# Inicializar el router para la API
route = APIRouter(
    prefix="/api",
    tags=["IA-TENSORFLOW-KERAS-MS"]
)

# Cargar los intents desde el archivo JSON
with open('./app/src/utils/intents.json') as file:
    intents = json.load(file)

# Procesamiento de datos para el entrenamiento
words = []
classes = []
documents = []
ignore_words = ['?', '!']

# Preprocesamiento de los datos
for intent in intents['intents']:
    for pattern in intent['patterns']:
        word_list = nltk.word_tokenize(pattern)
        words.extend(word_list)
        documents.append((word_list, intent['tag']))
        
        if intent['tag'] not in classes:
            classes.append(intent['tag'])

words = [stemmer.stem(w.lower()) for w in words if w not in ignore_words]
words = sorted(list(set(words)))
classes = sorted(list(set(classes)))

# Preparación de datos de entrenamiento
training = []
output_empty = [0] * len(classes)

for doc in documents:
    bag = []
    word_patterns = [stemmer.stem(w.lower()) for w in doc[0]]
    for w in words:
        bag.append(1 if w in word_patterns else 0)
    
    output_row = list(output_empty)
    output_row[classes.index(doc[1])] = 1
    
    training.append([bag, output_row])

# Convertir a numpy arrays
training = np.array(training, dtype=object)
train_x = np.array(list(training[:, 0]))
train_y = np.array(list(training[:, 1]))

# Construir el modelo de red neuronal
model = tf.keras.Sequential([
    tf.keras.layers.Dense(8, input_shape=(len(train_x[0]),), activation='relu'),
    tf.keras.layers.Dense(8, activation='relu'),
    tf.keras.layers.Dense(len(train_y[0]), activation='softmax')
])

# Compilar el modelo
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Entrenar el modelo
model.fit(train_x, train_y, epochs=200, batch_size=8)

# Guardar el modelo entrenado
model.save("chatbot_model.h5")

# Función para predecir el intent
def predict_intent(sentence):
    bag = [0] * len(words)
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [stemmer.stem(word.lower()) for word in sentence_words]
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    
    res = model.predict(np.array([bag]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]

    results.sort(key=lambda x: x[1], reverse=True)
    return [{"intent": classes[r[0]], "probability": str(r[1])} for r in results]

# Ruta para manejar la comunicación con el chat-bot
@route.get('/chat-bot')
async def obtenerApis(message: str):
    intents_prediction = predict_intent(message)
    
    if intents_prediction:
        intent = intents_prediction[0]['intent']
        for i in intents['intents']:
            if i['tag'] == intent:
                response = random.choice(i['responses'])
                break
    else:
        response = "Lo siento, no entendí eso. ¿Puedes reformularlo?"
    
    return {"response": response}




"""     https://medium.com/@abdulelahalwainany/build-your-own-chatbot-with-tensorflow-a-step-by-step-guide-afc374c40958 """