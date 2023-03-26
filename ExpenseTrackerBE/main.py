import json

from flask import Flask, jsonify, request
from datetime import datetime
import os
import logging
from flask_cors import CORS

from flask import Flask

from Transaction import Transaction

app = Flask(__name__)
CORS(app)

month = ["", "Jan", "Feb", "March", "Apr", "may", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

logging.basicConfig(format='%(asctime)s %(message)s')
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

today = datetime.today()
date = datetime(today.year, today.month, 1)
currentMonth = month[date.month]


@app.route('/my-first-api', methods=['GET'])
def hello():
    return "Hello world!"


@app.route('/history', methods=['GET'])
def getHistory():
    logger.debug("getting history transation")
    message = ""

    try:
        with open(currentMonth + ".json", "r") as f:
            if os.path.getsize(currentMonth + ".json") == 0:
                return []
            else:
                data = json.load(f)
                message = data
        return message
    except:
        logger.error("File not found")
        with open(currentMonth + ".json", "w") as f:
            print("File created")
        return []


@app.route('/addtransaction', methods=['POST'])
def addTransaction():
    content = request.get_json()
    previousData = []
    with open(currentMonth + ".json") as f:
        if os.path.getsize(currentMonth+".json") != 0:
            previousData = json.load(f)
    nextId = len(previousData) + 1
    content["id"] = nextId
    previousData.append(content)
    print(previousData)

    with open(currentMonth + ".json", "w") as f:
        json.dump( previousData, f)
    return previousData


if __name__ == "__main__":
    app.run(debug=True)
