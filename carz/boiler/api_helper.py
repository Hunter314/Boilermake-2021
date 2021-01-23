from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup
from time import sleep
def status(status,payload):
    return JsonResponse({"status":status,"payload":payload})

def process(license):
    lister = []
    soup = None
    counter  = 0
    url = f"https://api.carsxe.com/platedecoder?key=0hsbdq9rl_o6thqm9v5_bv25wj6aa&plate={license}&state=IN&format=json"
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
            return {"make":json['CarMake'],"model":json["CarModel"].split(" ")[0],"year":int(json["RegistrationYear"])}
        else:
            return False
