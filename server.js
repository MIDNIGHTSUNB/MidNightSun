import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();

//definimos un puerto para HTTP
const port = 3000;

app.get("/", (req, res) => {
  console.log(req);
  res.send("Se creó la tarjeta con exito");
});
//Creamos una ruta para el directorio raíz en este caso solo envía el texto 'Hello world!!!' pero es común que se envíe una vista (archivo HTML)
app.post("/", (req, res) => {
  console.log(req.body);

  fetch("https://midnightsun.atlassian.net/rest/api/3/issue", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.AUTH_DATA).toString(
        "base64"
      )}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  })
    .then((response) => {
      console.log(`Response: ${response.status} ${response.statusText}`);
      return response.text();
    })
    .then((text) => res.send(text))
    .catch((err) => res.send(err));
});

//Comienza a escuchar el puerto definido 3000
app.listen(port, () => {
  console.log("Listen on the port 3000");
});