import { useForm } from "react-hook-form";
import { validateEmail, validatePasswordLogin } from "../../lib/validacoesForm";
import { useNavigate } from "react-router-dom";
import http from "@/server/http";
import { useAuth } from "@/context/AuthContext";
import { useState, useCallback } from "react";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  message?: string;
  mensagem?: string;
}

function useHookLogin() {

  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async (formData: LoginForm): Promise<LoginResponse> => {
    setLoading(true);
    try {
      const { data } = await http.post<LoginResponse>("login", formData);

      if (!data?.token) {
        throw { message: "Token ausente na resposta." };
      }

      login(data.token);
      navigate("/home");

      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [login, navigate]);

  const rules = {
    email: {
      required: "Email é obrigatório",
      validate: validateEmail
    },
    password: {
      required: "Senha é obrigatória",
      validate: validatePasswordLogin
    }
  };

  return {
    control,
    handleSubmit,
    handleLogin,
    rules,
    errors,
    loading
  };
}

export default useHookLogin;