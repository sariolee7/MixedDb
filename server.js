import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { FirestoreService } from './nosql/firestore_service.js';
import SqlConnection from './sql/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

const imagesService = new FirestoreService("LoginApp");

// Middleware básico
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//////////////////////////////////////////////////////////////////////////////////////

// POST /register usuario
app.post('/register', async (req, res) => {
  const {cedula , saldo, viajesDiarios, horarioFrecuente, rutaMaxUtilizada} = req.body;
  if (!cedula || !saldo || !viajesDiarios || !horarioFrecuente || !rutaMaxUtilizada) return res.status(400).send("Missing fields.");

  const db = new SqlConnection();

  try {
    await db.connectToDb();
    await db.query(
      "INSERT INTO usuarios (cedula , saldo, viajesDiarios, horarioFrecuente, rutaMaxUtilizada) VALUES (?, ?, ?, ?, ?)",
      [cedula , saldo, viajesDiarios, horarioFrecuente, rutaMaxUtilizada]
    );
    res.status(200).send("User registered.");
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error registering user.");
  } finally {
    await db.closeConnection();
  }
});

// POST /register trasporte
app.post('/registerTrans', async (req, res) => {
  const {idmediosTransporte, tipo, numRuta, placa, empresa} = req.body;
  if (!idmediosTransporte || !tipo || !numRuta || !placa || !empresa) return res.status(400).send("Missing fields.");

  const db = new SqlConnection();

  try {
    await db.connectToDb();
    await db.query(
      "INSERT INTO mediostransporte (idmediosTransporte, tipo, numRuta, placa, empresa) VALUES (?, ?, ?, ?, ?)",
      [idmediosTransporte, tipo, numRuta, placa, empresa]
    );
    res.status(200).send("User registered.");
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error registering user.");
  } finally {
    await db.closeConnection();
  }
});

// POST /register Alerta
app.post('/registerAlert', async (req, res) => {
  const {idAlertas , horariosRepetidos, recargasMagicas} = req.body;
  if (!idAlertas || !horariosRepetidos || !recargasMagicas) return res.status(400).send("Missing fields.");

  const db = new SqlConnection();

  try {
    await db.connectToDb();
    await db.query(
      "INSERT INTO alertas (idAlertas , horariosRepetidos, recargasMagicas, usuarios_cedula) VALUES (?, ?, ?, 1)",
      [idAlertas , horariosRepetidos, recargasMagicas]
    );
    res.status(200).send("User registered.");
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error registering user.");
  } finally {
    await db.closeConnection();
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
////////////////////////////////////////////////////////////////////////////////////////