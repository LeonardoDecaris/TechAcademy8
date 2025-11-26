import http from "@/server/http";
import { useCallback, useEffect, useState } from "react";

export interface empresa {
    id_empresa: number;
    nome: string;
    cnpj: string;
    tipo: string;
    avaliacao?: number;
    localidade: string;
}

function useHookGetAllEmpresa() {
    const [loading, setLoading] = useState(false);
    const [empresaData, setEmpresaData] = useState<empresa[]>([]);
    
    const handleGetAllEmpresas = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await http.get('api/empresa');
            setEmpresaData(data);
        } catch (error) {
            console.error("Erro ao buscar empresas:", error);
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        handleGetAllEmpresas();
    }, [handleGetAllEmpresas]);

    return { loading, empresaData, handleGetAllEmpresas };
}

export default useHookGetAllEmpresa;