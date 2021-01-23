from flask import Flask,jsonify,request
import time
import os
import base64
from run import testrun
app = Flask(__name__)

#quick api status generator
def func(image):
    return "cool"
def status(status, payload):
    return jsonify({"status":status,"payload":payload})

@app.route('/',methods=["POST"])
def api():
    #determines if required field is there
    if request.form['image']:
        cwd = os.getcwd()
        t = f"{time.time()}"
        os.mkdir(cwd+"/"+t)
        directory = f"{cwd}/{t}"
        image_path = f"{directory}/img"
        #writes image to dummy path
        with open(image_path,"wb") as f:
            f.write(base64.b64decode(request.form['image']))
        #passes image path to image processor
        data = str(testrun(directory))
        os.remove(image_path)
        os.rmdir(directory)
        #returns data
        return status(True, data)
    else:
        return status(False, "missing required field")
    return 