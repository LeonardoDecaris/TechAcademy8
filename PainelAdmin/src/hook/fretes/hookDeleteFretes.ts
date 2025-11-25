import { deleteToast } from "@/components/custom/alert/PromeseDeletes";
import http from "@/server/http";
import { useCallback, useState } from "react";

function useHookDeleteFretes(idFrete: string) {
	const [loading, setLoading] = useState(false);

	const handleDeleteFretes = useCallback(async () => {
		setLoading(true);
		try {
			if (!idFrete) {
				throw new Error("ID do usuário não fornecido.");
			}

			await http.delete(`fretesApi/fretes/${idFrete}`);
			deleteToast(() => Promise.resolve(), {
				success: "Frete deletado com sucesso! Aguarde alguns instantes.",
			});
		} catch (error: any) {
			if (error.response) {
				console.error("Erro deletando frete:", error.response.status, error.response.data);
			} else {
				console.error("Erro deletando frete:", error.message);
			}
		} finally {
			setLoading(false);
		}
	}, [idFrete]);

	return {
		handleDeleteFretes,
		loading,
	};
}

export default useHookDeleteFretes;