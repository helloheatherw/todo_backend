const serverlessHttp = require("serverless-http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", function(request, response) {
  response.status(200).json([{
    "id": 1,
    "text": "Paint and oil outdoor furniture",
    "completed": false,
    "dueDate": "2020-07-01"
  }, {
    "id": 2,
    "text": "Hang pictures in bedroom",
    "completed": false,
    "dueDate": "2020-07-10"
  }
  ])
})

app.delete("/tasks/:taskId", function(request, response) {
  const taskId = request.params.taskId;
  const someResponse = { 
    "message": `You issued a delete request for ID: ${taskId}`
  }

  if(taskId > 2) {
    response.status(404).send({ "message": "Not a valid task id"})
  } else {
    response.status(200).send(someResponse)
  }
})

app.post("/tasks", function(request, response) {
  const taskText = request.body.text;
  const taskDueDate = request.body.dueDate;
  
  const someResponse = {
    "message": `Hello - you are trying to add a task which is ${taskText} and this is due on ${taskDueDate}`
  }

  response.status(200).send(someResponse)
})

app.put("/tasks/:taskId", function(request, response) {
  const taskId = request.params.taskId;

  response.status(200).send({"message": `You are trying to edit a task with an id of ${taskId}`})
})

module.exports.app = serverlessHttp(app);