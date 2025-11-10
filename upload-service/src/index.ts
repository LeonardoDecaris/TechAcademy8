import express from 'express';
import path from 'node:path';
import uploadsRouter from './routes/uploads.js';

const app = express();
const PORT = Number(process.env.PORT || 3001);
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.resolve('/app/uploads');
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || 'http://localhost:3000';

app.use(express.json());

// Servir arquivos
app.use('/files', express.static(UPLOAD_DIR));

// Rotas de upload
app.use('/uploads', uploadsRouter({ uploadDir: UPLOAD_DIR, baseUrl: PUBLIC_BASE_URL }));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`image-service listening on ${PORT}`);
});