import multer from 'multer';
import path from 'node:path';

export function makeMulter(uploadDir: string, maxSizeBytes = 20 * 1024 * 1024) {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      // Mantém comportamento antigo: Date.now + extensão original
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
  });

  // Sem fileFilter (aceita o mesmo que aceitava antes). Mantém apenas o limite de tamanho.
  return multer({ storage, limits: { fileSize: maxSizeBytes } });
}