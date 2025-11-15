import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserPayload {
    id_usuario: string;
    admin?: string | boolean | null;
}
interface AuthContextType {
    token: string | null;
    userId: string | null;
    userAdmin: boolean;
    isAuthenticated: boolean;

    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeToken = (token: string): UserPayload | null => {
    try {
        return jwtDecode<UserPayload>(token);
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
    }
};

const parseAdmin = (value: unknown): boolean =>
    value === true || value === "true" || value === "1";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));
    const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId"));
    const [userAdmin, setUserAdmin] = useState<boolean>(() => parseAdmin(localStorage.getItem("userAdmin")));
    const navigate = useNavigate();

    const login = (token: string) => {
        localStorage.setItem("authToken", token);
        const userData = decodeToken(token);

        if (userData) {
            const adminBool = parseAdmin(userData.admin);
            localStorage.setItem("userId", userData.id_usuario || "");
            localStorage.setItem("userAdmin", String(adminBool));

            setUserId(userData.id_usuario || null);
            setUserAdmin(adminBool);
        }

        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userAdmin");

        setToken(null);
        setUserId(null);
        setUserAdmin(false);

        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ token, userId, userAdmin, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth needs to be inside the AuthProvider");
    }
    return context;
};
