import { useAuth } from "@/context/AuthContext";
import http from "@/server/http";
import { getDisplayName } from "@/util/funcoes";
import { useCallback, useMemo, useState } from "react";


interface User {
  id_usuario: number;
  nome: string;
  email: string;
  cpf: string;
  cnh: string;
}

function useHookGetUser() {
  const { userId } = useAuth();
  const [userData, setUserData] = useState<User>();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGetUser = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await http.get<User>(`api/usuario/${userId}`);
      setUserData(data);
      console.log("User data fetched:");
    } catch (error) {
      console.error("Error fetching user data:", error);
      setMessage("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  }, [userId]);


  const nomeAbreviado = useMemo(
    () => getDisplayName(userData?.nome ?? ""),
    [userData?.nome]
  );

  return {
    userData,
    handleGetUser,
    loading,
    message,
    nomeAbreviado
  };
}

export default useHookGetUser;