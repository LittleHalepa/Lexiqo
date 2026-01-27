import { useEffect, useState, useRef } from "react";
import HappyAstronautAnimatedIcon from "../UI/HappyAstronautWithMusic";
import ConfettiAnimatedIcon, { type ConfettiAnimatedIconRef } from "../UI/Confetti";

type FlashcardsProps = {
    cards: Array<{
        id: number,
        collection_id: number,
        term: string,
        definition: string,
        image: string | null,
        created_at: string,
        updated_at: string,
    }>,
    height?: string,
    index?: number,
    setIndex?: (index: number) => void,
    confettiRef?: React.RefObject<ConfettiAnimatedIconRef>
}

export const Flashcards = ({cards, height, index, setIndex, confettiRef} : FlashcardsProps) => {

    const [isDone, setIsDone] = useState(false);

    if (cards.length === 0) {
        return (
            <div className="p-3 text-center">
                <p className="text-gray-500">No flashcards available in this collection.</p>
            </div>
        );
    }

    if (index === undefined || setIndex === undefined) {
        index = 0;
        setIndex = () => {};
    }

    useEffect(() => {
        console.log(cards);
    }, []);

    const [isFlipped, setIsFlipped] = useState(false);
    const endSentences = [
        "Nailed it!",
        "Crushed it!",
        "That was clean✨",
        "Flawless run.",
        "Casual run.",
        "Fire🔥",
        "Let him cook.🍳🔥",
        "Built different.🧠💪",
        "Didn't break a sweat.",
        "Too easy.🧊",
    ];

    const handleRotateCard = () => {
        setIsFlipped(!isFlipped);
    }

    useEffect(() => {
        if (isDone && confettiRef?.current) {
            confettiRef.current.playAnimation();
        }
    }, [isDone, confettiRef]);

    if (isDone) {
        return (
            <div className="flex justify-center flex-col items-center gap-1">
                <HappyAstronautAnimatedIcon size={300}/>
                <div className="flex relative flex-col items-center justify-center h-full gap-2">
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl font-bold text-brand">{endSentences[Math.floor(Math.random() * endSentences.length)]}</h2>
                        <p className="text-gray-600"><span className="text-lg font-semibold text-brand">{cards.length}/{cards.length}</span> flashcards reviewed.</p>
                    </div>
                    <p className="text-gray-600 text-center">You have reviewed all flashcards in this collection.</p>
                    <button className="bg-brand text-white px-4 py-2 rounded hover:bg-brand-dark transition" onClick={() => {
                        setIndex!(0);
                        setIsFlipped(false);
                        setIsDone(false);
                    }}>Review Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 md:px-0">
            <div className="flex items-center justify-center">
                <div className="w-full">
                    <div 
                    className="relative cursor-pointer "
                    onClick={handleRotateCard}
                    style={{ perspective: '1000px', height: height || '256px', transformStyle: 'preserve-3d' }}
                    >
                    <div
                        className="absolute w-full h-full transition-transform duration-600"
                        style={{
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        }}
                    >
                        {/* Front Side */}
                        <div
                        className="absolute w-full h-full bg-white rounded-xl shadow-lg p-8 flex items-center justify-center border border-gray-400"
                        style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                        }}
                        >
                        <div className="text-center">
                            <p className="text-2xl font-semibold text-gray-800">{cards[index].term}</p>
                        </div>
                        </div>

                        {/* Back Side */}
                        <div
                        className="absolute w-full h-full bg-brand rounded-xl shadow-lg p-8 flex items-center justify-center"
                        style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                        }}
                        >
                        <div className="text-center">
                            <p className="text-2xl font-semibold text-white">{cards[index].definition}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-3 px-4">
                <button className="text-3xl text-black cursor-pointer p-2 rounded-full font-medium transition-all" onClick={() => { if (index !== 0) {
                    if (isFlipped) {
                        setIsFlipped(false);
                        setTimeout(() => {
                            setIndex(index - 1);
                        }, 200);
                    }
                    else {
                        setIndex(index - 1);
                    }
                }}}><i className='bx bx-left-arrow-alt'></i></button>
                <p className="text-center text-sm text-gray-500">Card {index + 1} of {cards.length}</p>
                <button className="text-3xl text-black cursor-pointer p-2 rounded-full font-medium transition-all hover:bg-gray-200" onClick={() => { if (index !== cards.length - 1){
                    if (isFlipped) {
                        setIsFlipped(false);
                        setTimeout(() => {
                            setIndex(index + 1);
                        }, 200);
                    } else {
                        setIndex(index + 1);
                    }
                } else {
                    setIndex(index + 1);
                    setIsDone(true);
                }}}><i className='bx bx-right-arrow-alt' ></i></button>
            </div>
        </div>    
    );
}