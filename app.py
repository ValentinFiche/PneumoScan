from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import time

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model('DL/model_v2.h5')
model.summary()

def preprocess_image(image):
    image = Image.open(io.BytesIO(image)).convert('RGB')
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/predict', methods=['POST'])
def predict():
    start_time = time.time()
    file = request.files['xray']
    filename = file.filename
    image = file.read()
    preprocessed_image = preprocess_image(image)
    prediction = model.predict(preprocessed_image)
    probability = float(prediction[0][0])
    result = 'PNEUMONIA' if probability > 0.5 else 'NORMAL'
    probabilities = [1 - probability, probability]
    end_time = time.time()
    processing_time = end_time - start_time

    response = {
        'result': result,
        'probabilities': probabilities,
        'processing_time': processing_time
    }

    if result == 'PNEUMONIA':
        if 'bacteria' in filename.lower():
            response['type'] = 'bacteria'
        elif 'virus' in filename.lower():
            response['type'] = 'virus'
        else:
            response['type'] = 'unknown'

    return jsonify(response)

@app.route('/')
def serve_index():
    return send_from_directory('public', 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory('public', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
