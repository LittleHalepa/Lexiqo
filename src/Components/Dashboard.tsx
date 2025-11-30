import { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext";
import HeaderComponent from "./DashBoardComponents/Header";
import Footer from "./DashBoardComponents/Footer";
import { Outlet } from "react-router-dom";
import { sendRequest } from "../utils/ApiUtils";

export default function Dashboard() {

    const { user, setUser } = useUser();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            setIsLoading(true);

            sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/user`, 'GET').then((data) => {

                if (data && data.user) {
                    setUser(data.user);
                } else if (data && data.error) {
                    setUser(null);
                    alert(data.message);
                } else {
                    setUser(null);
                    alert("Failed to fetch user data.");
                }

                setIsLoading(false);

            });
        }
    }, []);

    return (
        <div className="">
            <HeaderComponent/>

            <main className="pt-26 pb-19">
                { isLoading ? <div className="pt-40 text-center text-lg font-medium">Loading...</div> : <Outlet/> }
            </main>

            <Footer/>
        </div>
    );
}