'use client';

import {createContext, startTransition, use, useContext, useState} from 'react';
import {
  createFromFetch,
  createFromReadableStream,
} from 'react-server-dom-webpack/client';

const RouterContext = createContext();
const initialCache = new Map();

export function Router() {
  const [cache, setCache] = useState(initialCache);
  const [location, setLocation] = useState('one');

  const locationKey = JSON.stringify(location);
  let content = cache.get(locationKey);
  if (!content) {
    content = createFromFetch(
      fetch('/rsc?page=' + encodeURIComponent(locationKey))
    );
    cache.set(locationKey, content);
  }

  function refresh(response) {
    startTransition(() => {
      const nextCache = new Map();
      if (response != null) {
        const locationKey = response.headers.get('X-Location');
        const nextLocation = JSON.parse(locationKey);
        const nextContent = createFromReadableStream(response.body);
        nextCache.set(locationKey, nextContent);
        navigate(nextLocation);
      }
      setCache(nextCache);
    });
  }

  function navigate(nextLocation) {
    startTransition(() => {
      setLocation(nextLocation);
    });
  }

  return (
    <RouterContext.Provider value={{location, navigate, refresh}}>
      {use(content)}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}
