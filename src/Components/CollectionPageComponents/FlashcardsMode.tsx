import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useNav } from "../../contexts/headerAndFooterContext";
import { Flashcards } from "./FlashcardsComponent";
import { sendRequest } from "../../utils/ApiUtils";
import ConfettiAnimatedIcon, { type ConfettiAnimatedIconRef } from "../UI/Confetti.tsx";

export const FlashcardMode = () => {

    const location = useLocation();

    const collection = location.state?.collection;

    const nav = useNavigate();
    
    const { setShowHeader, setShowFooter } = useNav();
    const [isLoading, setIsLoading] = useState(true);
    const [cardIndex, setCardIndex] = useState(0);
    const [cardHeight, setCardHeight] = useState("600px");
    const confettiRef = useRef<ConfettiAnimatedIconRef>(null);
    const [cards, setCards] = useState<Array<{
        id: number,
        collection_id: number,
        term: string,
        definition: string,
        image: string | null,
        created_at: string,
        updated_at: string
    }>>([]);

    useEffect(() => {
        setShowHeader(false);
        setShowFooter(false);
    }, [setShowFooter, setShowHeader]);

    useEffect(() => {
        sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/get-cards`, 'POST', {
            id: collection.id
        }).then((data) => {
    
            if (data.error || !data) {
            setCards([]);
            console.error('Failed to fetch cards, ' + data.error);
            return;
            }
    
            setCards(data.cards);
            console.log(data.cards);
        }).finally(() => {
            setIsLoading(false);
        });

        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setCardHeight("600px"); // sm
            } else if (width < 1024) {
                setCardHeight("700px"); // md
            } else {
                setCardHeight("800px"); // lg
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const handleBackToCollection = () => {
        const currentPath = location.pathname;
        const collectionPath = currentPath.split('/flashcards')[0];

        nav(collectionPath, { state: { collection: collection } });
    }

    const handleRandomizeCards = () => {
        const shuffle = [...cards];

        for (let i = shuffle.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
        }
        setCards(shuffle);
        setCardIndex(0);
    }

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

    const handleSettingsButtonClick = () => {

        const modesMenu = document.getElementById('modes-dropdown');
        const dropdownIcon= document.getElementById('dropdown-icon');
        if (modesMenu && !modesMenu.classList.contains('hidden')) {
            modesMenu.classList.add('hidden');
            dropdownIcon?.classList.remove('rotate-180');
        }

        const settingsMenu = document.getElementById('settings-dropdown');
        const conIcon = document.querySelector('.bxs-cog');
        if (settingsMenu) {
            if (settingsMenu.classList.contains('hidden')) {
                settingsMenu.classList.remove('hidden');
                conIcon?.classList.add('rotate-180');
            } else {
                settingsMenu.classList.add('hidden');
                conIcon?.classList.remove('rotate-180');
            }
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center p-3">
            <div className="fixed inset-0 pointer-events-none z-100 overflow-hidden">
                <ConfettiAnimatedIcon ref={confettiRef} />
            </div>
            <div className="fixed right-0 left-0 top-0 flex justify-between items-center py-4 z-10 bg-white border-b border-gray-300">
                <div className={`absolute h-1 left-0 top-15 bg-brand transition-all duration-300 z-10`} 
                style={{
                    width: `${cards.length ? ((cardIndex) / cards.length) * 100 : 0}%`
                }}></div>
                <button className="ml-2 text-xs border shadow-sm hover:bg-gray-100 cursor-pointer rounded-lg px-2 py-1 border-[rgba(51,51,51,20%)] flex items-center gap-1" onClick={() => handleBackToCollection()}>
                    <i className='text-md translate-y-[0.05rem] bx bx-left-arrow-alt'></i> Back
                </button>
                <h2 className="absolute left-1/2 transform text-center -translate-x-1/2 text-lg font-semibold">{collection.name}</h2>
                <div className="flex items-center gap-4 mr-2 relative">
                    <button className="text-2xl" onClick={handleModesButtonClick}>
                        <i id="dropdown-icon" className='bx bx-chevron-down transition-all'></i>
                        <i className='bx bxs-collection' ></i>
                    </button>
                    <button id="settings-button" className="text-2xl" onClick={handleSettingsButtonClick}>
                        <i className='bx bxs-cog transition-all' ></i>
                    </button>
                </div>
                <div id="modes-dropdown" className="absolute right-1 top-13 rounded-md shadow-sm bg-white/70 backdrop-blur-2xl border border-gray-300 hidden z-20">
                    <ul className="flex flex-col gap-1 p-3 text-lg font-medium">
                        <li id="flashcards" className="py-2 px-4 rounded-md flex items-center gap-2 relative text-brand hover:bg-gray-100 cursor-pointer transition-all"><i className='bx bxs-collection text-brand' ></i> Flashcards</li>
                        <li id="learn" className="py-2 px-4 rounded-md flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-all"><i className='bx bx-brain' ></i> Learn</li>
                        <li id="test" className="py-2 px-4 rounded-md flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-all"><i className='bx bxs-graduation' ></i> Test</li>
                        <li id="challenge" className="py-2 px-4 rounded-md flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-all"><i className='bx bx-game' ></i> Challenge</li>
                    </ul>
                </div>
                <div id="settings-dropdown" className="absolute right-1 top-13 rounded-md shadow-sm bg-white/70 backdrop-blur-2xl border border-gray-300 hidden z-20">
                    <ul className="flex flex-col gap-1 p-3 text-lg font-medium">
                        <li className="py-2 px-4 rounded-md flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-all" onClick={handleRandomizeCards}><i className='bx bxs-dice-4' ></i> Randomize</li>
                    </ul>
                </div>
            </div>
            <div className="w-full max-w-3xl pt-20 md:-translate-x-25 pb-10">
                {isLoading ? (<div className="mx-4"> 
                    <div className="h-[550px] bg-gray-200 animate-pulse rounded-md"></div>
                    <div className="flex justify-between items-center mt-3">
                    <i className='bx bx-left-arrow-alt text-3xl font-medium text-gray-400 animate-pulse'></i>
                    <div className="bg-gray-200 animate-pulse h-4 w-20 rounded-md"></div>
                    <i className='bx bx-right-arrow-alt text-3xl font-medium text-gray-400 animate-pulse' ></i>
                    </div>
                </div>) : (<Flashcards cards={cards} height={cardHeight} index={cardIndex} setIndex={setCardIndex} confettiRef={confettiRef}/>)}
            </div>
        </div>
    );
}