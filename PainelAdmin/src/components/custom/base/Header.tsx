import { Button } from "@/components/ui/button";
import BarraLateral from "./SheetDemo";
import AlertLogout from "../modal/logout";

const Header = () => {
    return (
        <header className="bg-black/90 p-4">
            <nav className="flex items-center justify-between ">
                <section>
                    <h1 className="text-white text-lg font-bold">Painel Admin</h1>
                </section>

                <section className="flex items-center gap-6">
                    <AlertLogout>
                        <Button variant="logout" className="rounded-sm">Logout</Button>
                    </AlertLogout>
                    <BarraLateral />
                </section>
            </nav>
        </header>
    );
}

export default Header;