import BookMark from '../UI/BookmarkAnimation';
import { useUser } from '../../contexts/userContext';
import { useEffect, useRef, useState } from 'react';
import { sendRequest } from '../../utils/ApiUtils';
import AstronautAnimation from '../UI/Astronaut.tsx';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const [collections, setCollections] = useState<Array<{
    id: number;
    user_id: number;
    name: string;
    description: string;
    card_count: number;
    created_at: string;
    updated_at: string;
    bookmarked: boolean;
    color: string;
    username: string;
    uuid: string;
    is_public: boolean;
  }>>([]);
  const [lastId, setLastId] = useState<number | null>(null);
  const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('most-recent');

  const navigate = useNavigate();

  const cursorRef = useRef<{
    lastId: number | null;
    lastCreatedAt: string | null;
  }>({
    lastId: null,
    lastCreatedAt: null,
  });

  const loadingRef = useRef(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useUser();

  const colorMap: Record<string, string> = {
    '[#641ae6]': 'border-[#641ae6]',
    'yellow-500': 'border-yellow-500',
    'pink-500': 'border-pink-500',
    'red-500': 'border-red-500',
    'orange-500': 'border-orange-500',
    'green-500': 'border-green-500',
    'blue-500': 'border-blue-500',
    'black': 'border-gray-800',
  };

  const limit = 24;

  useEffect(() => {
    sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/get-collections?limit=${limit}`, 'GET')
      .then((data) => {
        if (!data || data.error) return;

        setCollections(data.collections);

        if (data.collections.length > 0) {
          const last = data.collections[data.collections.length - 1];

          setLastId(last.id);
          setLastCreatedAt(last.created_at);

          cursorRef.current = {
            lastId: last.id,
            lastCreatedAt: last.created_at,
          };
        }

        setHasMore(data.hasMore);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
        loadMoreCollections();
      }
    });

    const current = observerRef.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [isLoading, hasMore]);

  const loadMoreCollections = async () => {
    if (!hasMore || loadingRef.current) return;

    loadingRef.current = true;
    setIsLoadingMore(true);

    const { lastId, lastCreatedAt } = cursorRef.current;

    let url;
    if (lastId !== null && lastCreatedAt !== null) {
      url = `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/get-collections?limit=${limit}&lastId=${lastId}&lastCreatedAt=${lastCreatedAt}`;
    } else {
      url = `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/get-collections?limit=${limit}`;
    }

    try {
      const data = await sendRequest(url, 'GET');
      if (!data || data.error) return;

      setCollections((prev) => {
        const newItems = data.collections.filter(
          (n: any) => !prev.some((p) => p.id === n.id)
        );
        return [...prev, ...newItems];
      });

      if (data.collections.length > 0) {
        const last = data.collections[data.collections.length - 1];

        setLastId(last.id);
        setLastCreatedAt(last.created_at);

        cursorRef.current = {
          lastId: last.id,
          lastCreatedAt: last.created_at,
        };
      }

      setHasMore(data.hasMore);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingMore(false);
      loadingRef.current = false;
    }
  };

  const handleBookmark = (collectionId: number, newState: boolean) => {  
    sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/bookmark-collection`, 'POST', {
      collectionId,
      bookmark: newState,
    })
      .then((data) => {
        if (!data || data.error) {
          console.error(data ? data.message : 'Failed to update bookmark status');
          return;
        }
        setCollections((prevCollections) =>
          prevCollections.map((collection) =>
            collection.id === collectionId
              ? { ...collection, bookmarked: newState }
              : collection
          )
        );
        console.log('Bookmark status updated successfully');
      })
      .catch((error) => {
        console.error('Error updating bookmark status:', error);
      });
  }

  const sortRef = useRef<string>('most_recent');

  const handleSelectFilter = (filter: string) => {
    setIsLoading(true);
    let sortParam: string;

    switch (filter) {
      case 'most-recent':
        sortParam = 'most_recent';
        break;
      case 'least-recent':
        sortParam = 'oldest_first';
        break;
      case 'most-cards':
        sortParam = 'most_cards';
        break;
      case 'least-cards':
        sortParam = 'least_cards';
        break;
      default:
        sortParam = 'most_recent';
    }

    setSelectedFilter(filter);
    sortRef.current = sortParam;
    setCollections([]);
    setLastId(null);
    setLastCreatedAt(null);
    setHasMore(true);

    cursorRef.current = {
      lastId: null,
      lastCreatedAt: null,
    };

    sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/get-collections?limit=${limit}&sort=${sortParam}`, 'GET')
      .then((data) => {
        if (!data || data.error) return;

        setCollections(data.collections);

        if (data.collections.length > 0) {
          const last = data.collections[data.collections.length - 1];

          setLastId(last.id);
          setLastCreatedAt(last.created_at);

          cursorRef.current = {
            lastId: last.id,
            lastCreatedAt: last.created_at,
          };
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));

  }

  const handleCollectionClick = async (idex: number) => {

    const collection = collections[idex];

    sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/add-to-recent-collections`, 'POST', {
      collectionId: collection.id,
    }).catch((error) => {
      console.error('Error adding to recent collections:', error);
    });

    navigate(`/user/${user?.public_id}/dashboard/collection/${collection.uuid}`,);

  }

  const numberOfSkeletons = 4;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        
        {Array.from({ length: numberOfSkeletons }).map((_, index: number) => (
          <div key={index} className="flex flex-col h-full gap-3 p-3 m-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-gray-200 animate-pulse"></div>
                  <div className="w-30 h-6 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                <div className="h-7 w-5 rounded-md bg-gray-200 animate-pulse"></div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="mt-2 h-12 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="w-20 h-5 bg-gray-200 rounded-md animate-pulse"></div>
              </div>

              <div className="mt-auto border-t pt-3 border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="w-30 h-5 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                <div className="w-20 h-5 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
          </div>
        ))}

      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="flex justify-center flex-col gap-3 items-center min-h-[70vh]">
        <AstronautAnimation size={300} />
        <p className="text-gray-500 text-xl">No collections found</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="col-span-full flex justify-end px-3 py-2">
        <select name="filter-options" value={selectedFilter} id="filter-options" className="text-sm p-2" onChange={(event) => handleSelectFilter(event?.target.value)}>
          <option value="most-recent" className="text-sm ">Most Recent</option>
          <option value="least-recent" className="text-sm ">Least Recent</option>
          <option value="most-cards" className="text-sm ">Most Cards</option>
          <option value="least-cards" className="text-sm ">Least Cards</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 p-3 items-stretch lg:grid-cols-3 xl:grid-cols-4">


        {collections.map((collection, index) => (
          <div
            key={collection.id}
            className={`flex cursor-pointer flex-col h-full gap-3 p-3 border border-t-15 ${colorMap[collection.color] ?? 'border-brand'} rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 z-1`}
            onClick={() => handleCollectionClick(index)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-purple-100 text-brand flex items-center justify-center">
                  <i className="bx bxs-collection text-2xl"></i>
                </div>
                <h2 className="font-semibold">{collection.name}</h2>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <BookMark 
                  bookmarked={collection.bookmarked} 
                  onToggle={() => handleBookmark(collection.id, !collection.bookmarked)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-5 min-h-[40px]">
                {collection.description}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600 font-medium">
                  &#8226; {collection.card_count} cards
                </p>
                {collection.is_public ? <i className='bx bx-globe'></i> : <i className='bx bxs-lock-alt'></i>}
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <img
                  src="/avatars/default.png"
                  alt="profile picture"
                  width={30}
                  className="rounded-full"
                />
                <p className="text-sm font-medium text-black">
                  {user ? user.username : 'Guest'}
                </p>
              </div>
              <p className="text-sm">
                {collection.created_at.slice(0, 10).replace(/-/g, '.')}
              </p>
            </div>
          </div>
        ))}
        <div ref={observerRef} className=" w-full col-span-full">
          {isLoadingMore && (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: numberOfSkeletons }).map((_, index: number) => (
                  <div key={index} className="flex flex-col h-full gap-3 p-3  border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-md bg-gray-200 animate-pulse"></div>
                          <div className="w-30 h-6 bg-gray-200 rounded-md animate-pulse"></div>
                        </div>
                        <div className="h-7 w-5 rounded-md bg-gray-200 animate-pulse"></div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="mt-2 h-12 bg-gray-200 rounded-md animate-pulse"></div>
                        <div className="w-20 h-5 bg-gray-200 rounded-md animate-pulse"></div>
                      </div>

                      <div className="mt-auto border-t pt-3 border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                          <div className="w-30 h-5 bg-gray-200 rounded-md animate-pulse"></div>
                        </div>
                        <div className="w-20 h-5 bg-gray-200 rounded-md animate-pulse"></div>
                      </div>
                  </div>
                ))}
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;
