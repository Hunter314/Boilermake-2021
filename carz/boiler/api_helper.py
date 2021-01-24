import base64

from django.http import JsonResponse
import requests
import json
from bs4 import BeautifulSoup
from time import sleep

def status(status,payload):
    return JsonResponse({"status":status,"payload":payload})


def process_img(img):
    # enc_img = base64.b64encode(img.read())
    file = {'upload': img}

    r = requests.post('https://api.platerecognizer.com/v1/plate-reader/',
                      files=file,
                      headers={"authorization":"Token fa43527529a25e1c6b2cd1670c6ccb74d6e1104e"})

    return_dict = r.json()
    license = return_dict['results'][0]['plate']
    state = return_dict['results'][0]['region']['code']
    try:
        state = state[4:6]
        state = state.upper()
    except ValueError:
        # Not in US
        # All US State plates are of the form:
        # us-XX where XX is the lowercase state abbreviation
        sucess = False
        return False

    return {"state":state,"license":license}


def process(license, state):
    lister = []
    soup = None
    counter  = 0
    url = f"https://api.carsxe.com/platedecoder?key=zec39wzfq_yagecmcew_twtfw6cmx&plate={license}&state={state}&format=json"
        # headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64;     x64; rv:66.0) Gecko/20100101 Firefox/66.0",
        #            "Accept-Encoding": "gzip, deflate",
        #            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8", "DNT": "1",
        #            "Connection": "close", "Upgrade-Insecure-Requests": "1"}
    r = requests.get(url)
    if r.status_code == 200:
    #     if r.status_code == 200:
    #         soup = BeautifulSoup(r.text,'html.parser')
    #         print(soup.select("body tr b"))
    #         if soup.select("body tr b"):
    #             break
    #         sleep(20)
    #         counter += 20
    # for item in soup.select("body tr b"):
    #     item = str(item)
    #     item = item.strip("<b>")
    #     item = item.strip("</b>")
    #     lister.append(item)
        json = r.json()
        if json['success']:
            print({"make":json['CarMake'],"model":json["CarModel"].split(" ")[0],"year":int(json["RegistrationYear"])})
            return {"make":json['CarMake'],"model":json["CarModel"].split(" ")[0],"year":int(json["RegistrationYear"])}
        else:
            return False


def upload(img):
    url = f"http://api.carsxe.com/whatcaristhat?key=0hsbdq9rl_o6thqm9v5_bv25wj6aa"
    r = requests.post(url,headers = {'Content-type': 'text/plain'},data="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/2006-2009_Honda_Civic_VTi_sedan_%282018-10-19%29_01.jpg/800px-2006-2009_Honda_Civic_VTi_sedan_%282018-10-19%29_01.jpg")
    if r.status_code == 200:
        print(r.json())
    else:
        print(r.status_code)
