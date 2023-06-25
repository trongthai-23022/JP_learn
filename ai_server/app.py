from flask import Flask,request
from flask import jsonify
from tensorflow import keras
import numpy as np
import Labels
import modelProcess as pr
from werkzeug.utils import secure_filename
import os
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False
UPLOAD_FOLDER = 'upload/'
PATH = 'upload/requestImg.png'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
model = keras.models.load_model('model64.h5')

# @app.route("/")
# def home():
#     return jsonify({'name':'愛'})

@app.route('/model',methods = ["POST","GET"])
def predict():

    if request.method == "POST":
        # print("request data", np.asarray(request.files))
        try:
            data = request.form.get("data")
            pr.covertBase64ToImg(data)
            img = pr.readAndProcessImg(PATH)
            response = []
            
            for image in img:
                results = ""
                for c in image:
                    c = abs(255 - c)
                    result = model.predict(c.reshape(1, 64, 64, 1))
                    label = Labels.labels[np.argmax(result)]               
                    results+=label
                response.append(results)
            
            response.reverse()
            return jsonify({"Kanji":response[0:]})
        except Exception as e:
            return jsonify(e)
    if request.method == "GET":
        try:
            return jsonify(Labels.labels)
        except Exception as e:
            return jsonify(e)
if __name__ == "__main__":
    app.run(debug=True)
