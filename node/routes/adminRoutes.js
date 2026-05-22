import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUsuarios, cambiarEstado } from "../controller/adminController.js";
import { importUsers } from "../controller/importController.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Middleware: solo Administrador
const soloAdmin = (req, res, next) => {
  if (req.user.rol !== "Administrador") {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};

router.get("/usuarios", authMiddleware, soloAdmin, getUsuarios);
router.patch("/usuarios/:id/estado", authMiddleware, soloAdmin, cambiarEstado);
router.post("/import-users", authMiddleware, soloAdmin, upload.single('file'), importUsers);

export default router;