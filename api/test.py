import requests
import base64

strang = ''
with open("./cover.png", "rb") as f:
    strang = base64.b64encode(f.read())
strang[2:]
# print(strang)
# with open("./pics/epic.png","wb") as f:
#     f.write(base64.b64decode(strang))
r = requests.post("http://34.123.80.218:5000/",data= {"image":strang})