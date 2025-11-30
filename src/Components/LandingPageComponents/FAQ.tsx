
export default function FAQ() {

    function showDetails(event: React.MouseEvent) {
        const target = event.currentTarget as HTMLElement;
        const details = target.querySelector("#faq-details") as HTMLElement;
        const icon = target.querySelector("i") as HTMLElement;
        const questionDiv = target.querySelector("#question-div") as HTMLElement;

        details.classList.toggle("hidden");
        icon.classList.toggle("rotate-180");
        questionDiv.classList.toggle("mb-3");
    };

    return (
        <section className="mb-25 w-full">
            <div>
                <h2 className="font-bold text-[1.7rem] md:text-[2rem] text-center mb-3">Frequently Asked Questions</h2>
                <p className="text-center text-gray-500 text-base">Everything you need to know about Lexiqo</p>
            </div>
            <div className="flex flex-col justify-center md:items-center gap-6 max-w-6xl w-full mx-auto mt-10">
                <div className="bg-white p-6 rounded-lg shadow-sm md:w-full max-w-4xl cursor-pointer hover:shadow-md transition-all" onClick={(event) => showDetails(event)}>
                    <div id="question-div" className="flex justify-between items-center">
                        <h3 className="font-semibold text-base">Is Lexiqo free to use?</h3>
                        <i className='bx bx-chevron-down text-lg translate-y-[-2px] transition-all'></i>
                    </div>
                    <p className="text-gray-500 text-sm hidden leading-6" id="faq-details">Yes! Lexiqo offers a free plan that includes creating and studying flashcards, basic spaced repetition, and access to public study sets. Premium features like advanced analytics and AI-powered study recommendations are available with our paid plans.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm md:w-full max-w-4xl cursor-pointer hover:shadow-md transition-all" onClick={(event) => showDetails(event)}>
                    <div id="question-div" className="flex justify-between items-center">
                        <h3 className="font-semibold text-base">Is there a mobile app?</h3>
                        <i className='bx bx-chevron-down text-lg translate-y-[-2px] transition-all'></i>
                    </div>
                    <p className="text-gray-500 text-sm hidden leading-6" id="faq-details">Unfortunately, we don't provide an app yet, but we're considering developing one to give you the best study experience!</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm md:w-full max-w-4xl cursor-pointer hover:shadow-md transition-all" onClick={(event) => showDetails(event)}>
                    <div id="question-div" className="flex justify-between items-center">
                        <h3 className="font-semibold text-base">What is space repetition?</h3>
                        <i className='bx bx-chevron-down text-lg translate-y-[-2px] transition-all'></i>
                    </div>
                    <p className="text-gray-500 text-sm hidden leading-6" id="faq-details">Lexiqo uses advanced AI to personalize your learning experience. Our algorithm adapts to your unique learning style, provides smart study recommendations, and offers more detailed progress analytics to help you learn more efficiently.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm md:w-full max-w-4xl cursor-pointer hover:shadow-md transition-all" onClick={(event) => showDetails(event)}>
                    <div id="question-div" className="flex justify-between items-center">
                        <h3 className="font-semibold text-base">Can I import flashcards?</h3>
                        <i className='bx bx-chevron-down text-lg translate-y-[-2px] transition-all'></i>
                    </div>
                    <p className="text-gray-500 text-sm hidden leading-6" id="faq-details">Absolutely! You can import your flashcards from popular platforms like Quizlet and Anki — and export them too!</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm md:w-full max-w-4xl cursor-pointer hover:shadow-md transition-all" onClick={(event) => showDetails(event)}>
                    <div id="question-div" className="flex justify-between items-center">
                        <h3 className="font-semibold text-base">Can I study offline?</h3>
                        <i className='bx bx-chevron-down text-lg translate-y-[-2px] transition-all'></i>
                    </div>
                    <p className="text-gray-500 text-sm hidden leading-6" id="faq-details">We do not support this feature at the moment. However, we are continuously working on improving our platform and adding new features. Thank you for your patience! ❤️</p>
                </div>
            </div>
        </section>
    );
}