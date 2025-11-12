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
import { useAuth } from "@/context/AuthContext";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

type AlertLogoutProps = {
    children: React.ReactNode;
};

const AlertLogout = ({ children }: AlertLogoutProps) => {

    const Navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = useCallback(async () => {
        await Navigate("/");
        await logout();
    },[logout, Navigate])

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
                    Tem certeza que deseja sair da sua conta
                </AlertDialogDescription>
                <AlertDialogHeader>

                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-md ">Cancelar</AlertDialogCancel>
                    <button id="confirmLogout" className="rounded-md bg-red-500/80 transition px-7 py-1 text-white hover:bg-red-500"
                        onClick={() => handleLogout()}>
                        Sair
                    </button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AlertLogout;
