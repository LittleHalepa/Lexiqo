
export default function Benefits() {
    return (
        <section className="w-full bg-black text-white py-25 px-5">
            <div className="mb-10">
                <h3 className="text-center font-bold text-[1.7rem] md:text-[2.5rem] mb-5">Ready to transform <span className="block text-fire">your learning?</span></h3>
                <p className="text-center text-gray-300 text-base mt-3 leading-6">Join thousands of students who are already learning smarter with Lexiqo.</p>
            </div>
            <div className="flex flex-col md:flex-row md:gap-15 gap-2 justify-center">
                <div>
                    <ul className="flex flex-col gap-2 items-start text-sm font-normal">
                        <li className="text-center">
                            <i className='bx bx-check text-fire text-3xl translate-y-2'></i> Start studying immediately
                        </li>
                        <li className="text-center">
                            <i className='bx bx-check text-fire text-3xl translate-y-2'></i> Cut time in half
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="flex flex-col gap-2 items-start text-sm font-normal">
                        <li className="text-center">
                            <i className='bx bx-check text-fire text-3xl translate-y-2'></i> Retain information longer
                        </li>
                        <li className="text-center">
                            <i className='bx bx-check text-fire text-3xl translate-y-2'></i> Track your progress
                        </li>
                    </ul>
                </div>
            </div>
            <button className="bg-fire text-white text-base py-3 px-6 rounded-lg font-medium mt-15 block mx-auto cursor-pointer hover:opacity-90 transition-all active:opacity-80">
                Get Started for Free <i className='bx bx-right-arrow-alt text-[1rem] translate-x-2 translate-y-0.5'></i>
            </button>
            <p className="text-xs text-gray-300 text-center mt-5">No credit card required &#8226; Free forever plan</p>
        </section>
    );
}