from datetime import datetime

def getHistory ():
    today = datetime.today()
    datem = datetime(today.year, today.month, 1)
    print(datem.month)


getHistory()