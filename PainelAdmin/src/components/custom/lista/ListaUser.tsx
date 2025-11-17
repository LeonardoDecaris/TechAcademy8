import EditarUsuario from "../modal/EditarUsuario";

type Props = {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    cnh: string;
};

const ListaItem = (props: Props) => {

    const formatCpf = (cpf: string) => {
        const digits = cpf.replace(/\D/g, '').padStart(11, '0').slice(0, 11);
        return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    return (
        <div className="bg-black/90 p-2 rounded-md h-full">
            <div className="flex justify-between items-center pb-2.5">
                <h3 className="text-white font-bold">{props.id}</h3>
                <div className="flex items-center gap-1.5 ">
                    <button className="bg-red-500 text-sm text-white font-semibold rounded-sm px-2 py-1 cursor-pointer">excluir</button>
                    <EditarUsuario
                        id={props.id}
                        nome={props.nome}
                        email={props.email}
                        cpf={props.cpf}
                        cnh={props.cnh}
                    >
                        <button className="bg-white text-sm font-semibold rounded-sm px-2 py-1 cursor-pointer">editar</button>
                    </EditarUsuario>
                </div>
            </div>
            <ul>
                <li className="text-white border-b border-white/20 py-1"><span className="font-semibold mr-2">Nome:</span> {props.nome}</li>
                <li className="text-white border-b border-white/20 py-1"><span className="font-semibold mr-2">Email:</span> {props.email}</li>
                <li className="text-white border-b border-white/20 py-1"><span className="font-semibold mr-2">CPF:</span> {formatCpf(props.cpf)}</li>
                <li className="text-white border-b border-white/20 py-1"><span className="font-semibold mr-2">CNH:</span> {props.cnh}</li>
            </ul>
        </div>
    );
};

export default ListaItem;