import { z } from "zod";
import UserModel from "../models/usuario.model";

const validateAndFormatCPF = (cpf: string): string => {
  const cleanedCPF = cpf.replace(/\D/g, '');

  if (cleanedCPF.length !== 11) {
    throw new Error("Invalid CPF format");
  }

  const isValidCPF = (cpf: string): boolean => {
    let sum;
    let remainder;
    sum = 0;

    if (cpf === "00000000000") return false;
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  };

  if (!isValidCPF(cleanedCPF)) {
    throw new Error("Invalid CPF");
  }

  return cleanedCPF;
};

const isCPFUnique = async (cpf: string): Promise<boolean> => {
  const user = await UserModel.findOne({ where: { cpf } });
  return !user;
};

const isEmailUnique = async (email: string): Promise<boolean> => {
  const user = await UserModel.findOne({ where: { email } });
  return !user;
};

const emailSchemaForCreate = z.string().email("Invalid email address").refine(async (email) => {
    const isUnique = await isEmailUnique(email);
return isUnique;
  }, {
    message: "Email ja cadastrado",
  });

const cpfSchemaForCreate = z
  .string()
  .nonempty("CPF is required")
  .transform(validateAndFormatCPF)
  .refine(async (cpf) => {
    const isUnique = await isCPFUnique(cpf);
    return isUnique;
  }, {
    message: "This CPF already exists",
  });


const emailSchemaForUpdate = z.string().email("Invalid email address");
const cpfSchemaForUpdate = z.string().nonempty("CPF is required").transform(validateAndFormatCPF);

export const createUserSchema = z.object({
  nome: z.string().nonempty("Nome é obrigatório"),
  cpf: cpfSchemaForCreate,
  email: emailSchemaForCreate,
  cnh: z.string().nonempty("CNH é obrigatória"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const updateUserSchema = z.object({
  nome: z.string().nonempty("Nome é obrigatório"),
  cpf: cpfSchemaForUpdate,
  email: emailSchemaForUpdate,
  cnh: z.string().nonempty("CNH é obrigatória"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});