import { Request, Response } from "express";
import Freight from "../models/freight.model";

// Buscar todos os fretes
export const getAllFreights = async (req: Request, res: Response) => {
  try {
    const freights = await Freight.findAll();
    res.json(freights);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar fretes." });
  }
};

// Criar um novo frete
export const createFreight = async (req: Request, res: Response) => {
  try {
    const freight = await Freight.create(req.body);
    res.status(201).json(freight);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar frete." });
  }
};

// Buscar frete por ID
export const getFreightById = async (req: Request, res: Response) => {
  try {
    const freight = await Freight.findByPk(req.params.id);
    if (!freight) {
      return res.status(404).json({ error: "Frete não encontrado." });
    }
    res.json(freight);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar frete." });
  }
};

// Atualizar frete
export const updateFreight = async (req: Request, res: Response) => {
  try {
    const [updated] = await Freight.update(req.body, {
      where: { id_frete: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Frete não encontrado." });
    }
    const updatedFreight = await Freight.findByPk(req.params.id);
    res.json(updatedFreight);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar frete." });
  }
};

// Deletar frete
export const deleteFreight = async (req: Request, res: Response) => {
  try {
    const deleted = await Freight.destroy({
      where: { id_frete: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Frete não encontrado." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar frete." });
  }
};