import http from "@/server/http";
import { useCallback, useState } from "react";

function useHookDeleteUser(idUser: string) {
	const [loading, setLoading] = useState(false);

	const handleDeleteUser = useCallback(async () => {
		setLoading(true);
		try {
			if (!idUser) {
				throw new Error("ID do usuário não fornecido.");
			}

			await http.delete(`api/usuario/${idUser}`);
		} catch (error) {
			console.error("Erro ao deletar usuário:", error);
		} finally {
			setLoading(false);
		}
	}, [idUser])

	return {
		loading,
		handleDeleteUser
	}
}

export default useHookDeleteUser;