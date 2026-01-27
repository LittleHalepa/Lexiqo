import RocketAnimating from "./UI/RocketAnimation";
import { useEffect } from "react";
import lexiqoLogo from "/logo.png"
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";

export const PremiumPage = () => {

  const nav = useNavigate();
  const { user } = useUser();

  if (!user) {
    nav("/");
  }

  useEffect(() => {
    setTimeout(() => {
      const premiumPage = document.getElementById("premium-page");
      if (premiumPage) {
        premiumPage.classList.remove("translate-y-[150%]");
        premiumPage.classList.add("translate-y-0");
      }
    }, 2700);

    setTimeout(() => {
      const flowAndWayText = document.getElementById("flow-and-way");
      if (flowAndWayText) {
        flowAndWayText.classList.remove("opacity-0", "-translate-x-5");
        flowAndWayText.classList.add("opacity-100", "translate-x-0");
      }
    }, 3400);

    setTimeout(() => {
      const lexiqoText = document.getElementById("lexiqo");
      if (lexiqoText) {
        lexiqoText.classList.remove("opacity-0", "-translate-x-5");
        lexiqoText.classList.add("opacity-100", "translate-x-0");
      }
    }, 4000);

    setTimeout(() => {
      const premiumCard = document.getElementById("premium-card");
      if (premiumCard) {
        premiumCard.classList.remove("opacity-0", "translate-y-5");
        premiumCard.classList.add("opacity-100", "translate-y-0");
      }
    }, 4500);

    setTimeout(() => {
      const logoContainer = document.getElementById("logo-container");
      if (logoContainer) {
        logoContainer.classList.remove("opacity-0", "-left-5");
        logoContainer.classList.add("opacity-100", "left-0");
      }
    }, 3400);

    setTimeout(() => {
      const termsOfService = document.getElementById("terms-of-service");
      if (termsOfService) {
        termsOfService.classList.remove("opacity-0", "translate-y-5");
        termsOfService.classList.add("opacity-100", "translate-y-0");
      }
    }, 5000);

    return () => {};
  }, []);

  return (
    <div className="relative min-h-screen min-w-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-[#0b2738] to-[#081a26]">
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#081a26] z-0">
            <div>
                <RocketAnimating />
            </div>
        </div>
        <div id="premium-page" className="z-5 relative bg-white translate-y-[150%] w-full min-h-screen transition-transform duration-700 flex flex-col justify-start items-center p-3 shadow-lg pt-12 before:content-[''] before:absolute before:inset-0 before:bg-white before:rounded-full before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[150%] md:before:w-[90%] md:before:h-[90%] before:h-[150%] before:scale-150">
            <div id="logo-container" className="absolute top-0 -left-5 right-0 flex transition-all duration-700 opacity-0" onClick={() => nav( user ? `/user/${user.public_id}/dashboard/home` : "/" )}>
                <img src={lexiqoLogo} alt="Lexiqo Logo" width={60} />
            </div>
            <h1 className="text-black bbh-bogle text-4xl text-center z-10 relative flex flex-col gap-2">
                <span id="flow-and-way" className="text-black -translate-x-5 opacity-0 transition-all duration-700">Your flow. Your way.</span>
                <span id="lexiqo" className="text-fire -translate-x-5 opacity-0 brand-underline transition-all duration-700">Your Lexiqo.</span>
            </h1>
            <div id="premium-card" className="mt-8 bg-gray-white/70 backdrop-blur-2xl shadow-lg border-2 border-brand rounded-lg w-full max-w-sm flex flex-col justify-start items-start gap-6 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:to-yellow-500/10 before:animate-shimmer relative p-6 translate-y-5 opacity-0 transition-all duration-700">
                <div className="absolute -top-3 right-1/2 translate-x-1/2">
                  <p className="text-xs font-bold text-white bg-brand px-1 py-0.5 rounded-sm">Popular</p>
                </div>
                <div className="text-sm text-medium-gray flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <div className="flex items-center justify-center p-2 bg-[#E9D4FF] rounded-full">
                      <i className='bx bxs-crown text-2xl text-brand' ></i>
                    </div>
                    <h2 className="text-3xl font-bold text-brand">Lexiqo Plus</h2>
                  </div>
                  <p className="ml-1">Unlock premium features and enhance your learning experience.</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-brand flex items-end gap-1">7,99 USD <span className="text-lg text-black">/ month</span></p>
                </div>
                <div>
                  <ul className="list-none list-inside text-base text-medium-gray flex flex-col gap-3">
                    <li className="flex items-center gap-2 justify-start"><i className='bx bxs-check-circle text-xl text-brand'></i>Unlimited flashcards and collections</li>
                    <li className="flex items-center gap-2 justify-start"><i className='bx bxs-check-circle text-xl text-brand'></i>Advanced learning algorithms</li>
                    <li className="flex items-center gap-2 justify-start"><i className='bx bxs-check-circle text-xl text-brand'></i>Offline access to your content</li>
                    <li className="flex items-center gap-2 justify-start"><i className='bx bxs-check-circle text-xl text-brand'></i>Priority customer support</li>
                    <li className="flex items-center gap-2 justify-start"><i className='bx bxs-check-circle text-xl text-brand'></i>Exclusive premium content</li>
                  </ul>
                </div>
                <div className="mt-2 w-full">
                  <button className="w-full bg-fire cursor-pointer text-white font-semibold py-3 rounded-lg hover:bg-dark-brand transition-all duration-200">Upgrade to Plus</button>
                </div>
            </div>
            <div id="terms-of-service" className="mt-2 translate-y-5 opacity-0 transition-all duration-700">
                <p className="text-xs text-medium-gray text-center max-w-md">By subscribing to Lexiqo Plus, you agree to our <span className="text-brand font-semibold cursor-pointer">Terms of Service</span> and <span className="text-brand font-semibold cursor-pointer">Privacy Policy</span>.</p>
            </div>
        </div>
    </div>
  );
}