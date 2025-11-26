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
import type { empresa } from "@/hook/empresa/hookGetAllEmpresa";
import CadastroUser from "@/components/custom/modal/modalUsuario/CadastroUser";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteFretes from "@/components/custom/modal/modalFretes/DeleteFretes";
import useHookGetAllEmpresa from "@/hook/empresa/hookGetAllEmpresa";
import CadastroEmpresa from "@/components/custom/modal/modalEmpresa/CadastroEmpresa";
import { mascaraCNPJ } from "@/util/validacoes";

type FormValues = {
	pesquisa: string;
};

function ListaEmpresa() {

	const { register, handleSubmit } = useForm<FormValues>();
	const [filteredFretes, setFilteredFretes] = useState<empresa[]>([])
    const { empresaData, loading, handleGetAllEmpresas} = useHookGetAllEmpresa();

	useEffect(() => {
		if (empresaData) {
			setFilteredFretes(empresaData);
		}
	}, [empresaData]);

	const pesquisarFrete = (data: { pesquisa: string }) => {
		const termo = data.pesquisa.toLowerCase();

		if (!empresaData) return;

		const filtrados = empresaData.filter((item: empresa) =>
			item.nome.toLowerCase().includes(termo)
		);
		setFilteredFretes(filtrados);
	};

	return (
		<main className="flex-1 m-auto h-screen max-w-[1400px] py-5 ">
			<h1 className="text-black text-center text-3xl font-bold mb-6">Lista de Empresas</h1>

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
			<div className="flex justify-between items-center py-2.5 px-2">
				<h4 className="font-semibold">Lista de Empresas</h4>
				<CadastroEmpresa onUpdate={handleGetAllEmpresas}>
					<Button className="cursor-pointer">Cadastrar Empresa</Button>
				</CadastroEmpresa>
			</div>
			<div className="rounded-md border bg-white shadow-sm">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]">ID</TableHead>
							<TableHead>Nome</TableHead>
                            <TableHead>CNPJ</TableHead>
                            <TableHead>Localidade</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Avaliação</TableHead>
							<TableHead className="text-right">Ações</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell colSpan={9} className="text-center h-24 text-muted-foreground">
									Carregando...
								</TableCell>
							</TableRow>
						) : filteredFretes.length === 0 ? (
							<TableRow>
								<TableCell colSpan={9} className="text-center h-24 text-muted-foreground">
									Nenhum frete encontrado.
								</TableCell>
							</TableRow>
						) : (
							filteredFretes.map((empresa) => (
								<TableRow key={empresa.id_empresa}>
									<TableCell className="font-medium">{empresa.id_empresa}</TableCell>
									<TableCell>{empresa.nome}</TableCell>
                                    <TableCell>{mascaraCNPJ(empresa.cnpj)}</TableCell>
                                    <TableCell>{empresa.localidade}</TableCell>
									<TableCell>{empresa.tipo}</TableCell>
                                    <TableCell>{empresa.avaliacao || 'N/A'}</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end items-center gap-2">
											<button className="bg-black text-white text-sm font-semibold rounded-sm px-2 py-1 cursor-pointer hover:bg-black/80 transition-colors">
												Editar
											</button>
											<DeleteFretes onUpdate={handleGetAllEmpresas} idFretes={empresa.id_empresa}>
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
							<TableCell colSpan={8} className="text-center font-medium">
								Total de Fretes: {filteredFretes.length}
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</main>
	);
}

export default ListaEmpresa;