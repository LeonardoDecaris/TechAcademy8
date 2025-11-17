import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogTrigger,
    AlertDialogDescription
} from "@/components/ui/alert-dialog";
import InputCustom from "../form/InputCustom";

type AlertLogoutProps = {
    children: React.ReactNode;
    id: number;
    nome: string;
    email: string;
    cpf: string;
    cnh: string;
};

const EditarUsuario = ({ children, id, nome, email, cpf, cnh }: AlertLogoutProps) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            
            <AlertDialogContent>
                <AlertDialogTitle>
                    Confirmar Logout
                </AlertDialogTitle>
               
                <AlertDialogDescription>
                    <InputCustom
                        name="nome"
                        label="Nome"
                        placeholder={"nome usuario"}
                        value={nome}
                        error={undefined}
                        control={undefined as any}
                    />
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-sm">Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default EditarUsuario;
