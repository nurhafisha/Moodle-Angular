import multer from "multer";
import path from "path";

// Definir la configuration de stockage pour multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");  // Dossier où les fichiers seront stockés
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});


const createStorage = (folder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder); 
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
  });
};

const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const isValid =
    allowedTypes.test(file.mimetype) &&
    allowedTypes.test(path.extname(file.originalname).toLowerCase());
  cb(isValid ? null : new Error("Only image files are allowed"), isValid);
};

export const uploadImage = multer({
  storage: createStorage("uploads/profiles/"),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
});

export default upload;