import { Inter } from 'next/font/google';
import SearchBar from '@/components/searchBar';
import Card from '@/components/card';
import { predict } from '@/pages/api/api_hf';
import { get_space_info } from '@/pages/api/hf_space';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [spaceInfo, setSpaceInfo] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchSpaceInfo(results) {
      const spacePromises = results.map(async (result) => {
        const [id, description] = result;
        const space = await get_space_info(id);
        if (space === null) {
          return null;
        }
        space.description = description;
        return space;
      });
      const spaceData = await Promise.all(spacePromises);
      setSpaceInfo(spaceData);
    }

    if (searchResults.length > 0) {
      fetchSpaceInfo(searchResults);
    } else {
      setSpaceInfo(null);
    }
  }, [searchResults]);

  async function onSearch(query) {
    if (query === '') {
      setSearchResults([]);
      return;
    }
    const results = await predict(query, 90);
    setSearchResults(results);
  }

  useEffect(() => {
    const focusSearchBar = () => {
      document.querySelector('.search-bar').focus();
    };

    focusSearchBar();
  }, []);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-8 md:p-24 ${inter.className}`}>
      <SearchBar onSearch={onSearch} />
      {spaceInfo !== null && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-8">
          {spaceInfo.map((space, index) => space && (
            <Card
              key={index}
              space_id={space.space_id}
              author={space.author}
              title={space.title}
              description={space.description}
              emoji={space.emoji}
              lastModified={space.lastModified}
              colorFrom={space.colorFrom}
              colorTo={space.colorTo}
              likes={space.likes}
              sdk={space.sdk}
              runtimeStage={space.runtime_stage}
              currentHardware={space.current_hardware}
            />
          ))}
        </div>
      )}
    </main>
  );
}
