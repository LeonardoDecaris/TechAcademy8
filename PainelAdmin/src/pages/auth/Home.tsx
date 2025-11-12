import useHookGetUser from "@/hook/user/hookGetUser";
import { useEffect } from "react";

function Home() {
    const { userData, loading, message, handleGetUser } = useHookGetUser();
    useEffect(() => {
        handleGetUser();
        console.log(userData);
    }, []);
    return(
        <main className="p-4" >

        </main>
    );
}

export default Home;