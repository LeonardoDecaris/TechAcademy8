import CadastroUser from "@/components/custom/modal/modalUsuario/CadastroUser";
import DeleteUser from "@/components/custom/modal/modalUsuario/DeleteUser";
import EditarUsuario from "@/components/custom/modal/modalUsuario/EditarUsuario";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import useHookGetAllUser from "@/hook/user/hookGetAllUser";
import { formatCpf } from "@/util/funcoes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";

type FormValues = {
  pesquisa: string;
};

interface userData {
  id_usuario: number;
  nome: string;
  email: string;
  cpf: string;
  cnh: string;
  imagemUsuario_id: number | null;
  imagemUsuario: {
    id_imagem: number;
    imgUrl: string;
  } | null;
}


function ListaUsuario() {
  const { dataUser, loading, handleGetUser } = useHookGetAllUser();
  const { register, handleSubmit } = useForm<FormValues>();
  const [filteredUsers, setFilteredUsers] = useState<userData[]>([]);

  const pesquisarUsuario = (data: { pesquisa: string }) => {
    const termo = data.pesquisa.toLowerCase();
    const filtrados = dataUser.filter((user: userData) =>
      user.nome.toLowerCase().includes(termo) ||
      user.cpf.toLowerCase().includes(termo)
    );
    setFilteredUsers(filtrados);
  };

  useEffect(() => {
    setFilteredUsers(dataUser);
  }, [dataUser]);

  return (
    <main className="flex-1 m-auto h-screen max-w-[1400px] py-5 ">
      <h1 className="text-black text-center text-3xl font-bold mb-6">Controle de Usuários</h1>

      <form onSubmit={handleSubmit(pesquisarUsuario)} className="w-full justify-center flex mb-6 gap-4">
        <input
          type="text"
          className="w-full max-w-lg bg-black/10 p-2 rounded-md"
          placeholder="Pesquisar por nome ou CPF"
          {...register("pesquisa")}
        />
        <button type="submit" className="bg-black rounded-md text-white px-2.5">
          Buscar
        </button>
      </form>

      <div className="flex justify-between items-center py-2.5 px-2">
        <h4 className="font-semibold">Lista de Usuarios</h4>
        <CadastroUser onUpdate={handleGetUser}>
          <Button className="cursor-pointer">Cadastrar Usuário</Button>
        </CadastroUser>
      </div>
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>CNH</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">Carregando usuários...</TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id_usuario}>
                  <TableCell className="font-medium">{user.id_usuario}</TableCell>
                  <TableCell>{user.nome}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{formatCpf(user.cpf)}</TableCell>
                  <TableCell>{user.cnh}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <EditarUsuario id={user.id_usuario} nome={user.nome} email={user.email} cpf={user.cpf} cnh={user.cnh} onUpdate={handleGetUser}>
                        <button className="bg-black text-white text-sm font-semibold rounded-sm px-2 py-1 cursor-pointer hover:bg-black/80 transition-colors">
                          Editar
                        </button>
                      </EditarUsuario>
                      <DeleteUser idUser={user.id_usuario.toString()} onUpdate={handleGetUser}>
                        <button className="bg-red-500 text-sm text-white font-semibold rounded-sm px-2 py-1 cursor-pointer hover:bg-red-600 transition-colors">
                          <AiOutlineDelete size={24} />
                        </button>
                      </DeleteUser>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter className="bg-transparent ">
            <TableRow>
              <TableCell colSpan={7} className="text-center font-medium">
                Total de Usuários: {filteredUsers.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </main>
  );
}

export default ListaUsuario;