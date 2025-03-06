const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");

const app = express();
const HTTPS_PORT = 443;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vérifier si les fichiers SSL existent
const sslPath = "./ssl";
const privateKeyPath = `${sslPath}/private-key.pem`;
const certificatePath = `${sslPath}/certificate.pem`;

let credentials;
try {
    if (!fs.existsSync(privateKeyPath) || !fs.existsSync(certificatePath)) {
        throw new Error("Fichiers SSL manquants !");
    }
    const privateKey = fs.readFileSync(privateKeyPath, "utf8");
    const certificate = fs.readFileSync(certificatePath, "utf8");
    credentials = { key: privateKey, cert: certificate };
} catch (error) {
    console.error("❌ Erreur SSL :", error.message);
    process.exit(1);
}

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

// Démarrer le serveur HTTPS
https.createServer(credentials, app).listen(HTTPS_PORT, () => {
    console.log(`✅ Serveur HTTPS démarré sur https://172.22.0.161`);
});
