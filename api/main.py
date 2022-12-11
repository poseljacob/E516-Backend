from tkinter import X
from flask import Flask, request, jsonify
from flask_cors import CORS
from make_request import transform
import requests
import json
import pymysql


app = Flask(__name__)
CORS(app)


conn = pymysql.connect(
    host='face.clklq3opdxp2.us-east-1.rds.amazonaws.com',  # endpoint link
    port=3306,
    user="admin",
    password="",
    db="face"
)


def insert_details(pred_age, pred_gender, true_age, true_gender, eth):
    print(pred_age, pred_gender, true_age, true_gender, eth)
    cur = conn.cursor()
    cur.execute("INSERT INTO Records (PredictedAge,PredictedGender,TrueAge,TrueGender, RaceEthnicity) VALUES (%s,%s,%s,%s,%s)",
                (pred_age, pred_gender, true_age, true_gender, eth))
    conn.commit()


# post route appends word to list
@app.route('/', methods=["POST"])
def post_image():
    img = transform(request.files['file'])
    gender_dict = {0: "Male", 1: "Female"}

    res = requests.post("https://skyi5tl9gk.execute-api.us-east-1.amazonaws.com/final/image",
                        data=json.dumps({"data": img.tolist()}))
    predictions = json.loads(res.content.decode())['predictions'][0]

    gender = gender_dict[round(predictions['gender'][0])]
    age = round(predictions['age'][0])
    print(gender, age)

    return jsonify({"gender": gender, "age": age})


@app.route('/submit', methods=["POST"])
def post_submit():
    data = json.loads(request.data.decode())
    insert_details(data['predicted_age'], data['predicted_gender'], data['age'], data['gender'], data['ethnicity'])
    return "received"


if __name__ == '__main__':
    app.run()
