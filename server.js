const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const HTTP_PORT = 80; // Utilisez le port HTTP standard, vous pouvez également choisir un autre port

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes API
app.get("/", (req, res) => res.json({ "message": "Hello !" }));
app.get("/startvmc", (req, res) => res.json({ "message": "La VMC s'est allumée !" }));
app.get("/stopvmc", (req, res) => res.json({ "message": "La VMC s'est éteinte !" }));
app.get("/info", (req, res) => res.json({
    "message": "La VMC s'est éteinte !",
    "statut": "ON",
    "temperature": "30°C",
    "hygrométrie": "80%"
}));

// Démarrer le serveur HTTP
app.listen(HTTP_PORT, () => {
    console.log(`✅ Serveur HTTP démarré sur http://10.112.131.117:${HTTP_PORT}`);
});
