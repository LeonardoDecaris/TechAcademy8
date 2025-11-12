import { useForm } from "react-hook-form";
import { validateEmail, validatePasswordLogin } from "../../lib/validacoesForm";
import { useNavigate } from "react-router-dom";
import http from "@/server/http";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

interface dadosForm {
  email: string;
  password: string;
}


function useHookLogin() {
  const { control, handleSubmit, formState: { errors } } = useForm<dadosForm>({
    mode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: dadosForm) => {
    setLoading(true);
    try {
      const response = await http.post("login", {
        email: data.email,
        password: data.password,
      });

      const token = response.data.token;
      console.log('token recebido', token);
      login(token);

      setLoading(false);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setLoading(false);
      console.log('erro ao realizar o login', error)
      alert('Erro ao tentar realizar o login');
    }
  }

  const rules = {
    email: {
      required: "Email é obrigatório",
      validate: validateEmail,
    },
    password: {
      required: "Senha é obrigatória",
      validate: validatePasswordLogin,
    },
  };

  return {  
    rules: rules,
    handleLogin,
    handleSubmit,
    loading,
    control,
    errors
  }
}

export default useHookLogin;