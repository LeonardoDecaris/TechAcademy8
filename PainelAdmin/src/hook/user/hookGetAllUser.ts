import http from "@/server/http";
import { useCallback, useEffect, useState } from "react";

interface user {
  id_usuario: number;
  nome: string;
  email: string;
  cpf: string;
  cnh: string;
}

function useHookGetAllUser() {
  const [dataUser, setDataUser] = useState<user[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGetUser = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await http.get("api/usuario");
      setDataUser(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);

  return {
    handleGetUser,
    dataUser,
    loading,
  };
}

export default useHookGetAllUser;