import ListaItem from "@/components/custom/lista/ListaUser";
import useHookGetAllUser from "@/hook/user/hookGetAllUser";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  pesquisa: string;
};

interface userData {
  id_usuario: number;
  nome: string;
  email: string;
  cpf: string;
  cnh: string;
}

function ListaUsuario() {
  const { dataUser, handleGetUser } = useHookGetAllUser();
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

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <main className="flex-1 m-auto h-screen max-w-[1200px] py-5">
      <h1 className="text-black text-center text-3xl font-bold mb-6">Lista de Usuários</h1>

      <form onSubmit={handleSubmit(pesquisarUsuario)} className="w-full justify-center flex mb-6 gap-4">
        <input
          type="text"
          className="w-full max-w-lg bg-black/10 p-2 rounded-4xl"
          placeholder="Pesquisar por nome ou CPF"
          {...register("pesquisa")}
        />
        <button type="submit" className="bg-black rounded-3xl text-white px-2.5">
          Buscar
        </button>
      </form>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <ListaItem
            key={user.id_usuario}
            id={user.id_usuario}
            nome={user.nome}
            email={user.email}
            cpf={user.cpf}
            cnh={user.cnh}
          />
        ))}
      </section>
    </main>
  );
}

export default ListaUsuario;