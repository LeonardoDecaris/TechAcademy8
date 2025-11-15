
import { Link } from "react-router-dom";
import BarraLateral from "./SheetDemo";

const Header = () => {
  return (
    <header className="bg-black/90 p-4">
      <nav className="flex items-center justify-between ">
        <section>
          <Link to="/home">
            <h1 className="text-white text-lg font-bold">Painel Admin</h1>
          </Link>
        </section>
    
        <section className="flex items-center gap-6">
          <BarraLateral />
        </section>
      </nav>
    </header>
  );
}

export default Header;