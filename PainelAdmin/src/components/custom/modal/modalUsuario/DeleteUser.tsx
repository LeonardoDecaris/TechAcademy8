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
import useHookDeleteUser from "@/hook/user/hookDeleteUser";

type AlertLogoutProps = {
    children: React.ReactNode;
    idUser: string;
    onUpdate?: () => void; 
};


const DeleteUser = ({ children, idUser, onUpdate }: AlertLogoutProps) => {
    const { loading, handleDeleteUser } =  useHookDeleteUser(idUser);

    const handleConfirmDelete = async () => {
        await handleDeleteUser();
        if (onUpdate) {
            onUpdate();
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle>
                    Confirmar Exclusão
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Tem certeza que deseja excluir este usuário?
                </AlertDialogDescription>
                <AlertDialogHeader>

                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-md ">Cancelar</AlertDialogCancel>
                    <button id="confirmLogout" className="rounded-md bg-red-500 transition px-7 py-1 text-white"
                        onClick={handleConfirmDelete}>
                        deletar {loading && "..."}
                    </button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteUser;
