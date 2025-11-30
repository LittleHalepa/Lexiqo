import logo from '/logo.png';

export default function Footer() {
    return (
        <footer className="pt-15 w-full max-w-6xl mx-auto p-5 bg-white">
            <div className="flex md:flex-row flex-col md:gap-x-5 w-full md:justify-between md:items-start">
                <div className="flex flex-col items-start gap-4 mb-10">
                    <div className="flex items-center gap-2 translate-x-[-11px]">
                        <img src={logo} alt="logo" width={50}/>
                        <h1 className="font-bold text-[1.2rem]">Lexiqo</h1>
                    </div>
                    <p className="text-gray-500 text-sm">Empowering students worldwide with intelligent learning tools.</p>
                </div>
                <div className="flex flex-wrap gap-25 gap-y-10 mb-15 md:gap-0 md:justify-around w-full md:gap-y-0 max-w-xl">
                    <div>
                        <h2 className="font-semibold text-base mb-3">Product</h2>
                        <ul className="text-sm text-gray-500 flex flex-col gap-2">
                            <li><a href="/features">Features</a></li>
                            <li><a href="/pricing">Pricing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-base mb-3">Company</h2>
                        <ul className="text-sm text-gray-500 flex flex-col gap-2">
                            <li>About</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-base mb-3">Quick Links</h2>
                        <ul className="text-sm text-gray-500 flex flex-col gap-2">
                            <li>Get started</li>
                            <li>Benefits</li>
                            <li>Features</li>
                            <li>Reviews</li>
                            <li>Questions</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="py-10 border-t border-gray-200 text-center md:flex md:justify-between md:items-center">
                <p className="text-sm text-gray-500">&copy; 2024 Lexiqo. All rights reserved.</p>
                <div className="flex justify-center gap-5 mt-3">
                    <a href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-700">Privacy</a>
                    <a href="/terms-of-service" className="text-sm text-gray-500 hover:text-gray-700">Terms</a>
                </div>
            </div>
        </footer>
    );
}