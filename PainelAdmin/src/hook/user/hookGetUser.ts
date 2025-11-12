import { useAuth } from "@/context/AuthContext";
import http from "@/server/http";
import { useCallback, useState } from "react";


interface User {
  id_usuario: number;
  nome: string;
  email: string;
  cpf: string;
  cnh: string;
}

function useHookGetUser() {
  const { userId } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGetUser = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await http.get<User>(`usuario/${userId}`);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setMessage("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return {
    userData,
    handleGetUser,
    loading,
    message,
  };
}

export default useHookGetUser;