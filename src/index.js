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



const connectDB = async () => {
  const conex = await mysql.createConnection({
    host: "localhost",
    user: process.env.USER_DB,
    password: process.env.USER_PASS,
    database: "Evaluacion",
  });
  await conex.connect();
  console.log(`conexion establecida ${conex.threadId}`);
  return conex;
};

connectDB();

app.post('/Alumnado', async (req, resp) => {
    const sql = 
    'INSERT INTO Alumnado (Nombre, Edad, Curso) VALUES (?,?,?)';

    const conex = await connectDB();

    const [results] = await conex.query(sql, [
        req.body.Nombre,
        req.body.Edad,
        req.body.Curso,
    ]);

    console.log(results);
    conex.end();

    resp.json({
        id: results.insertId, message: 'se ha insertado'
    });
});



app.get('/TodoAlumnado', async (req, resp) => {
    const conex = await connectDB();
    const sql = 'SELECT * FROM Alumnado';

    const [results, fields] = await conex.query(sql);
    
    conex.end();
    resp.json({
        success: true,
        data: results,
    })
})


app.get('/Filtrado', async (req, resp) => {
    const { Nombre } = req.query;
    const conex = await connectDB();
    const sql = 'SELECT * FROM Alumnado WHERE Nombre = ?';

    const [results] = await conex.query(sql, [Nombre]);
    
    conex.end();
    resp.json(results);

})


app.post('/ModificarCurso', async (req, resp) => {
    const { Curso, ID } = req.query;
    const conex = await connectDB();
    const sql = 'UPDATE Alumnado SET Curso = ? WHERE ID = ? ';

    const [results] = await conex.query(sql, [Curso, ID]);
    
    conex.end();
    resp.json(results);

})


app.get('/Borrado', async (req, resp) => {
    const { ID } = req.query;
    const conex = await connectDB();
    const sql = 'DELETE FROM Alumnado WHERE ID = ?';

    const [results] = await conex.query(sql, [ID]);
    
    conex.end();
    resp.json(results);
})