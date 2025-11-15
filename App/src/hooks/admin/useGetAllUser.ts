import http from "@/src/service/httpAxios";
import { useCallback, useState } from "react";

interface User {
    id_usuario: number;
    nome: string;
    cpf: string;
    email: string;
    password: string;
    confirmaSenha: string;
    cnh: string;
}

function useGetAllUser() {
    const [userData, setUserData] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleGetAllUser = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await http.get('/usuario');
            setUserData(response.data);
        } catch (error) {
            setError(true);
            console.error("Erro ao buscar todos os usuários: ", error);
        } finally {
            setLoading(false);
        }
    }, [])

    return {
        handleGetAllUser,
        userData,
        loading,
        error,
    }
}

export default useGetAllUser;