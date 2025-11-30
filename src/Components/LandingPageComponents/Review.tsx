
export default function Review() {
    return (
        <section className="mb-25">
            <div className="mb-15">
                <h2 className="font-bold text-[1.7rem] md:text-[2rem] text-center mb-3">Loved by students worldwide</h2>
                <p className="text-center text-gray-500 text-base">See how Lexiqo is transforming the way students learn and retain information</p>
            </div>
            <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center items-center md:items-start gap-8 max-w-6xl">
                <div className="w-[320px] min-h-[220px] bg-white p-6 rounded-lg shadow-sm before:content-['']  before:absolute before:bottom-19 before:bg-[rgba(106,114,130,0.3)] before:h-[1px] before:w-[85%] relative hover:shadow-lg transition-shad">
                    <ul className="flex gap-1 mb-3 text-fire">
                        <li><i className='bx bxs-star'></i></li>
                        <li><i className='bx bxs-star'></i></li>
                        <li><i className='bx bxs-star'></i></li>
                        <li><i className='bx bxs-star'></i></li>
                        <li><i className='bx bxs-star'></i></li>
                    </ul>
                    <p className="text-gray-500 text-base mb-5">"Lexiqo helped me memorize 2,000 anatomy terms in just 3 weeks."</p>
                    <div>
                        <h3 className="font-semibold text-base">Sarah Chen</h3>
                        <p className="text-sm text-gray-500">Medical Student &#8226; US</p>
                    </div>
                </div>
                
                    <div className="w-[320px] min-h-[220px] bg-white p-6 rounded-lg shadow-sm before:content-['']  before:absolute before:bottom-19 before:bg-[rgba(106,114,130,0.3)] before:h-[1px] before:w-[85%] relative hover:shadow-lg transition-shadow">
                    <ul className="flex gap-1 mb-3 text-fire">
                        <li><i className='bx bxs-star'></i></li>
                        <li><i className='bx bxs-star'></i></li>
                        <li><i className='bx bxs-star'></i></li>
                        <li><i className='bx bxs-star'></i></li>
                        <li><i className='bx bxs-star'></i></li>
                    </ul>
                    <p className="text-gray-500 text-base mb-5">"Learning Spanish has never been easier. The AI adapts to exactly how I learn best."</p>
                    <div>
                        <h3 className="font-semibold text-base">Marcus Johnson</h3>
                        <p className="text-sm text-gray-500">Language Learner &#8226; UK</p>
                    </div>
                    </div>
                    <div className="w-[320px] min-h-[220px] bg-white p-6 rounded-lg shadow-sm before:content-['']  before:absolute before:bottom-19 before:bg-[rgba(106,114,130,0.3)] before:h-[1px] before:w-[85%] relative hover:shadow-lg transition-shadow">
                    <ul className="flex gap-1 mb-3 text-fire">
                        <li><i className='bx bxs-star'></i></li>
                        <li><i className='bx bxs-star'></i></li>
                        <li><i className='bx bxs-star'></i></li>
                        <li><i className='bx bxs-star'></i></li>
                        <li><i className='bx bxs-star'></i></li>
                    </ul>
                    <p className="text-gray-500 text-base mb-5">"I cut my study time in half while improving my retention. This is a game-changer for law school."</p>
                    <div>
                        <h3 className="font-semibold text-base">Emma Rodriguez</h3>
                        <p className="text-sm text-gray-500">Law Student &#8226; UK</p>
                    </div>
                </div>
            </div>
        </section>
    );
}