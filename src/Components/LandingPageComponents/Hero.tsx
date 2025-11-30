
export default function Hero() {

    return (
        <section className="mb-20">
            <h1 className="font-bold text-center text-4xl leading-12 md:text-6xl md:leading-17">Learn <span className="text-brand block">Smarter</span><span className="block mb-7">Not Harder</span></h1>
            <p className="text-center mx-auto text-lg text-gray-500 max-w-2xl leading-8 mb-17">Master any subject with intelligent flashcards designed to maximize retention and minimize study time.</p>
            <div className="flex flex-col justify-center gap-4 md:flex-row">
                <button className="bg-brand hover:opacity-90 cursor-pointer text-sm text-white py-3 rounded-lg font-medium md:px-8 transition-all">
                    Start Learning Free <i className='bx bx-right-arrow-alt text-[1rem] translate-x-2 translate-y-0.5'></i>
                </button>
                <button className="text-sm text-black border cursor-pointer hover:bg-gray-100 border-[rgba(51,51,51,20%)] py-3 rounded-lg font-medium shadow-sm md:px-8 transition-all">
                    <i className='bx bx-play text-[1.1rem] translate-x-[-0.3rem] translate-y-[0.2rem]' ></i> Watch Demo
                </button>
            </div>
        </section>
    );
}