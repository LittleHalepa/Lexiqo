import { useLocation, useNavigate } from "react-router-dom";

const ModesDropDown = () => {

    const location = useLocation();
    const currentPath = location.pathname;
    const mode = currentPath.split('/').pop();

    const collection = location.state?.collection;

    const nav = useNavigate();

    const handleModesButtonClick = () => {
        const settingsMenu = document.getElementById('settings-dropdown');

        if (settingsMenu && !settingsMenu.classList.contains('hidden')) {
            settingsMenu.classList.add('hidden');
            const conIcon = document.querySelector('.bxs-cog');
            conIcon?.classList.remove('rotate-180');
        }

        const modesMenu = document.getElementById('modes-dropdown');
        const dropdownIcon= document.getElementById('dropdown-icon');
        if (modesMenu) {
            if (modesMenu.classList.contains('hidden')) {
                modesMenu.classList.remove('hidden');
                dropdownIcon?.classList.add('rotate-180');
            } else {
                modesMenu.classList.add('hidden');
                dropdownIcon?.classList.remove('rotate-180');
            }
        }
    }

    return (
        <div className="flex items-center gap-2 relative">
            <button className="text-2xl" onClick={handleModesButtonClick}>
                <i id="dropdown-icon" className='bx bx-chevron-down transition-all cursor-pointer'></i>
                <i className={`bx ${mode === 'flashcards' ? 'bxs-collection' : mode === 'learn' ? 'bx-brain' : mode === 'test' ? 'bxs-graduation' : 'bx-game'}`} ></i>
            </button>
            <div id="modes-dropdown" className="absolute -right-10 top-10 rounded-md shadow-sm bg-white/70 backdrop-blur-2xl border border-gray-300 hidden z-20">
                <ul className="flex flex-col gap-1 p-3 text-lg font-medium">
                    <li id="flashcards" className={`py-2 px-4 rounded-md flex items-center gap-2 ${mode === 'flashcards' ? 'text-brand' : ''} relative hover:bg-gray-100 cursor-pointer transition-all`} onClick={() => nav(currentPath.replace(`/${mode}`, '/flashcards'), { state: { collection } })}>
                        <i className={`bx bxs-collection ${mode === 'flashcards' ? 'text-brand' : ''}`}></i> Flashcards
                    </li>
                    <li id="learn" className={`py-2 px-4 rounded-md flex items-center gap-2 ${mode === 'learn' ? 'text-brand' : ''} hover:bg-gray-100 cursor-pointer transition-all`} onClick={() => nav(currentPath.replace(`/${mode}`, '/learn'), { state: { collection } })}>
                        <i className={`bx bx-brain ${mode === 'learn' ? 'text-brand' : ''}`} ></i> Learn
                    </li>
                    <li id="test" className={`py-2 px-4 rounded-md flex items-center gap-2 ${mode === 'test' ? 'text-brand' : ''} hover:bg-gray-100 cursor-pointer transition-all`} onClick={() => nav(currentPath.replace(`/${mode}`, '/test'), { state: { collection } })}>
                        <i className={`bx bxs-graduation ${mode === 'test' ? 'text-brand' : ''}`} ></i> Test
                    </li>
                    <li id="challenge" className={`py-2 px-4 rounded-md flex items-center gap-2 ${mode === 'challenge' ? 'text-brand' : ''} hover:bg-gray-100 cursor-pointer transition-all`} onClick={() => nav(currentPath.replace(`/${mode}`, '/challenge'), { state: { collection } })}>
                        <i className={`bx bx-game ${mode === 'challenge' ? 'text-brand' : ''}`} ></i> Challenge
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ModesDropDown;