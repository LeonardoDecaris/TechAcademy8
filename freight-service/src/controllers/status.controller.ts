import { Request, Response } from "express";
import Status from "../models/status.model";

// Buscar todos os status
export const getAllStatus = async (req: Request, res: Response) => {
  try {
    const statusList = await Status.findAll();
    res.json(statusList);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar status." });
  }
};

// Criar um novo status
export const createStatus = async (req: Request, res: Response) => {
  try {
    const status = await Status.create(req.body);
    res.status(201).json(status);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar status." });
  }
};

// Buscar status por ID
export const getStatusById = async (req: Request, res: Response) => {
  try {
    const status = await Status.findByPk(req.params.id);
    if (!status) {
      return res.status(404).json({ error: "Status não encontrado." });
    }
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar status." });
  }
};

// Atualizar status
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const [updated] = await Status.update(req.body, {
      where: { id_status: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Status não encontrado." });
    }
    const updatedStatus = await Status.findByPk(req.params.id);
    res.json(updatedStatus);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar status." });
  }
};

// Deletar status
export const deleteStatus = async (req: Request, res: Response) => {
  try {
    const deleted = await Status.destroy({
      where: { id_status: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Status não encontrado." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar status." });
  }
};