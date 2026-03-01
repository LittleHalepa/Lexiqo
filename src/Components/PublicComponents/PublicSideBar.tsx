import { useNavigate } from 'react-router-dom';
// import { useUser } from '../../contexts/userContext';
import logo from '/logo.png';

export const PublicSideBar = () => {

    // const { user } = useUser();
    const nav = useNavigate();

    const handleDashboardButtonClick = () => {
        // !FOR NOW, BUT SHOULD BE CHANGED TO CHECK IF USER IS LOGGED IN OR NOT, AND THEN NAVIGATE TO DASHBOARD OR LOGIN PAGE
        nav('/login');
    }

    return (
        <nav className="flex flex-row items-center justify-between px-6 bg-white shadow-sm">
            <div className="flex items-center">
                <img src={logo} alt="Lexiqo Logo" width={60}/>
                <h1 className="text-2xl font-bold text-brand">Lexiqo</h1>
            </div>
            <div className="flex items-center gap-6">
                <div className="hidden md:block">
                    <ul className="flex flex-row gap-8">
                        <li>
                            <a href="/collections" className="text-md font-medium text-gray-700 hover:text-gray-900">Collections</a>
                        </li>
                        <li>
                            <a href="/explore" className="text-md font-medium text-gray-700 hover:text-gray-900">Explore</a>
                        </li>
                        <li>
                            <a href="/about" className="text-md font-medium text-gray-700 hover:text-gray-900">About</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <button className="bg-brand flex items-center gap-1 cursor-pointer text-white font-semibold px-4 py-2 rounded-md hover:bg-brand-dark" onClick={handleDashboardButtonClick}><i className='bx bx-compass'></i> Dashboard</button>
                </div>
            </div>
        </nav>
    );
}