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
import useHookPostEmpresa from "@/hook/empresa/hookPostEmpresa";

type AlertLogoutProps = {
    children: React.ReactNode;
    onUpdate: () => void;
};

const CadastroEmpresa = ({ children, onUpdate }: AlertLogoutProps) => {
    
    const [open, setOpen] = useState(false);
    const { control, handleSubmit, rules, loading, errors, reset, handlePostEmpresa } = useHookPostEmpresa();

    const onSubmit = async (data: any) => {
        const success = await handlePostEmpresa(data);
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
                        label="Nome da Empresa"
                        id="nome"
                        type="text"
                        placeholder="Digite o nome"
                        control={control}
                        rules={rules.nome}  
                        error={errors.nome?.message}
                    />
                    <InputCustom
                        name="cnpj"
                        label="CNPJ"
                        id="cnpj"
                        type="text"
                        placeholder="Digite o CNPJ"
                        control={control}
                        rules={rules.cnpj}  
                        error={errors.cnpj?.message}
                    />
                    <InputCustom
                        name="localidade"
                        label="Localidade"
                        id="localidade"
                        type="text"
                        placeholder="Digite a localidade"
                        control={control}
                        rules={rules.localidade}  
                        error={errors.localidade?.message}
                    />
                    <InputCustom
                        name="tipo"
                        label="Tipo"
                        id="tipo"
                        type="text"
                        placeholder="Digite o tipo"
                        control={control}
                        rules={rules.tipo}  
                        error={errors.tipo?.message}
                    />
                    <InputCustom
                        name="avaliacao"
                        label="Avaliação"
                        id="avaliacao"
                        type="number"
                        placeholder="Digite a avaliação"
                        control={control}
                        rules={rules.avaliacao}  
                        error={errors.avaliacao?.message}
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

export default CadastroEmpresa;
