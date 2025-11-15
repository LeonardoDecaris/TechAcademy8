import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import AlertLogout from "../modal/logout"
import { Link } from "react-router-dom"
import useHookGetUser from "@/hook/user/hookGetUser";
import { useEffect } from "react";

const BarraLateral = () => {

  const { handleGetUser, nomeAbreviado } = useHookGetUser();



  useEffect(() => {
    handleGetUser();
  },[])

  return (
    <Sheet>

      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-sm">Menu</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-black">
            Ola {nomeAbreviado ? nomeAbreviado : "Usuario Admin"}
          </SheetTitle>
        </SheetHeader>

        <section>
          <ul className="flex flex-col gap-2.5 text-black pl-2.5">
            <li className="font-bold text-black/70 transition hover:text-black hover:scale-101">
              <SheetClose asChild>
                <Link to="/home">Home</Link>
              </SheetClose>
            </li>
            <li className="font-bold text-black/70 transition hover:text-black hover:scale-101">
              <SheetClose asChild>
                <Link to="/usuarios">Controle de Usuarios</Link>
              </SheetClose>
            </li>
            <li className="font-bold text-black/70 transition hover:text-black hover:scale-101">
              <SheetClose asChild>
                <Link to="/fretes">Controle de Fretes</Link>
              </SheetClose>
            </li>
            <li className="font-bold text-black/70 transition hover:text-black hover:scale-101">
              <SheetClose asChild>
                <Link to="/">Controle de Estoque</Link>
              </SheetClose>
            </li>
          </ul>
        </section>

        <SheetFooter>
          <AlertLogout>
            <Button variant="logout" className="rounded-sm">Logout</Button>
          </AlertLogout>
        </SheetFooter>
      </SheetContent>

    </Sheet>
  )
}

export default BarraLateral;