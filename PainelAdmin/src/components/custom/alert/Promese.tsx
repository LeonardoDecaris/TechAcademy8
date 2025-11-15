import { toast } from "sonner";

type ToastPromiseOptions = {
  loading?: string;
  success?: string | ((data: any) => string);
  error?: string | ((err: any) => string);
};

function successMsg(data: any) {
  return (
    data?.message ||
    data?.mensagem ||
    data?.data?.message ||
    "Login realizado com sucesso"
  );
}

function errorMsg(err: any, fallback?: string) {
  const src = err?.data ?? err?.response?.data ?? err;
  return (
    src?.message ||
    src?.mensagem ||
    src?.error ||
    src?.errors?.[0]?.message ||
    fallback ||
    "Falha no login"
  );
}

export function loginToast<T>(fn: () => Promise<T>, opts?: ToastPromiseOptions) {
  return toast.promise(fn(), {
    loading: opts?.loading ?? "Entrando...",
    success:
      typeof opts?.success === "function"
        ? opts.success
        : (data) => (opts?.success as string) ?? successMsg(data),
    error: (err) =>
      typeof opts?.error === "function"
        ? (opts.error as any)(err)
        : errorMsg(err, opts?.error as string),
  });
}