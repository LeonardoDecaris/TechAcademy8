import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogTrigger,
    AlertDialogDescription
} from "@/components/ui/alert-dialog";

import InputCustom from "../form/InputCustom";
import { Button } from "@/components/ui/button";
import useHookPutUser from "@/hook/user/hookPutUser";

type AlertLogoutProps = {
    children: React.ReactNode;
    id: number;
    nome: string;
    email: string;
    cpf: string;
    cnh: string;
};

const EditarUsuario = ({ children, nome, email, cpf, cnh }: AlertLogoutProps) => {
    const { control, errors, handlePutUser, handleSubmit, rules, loading } = useHookPutUser();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogTitle>
                    Confirmar Logout
                </AlertDialogTitle>

                <form id="form" onSubmit={handleSubmit(handlePutUser)} className="flex flex-col gap-4 mt-4">
                    <InputCustom
                        name="nome"
                        label="Nome"
                        id="nome"
                        type="text"
                        defaultValue={nome}
                        placeholder="Digite o nome"
                        control={control}
                        rules={rules.nome}
                        error={errors.nome?.message}
                    />
                    <InputCustom
                        name="email"
                        label="Email"
                        id="email"
                        type="email"
                        defaultValue={email}
                        placeholder="exemplo@exemplo.com"
                        control={control}
                        rules={rules.email}
                        error={errors.email?.message}
                    />
                    <InputCustom
                        name="password"
                        label="Senha (Não Obrigatório)"
                        id="password"
                        type="password"
                        placeholder="Digite a senha"
                        control={control}
                        rules={rules.password}
                        error={errors.password?.message}
                    />
                    <InputCustom
                        name="cpf"
                        label="CPF"
                        id="cpf"
                        type="text"
                        defaultValue={cpf}
                        placeholder="Digite o CPF"
                        control={control}
                        rules={rules.cpf}
                        error={errors.cpf?.message}
                        maxLength={11}
                    />
                    <InputCustom
                        name="cnh"
                        label="CNH"
                        id="cnh"
                        type="text"
                        defaultValue={cnh}
                        placeholder="Digite a CNH"
                        control={control}
                        rules={rules.cnh}
                        error={errors.cnh?.message}
                        maxLength={1}
                    />
                </form>
                <AlertDialogDescription>
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-sm">Cancelar</AlertDialogCancel>

                    <Button type="submit" form="form" className="rounded-sm" disabled={loading}>
                        {loading ? "Salvando..." : "Salvar"}
                    </Button>
                    
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default EditarUsuario;
