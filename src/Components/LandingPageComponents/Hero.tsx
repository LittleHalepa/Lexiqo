import { useNavigate } from "react-router-dom";

export default function Hero() {

    const nav = useNavigate();

    return (
        <section className="mb-20 ">
            <h1 className="font-bold text-center text-6xl leading-16 md:text-7xl md:leading-20">Learn <span className="text-brand block">Smarter</span><span className="block mb-7">Not Harder</span></h1>
            <p className="text-center mx-auto text-lg text-gray-500 max-w-2xl leading-8 mb-17">Master any subject with intelligent flashcards designed to maximize retention and minimize study time.</p>
            <div className="flex flex-col justify-center gap-4 md:flex-row">
                <button className="bg-brand hover:opacity-90 cursor-pointer text-sm text-white py-3 rounded-lg font-medium md:px-8 transition-all" onClick={() => nav('/login')}>
                    Start Learning Free <i className='bx bx-right-arrow-alt text-[1rem] translate-x-2 translate-y-0.5'></i>
                </button>
                <button className="text-sm text-black border cursor-pointer hover:bg-gray-100 border-[rgba(51,51,51,20%)] py-3 rounded-lg font-medium shadow-sm md:px-8 transition-all">
                    <i className='bx bx-play text-[1.1rem] translate-x-[-0.3rem] translate-y-[0.2rem]' ></i> Watch Demo
                </button>
            </div>
            <div className="bg-amber-50 mt-16 border-l-4 border-amber-500 rounded-lg p-4 shadow-md">
                <div className="flex items-start gap-3">
                    <i className='bx bxs-error-alt text-amber-600 text-2xl flex-shrink-0'></i>
                    <div>
                    <p className="text-sm text-amber-900 font-semibold mb-1">
                        Early Tech Demo
                    </p>
                    <p className="text-sm text-amber-800">
                        This is an early tech demo. Expect bugs and incomplete features. The landing page does NOT contain real stats and reviews, but rather represents our ideal future and goals.
                    </p>
                    </div>
                </div>
            </div>
        </section>
    );
}