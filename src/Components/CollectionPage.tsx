import { useUser } from "../contexts/userContext"
import profilePicture from '/avatars/default.png';
import BookMark from "./UI/BookmarkAnimation";
import { Modes } from "./CollectionPageComponents/Modes";
import { Flashcards } from "./CollectionPageComponents/FlashcardsComponent";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { sendRequest } from "../utils/ApiUtils";
import { useNav } from "../contexts/headerAndFooterContext";
import LoadingAnimatedIcon from "./UI/LoadingAnimation";
import AstronautAnimatedIcon from "./UI/Astronaut";

const CollectionPage = () => {

  const { user } = useUser();
  const location = useLocation();

  const [cards, setCards] = useState<Array<{
    id: number,
    collection_id: number,
    term: string,
    definition: string,
    image: string | null,
    created_at: string,
    updated_at: string
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [collection, setCollection] = useState<{
    id: number,
    user_id: number,
    name: string,
    description: string,
    created_at: string,
    updated_at: string,
    card_count: number,
    bookmarked: boolean,
    color: string
  } | null>(null);

  const [index, setIndex] = useState(0);
  const [cardHeight, setCardHeight] = useState("500px");
  const [error, setError] = useState(false);

  const {setShowHeader, setShowFooter} = useNav();
  
  useEffect(() => {
    let colId: number;

    if (location.state?.collection) {
      setCollection(location.state.collection);
      colId = location.state.collection.id;
    } else {
      colId = Number(location.pathname.split('/').pop());

      sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/get-collection-info`, 'POST', {
        collectionId: colId
      }).then((data) => {
        if (!data || data.error) {
          setCollection(null);
          setError(true);
          return;
        }
        setCollection(data.data);
      });
    }

    setShowHeader(true);
    setShowFooter(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const handleResize = () => {
    const width = window.innerWidth;
      if (width < 768) {
        setCardHeight("250px"); // sm
      } else if (width < 1024) {
        setCardHeight("375px"); // md
      } else {
        setCardHeight("500px"); // lg
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!collection) return;

    setIsLoading(true);
    sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/get-cards`, 'POST', {
      id: collection.id
    }).then((data) => {
      if (!data || data.error) {
        setCards([]);
        setError(true);
        return;
      }
      setCards(data.cards);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [collection]);

  const handleBookmark = (collectionId: number, newState: boolean) => {  
    // Placeholder for bookmark handling logic
    console.log(`Collection ID: ${collectionId}, New Bookmark State: ${newState}`);
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-70vh">
        <AstronautAnimatedIcon size={250}/>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h2>
          <p className="text-gray-600">We couldn't load the collection you're looking for. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="flex flex-col items-center justify-center min-h-70vh">
        <LoadingAnimatedIcon/>
        <p className="-translate-y-20 text-lg font-medium animate-pulse text-gray-500">Loading</p>
      </div>
    );
  }

  return (
    <div className="p-3 lg:mt-10 flex flex-col lg:flex-row gap-4">
      <div className="flex flex-col gap-4 w-full lg:w-1/2">
        <div className="flex flex-col items-start gap-4">
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-2xl">{collection.name}</h1>
              <div className="flex items-center gap-2">
                <img src={profilePicture} alt="Profile picture" width={25} height={25}/>
                <p className="text-sm text-gray-500">By <span className="font-medium">{user?.username}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="py-1 px-4 text-white rounded-full text-md font-medium bg-brand flex items-center gap-1"><i className='bx bxs-edit'></i> Edit</button>
              <BookMark bookmarked={collection.bookmarked} onToggle={() => handleBookmark(collection.id, collection.bookmarked ? false : true)}/>
            </div>
          </div>
          <div className="flex mt-2 items-center gap-2 py-3 border-t border-gray-400 border-dashed border-b w-full">
            <p className="text-sm text-gray-500 text-center w-full">{collection.description}</p>
          </div>
        </div>
        <Modes isLoading={isLoading} collection={collection} />
        <div className="text-sm text-gray-500 p-2">
          <p className="text-center">Last reviewed: <span className="font-medium">October 5, 2023</span></p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 px-0 lg:px-10">
        {isLoading ? (<div className="mx-4"> 
          <div className="h-[256px] bg-gray-200 animate-pulse rounded-md"></div>
          <div className="flex justify-between items-center mt-3">
            <i className='bx bx-left-arrow-alt text-3xl font-medium text-gray-400 animate-pulse'></i>
            <div className="bg-gray-200 animate-pulse h-4 w-20 rounded-md"></div>
            <i className='bx bx-right-arrow-alt text-3xl font-medium text-gray-400 animate-pulse' ></i>
          </div>
        </div>) : (<Flashcards cards={cards} index={index} setIndex={setIndex} height={cardHeight} color={collection.color}/>)}
      </div>
    </div>
  )
}

export default CollectionPage