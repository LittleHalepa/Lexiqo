
export default function Features() {
    return (
        <section className="mb-25">
            <div className="flex flex-col items-center mb-15 gap-3">
                <h2 className="font-bold text-[1.7rem] md:text-[2rem] text-center">Everything you need to excel</h2>
                <p className="text-center text-base text-gray-500">Powerful features designed to help you learn faster and remember longer</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 w-full">
                    <div className="w-full bg-white p-6 rounded-lg shadow-sm min-h-[185px] hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center min-w-12 h-12 bg-gray-100 rounded-lg shadow">
                                <i className='bx bx-brain text-3xl text-brand'></i>
                            </div>
                            <h3 className="text-xl font-semibold">AI-Features</h3>
                        </div>
                        <p className="text-gray-500 mt-10">Just give AI your content — get a custom collection in seconds.</p>
                    </div>
                    <div className="w-full bg-white p-6 rounded-lg shadow-sm min-h-[185px] hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center min-w-12 h-12 bg-gray-100 rounded-lg shadow">
                                <i className='bx bx-time text-3xl text-brand'></i>
                            </div>
                            <h3 className="text-xl font-semibold">Spaced Repetition</h3>
                        </div>
                        <p className="text-gray-500 mt-10">Scientifically proven memory techniques</p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-8 w-full">
                    <div className="w-full bg-white p-6 rounded-lg shadow-sm min-h-[185px] hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center min-w-12 h-12 bg-gray-100 rounded-lg shadow">
                                <i className='bx bx-target-lock text-3xl text-brand'></i>
                            </div>
                            <h3 className="text-xl font-semibold">Focused Study</h3>
                        </div>
                        <p className="text-gray-500 mt-10">Eliminate distractions, maximize retention</p>
                    </div>
                    <div className="w-full bg-white p-6 rounded-lg shadow-sm min-h-[185px] hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center min-w-12 h-12 bg-gray-100 rounded-lg shadow">
                                <i className='bx bx-line-chart text-3xl text-brand'></i>
                            </div>
                            <h3 className="text-xl font-semibold">Track Progress</h3>
                        </div>
                        <p className="text-gray-500 mt-10">Detailed insights into your learning journey</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <p className="text-center mt-10 text-sm text-fire font-semibold p-3 bg-[rgba(255,64,0,0.1)] rounded-full md:inline-block md:px-5"><span className="h-2 w-2 bg-fire rounded-full inline-block mr-2 translate-y-[-1px]"></span>And many more incredible features!</p>
            </div>
        </section>
    );
}