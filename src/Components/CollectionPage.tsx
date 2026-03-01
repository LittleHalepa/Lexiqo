
import profilePicture from '/avatars/default.png';
import BookMark from "./UI/BookmarkAnimation";
import { Modes } from "./CollectionPageComponents/Modes";
import { Flashcards } from "./CollectionPageComponents/FlashcardsComponent";
import {useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { sendRequest } from "../utils/ApiUtils";
import { useNav } from "../contexts/headerAndFooterContext";
import LoadingAnimatedIcon from "./UI/LoadingAnimation";
import AstronautAnimatedIcon from "./UI/Astronaut";

const CollectionPage = () => {

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
    color: string,
    username: string,
    uuid: string,
    is_public: boolean
  } | null>(null);

  const [index, setIndex] = useState(0);
  const [cardHeight, setCardHeight] = useState("500px");
  const [error, setError] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isPrivate, setIsPrivate] = useState(true);
  const [isPrivateUrl, setIsPrivateUrl] = useState(true);

  const {setShowHeader, setShowFooter} = useNav();
  
  const location = useLocation();

  const collectionPublicId = location.pathname.split('/').pop();

  useEffect(() => {
    sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/get-collection-info`, 'POST', {
      collectionUuid: collectionPublicId
      }).then((data) => {
        if (!data || data.error) {
          setCollection(null);
          setError(true);
          return;
        }
        setCollection(data.data);
    });

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

    const currentPath = location.pathname;
    if (currentPath.includes('/public_collections/')) {
        setIsPrivateUrl(false);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!collection) return;

    setIsPrivate(!collection.is_public);

    setIsLoading(true);
    sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/get-cards`, 'POST', {
      collectionUuid: collection.uuid
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
    
    sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/bookmark-collection`, 'POST', {
      collectionId,
      bookmark: newState
    }).then((data) => {
      if (!data || data.error) {
        console.error('Failed to toggle bookmark, ' + data.error);
        return;
      }
      setCollection(prev => prev ? {...prev, bookmarked: newState} : prev);
    }).catch((error) => {
      console.error('Error toggling bookmark:', error);
    });

  }

  const handleSetAccessPrivate = () => {

    if (isPrivate === true) {
      setIsDropdownOpen(false);
      return;
    }

    sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/change-collection-access`, 'POST', {
      collectionUuid: collection?.uuid,
      isPublic: false
    }).then((data) => {
      if (!data || data.error) {
        console.error('Failed to change collection access, ' + data.error);
        return;
      }
      setIsPrivate(true);
      setIsDropdownOpen(false);
    }).catch((error) => {
      console.error('Error changing collection access:', error);
    });
  }

  const handleSetAccessPublic = () => {

    if (isPrivate === false) {
      setIsDropdownOpen(false);
      return;
    }

    sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/change-collection-access`, 'POST', {
      collectionUuid: collection?.uuid,
      isPublic: true
    }).then((data) => {
      if (!data || data.error) {
        console.error('Failed to change collection access, ' + data.error);
        return;
      }
      setIsPrivate(false);
      setIsDropdownOpen(false);
    }).catch((error) => {
      console.error('Error changing collection access:', error);
    });
  }

  const handleCopyClick = (collection: any) => {
    const doneLabel = document.getElementById('copy-done-label');
    if (doneLabel) {
      doneLabel.classList.remove('opacity-0');
      doneLabel.classList.add('opacity-100');
      doneLabel.classList.add('-top-8');

      setTimeout(() => {
        if (doneLabel) {
          doneLabel.classList.remove('opacity-100');
          doneLabel.classList.add('opacity-0');
          doneLabel.classList.remove('-top-8');
          doneLabel.classList.add('-top-5');
        }
      }, 2000);
    }

    navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_URL}/public_collections/${collection.uuid}`)
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
                <p className="text-sm text-gray-500">By <span className="font-medium">{collection.username}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className={`py-1 px-4 text-white rounded-full text-md font-medium ${isPrivateUrl ? 'bg-brand' : 'bg-gray-300'} flex items-center gap-1`}><i className='bx bxs-edit'></i> Edit</button>
              {isPrivateUrl && <BookMark bookmarked={collection.bookmarked} onToggle={() => handleBookmark(collection.id, collection.bookmarked ? false : true)}/>}
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => {
                if (!isPrivateUrl) return;
                setIsDropdownOpen(!isDropdownOpen)}
              }
              className={`flex items-center rounded-md cursor-pointer ${isPrivateUrl ? 'bg-white hover:bg-gray-100' : 'bg-gray-300'} gap-2 py-1 border border-gray-200 px-4 shadow-xs transition`}
            >
              <p className="text-md flex items-center gap-2 text-gray-900 text-center">
                {isPrivate ? "Private" : "Public"} 
                <i className={`bx ${isPrivate ? 'bxs-lock-alt' : 'bx-globe'}`}></i>
              </p>
              <i className={`bx bx-chevron-down transition ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <button
                  onClick={handleSetAccessPrivate}
                  className="w-full cursor-pointer text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <i className='bx bxs-lock-alt'></i>
                  <span>Private</span>
                </button>
                <button
                  onClick={handleSetAccessPublic}
                  className="w-full cursor-pointer text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 border-t border-gray-200"
                >
                  <i className='bx bx-globe'></i>
                  <span>Public</span>
                </button>
              </div>
            )}
          </div>
          {/* link with copy button */}
          {!isPrivate && isPrivateUrl && (
            <>
              <div className="flex w-full items-center gap-2">
                <input type="text" value={`${import.meta.env.VITE_FRONTEND_URL}/public_collections/${collection.uuid}`} readOnly className="w-full border-2 shadow-sm border-gray-100 px-4 py-2 rounded-md text-md active:bg-gray-100 outline-none"/>
                <button className="text-3xl relative text-gray-600 hover:text-[#641ae6] active:text-[#641ae6] transition-all flex items-center justify-center p-2 cursor-pointer rounded-md hover:bg-gray-100" onClick={() => handleCopyClick(collection)}><i className='bx bxs-copy'></i>
                <div id="copy-done-label" className="absolute py-0.5 px-1.5 rounded-xl -top-5 opacity-0 pointer-events-none transition-all left-1/2 -translate-x-1/2 text-sm font-medium text-green-100 bg-green-500">Done</div>
                </button>
                <a href={`${import.meta.env.VITE_FRONTEND_URL}/public_collections/${collection.uuid}`} target="_blank" className="text-3xl text-gray-600 cursor-pointer"><i className='bx bx-link-alt'></i></a>
              </div>
              <div className="flex mt-2 items-center gap-2 py-3 border-t border-gray-400 border-dashed border-b w-full">
                <p className="text-sm text-gray-500 text-center w-full">{collection.description}</p>
              </div>
            </>
          )}
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

export default CollectionPage;