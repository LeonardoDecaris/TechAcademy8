import { Request, Response } from "express";
import CargoType from "../models/cargo-type.model";

// Buscar todos os tipos de carga
export const getAllCargoTypes = async (req: Request, res: Response) => {
  try {
    const types = await CargoType.findAll();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tipos de carga." });
  }
};

// Criar um novo tipo de carga
export const createCargoType = async (req: Request, res: Response) => {
  try {
    const type = await CargoType.create(req.body);
    res.status(201).json(type);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar tipo de carga." });
  }
};

// Buscar tipo de carga por ID
export const getCargoTypeById = async (req: Request, res: Response) => {
  try {
    const type = await CargoType.findByPk(req.params.id);
    if (!type) {
      return res.status(404).json({ error: "Tipo de carga não encontrado." });
    }
    res.json(type);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tipo de carga." });
  }
};

// Atualizar tipo de carga
export const updateCargoType = async (req: Request, res: Response) => {
  try {
    const [updated] = await CargoType.update(req.body, {
      where: { id_tipoCarga: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Tipo de carga não encontrado." });
    }
    const updatedType = await CargoType.findByPk(req.params.id);
    res.json(updatedType);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar tipo de carga." });
  }
};

// Deletar tipo de carga
export const deleteCargoType = async (req: Request, res: Response) => {
  try {
    const deleted = await CargoType.destroy({
      where: { id_tipoCarga: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Tipo de carga não encontrado." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar tipo de carga." });
  }
};