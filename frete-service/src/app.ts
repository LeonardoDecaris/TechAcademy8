import express from 'express';
import cors from "cors";
import path from 'path';

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

export default app;