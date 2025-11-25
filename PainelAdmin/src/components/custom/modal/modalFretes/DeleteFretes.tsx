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
import useHookDeleteFretes from "@/hook/fretes/hookDeleteFretes";

type AlertLogoutProps = {
    children: React.ReactNode;
    idFretes: number;
    onUpdate?: () => void; 
};


const DeleteFretes = ({ children, idFretes, onUpdate }: AlertLogoutProps) => {
    const { loading, handleDeleteFretes } =  useHookDeleteFretes(String(idFretes));

    const handleConfirmDelete = async () => {
        await handleDeleteFretes();
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

export default DeleteFretes;
