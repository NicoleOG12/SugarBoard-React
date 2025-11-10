import express, { Router } from "express";
import multer from "multer";
import path from "path";
import {
  listarDoces,
  buscarDoce,
  criarDoce,
  atualizarDoce,
  deletarDoce,
  listarCategorias,
} from "../controllers/docesController.js";

const router: Router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads"), 
  filename: (_req, file, cb) => {
    const nomeArquivo = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, nomeArquivo);
  },
});

const upload = multer({ storage });

router.get("/", listarDoces);
router.get("/categorias", listarCategorias);
router.get("/:id", buscarDoce);

router.post("/", upload.single("imagem"), criarDoce);
router.put("/:id", upload.single("imagem"), atualizarDoce);
router.delete("/:id", deletarDoce);

export default router;
