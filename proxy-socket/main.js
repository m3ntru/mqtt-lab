const express = require("express");
const http = require("http");
var cors = require("cors");
var mqtt = require("mqtt");
const config = require("./config.json");
const app = express();

var serverPort = 8282;

var server = http.createServer(app);

//set the template engine ejs

app.use(cors());

//middlewares
app.use(express.static("public"));

//routes
app.get("/", (req, res) => {
  res.type("text/plain");
  res.status(200).send("YOLO");
});

server.listen(serverPort, () => {
  console.log("ssh websocket server started");
});
const client = mqtt.connect(`mqtt://${config.host}:${config.port}`, {
  username: config.username,
  password: config.password,
});

client.on("connect", function () {
  console.log("MQTT CONNECTION START");
  client.subscribe(config.topic);
});

const io = require("socket.io")(server);

io.on("connection", function (socket) {
  socket.on("disconnect", function () {});
  socket.on("chat", function (msg) {
    client.publish(config.topic, JSON.stringify(msg));
  });
  try {
    client.on("message", function (topic, msg) {
      socket.emit("chat", JSON.parse(msg));
    });
  } catch {
    socket.emit("data", "Node not found.");
  }
});
