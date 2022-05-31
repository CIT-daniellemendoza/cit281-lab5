/*
    CIT 281
    Danielle Mendoza
    Lab 04

*/

const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
];


const fastify = require("fastify")();

// cit/student route
fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});

// cit/student/:id route
fastify.get("/cit/student/:id", (request, reply) => {
    const {id} = request.params;
    let studentIdFromClient = parseInt(id);  
    let studentToSendToClient = null;
    for (studentInArray of students) {
        if (studentInArray.id == id) {
            studentToSendToClient = studentInArray;
            break;
        }
    }
    if (studentToSendToClient != null) {
        reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(studentToSendToClient);
    } else {
        reply
        .code(404)
        .header("Content-Type", "application/json; charset=utf-8")
        .send("Student not found student with id.");
    }
});
  

// student/id unmatched route handler
fastify.get("*", (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("<h1>Unmatched Route</h1>");
});


// add student using Post 
fastify.post("/cit/student/add", (request, reply) => {
    // get info from client
    let dataFromClient = JSON.parse(request.body);
    console.log(dataFromClient);
    //use the info and add it to our original "students" array
    let maxID = 0;
    for (individualStudent of students) {
        if (maxID < individualStudent.id) {
            maxID = individualStudent.id;
        }
    }
    let generatedStudent = {
            id: maxID + 1,
            last: dataFromClient.last,
            first: dataFromClient.first
    };
    students.push(generatedStudent);
    // send reply to the client
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(generatedStudent);
});
  

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
