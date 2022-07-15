import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish
import json
from datetime import datetime

# load config
with open("config.json") as file:
  config = json.load(file)
  host= config["host"]
  port= config["port"]
  keepalive= 60
  username= config["username"]
  password= config["password"]
  subtopic= config["topic"]

# mqtt subscribe
def mqtt_sub(client, userdata, flags, rc):
  print("Connected")
  client.subscribe(subtopic)

# mqtt message
def mptt_message(client, userdata, msg):
  res = json.loads(msg.payload)
  print(res)
  now = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
  f = open('log.txt','a')
  f.write(f'[{now}]{res["name"]}:{res["message"]}\n')
  f.close()

# mptt init
client = mqtt.Client()
client.on_connect = mqtt_sub
client.on_message = mptt_message
client.username_pw_set(username, password)
client.connect(host, port, keepalive)
client.loop_forever()
