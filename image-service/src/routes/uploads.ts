import { Router, Request } from 'express';
// Trocar .ts por .js para funcionar após build com ESM
import { makeMulter } from '../multer.js';

interface Opts {
  uploadDir: string;
  baseUrl: string;
}

export default function uploadsRouter({ uploadDir, baseUrl }: Opts) {
  const router = Router();
  const upload = makeMulter(uploadDir);

  // Upload simples: campo "image"
    router.post('/', upload.single('image'), (req: Request & { file?: Express.Multer.File }, res) => {
      if (!req.file) return res.status(400).json({ error: 'Arquivo ausente' });
  
      const filename = req.file.filename;
      const url = `${baseUrl}/files/${filename}`;
  
      return res.status(201).json({
        filename,
        url,
        size: req.file.size,
        mime: req.file.mimetype,
        path: `/files/${filename}`
      });
    });

  return router;
}