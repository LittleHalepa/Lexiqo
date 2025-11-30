
export default function Stats() {

    return (
        <section className="mb-25 max-w-6xl mx-auto w-full">
            <div>
                <p className="text-center text-sm text-gray-500">Trusted by 10K+ students worldwide</p>
                <ul className="flex justify-center gap-4 text-sm text-gray-500 mt-2 font-semibold">
                    <li>Ukraine</li>
                    <li>US</li>
                    <li>UK</li>
                    <li>Germany</li>
                </ul>
            </div>
            <div className="max-w-6xl mx-auto w-full pt-16">
                <div className="flex justify-around items-center gap-10 md:gap-20 w-full">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-center">50K+</h2>
                        <p className="text-center text-gray-500 text-sm">Flashcards<br/>Created</p>
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand text-center">50%</h2>
                        <p className="text-center text-gray-500 text-sm">Less Study<br/>Time</p>
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-center text-fire">90%</h2>
                        <p className="text-center text-gray-500 text-sm">Better<br/>Retention</p>
                    </div>
                </div>
            </div>
        </section>
    );
}