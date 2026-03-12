import UFOAnimatedIcon from "./UI/UFOAnimation";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {

    const nav = useNavigate();

    return (
        <div className="flex flex-col items-center h-screen">
            <UFOAnimatedIcon size={350}/>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-center mb-4">404 - Lost In Space.</h1>
                <p className="text-gray-500 text-center mb-8">The page you are looking for does not exist or something went wrong.</p>
                <button className="bg-brand cursor-pointer text-white font-bold py-2 px-4 rounded" onClick={() => {
                    nav("/login");
                }}>
                    Go back to Home
                </button>
            </div>
        </div>
    );
}