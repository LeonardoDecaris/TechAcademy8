import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export default function BarraLateral() {
    return (
        <Sheet>

            <SheetTrigger asChild>
                <Button variant="outline">Open</Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <nav>
                    <ul>
                        <li><a href="">Home</a></li>
                    </ul>
                    <ul>
                        <li><a href="">Usuarios</a></li>
                    </ul>
                    <ul>
                        <li><a href="">Fretes</a></li>
                    </ul>
                    <ul>
                        <li><a href=""></a></li>
                    </ul>
                    <ul>
                        <li><a href=""></a></li>
                    </ul>
                </nav>
              </SheetHeader>
            </SheetContent>
            
        </Sheet>
    )
}