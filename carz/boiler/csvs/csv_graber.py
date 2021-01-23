import requests

def main():
    for i in range(16):
        string = "{:0>2d}".format(i)
        r = requests.get(f"https://www.epa.gov/sites/production/files/2016-07/{string}tstcar.csv")
        if r.status_code == 200:
            with open(f"./year{i + 1}.csv","w") as f:
                f.write(r.text)


if __name__ == "__main__":
    main()