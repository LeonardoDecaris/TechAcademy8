import { Link } from "react-router-dom";
import { Truck, Users } from "lucide-react";
import useHookGetAllUser from "@/hook/user/hookGetAllUser";
import useHookGetAllFretes from "@/hook/fretes/hookGetAllFretes";

function Home() {
    const { dataUser } = useHookGetAllUser();
    const { fretesData } = useHookGetAllFretes();

    return(
        <main className="flex-1 m-auto h-screen max-w-[1200px] py-5 ">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-gray-500">Acesso rápido às funcionalidades do sistema.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mb-10">
                <div className="rounded-xl border bg-white text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium text-gray-500">Total de Usuários</h3>
                        <Users className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="text-2xl font-bold">{dataUser?.length || 0}</div>
                    <p className="text-xs text-gray-500">Usuários ativos na plataforma</p>
                </div>
                <div className="rounded-xl border bg-white text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium text-gray-500">Total de Fretes</h3>
                        <Truck className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="text-2xl font-bold">{fretesData?.length || 0}</div>
                    <p className="text-xs text-gray-500">Fretes registrados no sistema</p>
                </div>
            </div>
            
            <h2 className="text-lg font-semibold mb-4">Menu de Acesso</h2>

            <div className="grid gap-6 md:grid-cols-2">
                <Link 
                    to="/usuarios" 
                    className="flex flex-col gap-3 p-6 border rounded-xl bg-white shadow-sm hover:shadow-md hover:bg-slate-50 transition-all cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <Users className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-semibold">Usuários</h2>
                    </div>
                    <p className="text-sm text-gray-500">
                        Gerencie o cadastro, permissões e listagem de todos os usuários do sistema.
                    </p>
                </Link>

                <Link 
                    to="/fretes" 
                    className="flex flex-col gap-3 p-6 border rounded-xl bg-white shadow-sm hover:shadow-md hover:bg-slate-50 transition-all cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg text-green-600">
                            <Truck className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-semibold">Fretes</h2>
                    </div>
                    <p className="text-sm text-gray-500">
                        Visualize, cadastre e gerencie os fretes e transportes disponíveis.
                    </p>
                </Link>
            </div>
        </main>
    );
}

export default Home;