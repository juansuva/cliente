import json
import csv

import time
import tweepy








auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)


api = tweepy.API(auth,parser=tweepy.parsers.JSONParser())


f = csv.writer(open('followers_python.csv', 'wb'))

f.writerow(["screenName", "name", "location", "description"])

users = tweepy.Cursor(api.followers, screen_name="sgcol", count = 200).pages()

for u in users:
    u.keys()
    print (u.keys())
    print (dir(u))
    print (u.viewvalues())
    print (u.viewkeys())
    print (u.viewitems())
    data=json.dumps(u, indent=4) #aqui la carga bien organizadaa


    print (data)
    data=json.loads(data) #aqui la carga como un string completoo
    #screenName = u.screen_name
    print (data)

    time.sleep(60)

        #if coords is not None:
            #print ("funciona")
        #else:
            #print("tiene coredenadas")

    #name = u.name
    #location = u.location

    #coordes=u.coordinates
    #f.writerow([screenName.encode("utf-8"), name.encode("utf-8"), location.encode("utf-8")])
