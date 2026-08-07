import { useEffect, useState } from "react";
import { useNav } from "../../contexts/headerAndFooterContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ModesDropDown from "../UI/ModesDropDown";
import StartupAnimatedIcon from "../UI/StartupAnimation";
import { sendRequest } from "../../utils/ApiUtils";

type AnswerStats = {
    count: number;
    percentage: number;
}

const TestMode = () => {

    const { setShowHeader, setShowFooter } = useNav();
    const location = useLocation();

    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [testContent, setTestContent] = useState<Array<{
        id: number;
        type: 'multiple-choice' | 'true-false' | 'text-input';
        question: string;
        givenAnswer?: string;
        answer: string;
        options: string[];
    }>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isTestCompleted, setIsTestCompleted] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState<AnswerStats>({ count: 0, percentage: 50 });
    const [wrongAnswersCount, setWrongAnswersCount] = useState<AnswerStats>({ count: 0, percentage: 50 });

    const collection = location.state?.collection;
    const nav = useNavigate();

    const colorMap: Record<string, string> = {
        'brand': 'bg-[#641ae6]',
        'yellow-500': 'bg-yellow-500',
        'pink-500': 'bg-pink-500',
        'red-500': 'bg-red-500',
        'orange-500': 'bg-orange-500',
        'green-500': 'bg-green-500',
        'blue-500': 'bg-blue-500',
        'black': 'bg-gray-800',
    };

    const ringColorMap: Record<string, string> = {
        'brand': 'focus:ring-[#641ae6]',
        'yellow-500': 'focus:ring-yellow-500',
        'pink-500': 'focus:ring-pink-500',
        'red-500': 'focus:ring-red-500',
        'orange-500': 'focus:ring-orange-500',
        'green-500': 'focus:ring-green-500',
        'blue-500': 'focus:ring-blue-500',
        'black': 'focus:ring-gray-800',
    };

    const fetchTestData = async () => {
        try {
            const numberOfFourAnswersQuestions = 4;
            const numberOfTrueFalseQuestions = 4;
            const numberOfTextInputQuestions = 4;

            const collectionUuid = collection.uuid;

            const testData = await sendRequest(
                `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/get-test-data?numberOfFourAnswersQuestions=${numberOfFourAnswersQuestions}&numberOfTrueFalseQuestions=${numberOfTrueFalseQuestions}&numberOfTextInputQuestions=${numberOfTextInputQuestions}&collectionUuid=${collectionUuid}`,
                'GET'
            );

            if (testData.error) {
                console.error("Error fetching test data:", testData.message);
                return;
            }

            setTestContent(testData.testSet);
        } catch (error) {
            console.error("Error fetching test data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);

        fetchTestData();
    }, []);

    useEffect(() => {
        setShowHeader(false);
        setShowFooter(false);
    }, [setShowFooter, setShowHeader]);

    useEffect(() => {
        
    }, [isTestCompleted]);

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

    const handleSubmitAnswers = () => {

        window.scrollTo({ top: 0, behavior: 'smooth' });

        const userAnswersArray = Object.entries(userAnswers).map(([questionId, answer]) => ({
            questionId: parseInt(questionId),
            answer: answer
        }));

        let correctCount = 0;
        let wrongCount = testContent.length - userAnswersArray.length; 

        for (let i = 0; i < userAnswersArray.length; i++) {
            const questionId = userAnswersArray[i].questionId;
            const question = testContent.find(q => q.id === questionId);

            if (!question) {
                console.error(`Question with ID ${questionId} not found.`);
                continue;
            }

            if (question.type === 'multiple-choice' || question.type === 'text-input') {
                if (userAnswersArray[i].answer.trim().toLowerCase() === question.answer.trim().toLowerCase()) {
                    correctCount++;
                } else {
                    wrongCount++;
                }
            } else if (question.type === 'true-false') {
                if (userAnswersArray[i].answer === question.answer) {
                    correctCount++;
                } else {
                    wrongCount++;
                }
            } else {
                console.error(`Unknown question type for question ID ${questionId}.`);
            }
        }

        const total = correctCount + wrongCount;

        const correctPercent = total === 0 ? 50 : correctCount / total * 100;

        setIsTestCompleted(true);

        setTimeout(() => {
            setCorrectAnswersCount({ count: correctCount, percentage: correctPercent });
            setWrongAnswersCount({ count: wrongCount, percentage: 100 - correctPercent });
        }, 200);
    }

    const handleTryAgain = async () => {
        setUserAnswers({});
        setIsTestCompleted(false);
        setCorrectAnswersCount({ count: 0, percentage: 50 });
        setWrongAnswersCount({ count: 0, percentage: 50 });
        setTestContent([]);

        await fetchTestData();

        scrollTo({ top: 0, behavior: 'smooth' });
    }

    const grayTemplateNumber = 5; 

    return (
        <div className="w-full pt-16">

            {isTestCompleted && (
                <div className="flex flex-col px-2 md:px-0 md:-translate-x-24 w-full justify-center items-center gap-4 pt-4">
                    <h2 className="text-3xl font-bold text-gray-900">Test Completed!</h2>
                    <div className="flex w-full max-w-6xl text-white rounded-full overflow-hidden">
                        <div
                            className="bg-green-500 transition-all duration-700 flex justify-center items-center"
                            style={{ width: `${correctAnswersCount.percentage}%` }}
                        >
                            {correctAnswersCount.count !== 0 && correctAnswersCount.count}
                        </div>

                        <div
                            className="bg-red-500 transition-all duration-700 flex justify-center items-center"
                            style={{ width: `${wrongAnswersCount.percentage}%` }}
                        >
                            {wrongAnswersCount.count !== 0 && wrongAnswersCount.count}
                        </div>
                    </div>
                </div>
            )}

            <div className="fixed right-0 left-0 top-0 flex justify-between items-center py-4 z-10 bg-white border-b border-gray-300">
                <div className={`absolute h-1 left-0 top-15 ${colorMap[collection.color]} transition-all duration-300 z-10`} 
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
                    {isLoading ? (
                        Array.from({ length: grayTemplateNumber }).map((_, index) => {
                            return (
                                <div key={index} className="px-4 md:px-8 py-4 md:py-8 bg-gray-100/20 border border-gray-300 rounded-lg shadow-sm animate-pulse">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-between gap-2 items-start">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-400">Term</span>
                                                <h3 className="text-xl font-semibold bg-gray-300 rounded-md w-48 h-6"></h3>
                                            </div>
                                            <p className="text-md text-gray-500 bg-gray-300 rounded-md w-6 h-6"></p>
                                        </div>
                                        <div className="flex items-center justify-center w-full animation-pulse">
                                            <div className="flex-1 rounded-sm h-0.5 bg-gray-300"></div>
                                            <span className="-translate-y-0.5 px-2 text-sm text-gray-400 whitespace-nowrap">Choose the correct option</span>
                                            <div className="flex-1 rounded-sm h-0.5 bg-gray-300"></div>
                                        </div>
                                        <div className="grid grid-cols-1 text-lg md:grid-cols-2 gap-4">
                                            {Array.from({ length: 4 }).map((_, optionIndex) => (
                                                <div key={optionIndex} className="py-2 px-4 bg-gray-300 rounded-md w-full h-10"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        testContent.map((item, index) => {

                            if (item.type === "multiple-choice") {
                                return (
                                    <div key={item.id} className={`px-4 md:px-8 py-4 md:py-8 rounded-lg shadow-sm border transition-all ${
                                        !isTestCompleted
                                            ? 'bg-white border-gray-300'
                                            : userAnswers[item.id] === item.answer
                                                ? 'bg-green-50/30 border-green-300'
                                                : 'bg-red-50/30 border-red-300'
                                    }`}>
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
                                                    (option ? (
                                                        <button key={index} className={`py-2 px-4 ${
                                                                !isTestCompleted
                                                                    ? userAnswers[item.id] === option
                                                                        ? `${colorMap[collection.color]} text-white`
                                                                        : 'bg-gray-100/20 text-gray-700 hover:bg-gray-200'
                                                                    : option === item.answer
                                                                        ? 'border-green-500 border-2 bg-green-500/20 text-green-700'
                                                                        : userAnswers[item.id] === option
                                                                            ? 'border-red-500 border-2 bg-red-500/20 text-red-700'
                                                                            : 'bg-gray-100/20 text-gray-700'
                                                            } cursor-pointer shadow-xs border border-gray-300 rounded-md transition-all`} 
                                                            onClick={() => {if (!isTestCompleted) setUserAnswers(prev => ({ ...prev, [item.id]: option }))}}>
                                                            {option}
                                                        </button>
                                                    ) : null)
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            if (item.type === "text-input") {
                                return (
                                    <div key={item.id} className={`px-4 md:px-8 py-4 md:py-8 rounded-lg shadow-sm border transition-all ${
                                        !isTestCompleted
                                            ? 'bg-white border-gray-300'
                                            : userAnswers[item.id]?.trim().toLowerCase() === item.answer.trim().toLowerCase()
                                                ? 'bg-green-50/30 border-green-300'
                                                : 'bg-red-50/30 border-red-300'
                                    }`}>
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
                                            <div className="flex flex-col gap-2">
                                                <input type="text" disabled={isTestCompleted} placeholder="Type your answer here..." className={`w-full py-2 px-4 border rounded-md transition-all ${
                                                    !isTestCompleted
                                                        ? `border-gray-300 focus:outline-none focus:ring-2 ${ringColorMap[collection.color]} focus:border-${collection.color}`
                                                        : userAnswers[item.id]?.trim().toLowerCase() === item.answer.trim().toLowerCase()
                                                            ? `${colorMap[collection.color]} border-green-500 bg-green-500/10 text-green-700`
                                                            : 'border-red-500 bg-red-500/10 text-red-700 focus-none'
                                                }`} value={userAnswers[item.id] || ""} onChange={(e) => { if (!isTestCompleted) setUserAnswers(prev => ({ ...prev, [item.id]: e.target.value })) }} />
                                                {isTestCompleted &&
                                                userAnswers[item.id]?.trim().toLowerCase() !== item.answer.trim().toLowerCase() && (
                                                    <p className="text-green-700 self-start px-1 rounded-md font-medium">
                                                        Correct answer: <span className="font-semibold">{item.answer}</span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            if (item.type === "true-false") {
                                return (
                                    <div key={item.id} className={`px-4 md:px-8 py-4 md:py-8 rounded-lg shadow-sm border transition-all ${
                                        !isTestCompleted
                                            ? 'bg-white border-gray-300'
                                            : userAnswers[item.id] === item.answer
                                                ? 'bg-green-50/30 border-green-300'
                                                : 'bg-red-50/30 border-red-300'
                                    }`}>
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
                                                <button className={`py-2 px-4 w-full cursor-pointer ${
                                                    !isTestCompleted
                                                        ? userAnswers[item.id] === "True"
                                                            ? `${colorMap[collection.color]} text-white`
                                                            : 'bg-gray-100/20 text-gray-700 hover:bg-gray-200'
                                                        : item.answer === "True"
                                                            ? 'border-green-500 border-2 bg-green-500/20 text-green-700'
                                                            : userAnswers[item.id] === "True"
                                                                ? 'border-red-500 border-2 bg-red-500/20 text-red-700'
                                                                : 'bg-gray-100/20 text-gray-700'
                                                } shadow-xs border border-gray-300 rounded-md transition-all`} onClick={() => { if (!isTestCompleted) setUserAnswers(prev => ({ ...prev, [item.id]: "True" })) }}>True</button>
                                                <button className={`py-2 px-4 w-full cursor-pointer ${
                                                    !isTestCompleted
                                                        ? userAnswers[item.id] === "False"
                                                            ? `${colorMap[collection.color]} text-white`
                                                            : 'bg-gray-100/20 text-gray-700 hover:bg-gray-200'
                                                        : item.answer === "False"
                                                            ? 'border-green-500 border-2 bg-green-500/20 text-green-700'
                                                            : userAnswers[item.id] === "False"
                                                                ? 'border-red-500 border-2 bg-red-500/20 text-red-700'
                                                                : 'bg-gray-100/20 text-gray-700'
                                                } shadow-xs border border-gray-300 rounded-md transition-all`} onClick={() => { if (!isTestCompleted) setUserAnswers(prev => ({ ...prev, [item.id]: "False" })) }}>False</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return null;

                        }))}   
                </div>
            {!isTestCompleted && !isLoading && (
                <div className="flex gap-4 md:-translate-x-24 justify-center flex-col items-center w-full max-w-6xl mx-auto pb-10">
                    <div className="flex flex-col items-center gap-2">
                        <StartupAnimatedIcon size={100} />
                        <p className="text-lg text-gray-500 font-medium">Are you ready? Send your answers!</p>
                    </div>
                    <button className="bg-brand cursor-pointer flex items-center gap-2 justify-center text-lg text-white px-8 py-3 font-medium rounded-xl shadow-md hover:bg-[#4b0fb5] transition-all" onClick={handleSubmitAnswers}>
                        Send answers <i className='bx text-lg bx-check-circle'></i>
                    </button>
                </div>
            )}
            {
                isTestCompleted && (
                    <div className="flex gap-4 md:-translate-x-24 justify-center flex-row items-center w-full max-w-6xl mx-auto pb-10">
                        <button className="bg-brand cursor-pointer flex items-center gap-2 justify-center text-lg text-white px-4 py-3 font-medium rounded-xl shadow-md hover:bg-[#4b0fb5] transition-all" onClick={handleBackToCollection}>
                            Back to collection <i className='bx text-lg bx-right-arrow-alt'></i>
                        </button>
                        <button className="bg-gray-100 cursor-pointer flex items-center gap-2 justify-center text-lg text-gray-700 px-4 py-3 font-medium rounded-xl shadow-xs hover:bg-gray-200 transition-all" onClick={handleTryAgain}>
                            Try again <i className='bx text-lg bx-reload'></i>
                        </button>
                    </div>
                )
            }
        </div>
    );

}

export default TestMode;