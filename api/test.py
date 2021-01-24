import requests
import base64

strang = ''
with open("./cover.png", "rb") as f:
    strang = base64.b64encode(f.read())
strang[2:]
# print(strang)
# with open("./pics/epic.png","wb") as f:
#     f.write(base64.b64decode(strang))
r = requests.post("http://127.0.0.1:8000/api/image",data= {"image":strang})
print(r.text)