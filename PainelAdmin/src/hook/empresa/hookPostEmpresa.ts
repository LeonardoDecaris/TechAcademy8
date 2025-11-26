import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import http from "@/server/http";
import { deleteToast } from "@/components/custom/alert/PromeseDeletes";


interface empresaData {
    nome: string;
    cnpj: string;
    avaliacao?: number;
    tipo: string;
    localidade: string;
}

function useHookPostEmpresa() {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<empresaData>();
    const [loading, setLoading] = useState(false);

    const handlePostEmpresa = useCallback(async (data: empresaData) => {
        setLoading(true);
        try {
            await http.post("api/empresa", {
                nome: data.nome,
                cnpj: data.cnpj,
                tipo: data.tipo,
                avaliacao: data.avaliacao,
                localidade: data.localidade,
            });
            deleteToast(() => Promise.resolve(), {
                success: "Empresa cadastrado com sucesso!",
            });
            reset();
            return true;
        } catch (error) {
            console.log("Erro ao cadastrar empresa:", error);
            return false;
        } finally {
            setLoading(false);
        }
    }, [reset]);

    const rules = {
        nome: {
            required: "O nome é obrigatório.",
        },
        cnpj: {
            required: "O CNPJ é obrigatório.",
        },
        localidade: {
            required: "A localidade é obrigatória.",
        },
        avaliacao: {
            required: "A avaliação é obrigatória.",
        },
        tipo: {
            required: "O tipo é obrigatório.",
        },
    };

    return {
        rules,
        control,
        handlePostEmpresa,
        handleSubmit,
        loading,
        errors,
        reset
    }
}

export default useHookPostEmpresa;