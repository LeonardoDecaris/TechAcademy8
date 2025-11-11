import { Request, Response } from "express";
import CompanyImage from "../models/company-image.model";

// Buscar todas as imagens
export const getAllCompanyImages = async (req: Request, res: Response) => {
  try {
    const images = await CompanyImage.findAll();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar imagens." });
  }
};

// Criar uma nova imagem
export const createCompanyImage = async (req: Request, res: Response) => {
  try {
    const image = await CompanyImage.create(req.body);
    res.status(201).json(image);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar imagem." });
  }
};

// Buscar imagem por ID
export const getCompanyImageById = async (req: Request, res: Response) => {
  try {
    const image = await CompanyImage.findByPk(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Imagem não encontrada." });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar imagem." });
  }
};

// Atualizar imagem
export const updateCompanyImage = async (req: Request, res: Response) => {
  try {
    const [updated] = await CompanyImage.update(req.body, {
      where: { id_imagemEmpresa: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Imagem não encontrada." });
    }
    const updatedImage = await CompanyImage.findByPk(req.params.id);
    res.json(updatedImage);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar imagem." });
  }
};

// Deletar imagem
export const deleteCompanyImage = async (req: Request, res: Response) => {
  try {
    const deleted = await CompanyImage.destroy({
      where: { id_imagemEmpresa: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Imagem não encontrada." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar imagem." });
  }
};