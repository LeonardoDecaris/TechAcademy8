import { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogTrigger,
    AlertDialogDescription
} from "@/components/ui/alert-dialog";

import InputCustom from "../../form/InputCustom";
import { Button } from "@/components/ui/button";
import useHookPostUser from "@/hook/user/hookPostUser";

type AlertLogoutProps = {
    children: React.ReactNode;
    onUpdate: () => void;
};

const CadastroUser = ({ children, onUpdate }: AlertLogoutProps) => {
    const { control, errors, handlePostUser, handleSubmit, rules, loading, reset } = useHookPostUser();
    
    const [open, setOpen] = useState(false);

    const onSubmit = async (data: any) => {
        const success = await handlePostUser(data);
        if (success) {
            onUpdate();
            setOpen(false);
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogTitle>
                    Cadastrar Usuário
                </AlertDialogTitle>

                <form id="form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
                    <InputCustom
                        name="nome"
                        label="Nome"
                        id="nome"
                        type="text"
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
                        placeholder="exemplo@exemplo.com"
                        control={control}
                        rules={rules.email}
                        error={errors.email?.message}
                        reset={reset}
                    />
                    <InputCustom
                        name="password"
                        label="Senha"
                        id="password"
                        type="password"
                        placeholder="Digite a senha"
                        control={control}
                        rules={rules.password}
                        error={errors.password?.message}
                    />
                    <InputCustom
                        name="confirmaSenha"
                        label="Confirmação de Senha"
                        id="confirmaSenha"
                        type="password"
                        placeholder="Confirme a senha"
                        control={control}
                        rules={rules.confirmaSenha}
                        error={errors.confirmaSenha?.message}
                    />
                    <InputCustom
                        name="cpf"
                        label="CPF"
                        id="cpf"
                        type="text"
                        maskCpf={true}
                        placeholder="Digite o CPF"
                        control={control}
                        rules={rules.cpf}
                        error={errors.cpf?.message}
                        maxLength={14}
                    />
                    <InputCustom
                        name="cnh"
                        label="Tipo da CNH"
                        id="cnh"
                        type="text"
                        placeholder="Digite o tipo da CNH"
                        control={control}
                        rules={rules.cnh}
                        error={errors.cnh?.message}
                        maxLength={1}
                    />
                </form>
                <AlertDialogDescription>
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-sm" onClick={() => reset()}>
                        Cancelar
                    </AlertDialogCancel>

                    <Button type="submit" form="form" className="rounded-sm" disabled={loading}>
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </Button>
                    
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default CadastroUser;
