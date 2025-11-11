import { Request, Response } from "express";
import CargoImage from "../models/cargo-image.model";

// Buscar todas as imagens de carga
export const getAllCargoImages = async (req: Request, res: Response) => {
  try {
    const images = await CargoImage.findAll();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar imagens." });
  }
};

// Criar uma nova imagem de carga
export const createCargoImage = async (req: Request, res: Response) => {
  try {
    const image = await CargoImage.create(req.body);
    res.status(201).json(image);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar imagem." });
  }
};

// Buscar imagem de carga por ID
export const getCargoImageById = async (req: Request, res: Response) => {
  try {
    const image = await CargoImage.findByPk(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Imagem não encontrada." });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar imagem." });
  }
};

// Atualizar imagem de carga
export const updateCargoImage = async (req: Request, res: Response) => {
  try {
    const [updated] = await CargoImage.update(req.body, {
      where: { id_imagemCarga: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Imagem não encontrada." });
    }
    const updatedImage = await CargoImage.findByPk(req.params.id);
    res.json(updatedImage);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar imagem." });
  }
};

// Deletar imagem de carga
export const deleteCargoImage = async (req: Request, res: Response) => {
  try {
    const deleted = await CargoImage.destroy({
      where: { id_imagemCarga: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Imagem não encontrada." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar imagem." });
  }
};