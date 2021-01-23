from flask import Flask,jsonify,request
import time
import base64
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
        image_path = f"./pics/{time.time()}.png"
        #writes image to dummy path
        with open(f"./pics/{time.time()}.png","wb") as f:
            f.write(base64.b64decode(request.form['image']))
        #passes image path to image processor
        data = func(image_path)
        #returns data
        return status(True, data)
    else:
        return status(False, "missing required field")
    return 