import { useNavigate } from "react-router-dom"
import { useUser } from "../../contexts/userContext";
import FireAnimatedIcon from "../UI/FireAnimation";

const Home = () => {

  const navigate = useNavigate()
  const { user } = useUser();

  const recent = [];
  const skeletLenth = 5;

  return (
    <div className="p-3 flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-sm font-semibold">Recent</h2>
        </div>
        <div className="">
          {recent.length === 0 ? (
            <div className="flex flex-col gap-3">
              {[...Array(skeletLenth)].map((_, index) => (
                <div key={index} className="w-full h-12 bg-gray-200 rounded-md animate-pulse flex items-center justify-between"> 
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-gray-300 rounded-md ml-2"></div>
                    <div className="flex flex-col items-start justify-center">
                      <div className="h-4 w-42 bg-gray-300 rounded-md ml-4"></div>
                      <div className="h-3 w-20 bg-gray-300 rounded-md ml-4 mt-2"></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <div className="bg-gray-300 rounded-md h-6 w-5 mr-1"></div>
                    <div className="bg-gray-300 rounded-md h-3 w-15 mr-1"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full overflow-x-auto flex gap-4 items-center px-2">
              <p>HEllo</p>
            </div>
          )}
        </div>
      </div>
      <div id="days-streak" className="bg-[rgb(255,255,255)] day-streak-gradient py-3 px-2 rounded-md flex items-center gap-4 border border-[rgb(230,230,230)]">
        <div className="flex justify-between w-full items-center py-3">
          <div className="flex items-center">
            <div className="fire-background rounded-full flex items-center justify-center">
              <FireAnimatedIcon size={60} />
            </div>
            <div className="flex flex-col ml-4 h-full justify-center">
              <h3 className="text-fire font-bold text-xl">7 Days</h3>
              <p className="text-sm font-medium text-gray-500">Current streak</p>
            </div>
          </div>
          <div>
            <div className="bg-gray-200 rounded-md px-3 py-1 mt-2">
              <p className="text-sm text-black font-medium">Best: 14 days</p>
            </div>
          </div>
        </div>
      </div>
      <div id="news" className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">News</h2>
        <div className="w-full flex flex-col md:flex-row  gap-4">
          <iframe className="w-full h-55 rounded-md" src="https://www.youtube.com/embed/IpeJjQDXNAE?si=2854ItSsYb6IQFLf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <div className="h-55 w-full flex gap-1 flex-col justify-center items-center rounded-md bg-[#8B5CF6] text-white">
            <h3 className="font-bold text-4xl">Premium</h3>
            <p className="font-medium text-sm">The most officiant way of studying!</p>

            <button
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white text-[#8B5CF6] text-sm font-semibold rounded-md shadow-md hover:shadow-xl transition-all"
              aria-label="Upgrade to Premium"
              onClick={() => navigate('/pricing')}
            >
              <i className="bx bx-star text-lg" />
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home