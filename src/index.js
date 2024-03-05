const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const serverPort = 4000;
app.listen(serverPort, () => {
  console.log(`http://localhost:${serverPort}`);
});

//CONECTAR CON BASE DE DATOS:

const connectDB = async () => {
  const conex = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root12345678",
    database: "Evaluacion",
  });
  await conex.connect();
  console.log(`conexion establecida ${conex.threadId}`);
  return conex;
};

connectDB();
