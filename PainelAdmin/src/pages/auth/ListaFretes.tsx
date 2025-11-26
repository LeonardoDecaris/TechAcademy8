import { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableFooter,
	TableRow,
} from "@/components/ui/table";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { frete } from "@/interface/interfaceFretes";
import useHookGetAllFretes from "@/hook/fretes/hookGetAllFretes";
import CadastroUser from "@/components/custom/modal/modalUsuario/CadastroUser";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteFretes from "@/components/custom/modal/modalFretes/DeleteFretes";

type FormValues = {
	pesquisa: string;
};

function ListaFretes() {

	const { register, handleSubmit } = useForm<FormValues>();
	const [filteredFretes, setFilteredFretes] = useState<frete[]>([]);
	const { fretesData, loading, handleGetAllFreights } = useHookGetAllFretes();

	useEffect(() => {
		if (fretesData) {
			setFilteredFretes(fretesData);
		}
	}, [fretesData]);

	const pesquisarFrete = (data: { pesquisa: string }) => {
		const termo = data.pesquisa.toLowerCase();

		if (!fretesData) return;

		const filtrados = fretesData.filter((item: frete) =>
			item.empresa.nome.toLowerCase().includes(termo) ||
			item.carga.nome.toLowerCase().includes(termo) ||
			item.saida.toLowerCase().includes(termo) ||
			item.destino.toLowerCase().includes(termo)
		);
		setFilteredFretes(filtrados);
	};

	return (
		<main className="flex-1 m-auto h-screen max-w-[1400px] py-5 ">
			<h1 className="text-black text-center text-3xl font-bold mb-6">Lista de Fretes</h1>

			<form onSubmit={handleSubmit(pesquisarFrete)} className="w-full justify-center flex mb-6 gap-4">
				<input
					type="text"
					className="w-full max-w-lg bg-black/10 p-2 rounded-md"
					placeholder="Pesquisar por empresa, carga, origem ou destino"
					{...register("pesquisa")}
				/>
				<button type="submit" className="bg-black rounded-md text-white px-2.5">
					Buscar
				</button>
			</form>
			<div className="flex justify-start items-center py-2.5 px-2">
				<h4 className="font-semibold">Lista de Fretes</h4>
			</div>
			<div className="rounded-md border bg-white shadow-sm">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]">ID</TableHead>
							<TableHead>Nome</TableHead>
							<TableHead>Tipo Carga</TableHead>
							<TableHead>Empresa</TableHead>
							<TableHead>Rota Frete</TableHead>
							<TableHead>Frete.V</TableHead>
							<TableHead>Carga.V</TableHead>
							<TableHead>Peso</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Caminhoneiro</TableHead>
							<TableHead className="text-right">Ações</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell colSpan={11} className="text-center h-24 text-muted-foreground">
									Carregando...
								</TableCell>
							</TableRow>
						) : filteredFretes.length === 0 ? (
							<TableRow>
								<TableCell colSpan={11} className="text-center h-24 text-muted-foreground">
									Nenhum frete encontrado.
								</TableCell>
							</TableRow>
						) : (
							filteredFretes.map((frete) => (
								<TableRow key={frete.id_frete}>
									<TableCell className="font-medium">{frete.id_frete}</TableCell>
									<TableCell>{frete.carga.nome}</TableCell>
									<TableCell>{frete.carga.tipoCarga.nome}</TableCell>
									<TableCell>{frete.empresa.nome}</TableCell>
									<TableCell>{frete.saida} ➝ {frete.destino}</TableCell>
									<TableCell>R$ {frete.valor_frete}</TableCell>
									<TableCell>R$ {frete.carga.valor_carga}</TableCell>
									<TableCell>T {frete.carga.peso}</TableCell>
									<TableCell>{frete.status.descricao}</TableCell>
									<TableCell>{frete.caminhoneiro?.usuario?.nome ?? "Sem Caminhoneiro"}</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end items-center gap-2">
											<button className="bg-black text-white text-sm font-semibold rounded-sm px-2 py-1 cursor-pointer hover:bg-black/80 transition-colors">
												Editar
											</button>
											<DeleteFretes onUpdate={handleGetAllFreights} idFretes={frete.id_frete}>
												<button className="bg-red-500 text-sm text-white font-semibold rounded-sm px-2 py-1 cursor-pointer hover:bg-red-600 transition-colors">
													<AiOutlineDelete size={24} />
												</button>
											</DeleteFretes>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
					<TableFooter className="bg-transparent">
						<TableRow>
							<TableCell colSpan={11} className="text-center font-medium">
								Total de Fretes: {filteredFretes.length}
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</main>
	);
}

export default ListaFretes;