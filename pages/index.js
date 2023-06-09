import { Inter } from 'next/font/google';
import SearchBar from '@/components/searchBar';
import Card from '@/components/card';
import { predict } from '@/pages/api/api_hf';
import { get_space_info } from '@/pages/api/hf_space';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [spaceInfo, setSpaceInfo] = useState(null);
  const [sortedSpaceInfo, setSortedSpaceInfo] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [onlyRunning, setOnlyRunning] = useState(false);

  useEffect(() => {
    if (searchResults.length > 0) {
      fetchSpaceInfo(searchResults);
    } else {
      setSpaceInfo(null);
    }

    async function fetchSpaceInfo(results) {
      setIsLoading(true);
      const spaceData = await Promise.all(
        results.map(async ([id, description]) => {
          const space = await get_space_info(id);
          return space ? { ...space, description } : null;
        })
      );
      setSpaceInfo(spaceData);
      setIsLoading(false);
      document.querySelector('.search-bar').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [searchResults]);

  useEffect(() => {
    if (spaceInfo) {
      setSortedSpaceInfo(filterResults(sortResults(spaceInfo, sortBy)));
    }
  }, [spaceInfo, sortBy, onlyRunning]);

  useEffect(() => {
    document.querySelector('.search-bar')?.focus();
  }, []);

  async function onSearch(query) {
    setIsLoading(true);
    setSortBy('relevance');
    setSearchResults(query ? await predict(query, 24) : []);
  }

  function sortResults(results, sortBy) {
    return sortBy === 'likes' ? [...results].sort((a, b) => b.likes - a.likes) : results;
  }

  function filterResults(results) {
    return onlyRunning ? results.filter((space) => space.runtime_stage === 'RUNNING') : results;
  }

  function toggleOnlyRunning() {
    setOnlyRunning(!onlyRunning);
  }

  const renderSortButtons = () => (
    <>
      {['relevance', 'likes'].map((option) => (
        <div>
          <button
            key={option}
            className={`px-4 py-1 rounded-full mr-2 ${sortBy === option ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}
            onClick={() => setSortBy(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        </div>
      ))}
    </>
  );

  const renderCards = () =>
    sortedSpaceInfo.map(
      (space, index) =>
        space && (
          <Card
            key={index}
            {...space}
            space_id={space.space_id}
            author={space.author}
            title={space.title}
            emoji={space.emoji}
            lastModified={space.lastModified}
            colorFrom={space.colorFrom}
            colorTo={space.colorTo}
            sdk={space.sdk}
            runtimeStage={space.runtime_stage}
            currentHardware={space.current_hardware}
          />
        )
    );

  return (
    <main className={`flex min-h-screen flex-col items-center p-8 md:px-24 pt-20 bg-gray-950 ${inter.className} justify-between`}>
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 text-white">🤗 Hugging Face Spaces</h1>
      <SearchBar onSearch={onSearch} />
      {isLoading ? (
        <div className="col-span-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        sortedSpaceInfo && (
          <>
            <div className="flex justify-center mt-4 items-baseline">
              <button
                className={`px-4 mx-4 py-1 rounded-full ${onlyRunning ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}
                onClick={toggleOnlyRunning}
              >
                Only running
              </button>
              <span className="text-white mr-2">Sort by:</span>
              {renderSortButtons()}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-8">
              {renderCards()}
            </div>
          </>
        )
      )}
      <footer className="text-center text-gray-500 text-sm mt-8 bottom-0 w-full p-4">
        Created by Anzor Qunash
        <br />
        <a href="https://huggingface.co/datasets/anzorq/hf-spaces-descriptions-embeddings" target="_blank" rel="noopener noreferrer">
          Dataset
        </a>
        <span className="mx-2">•</span>
        <a href="https://github.com/qunash" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <span className="mx-2">•</span>
        <a href="https://twitter.com/hahahahohohe" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <span className="mx-2">•</span>
        <a href="https://www.buymeacoffee.com/anzorq" target="_blank" rel="noopener noreferrer">
          Buy me a coffee
        </a>
      </footer>
    </main>
  );
}