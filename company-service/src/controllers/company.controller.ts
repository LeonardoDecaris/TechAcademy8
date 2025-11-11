import { Request, Response } from "express";
import Company from "../models/company.model";

// Buscar todas as empresas
export const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar empresas." });
  }
};

// Criar uma nova empresa
export const createCompany = async (req: Request, res: Response) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar empresa." });
  }
};

// Buscar empresa por ID
export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      return res.status(404).json({ error: "Empresa não encontrada." });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar empresa." });
  }
};

// Atualizar empresa
export const updateCompany = async (req: Request, res: Response) => {
  try {
    const [updated] = await Company.update(req.body, {
      where: { id_empresa: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Empresa não encontrada." });
    }
    const updatedCompany = await Company.findByPk(req.params.id);
    res.json(updatedCompany);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar empresa." });
  }
};

// Deletar empresa
export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const deleted = await Company.destroy({
      where: { id_empresa: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Empresa não encontrada." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar empresa." });
  }
};