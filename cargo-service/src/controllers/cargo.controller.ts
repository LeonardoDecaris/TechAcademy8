import { Request, Response } from "express";
import Cargo from "../models/cargo.model";

// Buscar todas as cargas
export const getAllCargos = async (req: Request, res: Response) => {
  try {
    const cargos = await Cargo.findAll();
    res.json(cargos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cargas." });
  }
};

// Criar uma nova carga
export const createCargo = async (req: Request, res: Response) => {
  try {
    const cargo = await Cargo.create(req.body);
    res.status(201).json(cargo);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar carga." });
  }
};

// Buscar carga por ID
export const getCargoById = async (req: Request, res: Response) => {
  try {
    const cargo = await Cargo.findByPk(req.params.id);
    if (!cargo) {
      return res.status(404).json({ error: "Carga não encontrada." });
    }
    res.json(cargo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar carga." });
  }
};

// Atualizar carga
export const updateCargo = async (req: Request, res: Response) => {
  try {
    const [updated] = await Cargo.update(req.body, {
      where: { id_carga: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Carga não encontrada." });
    }
    const updatedCargo = await Cargo.findByPk(req.params.id);
    res.json(updatedCargo);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar carga." });
  }
};

// Deletar carga
export const deleteCargo = async (req: Request, res: Response) => {
  try {
    const deleted = await Cargo.destroy({
      where: { id_carga: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Carga não encontrada." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar carga." });
  }
};