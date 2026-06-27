import { useEffect, useState } from "react";
import { useNav } from "../../contexts/headerAndFooterContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ModesDropDown from "../UI/ModesDropDown";
import StartupAnimatedIcon from "../UI/StartupAnimation";

const TestMode = () => {

    const { setShowHeader, setShowFooter } = useNav();
    const location = useLocation();

    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

    const collection = location.state?.collection;
    const nav = useNavigate();

    const colorMap: Record<string, string> = {
        '[#641ae6]': 'hover:bg-[#641ae6]',
        'yellow-500': 'hover:bg-yellow-500',
        'pink-500': 'hover:bg-pink-500',
        'red-500': 'hover:bg-red-500',
        'orange-500': 'hover:bg-orange-500',
        'green-500': 'hover:bg-green-500',
        'blue-500': 'hover:bg-blue-500',
        'black': 'hover:bg-gray-800',
    };

    const testContent = [
        {
            id: 1,
            type: "multiple-choice",
            question: "What is the capital of France?",
            answer: "Paris",
            options: ["Paris", "London", "Berlin", "Madrid"]
        },
        {
            type: "multiple-choice",
            id: 2,
            question: "What is the largest planet in our solar system?",
            answer: "Jupiter",
            options: ["Earth", "Mars", "Jupiter", "Saturn"]
        },
        {
            id: 3,
            type: "multiple-choice",
            question: "What is the chemical symbol for water?",
            answer: "H2O",
            options: ["H2O", "CO2", "O2", "NaCl"]
        },
        {
            id: 4,
            type: "multiple-choice",
            question: "Who wrote 'Romeo and Juliet'?",
            answer: "William Shakespeare",
            options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"]
        },
        {
            id: 5,
            type: "multiple-choice",
            question: "What is the speed of light?",
            answer: "299,792,458 meters per second",
            options: ["299,792,458 meters per secondsdffffffffffffffffffffff", "150,000,000 meters per second", "1,000,000 meters per second", "3,000,000 meters per second"]
        },
        {
            id: 6,
            type: "typing",
            question: "Type the chemical formula for table salt.",
            answer: "NaCl",
            options: []
        },
        {
            id: 7,
            type: "true-false",
            question: "The Earth is flat.",
            givenAnswer: "Wrong",
            answer: "False",
            options: ["True", "False"]
        }
    ];

    useEffect(() => {
        setShowHeader(false);
        setShowFooter(false);
    }, [setShowFooter, setShowHeader]);

    const handleBackToCollection = () => {
        const currentPath = location.pathname;
        const newPath = currentPath.split('/test')[0];
        nav(newPath);
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
        <div className="w-full pt-16">
            <div className="fixed right-0 left-0 top-0 flex justify-between items-center py-4 z-10 bg-white border-b border-gray-300">
                <div className={`absolute h-1 left-0 top-15 bg-brand transition-all duration-300 z-10`} 
                style={{
                    width: `${testContent.length ? ((Object.keys(userAnswers).length) / testContent.length) * 100 : 0}%`
                }}></div>
               <div>
                    <button className="ml-2 text-xs border shadow-sm hover:bg-gray-100 cursor-pointer rounded-lg px-2 py-1 border-[rgba(51,51,51,20%)] flex items-center gap-1" onClick={() => handleBackToCollection()}>
                        <i className='text-md translate-y-[0.05rem] bx bx-left-arrow-alt'></i> Back
                    </button>
               </div>
               <div className="absolute left-1/2 transform text-center -translate-x-1/2 text-lg font-semibold">
                    <h2>{collection.name}</h2>
                    <p className="text-sm text-gray-500">{Object.keys(userAnswers).length}/{testContent.length}</p>
               </div>
               <div className="flex items-center gap-4 relative mr-2">
                    <ModesDropDown />
                    <button id="settings-button" className="text-2xl" onClick={handleSettingsButtonClick}>
                        <i className='bx bxs-cog transition-all' ></i>
                    </button>
                    <div id="settings-dropdown" className="absolute right-1 top-13 rounded-md shadow-sm bg-white/70 backdrop-blur-2xl border border-gray-300 hidden z-20">
                        <ul className="flex flex-col gap-1 p-3 text-lg font-medium">
                            <li className="py-2 px-4 rounded-md flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-all"><i className='bx bxs-dice-4' ></i> Randomize</li>
                            <li className="py-2 px-4 rounded-md flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-all"><i className='bx bx-transfer' ></i> Swap</li>
                        </ul>
                    </div>
               </div>
            </div>  
            <div id="test-content" className="w-full max-w-6xl pt-8 flex flex-col gap-8 mx-auto md:-translate-x-24 pb-10 transition-all">
                    {testContent.map((item, index) => {

                        if (item.type === "multiple-choice") {
                            return (
                                <div key={item.id} className="px-4 md:px-8 py-4 md:py-8 bg-white border border-gray-300 rounded-lg shadow-sm">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-between gap-2 items-start">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-400">Term</span>
                                                <h3 className="text-xl font-semibold">{item.question}</h3>
                                            </div>
                                            <p className="text-md text-gray-500">{index + 1}/{testContent.length}</p>
                                        </div>
                                        <div className="flex items-center justify-center w-full">
                                            <div className="flex-1 rounded-sm h-0.5 bg-gray-300"></div>
                                            <span className="-translate-y-0.5 px-2 text-sm text-gray-700 whitespace-nowrap">Choose the correct option</span>
                                            <div className="flex-1 rounded-sm h-0.5 bg-gray-300"></div>
                                        </div>
                                        <div className="grid grid-cols-1 text-lg md:grid-cols-2 gap-4">
                                            {item.options.map((option, index) => (
                                                <button key={index} className={`py-2 px-4 ${userAnswers[item.id] === option ? 'bg-[#641ae6] text-white' : 'bg-gray-100/20 text-gray-700 hover:bg-gray-200'} cursor-pointer shadow-xs border border-gray-300 rounded-md transition-all`} onClick={() => setUserAnswers(prev => ({ ...prev, [item.id]: option }))}>
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        if (item.type === "typing") {
                            return (
                                <div key={item.id} className="px-4 md:px-8 py-4 md:py-8 bg-white border border-gray-300 rounded-lg shadow-sm">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-between gap-2 items-start">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-400">Term</span>
                                                <h3 className="text-xl font-semibold">{item.question}</h3>
                                            </div>
                                            <p className="text-md text-gray-500">{index + 1}/{testContent.length}</p>
                                        </div>
                                        <div className="flex items-center justify-center w-full">
                                            <div className="flex-1 rounded-sm h-0.5 bg-gray-300"></div>
                                            <span className="-translate-y-0.5 px-2 text-sm text-gray-700 whitespace-nowrap">Type your answer below</span>
                                            <div className="flex-1 rounded-sm h-0.5 bg-gray-300"></div>
                                        </div>
                                        <input type="text" placeholder="Type your answer here..." className={`w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#641ae6] focus:border-[#641ae6] transition-all`} value={userAnswers[item.id] || ""} onChange={(e) => setUserAnswers(prev => ({ ...prev, [item.id]: e.target.value }))} />
                                    </div>
                                </div>
                            );
                        }

                        if (item.type === "true-false") {
                            return (
                                <div key={item.id} className="px-4 md:px-8 py-4 md:py-8 bg-white border border-gray-300 rounded-lg shadow-sm">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-between gap-2 items-start">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-400">Term</span>
                                                <h3 className="text-xl font-semibold">{item.question}</h3>
                                            </div>
                                            <p className="text-md text-gray-500">{index + 1}/{testContent.length}</p>
                                        </div>
                                        <hr className="border-gray-300"></hr>
                                        <div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-400">Definition</span>
                                                <h3 className="text-xl font-semibold">{item.givenAnswer}</h3>
                                            </div>
                                        </div>    
                                        <div className="flex w-full gap-4 items-center justify-center">
                                            <button className={`py-2 px-4 w-full cursor-pointer ${userAnswers[item.id] === "True" ? 'bg-green-500 text-white' : 'bg-gray-100/20 text-gray-700 hover:bg-gray-200'} shadow-xs border border-gray-300 rounded-md transition-all`} onClick={() => setUserAnswers(prev => ({ ...prev, [item.id]: "True" }))}>True</button>
                                            <button className={`py-2 px-4 w-full cursor-pointer ${userAnswers[item.id] === "False" ? 'bg-red-500 text-white' : 'bg-gray-100/20 text-gray-700 hover:bg-gray-200'} shadow-xs border border-gray-300 rounded-md transition-all`} onClick={() => setUserAnswers(prev => ({ ...prev, [item.id]: "False" }))}>False</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return null;

                    })}
            </div>
            <div className="flex gap-4 md:-translate-x-24 justify-center flex-col items-center w-full max-w-6xl mx-auto pb-10">
                <div className="flex flex-col items-center gap-2">
                    <StartupAnimatedIcon size={100} />
                    <p className="text-lg text-gray-500 font-medium">Are you ready? Send your answers!</p>
                </div>
                <button className="bg-brand cursor-pointer flex items-center gap-2 justify-center text-lg text-white px-8 py-3 font-medium rounded-xl shadow-md hover:bg-[#4b0fb5] transition-all" onClick={() => console.log(userAnswers)}>
                    Send answers <i className='bx text-lg bx-check-circle'></i>
                </button>
            </div>
        </div>
    );

}

export default TestMode;