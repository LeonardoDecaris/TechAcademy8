import { useNavigate } from "react-router-dom";

const STYLE = {
    main: "bg-black w-full h-screen flex justify-center items-center",
    title: "text-white font-bold text-9xl ",
    mensagem: "text-white text-2xl ",
    button: "bg-white/40 text-white/80 font-semibold px-4 py-2 rounded transition hover:bg-white/100 hover:text-black/80 hover:box-shadow-lg"
}

function ErroSemAcesso() {
    const navigate = useNavigate();

    return (
        <main className={STYLE.main}>
            <div className="flex flex-col items-center gap-10">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className={STYLE.title}>Usuário <br /> sem acesso</h1>
                    <h2 className={STYLE.mensagem}>Você não tem permissão para acessar esta área.</h2>
                </div>
                <button className={STYLE.button} onClick={() => navigate("/")}>Voltar para o login</button>
            </div>
        </main>
    )
}

export default ErroSemAcesso;