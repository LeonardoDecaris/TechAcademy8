import { useAuth } from "@/context/AuthContext";
import http from "@/server/http";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { validaCNH, validarCPF, validarEmail, validarNome, validarPassword } from "@/util/validacoes";

interface UserUpdate {
	nome?: string;
	email?: string;
	password?: string;
	cpf?: string;
	cnh?: string;
}

function useHookPutUser() {
	const { userId } = useAuth();
	const [loading, setLoading] = useState(false);

	const { control, handleSubmit, formState: { errors } } = useForm<UserUpdate>({ mode: "onSubmit" });

	const handlePutUser = useCallback(async (data: UserUpdate) => {
		setLoading(true);
		try {

			if (!userId) {
				throw new Error("Id usuario não encontrado");
			}

			await http.put(`api/usuario/${userId}`, {
				nome: data.nome,
				email: data.email,
				password: data.password,
				cpf: data.cpf,
				cnh: data.cnh,
			});
		} catch (error) {
			console.error("Erro ao atualizar usuário:", error);
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [userId]);

	const rules = {
		nome: {
			required: "O nome é obrigatório",
			validate: validarNome,
		},
		email: {
			required: "O email é obrigatório",
			validate: validarEmail,
		},
		password: {
			validate: validarPassword,
		},
		cpf: {
			required: "O CPF é obrigatório",
			validate: validarCPF,
		},
		cnh: {
			required: "A CNH é obrigatória",
			validate: validaCNH,
		},
	}

	return {
		rules,
		loading,
		handlePutUser,
		control,
		handleSubmit,
		errors
	}
}

export default useHookPutUser;