import { Request, Response } from "express";
import docesDAO from "../dao/docesDAO";
import pool from "../config/bd";

export const listarDoces = async (req: Request, res: Response): Promise<void> => {
  try {
    const doces = await docesDAO.listar();
    res.json(doces);
  } catch (error: any) {
    console.error("❌ ERRO AO LISTAR DOCES:", error);
    res.status(500).json({ error: error.message });
  }
};

export const buscarDoce = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const doce = await docesDAO.buscarPorId(id);
    if (!doce) {
      res.status(404).json({ message: "Doce não encontrado" });
      return;
    }
    res.json(doce);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const criarDoce = async (req: Request, res: Response): Promise<void> => {
  try {
    let imagem: string | null = null;

    if (req.file) {
      imagem = `/uploads/${req.file.filename}`;
    } else if (req.body.imagem) {
      imagem = req.body.imagem;
    }

    const novoDoce = await docesDAO.criar({
      ...req.body,
      imagem,
    });

    res.status(201).json(novoDoce);
  } catch (error: any) {
    console.error("❌ ERRO AO CRIAR DOCE:", error);
    res.status(500).json({ error: error.message });
  }
};

export const atualizarDoce = async (req: Request, res: Response): Promise<void> => {
  try {
    let imagem: string | null = null;

    if (req.file) {
      imagem = `/uploads/${req.file.filename}`;
    } else if (req.body.imagem) {
      imagem = req.body.imagem;
    }

    const id = Number(req.params.id);

    const atualizado = await docesDAO.atualizar(id, {
      ...req.body,
      imagem,
    });

    if (!atualizado) {
      res.status(404).json({ message: "Doce não encontrado" });
      return;
    }

    res.json({ message: "Atualizado com sucesso" });
  } catch (error: any) {
    console.error("❌ ERRO AO ATUALIZAR DOCE:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deletarDoce = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deletado = await docesDAO.deletar(id);

    if (!deletado) {
      res.status(404).json({ message: "Doce não encontrado" });
      return;
    }

    res.json({ message: "Removido com sucesso" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const listarCategorias = async (req: Request, res: Response): Promise<void> => {
  try {
    const [categorias] = await pool.query("SELECT * FROM categorias ORDER BY nome");
    res.json(categorias);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
