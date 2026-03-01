import { Outlet } from "react-router-dom";
import { PublicSideBar } from "./PublicSideBar.tsx";

export const PublicCollectionPage = () => {

    return (
        <div className="">
            <PublicSideBar/>
            <main className={``}>
                <Outlet/>
            </main>
        </div>
    );
}