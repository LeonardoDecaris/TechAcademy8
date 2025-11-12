import { BrowserRouter, Routes, Route, useLocation, } from "react-router-dom";

import Login from "@/pages/public/Login";
import Header from "@/components/custom/base/Header";

import Home from "@/pages/auth/Home";
import Erro404 from "@/pages/pagesAcesso/Erro404";
import ErroSemAcesso from "@/pages/pagesAcesso/ErroSemAcesso";
import PrivateRoute from "./PrivateRoutes";

const ROUTES_HEADER = ["/", "/sem-acesso", "/*"];

const WebRoutes = () => {
    return (
        <BrowserRouter>
            <HeaderWrapper />
            <Routes>
                <Route path="/home" element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />

                <Route path="/" element={<Login />} />

                <Route path="/sem-acesso" element={<ErroSemAcesso />} />
                <Route path="*" element={<Erro404 />} />

            </Routes>
        </BrowserRouter>
    );
}


const HeaderWrapper = () => {
    const location = useLocation();
    return !ROUTES_HEADER.includes(location.pathname) ? <Header /> : null;
}

export default WebRoutes;