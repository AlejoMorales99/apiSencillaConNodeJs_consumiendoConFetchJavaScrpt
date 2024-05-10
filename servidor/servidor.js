const express = require("express");
const cors = require("cors");
const connection = require("./bd");

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*' , 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));


app.get("/", (req,res) => {
  res.send("API EN NODE JS");
})


app.get("/getUsuarios/:inicioR/:finR", (req, res) => {

  const inicioR =  parseInt(req.params.inicioR);
  const finR = parseInt( req.params.finR);
  const offset = (inicioR - 1) * finR;

  connection.query("SELECT * FROM usuarios LIMIT ?,? ", [offset,finR] , (error, results) => {
    if (error) {
      res.status(500).send( {error: "error en el servidor"} );
      console.log("Error en " ,  error);
      return;
    }
    res.json(results);
  });
});

app.get("/getOneUser/:id", (req, res) => {

  const id = req.params.id;

  connection.query("SELECT * FROM usuarios WHERE id = ?",id,(error, results) => {
    if (error) {
      res.status(500).send("Error interno en el servidor");
      return;
    }
    res.json(results);
  });
});


app.delete("/eliminarUsuario/:userId", (req, res) => {
  const userId = req.params.userId;
  connection.query(
    `DELETE FROM usuarios WHERE id = ?`, userId ,
    (error, results) => {
      if (error) {
        res.status(500).send("Error interno en el servidor");
        return;
      }

      res.send("Usuario eliminado correctamente");
    }
  );
});

app.post("/insertarUsuario", (req, res) => {
  
  const nombre = req.body.nombre;
  const telefono = req.body.telefono;
  const correo = req.body.correo;
  const ciudad = req.body.ciudad;
  const fecha = req.body.fecha;


   connection.query(
    `insert into usuarios (nombre,email,telefono,ciudad,fecha)  VALUES (?,?,?,?,?)`, [nombre,correo,telefono,ciudad,fecha] , (error, results) => {
      if (error) {
        res.status(500).send({ error: "Error interno en el servidor" });
        return;
      }

      res.status(200).json(results);
    }
  ); 
});


app.put("/actualizarUsuario", (req, res) => {
  
  const id = req.body.id;
  const nombre = req.body.nombre;
  const telefono = req.body.telefono;
  const correo = req.body.correo;
  const ciudad = req.body.ciudad;
  const fecha = req.body.fecha;

  

   connection.query(
    `update usuarios set nombre = ?, email=?, telefono=?, ciudad=? , fecha = ? where id = ? `, [nombre,correo,telefono,ciudad,fecha,id],  (error, results) => {
      if (error) {
        res.status(500).send({ error: "Error interno en el servidor" });
        return;
      }

      res.status(200).json(results);
    }
  ); 
});


const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});