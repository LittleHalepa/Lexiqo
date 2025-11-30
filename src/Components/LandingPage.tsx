import Header from "./LandingPageComponents/Header.tsx";
import Hero from "./LandingPageComponents/Hero.tsx";
import Stats from "./LandingPageComponents/Stats.tsx";
import Features from "./LandingPageComponents/Features.tsx";
import Review from "./LandingPageComponents/Review.tsx";
import FAQ from "./LandingPageComponents/FAQ.tsx";
import Benefits from "./LandingPageComponents/Benefits.tsx";
import Footer from "./LandingPageComponents/Footer.tsx";

export default function LandingPage() {
    return (
        <>
            <div className="flex flex-col max-w-6xl m-auto items-center min-h-screen bg-white p-5">
                <Header />
                <Hero />
                <Stats />
                <Features />
                <Review />
                <FAQ />
            </div>
            <Benefits />
            <Footer />
        </>
    );
}