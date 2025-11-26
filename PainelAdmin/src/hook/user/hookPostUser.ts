import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import http from "@/server/http";
import { validarCPF, validarEmail, validarNome, validarPassword } from "@/util/validacoes";


interface userData {
	nome: string;
	email: string;
	password: string;
	confirmaSenha: string;
	cpf: string;
	cnh: string;
}

function useHookPostUser() {
	const { control, handleSubmit, watch, formState: { errors }, reset } = useForm<userData>();
	const [loading, setLoading] = useState(false);
	const password = watch("password");

	const handlePostUser = useCallback(async (data: userData) => {
		setLoading(true);
		try {
			await http.post("api/usuario", {
				nome: data.nome,
				email: data.email,
				password: data.password,
				cpf: data.cpf,
				cnh: data.cnh,
			});
			reset();
			return true;
		} catch (error) {
			console.log("Erro ao cadastrar usuário:", error);
			return false;
		} finally {
			setLoading(false);
		}
	}, [reset]);

	const rules = {
		nome: {
			required: "O nome é obrigatório.",
			validate: validarNome,
		},
		email: {
			required: "O email é obrigatório.",
			validate: validarEmail,
		},
		password: {
			required: "A senha é obrigatória.",
			validate: validarPassword,
		},
		confirmaSenha: {
			validate: (value: string) => value === password || "As senhas não coincidem",
			required: "Confirmação de senha é obrigatória",
		},
		cpf: {
			required: "O CPF é obrigatório.",
			validate: validarCPF,
		},
		cnh: {
			required: "A CNH é obrigatória.",
		},
	};

	return {
		rules,
		control,
		handlePostUser,
		handleSubmit,
		loading,
		errors,
		reset
	}
}

export default useHookPostUser;