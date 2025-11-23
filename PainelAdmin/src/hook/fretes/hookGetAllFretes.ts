import type { frete } from "@/interface/interfaceFretes";
import http from "@/server/http";
import { useState, useCallback, useEffect } from "react";


function useHookGetAllFretes() {
	const [fretesData, setFretes] = useState<frete[]>();
	const [loading, setLoading] = useState(false);

	const handleGetAllFreights = useCallback(async () => {
		setLoading(true);
		try {
			const { data } = await http.get("fretesApi/fretes");
			setFretes(data);
			console.log("dados de fretes");
		} catch (error) {
			console.error("erro ao buscar dados de frete", error);
		} finally {
			setLoading(false);
		}

	}, []);

	useEffect(() => {
		handleGetAllFreights();
	},[]) 

	return {
		fretesData,
		loading,
		handleGetAllFreights
	};
}

export default useHookGetAllFretes;