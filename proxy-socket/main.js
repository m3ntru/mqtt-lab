const express = require("express");
const http = require("http");
var cors = require("cors");
var mqtt = require("mqtt");
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

/*
mqtt init
*/ 

const io = require("socket.io")(server);

io.on("connection", function (socket) {
  socket.on("disconnect", function () {
    
  });
  socket.on("chat", function (msg) {
    //
  });
  try {
    //
  } catch {
    socket.emit("data", "Node not found.");
  }
});
