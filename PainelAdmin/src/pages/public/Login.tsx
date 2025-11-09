import InputCustom from "@/components/custom/form/InputCustom";
import useHookLogin from "@/hook/formLogin/HookLogin";
import { Button } from "@/components/ui/button";

const STYLE = {
  main: "flex justify-center items-center w-full h-screen",
  section: "border border-black/20 px-5 py-10 rounded-lg max-w-sm w-full ",
  form: "flex flex-col gap-4 w-full",
  h3: "text-black text-4xl font-bold text-center mb-10",
  label: "pl-2 pb-1"
}

function Login() {

  const { control, handleLogin, handleSubmit, rules, errors} = useHookLogin();
  
  return (
    <main className={STYLE.main}>
      <section className={STYLE.section}>
        <form className={STYLE.form} onSubmit={handleSubmit(handleLogin)}>
          <h3 className={STYLE.h3}>LOGIN</h3>

          <InputCustom name="email" label="Email" id="email" type="email" placeholder="exemplo@exemplo.com" control={control} rules={rules.email} error={errors.email?.message} />
          <InputCustom name="password" label="Password" id="password" type="password" placeholder="Password" control={control} rules={rules.password} error={errors.password?.message} />

          <Button type="submit" className="text-[1.2rem] py-1">Login</Button>
        </form>
      </section>
    </main>
  );
}

export default Login;