
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

function useHookPutUser({idUser}: {idUser: number}) {
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<UserUpdate>({ mode: "onSubmit" });

    const handlePutUser = useCallback(async (data: UserUpdate) => {
        setLoading(true);
        try {

            if (!idUser) {
                throw new Error("Id usuario não encontrado");
            }

            await http.put(`api/usuario/${idUser}`, {
                nome: data.nome,
                email: data.email,
                password: data.password,
                cpf: data.cpf,
                cnh: data.cnh,
            });
            return true;
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            console.log(error);
            return false;
        } finally {
            setLoading(false);
        }
    }, [idUser]);

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