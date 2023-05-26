import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState("");
  const [showInitialPlaceholder, setShowInitialPlaceholder] = useState(true);
  const initialPlaceholder = "Discover thousands of spaces";
  const placeholders = [
    "Generate music",
    "Remove background from images",
    "Translate text",
    "Chat with a PDF file",
    "Generate anime images",
    "Recognize objects in images",
    "Perform sentiment analysis",
    "Help me pick a laptop",
    "Face recognition",
    "Drawing canvas",
    "Create 3D objects from images",
    "Play a text-based game",
    "Predict stock prices",
    "Recommend movies",
    "Image classification",
    "Summarize text",
    "Generate video from text and audio",
    "Help me organize a trip",
    "Write a children's story",
    "Chat with a cat",
  ];

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setShowInitialPlaceholder(false);
    }, 4000);

    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    if (!showInitialPlaceholder) {
      let typingInterval;
      if (placeholder.length < placeholders[placeholderIndex].length) {
        const typingSpeed = Math.floor(Math.random() * 50) + 100;
        typingInterval = setInterval(() => {
          setPlaceholder(prevPlaceholder => prevPlaceholder + placeholders[placeholderIndex][placeholder.length]);
        }, typingSpeed);
      }
      return () => clearInterval(typingInterval);
    }
  }, [placeholder, placeholderIndex, showInitialPlaceholder]);

  useEffect(() => {
    if (!showInitialPlaceholder) {
      const indexInterval = setInterval(() => {
        if (placeholder === placeholders[placeholderIndex]) {
          setPlaceholderIndex(Math.floor(Math.random() * placeholders.length));
          setPlaceholder(""); // reset the placeholder when the index changes
        }
      }, 1500);

      return () => clearInterval(indexInterval);
    }
  }, [placeholder, placeholderIndex, showInitialPlaceholder]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 rounded-xl shadow-sm w-full lg:w-1/2 h-12 my-8">
      <input
        type="text"
        placeholder={showInitialPlaceholder ? initialPlaceholder : placeholder}
        className="search-bar w-full h-full px-4 py-2 text-gray-200 bg-gray-800 border border-gray-700 rounded-xl shadow-sm appearance-none focus:outline-none focus:ring-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;