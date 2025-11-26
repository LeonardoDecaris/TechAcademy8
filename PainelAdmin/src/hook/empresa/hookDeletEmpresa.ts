import { deleteToast } from "@/components/custom/alert/PromeseDeletes";
import http from "@/server/http";
import { useCallback, useState } from "react";

function useHookDeleteEmpresa(idEmpresa: string) {
	const [loading, setLoading] = useState(false);

	const handleDeleteEmpresa = useCallback(async () => {
		setLoading(true);
		try {
			if (!idEmpresa) {
				throw new Error("ID do usuário não fornecido.");
			}

			await http.delete(`api/empresa/${idEmpresa}`);
			deleteToast(() => Promise.resolve(), {
				success: "Empresa deletado com sucesso!",
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
	}, [idEmpresa]);

	return {
		handleDeleteEmpresa,
		loading,
	};
}

export default useHookDeleteEmpresa;