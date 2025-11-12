import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";

interface UserPayload {
    id_usuario: number;
    admin: boolean;
}

interface TokenPayload {
    user: UserPayload;
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
        const decoded = jwtDecode<TokenPayload>(token);
        return decoded.user;
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));
    const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId"));
    const [userAdmin, setUserAdmin] = useState<boolean>(localStorage.getItem("userAdmin") === "true");

    const login = (token: string) => {
        localStorage.setItem("authToken", token);

        const userData = decodeToken(token);

        if (userData) {
            localStorage.setItem("userId", String(userData.id_usuario));
            localStorage.setItem("userAdmin", String(userData.admin));

            setUserId(String(userData.id_usuario));
            setUserAdmin(userData.admin);
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

        location.reload();
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                userId,
                userAdmin,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
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
