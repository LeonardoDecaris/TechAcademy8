import type{ ReactNode } from "react";
import { jwtDecode } from "jwt-decode"; 
import { createContext, useContext, useState } from "react";


interface TokenPayload {
    id_usuario: string;
    admin: string | null;
    user?: { id_usuario: string; admin: string | null }
}

interface AuthContextType {
    token: string | null;
    userId: string | null;
    userAdmin: string | null;
    isAuthenticated: boolean;

    login: (token: string) => void;
    logout: () => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeToken = (token: string): Omit<TokenPayload, 'user'> | null => {
    try {
        const decoded: TokenPayload = jwtDecode(token);
        return decoded.user ?? decoded;
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));
    const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId"));
    const [userAdmin, setUserAdmin] = useState<string | null>(localStorage.getItem("userAdmin"));

    const login = (token: string) => {
        localStorage.setItem("authToken", token);

        const userData = decodeToken(token);
        if (userData) {
            localStorage.setItem("userId", userData.id_usuario || "");
            localStorage.setItem("userAdmin", userData.admin || "");
            setUserId(userData.id_usuario || null);
            setUserAdmin(userData.admin || null);
        }

        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userAdmin");
        setToken(null);
        setUserId(null);
        location.reload();
    };

    return (
         <AuthContext.Provider value={{ login, logout, token, userId, userAdmin, isAuthenticated: !!token }}>
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